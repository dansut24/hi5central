#!/bin/bash

BACKUP_DIR="/root/backups/redis"
DATE=$(date +%Y-%m-%d_%H-%M-%S)

mkdir -p "$BACKUP_DIR"

docker exec hi5central-redis-1 redis-cli SAVE

docker cp \
hi5central-redis-1:/data/dump.rdb \
"$BACKUP_DIR/dump_${DATE}.rdb"

find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "Redis backup completed"
