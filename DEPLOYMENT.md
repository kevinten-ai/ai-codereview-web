# AI CodeReview Portal Deployment Notes

## Current Status

- Public URL: `https://codereview.rxcloud.group`
- Additional host in inventory: `live-codereview.rxcloud.group`
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

- Confirm `codereview.rxcloud.group` is the canonical production domain.
- Investigate `live-codereview.rxcloud.group`; the latest domain probe reports it as CHECK.
- Keep API tokens and MCP registry credentials in platform secrets.
- Verify dashboard, reviews, tools, reports, settings, and docs routes after deployment.
- Confirm mock data vs production API integration status before enabling real users.
