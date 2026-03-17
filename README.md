# Portfolio — Donatas Kušleika

Modern, animated portfolio built with **Vite + React + TypeScript**, designed to showcase scalable structure (hooks/components/data-driven content) and a polished UI.

## Tech

- **Frontend**: React, TypeScript, Vite
- **UI**: Tailwind CSS, Framer Motion, Lucide
- **Architecture**: feature-ish structure with reusable UI primitives, custom hooks, and a single source of truth for content (`src/constants/data.ts`)

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Customise content

Most content is data-driven:

- `src/constants/data.ts`
  - Social links (GitHub, LinkedIn, email)
  - Skills
  - Projects (GitHub + optional Live Demo)
  - Experience entries (company names intentionally omitted)

## Projects: GitHub vs Live Demo links

Each project supports:

- `github`: repo link
- `live`: deployed app link (recommended for clients)

When `live` is present, the UI shows a **Live Demo** action that opens the running website.

## Deploy (share with clients)

The simplest flow is **Vercel** or **Netlify**. Both will give you a public URL.

### Vercel

1. Push this repo to GitHub
2. Import it on Vercel
3. Deploy (Vercel auto-detects Vite)

### Netlify

1. Push this repo to GitHub
2. Import it on Netlify
3. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Repository hygiene

- `.gitignore` excludes `node_modules` and `dist`
- No secrets are stored in the repo

