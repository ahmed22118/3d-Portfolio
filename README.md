# Muhammad Ahmed — Portfolio

A futuristic, dark-themed portfolio built with React, Vite, Tailwind CSS, Framer Motion, and Three.js. Features a cursor-tracking 3D AI robot, glassmorphism UI, animated loading sequence, interactive keycap-style skills grid, and an expanding-panel project showcase.

## Tech Stack

- **React 18 + Vite** — fast dev/build tooling
- **Tailwind CSS** — design tokens (colors, shadows, animations) in `tailwind.config.js`
- **Framer Motion** — scroll reveals, page transitions, magnetic buttons
- **Three.js** — the Hero section's procedurally-built AI robot (cursor head-tracking, blinking, idle float)
- **lucide-react** — icon set

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── resume.pdf          ← replace with your real resume
├── src/
│   ├── components/         ← one file per section/UI piece
│   ├── data/                ← profile.js, projects.js, skills.js (edit your content here)
│   ├── hooks/useTypewriter.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html               ← SEO meta tags, OG tags, JSON-LD
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Editing Content

All real content lives in `src/data/`:

- `profile.js` — name, tagline roles, summary, contact links, achievements, experience, education
- `projects.js` — all 8 featured projects (title, description, tech, links)
- `skills.js` — skill groups shown in the keycap grid

Drop your real resume PDF into `public/resume.pdf` (it's currently an empty placeholder file) and update `profile.github` / `profile.linkedin` / `profile.email` if needed.

The contact form currently opens the visitor's email client via a `mailto:` link (no backend). To wire it to a real backend or form service (e.g. Formspree, Resend), edit `src/components/Contact.jsx`.

## Build & Deploy

```bash
npm run build       # outputs to /dist
npm run preview     # preview the production build locally
```

### Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — `vercel.json` is already included for SPA routing.

Or via CLI:

```bash
npm i -g vercel
vercel
```

## Performance Notes

- The Three.js robot scene is lazy-loaded (code-split) so it doesn't block initial paint.
- Animations respect `prefers-reduced-motion`.
- Particle background and robot scene both clean up their listeners/contexts on unmount.

## Customization Ideas

- Swap the procedural Three.js robot for a GLTF model export from Blender for more detail.
- Add real screenshots/GIFs to `projects.js` and render them inside the expanded project panel.
- Wire the contact form to a serverless function or form service for real email delivery.
