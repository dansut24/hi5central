# Hi5Central VPS Deployment

## Server

Provider: IONOS
OS: Ubuntu 26.04 LTS

## DNS

app.hi5central.com
api.hi5central.com

Both point to VPS public IP.

## Installed Components

Docker
Docker Compose
Caddy
PostgreSQL
Redis

## Stack

Internet
→ Caddy
→ Astro Web
→ Hono API
→ PostgreSQL

## Deployment

git pull

docker compose -f docker-compose.vps.yml up -d --build

## Health Checks

API:

https://api.hi5central.com/ready

Devices:

https://api.hi5central.com/devices

Web:

https://app.hi5central.com/dashboard

