# kelvinmachaka.dev

Portfolio of Kelvin Machaka, AI engineer in Harare, Zimbabwe.

Next.js (App Router), TypeScript, Tailwind CSS 4 and Motion. Deployed on Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

Node 20.9 or newer.

## Edit the content

All text lives in `content/`, not in the pages:

- `content/site.ts`: name, contact details, experience, education, skills and services.
- `content/projects.ts`: case studies. `featured: true` shows a project in Selected work; the others go to Earlier work. Describe only what the code really does.

A link with an empty value (for example `linkedin: ""`) is hidden everywhere.

## Contact form

The form posts to Formspree. Set `NEXT_PUBLIC_FORMSPREE_URL` in Vercel to override the default endpoint in `content/site.ts`.

## CV

`/cv` is the CV as a web page; `public/cv.pdf` is the same page printed to A4. After changing CV content:

```bash
npm run build && npm start
npm run cv:pdf     # needs Playwright: npm i -D playwright && npx playwright install chromium
```

## Deploy

Push to `main`; Vercel builds and deploys. The domain `kelvinmachaka.dev` is set in Vercel → Project → Domains.
