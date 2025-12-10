# --- deps: install using lockfile (cacheable) ---
FROM node:20-alpine AS deps
RUN apk add --no-cache curl bash ca-certificates openssl
WORKDIR /app

# Install Bun (installer writes to /root/.bun by default)
RUN curl -fsSL https://bun.sh/install | bash \
  && mv /root/.bun/bin/bun /usr/local/bin/bun \
  && bun --version

# copy lockfile first so install layer is cached
COPY package.json bun.lock ./

# Use bun to install (frozen lockfile)
RUN bun install --frozen-lockfile

# --- builder: build app & generate prisma client ---
FROM node:20-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_TELEMETRY_DISABLED=1
ARG DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy
ARG STRIPE_SECRET_KEY=sk_test_dummy_for_build
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_dummy_for_build
ARG STRIPE_WEBHOOK_SECRET=whsec_dummy_for_build

ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}
ENV DATABASE_URL=${DATABASE_URL}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# --- runner: minimal runtime with built artifacts ---
FROM node:20-alpine AS runner
RUN apk add --no-cache curl
WORKDIR /app

# create non-root user *before* copying files so chown -R nextjs below works
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nextjs

# Copy the minimal standalone output produced by Next.js
# The standalone folder contains server.js and a package.json for the runtime
COPY --from=builder /app/.next/standalone/ ./
# static + public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy prisma artifacts and the node_modules that runtime needs.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# ensure proper ownership for non-root user
RUN chown -R nextjs:nodejs /app

USER nextjs

# runtime env
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD curl -fsS "http://localhost:${PORT}/" || exit 1

# Start the standalone server produced by Next
# The standalone output contains server.js at the container root when copied above
CMD ["node", "server.js"]