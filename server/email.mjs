import nodemailer from 'nodemailer';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function textToHtml(value) {
  return escapeHtml(value).replaceAll('\n', '<br>');
}

function emailShell(content) {
  return `<!doctype html>
<html lang="en"><body style="margin:0;background:#f4f4f2;color:#1b1b1b;font-family:Arial,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f2;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-top:5px solid #d60000">
<tr><td style="padding:28px 28px 12px"><div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#d60000">CR-1 PHILIPPINES</div></td></tr>
<tr><td style="padding:8px 28px 30px;font-size:15px;line-height:1.7">${content}</td></tr>
</table></td></tr></table></body></html>`;
}

export function createSmtpMailer(config) {
  if (!config.smtp.host || !config.smtp.username || !config.smtp.password) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    requireTLS: config.smtp.encryption === 'tls',
    auth: {
      user: config.smtp.username,
      pass: config.smtp.password,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: { minVersion: 'TLSv1.2' },
  });
}

export function buildPartnershipEmails(inquiry, config) {
  const submittedAt = new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: config.mailTimeZone,
  }).format(inquiry.submittedAt);
  const firstName = inquiry.fullName.split(/\s+/)[0] || inquiry.fullName;
  const from = { name: config.mailFromName, address: config.mailFromAddress };

  const internalText = `New Build With CR-1 inquiry received.\n\nFull Name:\n${inquiry.fullName}\n\nEmail:\n${inquiry.email}\n\nPhone:\n${inquiry.phone || 'Not provided'}\n\nInterested In:\n${inquiry.interestLabel}\n\nMessage:\n${inquiry.message}\n\nSubmitted At:\n${submittedAt}\n\nSource:\nCR-1 Philippines Website - Build With CR-1`;
  const internalHtml = emailShell(`
    <h1 style="margin:0 0 20px;font-size:24px">New Build With CR-1 inquiry</h1>
    <p><strong>Full Name</strong><br>${escapeHtml(inquiry.fullName)}</p>
    <p><strong>Email</strong><br>${escapeHtml(inquiry.email)}</p>
    <p><strong>Phone</strong><br>${escapeHtml(inquiry.phone || 'Not provided')}</p>
    <p><strong>Interested In</strong><br>${escapeHtml(inquiry.interestLabel)}</p>
    <p><strong>Message</strong><br>${textToHtml(inquiry.message)}</p>
    <p><strong>Submitted At</strong><br>${escapeHtml(submittedAt)}</p>
    <p style="color:#626262">CR-1 Philippines Website - Build With CR-1</p>`);

  const confirmationText = `Hi ${firstName},\n\nThank you for reaching out to CR-1 Philippines.\n\nWe've successfully received your inquiry regarding:\n${inquiry.interestLabel}\n\nOur team will review the information you submitted and contact you regarding the next steps.\n\nFor your reference, your message was received on:\n${submittedAt}\n\nIf you need to provide additional information, you may reply to this email or contact us at:\n${config.internalInbox}\n\nRegards,\n\nCR-1 Philippines`;
  const confirmationHtml = emailShell(`
    <h1 style="margin:0 0 20px;font-size:24px">We've received your CR-1 inquiry</h1>
    <p>Hi ${escapeHtml(firstName)},</p>
    <p>Thank you for reaching out to CR-1 Philippines. We've successfully received your inquiry regarding:</p>
    <p style="border-left:3px solid #d60000;padding:12px 16px;background:#f7f7f5"><strong>${escapeHtml(inquiry.interestLabel)}</strong></p>
    <p>Our team will review the information you submitted and contact you regarding the next steps.</p>
    <p><strong>Received:</strong> ${escapeHtml(submittedAt)}</p>
    <p>If you need to provide additional information, reply to this email or contact <a href="mailto:${escapeHtml(config.internalInbox)}" style="color:#d60000">${escapeHtml(config.internalInbox)}</a>.</p>
    <p>Regards,<br><strong>CR-1 Philippines</strong></p>`);

  return [
    {
      from,
      to: config.internalInbox,
      replyTo: { name: inquiry.fullName, address: inquiry.email },
      subject: `New CR-1 Partnership Inquiry - ${inquiry.fullName}`,
      text: internalText,
      html: internalHtml,
    },
    {
      from,
      to: inquiry.email,
      replyTo: config.internalInbox,
      subject: "We've Received Your CR-1 Inquiry",
      text: confirmationText,
      html: confirmationHtml,
    },
  ];
}

export async function sendPartnershipEmails(mailer, inquiry, config) {
  const messages = buildPartnershipEmails(inquiry, config);
  await Promise.all(messages.map((message) => mailer.sendMail(message)));
}
