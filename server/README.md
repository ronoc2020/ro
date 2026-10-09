# Legacy `ro` contact API

**Security maintenance only.** This standalone, historical API is not the ROCyber NEXT contact backend.

## Required security action

A former `.env` containing a nonempty `EMAIL_PASSWORD` value was committed to the public history of this repository. It was removed from the current `main` branch on October 10, 2026, but **remains potentially retrievable from Git history**.

**Revoke or rotate that application password immediately** in the mail-provider account. The repository removal does NOT invalidate a leaked credential. Consider GitHub secret scanning and history cleanup, bearing in mind history rewriting impacts forks and clones.

## Install and configure

Requires Node.js 20+. This server listens on `127.0.0.1` only; place it behind an approved HTTPS reverse proxy if required.

```sh
cd server
npm install
cp .env.example .env
# Edit .env locally with a NEW app password and an accurate allowed origin
npm run check
npm test
npm start
```

**Never commit `.env`**. `.gitignore` in the repository already ignores that filename. Treat the example values as placeholders.

Configuration:

- `EMAIL` — mailbox receiving messages; also authenticated SMTP sender.
- `EMAIL_PASSWORD` — newly issued mail-provider app password, never commit.
- `ALLOWED_ORIGINS` — comma-separated exact `https://` origins, mandatory, no wildcard.
- `PORT` — optional local HTTP port, default 5000.

## Defensive behavior

- JSON input limit: 8 KB.
- Contact message: 5–4000 characters.
- Email validation and safe `replyTo`; the SMTP `from` always uses the authenticated account.
- Origin allow-list with explicit browser preflight.
- Local in-memory throttle: 3 attempts per 15 minutes per observed socket IP.
- Optional honeypot field `website`.
- No wildcard CORS.
- Avoids returning SMTP error details to visitors.
- Fails closed if configuration is missing.
- Does not expose the endpoint directly on public network interfaces.

## Important limitations

The rate limiter is **single-process and in-memory**. Behind a reverse proxy, the observed socket IP may represent the proxy rather than individual clients. For serious public exposure use a trusted proxy and its edge rate limiting / anti-abuse controls rather than trusting arbitrary client-supplied IP headers.

Gmail or another SMTP provider can impose sending limits. This endpoint should be retired if an actively supported, authenticated contact API is already deployed. No live SMTP sending tests have been carried out here.
