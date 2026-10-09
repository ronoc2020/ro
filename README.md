# RO — legacy web prototype

Historical Next.js frontend with a separate Express/Nodemailer contact API. **This repository is not the current ROCyber NEXT production platform.**

## Security notice (October 2026)

A committed `.env` with email credentials was removed from the current branch. **Any previously exposed mail-provider password or app password must be revoked and reissued.** Git commit history may retain copies of deleted data. Never reuse the old password.

The contact API previously permitted broad cross-origin submissions without adequate request throttling. It has been hardened, but **its SMTP delivery and deployment have not been verified in a live environment**.

## Structure

- `app/` — legacy Next.js application.
- `server/` — isolated contact server and security tests.
- [Server setup and limitations](server/README.md).

## Run the legacy contact API locally

Use Node.js 20+. Only after rotating credentials:

```bash
cd server
npm install
cp .env.example .env
# Configure your approved origin and a NEW email app password
npm test
npm start
```

The server intentionally binds to `127.0.0.1`, requires an explicit allowed Origin and rejects missing configuration. Put an authorized HTTPS reverse proxy with abuse controls in front of it if you choose to operate it publicly.

## Development status

The frontend uses older Next.js dependencies and has not undergone a current dependency/build or end-to-end deployment audit. Do **not** treat this repository as production-ready, and do not deploy it without updating dependencies and reviewing security.

For current work see [ROCyber Solutions](https://rocybersolutions.com/) and [ROCyber NEXT](https://next.rocybersolutions.com/).
