# Hi5Central Self-Hosting Install Guide

## Overview

Hi5Central can be self-hosted using Docker.

The core platform stack includes:

- PostgreSQL
- Redis
- Hi5Central API
- Hi5Central Web App
- Caddy reverse proxy
- HTTPS termination

Optional:

- Uptime Kuma monitoring
- Marketing website
- External SMTP
- External backup storage

## Recommended Server

Minimum:

- 2 vCPU
- 4 GB RAM
- 80 GB storage
- Ubuntu LTS
- Docker
- Docker Compose

Recommended:

- 4 vCPU
- 8 GB RAM
- 160 GB+ storage
- Ubuntu LTS
- Automated backups

## DNS Requirements

Example:

A app.example.com      SERVER_IP
A api.example.com      SERVER_IP
A downloads.example.com SERVER_IP
A status.example.com   SERVER_IP

Optional:

A turn.example.com     SERVER_IP

## Installation Steps

1. Provision VPS

2. Install Docker and Docker Compose

3. Clone repository

git clone https://github.com/dansut24/hi5central.git

4. Enter repository

cd hi5central

5. Create environment file

cp .env.example .env

6. Configure environment variables

Required:

POSTGRES_PASSWORD
DATABASE_URL
SESSION_SECRET
JWT_SECRET
PUBLIC_API_BASE_URL

7. Start services

docker compose -f docker-compose.vps.yml up -d --build

8. Run database migrations

psql migrations must be applied to the PostgreSQL container.

9. Create first administrator account

This will be automated in a future setup wizard.

10. Verify platform

https://app.example.com

https://api.example.com/ready

## Services

postgres

Primary relational database.

redis

Queue/cache layer.

api

Hono API service.

web

Platform web application.

caddy

Reverse proxy and HTTPS termination.

## Monitoring

Uptime Kuma can be deployed separately using Docker.

Public status page:

https://status.example.com

Admin page:

https://status-admin.example.com

## Backups

Run manual backup:

./scripts/backups/run-backups.sh

Backups are stored in:

/root/backups

Recommended production setup:

- Daily local backups
- External offsite backups
- Restore testing
- Backup monitoring

## Updates

Pull latest code:

git pull

Rebuild services:

docker compose -f docker-compose.vps.yml up -d --build

## Notes

Self-hosted deployments should be treated as production infrastructure.

Recommended:

- SSH key authentication
- Disable root password login
- Firewall enabled
- Backups enabled
- Monitoring enabled
- HTTPS enabled
