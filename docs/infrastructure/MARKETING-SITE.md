# Marketing Site Deployment

## Repository

https://github.com/dansut24/hi5tech-website

## Domain

https://hi5central.com

## Runtime

Next.js

## Docker Service

marketing

## Caddy Route

hi5central.com {
  reverse_proxy marketing:3000
}

## Notes

The marketing site is kept separate from the Hi5Central platform repository.

The platform remains at:

https://app.hi5central.com

The API remains at:

https://api.hi5central.com

## Restart

docker compose -f docker-compose.vps.yml up -d --build marketing
docker compose -f docker-compose.vps.yml up -d --force-recreate caddy
