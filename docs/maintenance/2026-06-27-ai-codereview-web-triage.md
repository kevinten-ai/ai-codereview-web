# AI CodeReview Portal Triage - 2026-06-27

## Repository

- GitHub: `kevinten-ai/ai-codereview-web`
- Public URL: `https://codereview.rxcloud.group`
- Domain needing follow-up: `live-codereview.rxcloud.group`

## Actions Taken

- Added `.env.example` with non-secret Next/API placeholders.
- Added `DEPLOYMENT.md` with Vercel/domain checklist.
- Added `test` and `type-check` scripts.
- Added `.eslintrc.json` so `next lint` runs non-interactively.
- Updated stale `CLAUDE.md` to reflect the actual Next.js stack.
- Replaced high-entropy mock API token strings with explicit `example-*` placeholders so demo data cannot be mistaken for credentials.

## Validation

- `npm run test`: passed
- `npm run lint`: passed
- `npm run build`: passed

## Follow-Up

- Investigate `live-codereview.rxcloud.group`, which is still marked CHECK in the domain probe.
- Decide when mock data should be replaced by production API calls.
