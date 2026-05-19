# EMBER — Portfolio Creator

Educational stock portfolio builder. Next.js (App Router) + Supabase. The wizard
collects budget, risk, horizon, sectors, preferences, exclusions and existing
holdings, then a deterministic engine produces an illustrative model allocation.

> Educational only. Not financial advice. No execution.

## Stack

- Next.js 16 / React 19, App Router
- Tailwind v4
- Zustand for wizard state
- Framer Motion for transitions
- Supabase (auth + persistence)
- Allocation engine in [src/lib/portfolioEngine.ts](src/lib/portfolioEngine.ts)

## Setup

1. Copy env file and fill in values from your Supabase project:

   ```bash
   cp .env.local.example .env.local
   ```

2. Apply the schema. In the Supabase dashboard, open SQL editor and run
   [supabase/schema.sql](supabase/schema.sql). This creates `profiles` and
   `portfolios` tables with RLS policies.

3. Install + run:

   ```bash
   bun install
   bun dev
   ```

   Open http://localhost:3000.

## Wizard flow

`src/app/flow/page.tsx` → `Flow` → 12 steps in `src/components/flow/steps/`.

- `BuildStep` POSTs the collected inputs to `/api/portfolio/generate`.
- `RevealStep` renders the response from the Zustand store.
- `ExportStep` POSTs to `/api/portfolio/save` (requires a signed-in user).

## API routes

| Route                                | Purpose                                         |
| ------------------------------------ | ----------------------------------------------- |
| `POST /api/portfolio/generate`       | Build a model allocation from wizard inputs.    |
| `POST /api/portfolio/save`           | Persist a generated portfolio for a user.       |
| `POST /api/supabase/signup`          | Admin-create a user via service role.           |
| `POST /api/supabase/profile`         | Upsert a `profiles` row after signup.           |

## Notes

- The FastAPI backend that previously lived under `backend/` has been removed;
  generation is now in the Next.js route above.
- The service-role Supabase key is only read inside route handlers.
