#!/bin/bash

BACKUP_DIR="/root/backups/postgres"
DATE=$(date +%Y-%m-%d_%H-%M-%S)

mkdir -p "$BACKUP_DIR"

docker compose -f /root/apps/hi5central/docker-compose.vps.yml exec -T postgres \
pg_dump -U hi5central hi5central \
> "$BACKUP_DIR/hi5central_${DATE}.sql"

find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "PostgreSQL backup completed"
