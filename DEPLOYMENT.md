# AI CodeReview Portal Deployment Notes

## Current Status

- Canonical production domain: `https://codereview.rxcloud.group`
- Vercel project: `kevintens-projects/ai-codereview-web`
- Verified deployment: `dpl_E7DDRCVonYjY4nuozcmUBv6eY97L`
- Legacy inventory host: `live-codereview.rxcloud.group` (DNS record missing; not a project alias)
- Framework: Next.js 14 App Router
- Hosting signal: Vercel metadata present locally

## Local Validation

```bash
npm install
npm run test
npm run lint
npm run build
```

## Deployment Checklist

- Keep `codereview.rxcloud.group` as the canonical production domain.
- Remove `live-codereview.rxcloud.group` from inventories unless a second public hostname is required. To activate it, first add the DNS record recommended by Vercel and then assign it to this project.
- Keep API tokens and MCP registry credentials in platform secrets.
- Verify dashboard, reviews, tools, reports, settings, and docs routes after deployment.
- Confirm mock data vs production API integration status before enabling real users.

## 2026-07-11 Verification

- Production build, type check, lint, and secret scan passed.
- Dashboard, reviews, tools, reports, settings, and docs returned 200 in a real browser.
- All six routes fit a 390px viewport without document-level horizontal overflow.
- Fresh-load hydration and browser console checks completed with zero errors.
- Favicon and all observed static assets returned 200.
