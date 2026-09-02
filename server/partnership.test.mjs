import assert from 'node:assert/strict';
import { once } from 'node:events';
import { test } from 'node:test';
import { createApp } from './app.mjs';
import { buildPartnershipEmails } from './email.mjs';
import { validatePartnershipPayload } from './validation.mjs';

const baseConfig = {
  nodeEnv: 'test', port: 0, trustProxy: false,
  allowedOrigins: ['https://cr-1phillipines.com'],
  rateLimitWindowMs: 60_000, rateLimitMax: 10, duplicateWindowMs: 60_000,
  internalInbox: 'cr1.philippines@gmail.com',
  mailFromAddress: 'service@cr-1phillipines.com', mailFromName: 'CR-1 Philippines',
  mailTimeZone: 'Asia/Manila',
  smtp: { host: '', port: 587, username: '', password: '', encryption: 'tls' },
};

const validPayload = {
  fullName: 'Juan Dela Cruz', email: 'juan@example.com', phone: '+63 917 123 4567',
  interest: 'dealer', message: 'We operate a motorcycle service center in Makati.', website: '',
};

async function withServer(options, callback) {
  const app = createApp({ ...options, logger: { info() {}, error() {} } });
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    const { port } = server.address();
    return await callback(`http://127.0.0.1:${port}`);
  } finally {
    server.close();
    await once(server, 'close');
  }
}

async function post(baseUrl, payload, origin = 'https://cr-1phillipines.com') {
  return fetch(`${baseUrl}/api/partnership`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(payload),
  });
}

test('validates required fields and optional phone', () => {
  const blank = validatePartnershipPayload({});
  assert.equal(blank.valid, false);
  assert.deepEqual(Object.keys(blank.errors).sort(), ['email', 'fullName', 'interest', 'message']);
  assert.equal(validatePartnershipPayload({ ...validPayload, phone: '' }).valid, true);
  assert.equal(validatePartnershipPayload({ ...validPayload, email: 'invalid' }).errors.email, 'Enter a valid email address.');
  assert.equal(validatePartnershipPayload({ ...validPayload, interest: 'not-allowed' }).valid, false);
  assert.equal(validatePartnershipPayload({ ...validPayload, message: 'Too short' }).valid, false);
});

test('builds escaped multipart emails with correct sender and reply-to', () => {
  const inquiry = {
    ...validatePartnershipPayload({ ...validPayload, fullName: 'Juan <Admin>' }).data,
    submittedAt: new Date('2026-09-02T02:00:00.000Z'),
  };
  const [internal, confirmation] = buildPartnershipEmails(inquiry, baseConfig);
  assert.deepEqual(internal.from, { name: 'CR-1 Philippines', address: 'service@cr-1phillipines.com' });
  assert.deepEqual(internal.replyTo, { name: 'Juan <Admin>', address: 'juan@example.com' });
  assert.equal(confirmation.to, 'juan@example.com');
  assert.equal(confirmation.from.address, 'service@cr-1phillipines.com');
  assert.match(internal.html, /Juan &lt;Admin&gt;/);
  assert.doesNotMatch(internal.html, /Juan <Admin>/);
});

test('accepts only after both emails and blocks duplicate submission', async () => {
  const sent = [];
  const mailer = { async sendMail(message) { sent.push(message); return { messageId: String(sent.length) }; } };
  await withServer({ config: baseConfig, mailer }, async (baseUrl) => {
    const response = await post(baseUrl, validPayload);
    assert.equal(response.status, 201);
    assert.equal((await response.json()).success, true);
    assert.equal(sent.length, 2);
    assert.equal(sent[0].to, 'cr1.philippines@gmail.com');
    assert.equal(sent[1].to, 'juan@example.com');
    assert.equal((await post(baseUrl, validPayload)).status, 409);
    assert.equal(sent.length, 2);
  });
});

test('rejects invalid origin and invalid input without mail', async () => {
  const sent = [];
  const mailer = { async sendMail(message) { sent.push(message); } };
  await withServer({ config: baseConfig, mailer }, async (baseUrl) => {
    assert.equal((await post(baseUrl, validPayload, 'https://attacker.example')).status, 403);
    assert.equal((await post(baseUrl, { ...validPayload, message: '' })).status, 422);
    assert.equal(sent.length, 0);
  });
});

test('silently accepts honeypot and contains SMTP failures', async () => {
  const failingMailer = { async sendMail() { throw new Error('private SMTP detail'); } };
  await withServer({ config: baseConfig, mailer: failingMailer }, async (baseUrl) => {
    assert.equal((await post(baseUrl, { ...validPayload, website: 'https://spam.example' })).status, 200);
    const failure = await post(baseUrl, validPayload);
    assert.equal(failure.status, 502);
    assert.deepEqual(await failure.json(), { error: "We couldn't submit your inquiry right now. Please try again." });
  });
});

test('returns a safe response when SMTP is not configured', async () => {
  await withServer({ config: baseConfig, mailer: null }, async (baseUrl) => {
    assert.equal((await fetch(`${baseUrl}/api/health`)).status, 503);
    const response = await post(baseUrl, validPayload);
    assert.equal(response.status, 503);
    assert.doesNotMatch(JSON.stringify(await response.json()), /SMTP|password|server/i);
  });
});
