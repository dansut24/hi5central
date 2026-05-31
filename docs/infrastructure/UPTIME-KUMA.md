# Hi5Central Status Monitoring

## Overview

Hi5Central uses Uptime Kuma for:

- Public status page
- Internal service monitoring
- Uptime reporting
- Maintenance notifications
- Incident history

## Architecture

Public Status Page:

https://status.hi5central.com

Admin Interface:

https://status-admin.hi5central.com

Docker Container:

uptime-kuma

Host:

Ubuntu VPS
213.171.194.229

---

## Installation

Container created using:

docker run -d \
  --name uptime-kuma \
  -p 3002:3001 \
  -v uptime-kuma:/app/data \
  --restart unless-stopped \
  louislam/uptime-kuma

---

## Docker Volume

Persistent data stored in:

uptime-kuma

Volume location:

/var/lib/docker/volumes/uptime-kuma/_data

Database:

SQLite

Database file:

/app/data/kuma.db

---

## DNS

A Records:

status.hi5central.com
213.171.194.229

status-admin.hi5central.com
213.171.194.229

---

## Caddy Configuration

status.hi5central.com {

  redir / /status/hi5central 302

  reverse_proxy host.docker.internal:3002

}

status-admin.hi5central.com {

  reverse_proxy host.docker.internal:3002

}

---

## Public Status Page

Slug:

hi5central

Public URL:

https://status.hi5central.com

Purpose:

Customer-facing service status

Features:

- Service availability
- Uptime percentage
- Incident history
- Maintenance notifications
- Response times

---

## Admin Portal

URL:

https://status-admin.hi5central.com

Purpose:

Internal monitoring administration

Functions:

- Create monitors
- Configure notifications
- Publish incidents
- Schedule maintenance
- Edit status page

---

## Monitors

Current monitors:

Hi5Central App

https://app.hi5central.com

Hi5Central API

https://api.hi5central.com/ready

Hi5Central Status

https://status.hi5central.com

Hi5Central Downloads

https://downloads.hi5central.com

---

## User Reset Procedure

Stop container:

docker stop uptime-kuma

Open SQLite:

docker run --rm -it \
-v uptime-kuma:/app/data \
alpine sh

apk add sqlite

sqlite3 /app/data/kuma.db

Delete users:

DELETE FROM user;

.quit

Restart:

docker start uptime-kuma

This triggers first-run setup again.

---

## Logs

View logs:

docker logs uptime-kuma --tail 100

Follow logs:

docker logs -f uptime-kuma

---

## Health Checks

Container:

docker ps | grep uptime

Status:

curl http://localhost:3002

Volume:

docker volume ls

---

## Future Enhancements

- Email alerts
- Teams alerts
- Slack alerts
- Webhook integration
- Status page branding
- Maintenance schedules
- Internal infrastructure monitoring
- Certificate expiry monitoring

