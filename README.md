# Life – Milestone 1 (routing and layouts)

Next.js 15 App Router. No API and no database yet.

- Projects come from `data/projects.json` (edit it with your own projects, then restart).
- Tasks are added by the user in the app and saved in the browser (`lib/useTasks.ts`, localStorage).

```bash
npm ci        # or npm install
npm run lint
npm run build
npm start     # http://localhost:3000
```

## Routes

| URL | Rendering | Notes |
| --- | --- | --- |
| `/` | redirect | opens the dashboard directly (no login yet) |
| `/dashboard` | static | counts and next tasks (client component) |
| `/tasks` | static | add, complete and delete tasks (client component) |
| `/projects` | on request (ƒ) | reads `searchParams`, slow data on purpose → `loading.tsx`; `?crash=1` triggers `error.tsx` |
| `/projects/[id]` | SSG (●) | `generateStaticParams`, `generateMetadata`, `dynamicParams = false`, `notFound()` |

## Layouts and special files

- `app/layout.tsx`: root layout with the navigation on every page (`components/NavLink.tsx` sets `aria-current`)
- `app/projects/layout.tsx`: nested layout for the projects section only
- `app/not-found.tsx`, `app/projects/loading.tsx`, `app/projects/error.tsx` (with a retry button)
