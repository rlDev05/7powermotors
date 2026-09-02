function integer(value, fallback) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function loadServerConfig(env = process.env) {
  return {
    nodeEnv: env.NODE_ENV ?? 'development',
    port: integer(env.PORT, 3000),
    trustProxy: integer(env.TRUST_PROXY_HOPS, 1),
    allowedOrigins: (env.ALLOWED_ORIGINS ?? '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    rateLimitWindowMs: integer(env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    rateLimitMax: integer(env.RATE_LIMIT_MAX, 5),
    duplicateWindowMs: integer(env.DUPLICATE_WINDOW_MS, 10 * 60 * 1000),
    internalInbox: env.PARTNERSHIP_INBOX ?? 'cr1.philippines@gmail.com',
    mailFromAddress: env.MAIL_FROM_ADDRESS ?? 'service@cr-1phillipines.com',
    mailFromName: env.MAIL_FROM_NAME ?? 'CR-1 Philippines',
    mailTimeZone: env.MAIL_TIME_ZONE ?? 'Asia/Manila',
    smtp: {
      host: env.SMTP_HOST ?? '',
      port: integer(env.SMTP_PORT, 587),
      username: env.SMTP_USERNAME ?? '',
      password: env.SMTP_PASSWORD ?? '',
      encryption: env.SMTP_ENCRYPTION ?? 'tls',
    },
  };
}
