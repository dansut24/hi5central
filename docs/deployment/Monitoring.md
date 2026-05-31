# Hi5Central Monitoring

## Tool

Uptime Kuma

## URL

https://status.hi5central.com

## Current Monitors

- https://api.hi5central.com/ready
- https://app.hi5central.com/dashboard

## Reverse Proxy

Caddy proxies:

status.hi5central.com
→ Uptime Kuma

## Notes

The Uptime Kuma admin area is currently protected by the initial admin account.

Later, a public status page can be created for customers.

Only the public status page should be shared with customers.
Do not expose monitor editing or admin credentials.

## Future

- Public customer status page
- Incident history
- Maintenance announcements
- Email alerts
- Teams/Slack webhook alerts
