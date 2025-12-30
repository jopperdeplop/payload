# Agentic Onboarding: Payload CMS

> **Goal**: A Payload CMS instance integrated with Saleor (and potentially other apps).

## 1. Project Identity

- **Stack**:
  - **CMS**: Payload 3.0 (Beta/Release Candidate)
  - **Framework**: Next.js (App Router)
  - **Database**: Postgres (Neon) via `@payloadcms/db-postgres`.
  - **Storage**: Vercel Blob (for media).
- **Deployment**: Vercel.

## 2. Critical Rules

- **Config**: Main config is in `saleor-payload/src/payload.config.ts`.
- **Database**: Uses `postgresAdapter`.
- **Environment**: Requires `DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`.
- **Documentation Maintenance**: If you add new major tech, change the build process, or discover a repeated "gotcha", YOU MUST update this file (`AGENTS.md`) to reflect the new state. Keep it living.

## 2. Automated Guardrails

- **Linting**: Standard `next/core-web-vitals` rules are enforced.
- **Restrictions**: Imports are scanned to prevent legacy libraries.

## 6. Ecosystem Links

- **Consumer**: `c:/Users/jopbr/Documents/GitHub/storefront/AGENTS.md` (The Next.js storefront that fetches this content).

## 3. Map of the Territory

- `saleor-payload/src/collections`: Content definitions (Users, Media, ProductVariants).
- `saleor-payload/src/app`: Next.js app entry point.

## 4. Golden Paths

### Development

```bash
# Go to the payload directory usually
cd saleor-payload
pnpm dev
```

### Database

- Payload handles migrations automatically in dev mode usually, or explicit migration commands.
