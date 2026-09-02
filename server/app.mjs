import { createHash, randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import compression from 'compression';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { createSmtpMailer, sendPartnershipEmails } from './email.mjs';
import { validatePartnershipPayload } from './validation.mjs';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultStaticDirectory = path.resolve(serverDirectory, '../dist');

export function createApp({ config, mailer = createSmtpMailer(config), logger = console, staticDirectory = defaultStaticDirectory }) {
  const app = express();
  const recentSubmissions = new Map();
  const submissionsInFlight = new Set();

  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", 'https://*.tile.openstreetmap.org'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        frameSrc: ["'self'", 'https://sketchfab.com'],
        imgSrc: ["'self'", 'data:', 'https://*.tile.openstreetmap.org'],
        mediaSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }));
  app.use(compression());

  app.get('/api/health', (_request, response) => {
    response.status(mailer ? 200 : 503).json({
      status: mailer ? 'ok' : 'email-not-configured',
    });
  });

  const partnershipLimiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    limit: config.rateLimitMax,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many inquiries. Please wait before trying again.' },
  });

  app.post('/api/partnership', partnershipLimiter, express.json({ limit: '20kb', strict: true }), async (request, response) => {
    const requestId = randomUUID();
    const origin = request.get('origin');

    if (config.allowedOrigins.length && (!origin || !config.allowedOrigins.includes(origin))) {
      return response.status(403).json({ error: 'This request origin is not allowed.' });
    }

    const validation = validatePartnershipPayload(request.body);
    if (validation.isHoneypot) {
      return response.status(200).json({ success: true });
    }
    if (!validation.valid) {
      return response.status(422).json({ error: 'Please correct the highlighted fields.', fields: validation.errors });
    }
    if (!mailer) {
      logger.error('Partnership mailer is not configured.', { requestId });
      return response.status(503).json({ error: "We couldn't submit your inquiry right now. Please try again." });
    }

    const inquiry = { ...validation.data, submittedAt: new Date() };
    const fingerprint = createHash('sha256')
      .update([inquiry.email, inquiry.interest, inquiry.message].join('\u0000'))
      .digest('hex');
    const now = Date.now();

    for (const [key, timestamp] of recentSubmissions) {
      if (now - timestamp > config.duplicateWindowMs) recentSubmissions.delete(key);
    }

    if (submissionsInFlight.has(fingerprint) || recentSubmissions.has(fingerprint)) {
      return response.status(409).json({ error: 'This inquiry was already submitted recently.' });
    }

    submissionsInFlight.add(fingerprint);
    try {
      await sendPartnershipEmails(mailer, inquiry, config);
      recentSubmissions.set(fingerprint, now);
      logger.info('Partnership inquiry accepted.', { requestId, interest: inquiry.interest });
      return response.status(201).json({ success: true, requestId });
    } catch (error) {
      logger.error('Partnership inquiry delivery failed.', { requestId, error });
      return response.status(502).json({ error: "We couldn't submit your inquiry right now. Please try again." });
    } finally {
      submissionsInFlight.delete(fingerprint);
    }
  });

  app.use('/api', (_request, response) => response.status(404).json({ error: 'Not found.' }));
  app.use(express.static(staticDirectory, {
    etag: true,
    index: false,
    maxAge: 0,
    setHeaders(response, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  }));
  app.get('*splat', (_request, response) => {
    response.setHeader('Cache-Control', 'no-cache');
    response.sendFile(path.join(staticDirectory, 'index.html'));
  });

  app.use((error, _request, response, _next) => {
    logger.error('Unhandled request error.', { error });
    if (error?.type === 'entity.too.large') {
      return response.status(413).json({ error: 'The inquiry is too large.' });
    }
    if (error instanceof SyntaxError) {
      return response.status(400).json({ error: 'Invalid request.' });
    }
    return response.status(500).json({ error: 'An unexpected error occurred.' });
  });

  return app;
}
