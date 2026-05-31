#!/bin/bash

BACKUP_DIR="/root/backups/configs"
DATE=$(date +%Y-%m-%d_%H-%M-%S)

mkdir -p "$BACKUP_DIR"

tar czf \
"$BACKUP_DIR/hi5central-configs_${DATE}.tar.gz" \
/root/apps/hi5central

find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "Config backup completed"
