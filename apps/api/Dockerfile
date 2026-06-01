FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY packages ./packages
COPY apps/api ./apps/api

RUN pnpm install
RUN pnpm --filter @hi5central/api build

EXPOSE 3001

CMD ["pnpm", "--filter", "@hi5central/api", "start"]
