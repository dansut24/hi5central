# Backup & Recovery

## Backup Locations

PostgreSQL:

/root/backups/postgres

Redis:

/root/backups/redis

Configuration:

/root/backups/configs

## Manual Backup

Run:

./scripts/backups/run-backups.sh

## Scheduled Backup

Backups run daily at 02:00 using cron.

Cron entry:

0 2 * * * /root/apps/hi5central/scripts/backups/run-backups.sh >> /root/backups/backup.log 2>&1

## PostgreSQL Restore

From repository root:

docker compose -f docker-compose.vps.yml exec -T postgres \
psql -U hi5central hi5central < /root/backups/postgres/BACKUP_FILE.sql

## Redis Restore

Stop Redis container:

docker compose -f docker-compose.vps.yml stop redis

Copy dump:

docker cp /root/backups/redis/dump_FILE.rdb hi5central-redis-1:/data/dump.rdb

Start Redis:

docker compose -f docker-compose.vps.yml start redis

## Configuration Restore

Extract config backup:

tar xzf /root/backups/configs/BACKUP_FILE.tar.gz -C /

## Disaster Recovery Process

1. Provision new VPS
2. Install Docker and Git
3. Clone Hi5Central repository
4. Restore configuration backup
5. Start Docker services
6. Restore PostgreSQL
7. Restore Redis if needed
8. Reload Caddy
9. Verify app, API, status page, and agent check-ins

## Verification Commands

Check backup files:

ls -lah /root/backups/postgres
ls -lah /root/backups/redis
ls -lah /root/backups/configs

Check backup log:

tail -100 /root/backups/backup.log
