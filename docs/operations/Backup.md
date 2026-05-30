# PostgreSQL Backups

Manual:

docker compose -f docker-compose.vps.yml exec postgres \
pg_dump -U hi5central hi5central > backup.sql

Restore:

cat backup.sql | docker compose -f docker-compose.vps.yml exec -T postgres \
psql -U hi5central hi5central

