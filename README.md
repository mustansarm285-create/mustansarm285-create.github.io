# Mustansar Munir — Portfolio

React + TypeScript + Vite, Tailwind CSS v4, React Three Fiber (3D hero), GSAP ScrollTrigger, Framer Motion, Lenis smooth scroll, Lucide icons.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Editing content
All copy lives in `src/data.ts` and is taken from the CV. Add GitHub or live-demo links there once they are public.

## Deployment
Live at https://mustansarm285-create.github.io

Every push to `main` builds the site and publishes it to GitHub Pages via `.github/workflows/deploy.yml`.

## Structure
- `src/three/HeroScene.tsx`: lazy-loaded 3D scene (glass core, orbit rings, particles), pauses when offscreen
- `src/sections/*`: Hero, About, Projects, Expertise, Experience, Contact
- `src/components/*`: Loader, Nav, magnetic buttons, scroll reveals, architecture diagrams
