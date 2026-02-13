FROM node:24.11.1

# Create app directory
WORKDIR /app

# TODO see if typescript should be installed globally
# or if it should be in the project dependency
RUN npm install -g typescript

COPY package.json pnpm-lock.yaml /app/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store corepack enable pnpm && pnpm install


COPY . /app/

# Set environment variables
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

RUN pnpm run build
EXPOSE 3000

# start command
CMD ["node", ".output/server/index.mjs"]
