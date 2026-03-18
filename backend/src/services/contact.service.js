import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { sendEmail } from './email.service.js';

function validateEmail(email) {
  const normalized = email?.trim().toLowerCase();
  if (!normalized || !/^\S+@\S+\.\S+$/.test(normalized)) {
    throw new ApiError(400, 'Érvényes email cím szükséges');
  }
  return normalized;
}

function validateName(name) {
  const normalized = name?.trim();
  if (!normalized) {
    throw new ApiError(400, 'A név megadása kötelező');
  }
  return normalized;
}

function validateMessage(message) {
  const normalized = message?.trim();
  if (!normalized) {
    throw new ApiError(400, 'Az üzenet megadása kötelező');
  }
  return normalized;
}

function validatePhone(phone) {
  const normalized = phone?.trim();
  if (!normalized) {
    return null;
  }

  if (!/^[\d\s()+-]{7,20}$/.test(normalized)) {
    throw new ApiError(400, 'A telefonszám formátuma nem megfelelő');
  }

  return normalized;
}

export async function submitContactMessage(payload) {
  const name = validateName(payload.name);
  const email = validateEmail(payload.email);
  const phone = validatePhone(payload.phone);
  const message = validateMessage(payload.message);
  const submittedAt = new Date();

  const subject = `Apertúra kapcsolatfelvétel - ${name}`;
  const timeLabel = submittedAt.toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' });
  const text = [
    'Új kapcsolatfelvételi üzenet érkezett az Apertúra weboldalról.',
    '',
    `Név: ${name}`,
    `Email: ${email}`,
    `Telefon: ${phone || '-'}`,
    `Beküldve: ${timeLabel}`,
    '',
    'Üzenet:',
    message,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2>Új kapcsolatfelvételi üzenet</h2>
      <p><strong>Név:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone || '-'}</p>
      <p><strong>Beküldve:</strong> ${timeLabel}</p>
      <p><strong>Üzenet:</strong></p>
      <p style="white-space: pre-line;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
    </div>
  `;

  await sendEmail({
    to: env.contactReceiverEmail,
    subject,
    text,
    html,
    replyTo: email,
  });

  return { message: 'Az üzenetet sikeresen elküldtük.' };
}