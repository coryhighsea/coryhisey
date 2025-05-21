# Use a base image that includes Node.js and can easily install Bun
# node:20-slim is a good choice, as Bun is compatible with Node.js projects
FROM oven/bun:latest as builder # Using an official Bun image as the builder

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb/bun.lock to leverage Docker cache
COPY package.json bun.lockb ./

# Install dependencies with Bun
RUN bun install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the Next.js application
# Ensure NEXT_TELEMETRY_DISABLED is set to avoid telemetry prompts during build
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# --- Production stage ---
FROM oven/bun:latest as runner

WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules # Buns node_modules is compatible
COPY --from=builder /app/package.json ./package.json

# Set environment variables for Next.js production
ENV NODE_ENV production
ENV PORT 3000 # Next.js default port

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application with Bun
CMD ["bun", "run", "start"]