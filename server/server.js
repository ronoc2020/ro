'use strict';

// Legacy contact API, kept separate from ROCyber NEXT.
// Requires the environment variables documented in server/.env.example.
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');

const PORT = Number(process.env.PORT || 5000);
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean);

if (!EMAIL || !EMAIL_PASSWORD) {
  throw new Error('Mail credentials are missing. Configure EMAIL and EMAIL_PASSWORD outside Git; never commit .env.');
}
if (!ALLOWED_ORIGINS.length) {
  throw new Error('ALLOWED_ORIGINS must explicitly list approved website origins for the contact form.');
}
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '8kb', strict: true }));

const rateLimit = new Map();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 3;
const MAX_TRACKED_IPS = 5000;

function allowRequest(remoteAddress) {
  const now = Date.now();
  const key = remoteAddress || 'unknown';
  if (rateLimit.size >= MAX_TRACKED_IPS) {
    for (const [ip, value] of rateLimit) {
      if (value.resetAt <= now) rateLimit.delete(ip);
    }
    if (rateLimit.size >= MAX_TRACKED_IPS && !rateLimit.has(key)) return false;
  }
  let entry = rateLimit.get(key);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + RATE_WINDOW_MS };
    rateLimit.set(key, entry);
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count += 1;
  return true;
}

function validEmail(value) {
  return typeof value === 'string' &&
    value.length <= 254 &&
    /^[^\s@<>\r\n]{1,64}@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(value);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL, pass: EMAIL_PASSWORD },
});

app.get('/health', (_req, res) => {
  res.set('Cache-Control', 'no-store').json({ ok: true });
});

// No wildcard CORS. This endpoint requires same-origin deployment or a
// configured permitted origin and an appropriate reverse proxy.
app.post('/api/contact', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  const origin = req.get('origin');
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ ok: false, error: 'Origin not allowed' });
  }
  res.set('Access-Control-Allow-Origin', origin).set('Vary', 'Origin');
  if (!allowRequest(req.socket.remoteAddress)) {
    return res.status(429).json({ ok: false, error: 'Too many requests' });
  }

  const { email, message, website } = req.body || {};
  if (website) return res.status(202).json({ ok: true });
  if (!validEmail(email) ||
      typeof message !== 'string' || message.trim().length < 5 || message.length > 4000) {
    return res.status(400).json({ ok: false, error: 'Invalid form data' });
  }

  try {
    await transporter.sendMail({
      from: EMAIL,
      to: EMAIL,
      replyTo: email.trim(),
      subject: 'Website contact form',
      text: 'Reply-to: ' + email.trim() + '\n\n' + message.trim(),
    });
    res.status(202).json({ ok: true });
  } catch (error) {
    console.error('Contact delivery failed:', error?.code || 'mail-error');
    res.status(503).json({ ok: false, error: 'Message delivery unavailable' });
  }
});

// Explicit CORS preflight: no wildcard and no credentials.
app.options('/api/contact', (req, res) => {
  const origin = req.get('origin');
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) return res.sendStatus(403);
  return res
    .set('Access-Control-Allow-Origin', origin)
    .set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Vary', 'Origin')
    .sendStatus(204);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log('Legacy contact API listening on localhost port ' + PORT);
});
