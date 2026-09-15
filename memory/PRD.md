# Coco AI — PRD / Working Notes

## Original problem statement
Clone public repo `https://github.com/alifnewone7-create/ccccc-run.git` into /app and run it
unchanged. Subsequent requests refine the existing Next.js app ("Coco AI" trading analyzer).
User writes in Banglish (Bengali in Latin script) — respond accordingly.

## Stack
- Frontend: Next.js 16 (App Router) at /app/frontend, production build served by `yarn start`
  via supervisor on port 3000. Every code change requires `yarn build` + `supervisorctl restart frontend`.
- Backend: FastAPI proxy at /app/backend (port 8001), unused for app logic.
- Data/AI: Firebase Auth + Realtime Database (keys hardcoded in repo), Groq AI SDK.
- Install deps with `yarn install --ignore-engines` (Node 20 vs @ai-sdk/groq requiring 22).

## Implemented (June 2026 session)
- Cloned repo, built and ran the app.
- Removed "Operator profile" text from dashboard profile.
- Admin route renamed `/secret-portal-sx` → `/coco-private-island`; credentials
  (username/password/secret key) all set to `iamhear` in `lib/server/admin-auth.ts`.
- Dashboard "Access tier" section: removed tier list (Free/Basic/Standard/Premium) and the
  big per-day number; only Current plan + "Resets daily" remain. Plan card is now a flat
  full-width strip above the Daily quota card on desktop; quota tools in 4 columns.
- Profile card: uses uploaded Coco AI logo (`/public/coco-profile.png`), tighter mobile gap
  with a small glowing divider under the avatar, Operator ID + Member since cards removed,
  email masked by default with show/hide (eye) + copy buttons.
- Admin panel "API key" tab: add/pause/delete multiple Groq API keys, stored in Firebase RTDB
  at `usage/__config/groqKeys` (that branch is already writable by the internal admin identity,
  so no Firebase rule publish is needed; `config` path rule also added to
  firebase-database-rules.json for reference). `/api/analyze` loads active keys from DB at
  request time and fails over key-by-key on 429/auth errors; built-in keys used as fallback
  when the DB list is empty.

## Key files
- `components/dashboard/dash-profile.tsx`, `components/dashboard/dash-tier.tsx`
- `components/admin/admin-dashboard.tsx` (GroqKeysPanel at end of file)
- `app/api/admin/groq-keys/route.ts`, `lib/server/groq-keys.ts`
- `lib/server/admin-auth.ts`, `lib/server/firebase-admin.ts`, `app/api/analyze/route.ts`

## Backlog
- P1: Usage history chart for users; upgrade nudge when quota nearly used.
- P2: Admin activity log; per-key usage stats in the API key panel.
