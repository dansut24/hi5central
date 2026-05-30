# Docker Operations

Build:

docker compose -f docker-compose.vps.yml up -d --build

Restart:

docker compose -f docker-compose.vps.yml restart

View Status:

docker compose -f docker-compose.vps.yml ps

API Logs:

docker compose -f docker-compose.vps.yml logs api --tail 100

Web Logs:

docker compose -f docker-compose.vps.yml logs web --tail 100

Caddy Logs:

docker compose -f docker-compose.vps.yml logs caddy --tail 100

