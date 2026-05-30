# Caddy Configuration

Current configuration:

api.hi5central.com
→ api:3001

app.hi5central.com
→ web:4321

/api/*
→ api:3001

Reload:

docker compose -f docker-compose.vps.yml exec caddy caddy reload --config /etc/caddy/Caddyfile

Restart:

docker compose -f docker-compose.vps.yml restart caddy

