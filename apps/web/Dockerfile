FROM node:24-alpine
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY packages ./packages
COPY apps/web ./apps/web

RUN pnpm install
RUN pnpm --filter @hi5central/web build

EXPOSE 4321

CMD ["node", "apps/web/dist/server/entry.mjs"]
