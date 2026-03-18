import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

let transporter;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  if (!env.smtp.host || !env.smtp.user || !env.smtp.pass) {
    throw new ApiError(500, 'SMTP is not configured');
  }

  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });

  return transporter;
}

export async function sendEmail({ to, subject, text, html, replyTo }) {
  const activeTransporter = getTransporter();

  await activeTransporter.sendMail({
    from: env.smtp.from,
    to,
    subject,
    text,
    html,
    replyTo,
  });
}