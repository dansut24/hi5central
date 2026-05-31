# Hi5Central Licensing Model

## Overview

Hi5Central can support multiple commercial deployment models.

The codebase may be deployable using Docker, but commercial usage should be governed by licence terms.

## Deployment Models

### Hi5Central Cloud

Hosted by Hi5Central.

Customer uses:

app.hi5central.com

or a tenant-specific domain.

Best for:

- Standard SaaS customers
- Smaller businesses
- MSPs wanting managed hosting

### Managed Self-Hosted

Hi5Central deploys the platform onto a customer-controlled VPS or server.

Customer pays for:

- Licence
- Support
- Updates
- Maintenance
- Agent releases

Best for:

- Larger customers
- Regulated environments
- Customers wanting their own infrastructure

### Partner Edition

A licensed partner can create and manage tenants for their own customers.

Partner may resell services subject to commercial agreement.

Best for:

- MSPs
- IT providers
- Regional partners

## Suggested Licence Restrictions

### Self-Hosted Licence

Permits:

- Internal company use
- One production instance
- Defined number of devices
- Defined number of technicians

Does not permit:

- Resale
- Offering Hi5Central as a hosted service to third parties
- Rebranding without agreement
- Removing licensing or update checks

### Partner Licence

Permits:

- Multiple customer tenants
- Resale to end customers
- Partner-branded service options if agreed
- Higher device limits

Requires:

- Partner agreement
- Usage reporting
- Active subscription
- Support terms
- Security obligations

## Future Licence Enforcement

Potential enforcement mechanisms:

- Instance licence key
- Activation endpoint
- Signed licence file
- Tenant/device limits
- Feature flags
- Update channel access
- Agent package signing
- Usage reporting

## Licence States

Development:

For local testing only.

Trial:

Limited time and/or limited devices.

Active:

Production use permitted.

Expired:

Restricted access or warning mode.

Suspended:

Login and agent actions restricted.

## Recommended Approach

For early commercial launch:

1. Cloud SaaS first
2. Managed self-hosted for selected customers
3. Partner edition later
4. Add licence enforcement after core product stabilises

## Notes

Self-hosting does not need to mean open source.

A product can be Docker-deployable while still being commercially licensed and protected by terms.
