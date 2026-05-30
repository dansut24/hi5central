# Environment Variables

## Required

POSTGRES_PASSWORD
DATABASE_URL
PORT
PUBLIC_API_BASE_URL
APP_URL
API_URL
JWT_SECRET
SESSION_SECRET
ENCRYPTION_KEY
NODE_ENV

## Production Values

APP_URL=https://app.hi5central.com
API_URL=https://api.hi5central.com
PUBLIC_API_BASE_URL=https://api.hi5central.com
NODE_ENV=production

## Notes

POSTGRES_PASSWORD must match the password used inside DATABASE_URL.

Secrets should be generated using:

openssl rand -hex 32

Do not commit real production secrets.
