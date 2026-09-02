import { interestLabels, partnershipConfig } from './partnership-config.mjs';

const controlCharacters = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s().-]*$/;

export function sanitizePlainText(value, { multiline = false } = {}) {
  if (typeof value !== 'string') return '';
  const cleaned = value.replace(controlCharacters, '').replace(/\r\n?/g, '\n').trim();
  return multiline ? cleaned : cleaned.replace(/\s+/g, ' ');
}

export function validatePartnershipPayload(payload) {
  const errors = {};
  const limits = partnershipConfig.limits;

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { valid: false, errors: { form: 'Invalid submission.' } };
  }

  const fullName = sanitizePlainText(payload.fullName);
  const email = sanitizePlainText(payload.email).toLocaleLowerCase('en-US');
  const phone = sanitizePlainText(payload.phone);
  const interest = sanitizePlainText(payload.interest);
  const message = sanitizePlainText(payload.message, { multiline: true });
  const website = sanitizePlainText(payload.website);

  if (!fullName) errors.fullName = 'Enter your full name.';
  else if (fullName.length > limits.fullNameMax) errors.fullName = `Use ${limits.fullNameMax} characters or fewer.`;

  if (!email) errors.email = 'Enter your email address.';
  else if (email.length > limits.emailMax || !emailPattern.test(email)) errors.email = 'Enter a valid email address.';

  if (phone) {
    const digitCount = phone.replace(/\D/g, '').length;
    if (phone.length > limits.phoneMax || !phonePattern.test(phone) || digitCount < 7 || digitCount > 15) {
      errors.phone = 'Enter a valid phone number or leave this field blank.';
    }
  }

  if (!interestLabels.has(interest)) errors.interest = 'Select a valid inquiry type.';

  if (!message) errors.message = 'Enter a message.';
  else if (message.length < limits.messageMin) errors.message = `Use at least ${limits.messageMin} characters.`;
  else if (message.length > limits.messageMax) errors.message = `Use ${limits.messageMax} characters or fewer.`;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    isHoneypot: Boolean(website),
    data: {
      fullName,
      email,
      phone,
      interest,
      interestLabel: interestLabels.get(interest) ?? '',
      message,
    },
  };
}
