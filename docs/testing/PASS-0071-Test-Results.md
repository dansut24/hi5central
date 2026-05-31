# PASS-0071 Test Results

## Pass

PASS-0071 Marketing Site Deployment

## Result

PASS

## Verified

- Marketing repository cloned to VPS
- Marketing Dockerfile created
- Marketing container built successfully
- Marketing container started successfully
- Caddy can reach marketing container on port 3000
- hi5central.com loads the marketing website
- app.hi5central.com still loads the platform app
- api.hi5central.com/ready still returns ready
- Caddy was force recreated to clear previous root-domain redirect

## URLs

Marketing:

https://hi5central.com

Platform:

https://app.hi5central.com

API:

https://api.hi5central.com/ready

Status:

https://status.hi5central.com

## Notes

The root domain previously redirected to app.hi5central.com.

This was replaced with:

hi5central.com
→ marketing:3000

The marketing site is intentionally kept separate from the platform repository.

## Next

Trial signup and tenant onboarding flow.
