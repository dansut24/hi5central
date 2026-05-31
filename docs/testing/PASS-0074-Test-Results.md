# PASS-0074 Test Results

## Pass

PASS-0074 Tenant Login and Onboarding Wizard

## Result

In progress

## DNS

- Wildcard DNS active
- Tenant subdomains resolve to VPS

## TLS

- Wildcard certificate issued for *.hi5central.com

## Login

- tenant.hi5central.com/login loads
- Tenant slug detected from hostname
- Login submits through tenant subdomain /api route

## Onboarding

- tenant.hi5central.com/onboarding loads
- Tenant slug detected from hostname
- Tenant information loads from API
- Product selection works
- Complete onboarding persists selected product

## Notes

Device enrolment package generation remains pending for a later agent/enrolment pass.
