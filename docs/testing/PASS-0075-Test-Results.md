# PASS-0075 Test Results

## Pass

PASS-0075 Email Verification Delivery

## Result

PASS

## Verified

- SMTP credentials configured in VPS .env
- API container receives SMTP variables
- Nodemailer dependency installed
- Trial signup creates confirmation token
- Trial signup sends confirmation email
- Email successfully received
- Email contains tenant subdomain confirmation link
- API hostname is no longer exposed in the user-facing email link
- Confirmation link activates user
- Confirmation link activates tenant
- Confirmation link redirects to tenant login
- Tenant login works after verification
- Login redirects to tenant onboarding page
- Tenant onboarding page loads

## Confirmed Flow

1. User signs up at hi5central.com/signup
2. API creates tenant
3. API creates pending user
4. API creates owner membership
5. API creates default device group
6. API creates trial subscription
7. API creates tenant branding
8. API creates email verification token
9. API sends SMTP email
10. User opens tenant-branded confirmation link
11. API confirms token
12. API activates tenant/user
13. User is redirected to tenant login
14. User logs in
15. User lands on onboarding

## Email Link Format

Expected:

https://tenant-slug.hi5central.com/api/auth/confirm-trial?token=TOKEN

## Notes

SMTP credentials are stored only in the VPS .env file and are not committed.

The confirmation URL now uses the tenant subdomain instead of api.hi5central.com.

## Remaining Future Improvements

- Better branded email template
- Email resend option
- Expired-token recovery
- Rate limiting
- CAPTCHA on signup
- SPF/DKIM/DMARC validation
- Trial expiry notifications
