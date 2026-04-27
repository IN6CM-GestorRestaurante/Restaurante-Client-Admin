FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

ARG VITE_AUTH_URL
ARG VITE_ADMIN_URL
ENV VITE_AUTH_URL=$VITE_AUTH_URL
ENV VITE_ADMIN_URL=$VITE_ADMIN_URL

COPY . .
RUN pnpm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]