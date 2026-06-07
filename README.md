# Abhishek Kumar — Portfolio

A single-page developer portfolio built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.
It is configured as a **static export** so it can be hosted on **GitHub Pages** (or any static host).

Sections: animated multilingual preloader → scroll-driven hero intro (zoom-through) → About → Work Experience
(timeline) → Featured Projects (accordion case studies) → Skills → dark contact footer.

---

## ✅ Deployment status / verification

The static export has been verified locally:
- `npm run build` produces a complete `out/` folder (fully static, no server needed).
- When served under a project subpath (`/<repo>/`), **all assets resolve (HTML, JS, CSS, fonts, `portrait.png`, the résumé PDF) return HTTP 200**.
- The full page content is prerendered into `out/index.html`.

It is ready to deploy to GitHub Pages with no further code changes.

---

## 🚀 Deploy to GitHub Pages — step by step (for a human or an LLM/agent)

> A ready-made GitHub Actions workflow already exists at `.github/workflows/deploy.yml`.
> It builds the static export and publishes it on every push to `main`.
> It **auto-detects** the base path: a `username.github.io` repo deploys to the root, any other
> repo name deploys to `https://username.github.io/<repo>/` (it sets `NEXT_PUBLIC_BASE_PATH=/<repo>` automatically).

### Prerequisites
- Node.js 20+
- Git
- [GitHub CLI](https://cli.github.com/) (`gh`) — optional but makes this fully scriptable

### Steps

1. **Authenticate GitHub CLI** (interactive — a human must do this once):
   ```bash
   gh auth login
   # GitHub.com → HTTPS → Login with a web browser
   ```

2. **Create the repo and push** (the local repo is already initialized on branch `main`):
   ```bash
   # Choose ONE repo name. For a clean root URL, name it <your-username>.github.io
   gh repo create <repo-name> --public --source=. --remote=origin --push
   ```
   If a remote already exists, instead run:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. **Enable Pages → GitHub Actions** (one-time):
   ```bash
   gh api -X POST repos/<your-username>/<repo-name>/pages \
     -f build_type=workflow 2>/dev/null || true
   ```
   Or via the UI: **Repo → Settings → Pages → Build and deployment → Source: GitHub Actions**.

4. **Trigger / wait for the deploy.** The workflow runs automatically on push. Watch it:
   ```bash
   gh run watch
   ```
   When it finishes, the site is live at:
   - `https://<your-username>.github.io/<repo-name>/`  (project site), or
   - `https://<your-username>.github.io/`  (if the repo is named `<your-username>.github.io`).

### Re-deploying
Just push to `main`. Every push rebuilds and redeploys automatically.

---

## 🖥️ Local development

```bash
npm install
npm run dev        # http://localhost:3000  (base path is empty in dev)
```

```bash
npm run build      # static export → ./out
# To preview a project-subpath build locally:
NEXT_PUBLIC_BASE_PATH=/<repo> npm run build
npx serve out      # then open the served URL
```

> ⚠️ Do **not** run `npm run build` while `npm run dev` is running — they share the `.next` folder and
> the dev server will start throwing 500s. Stop dev first (`pkill -f "next dev"`), build, then restart dev.

---

## ✏️ Editing content

**All site content lives in one file: [`src/data/content.ts`](src/data/content.ts).**
Edit profile, headline, about paragraph, experience, projects, skills, socials, and footer links there —
no need to touch the components.

- **Profile photo:** put an image in `public/` and set `profile.photo` (currently `public/portrait.png`).
  It is wrapped with `asset()` so it resolves correctly under the GitHub Pages base path.
- **Résumé:** the PDF lives at `public/Abhishek-Kumar-Resume.pdf`; `profile.resumeUrl` points to it (also base-path aware).
- Static asset paths must go through the `asset()` helper in `content.ts` so they work on a subpath.

### Tuning the hero
In `src/components/Hero.tsx`:
- `object-[50%_28%]` — portrait focal point (lower % = show more head, higher = more torso).
- `nameScale` `[1, 9]` — intensity of the zoom-through.
- `darkOpacity`, `contentOpacity` ranges — pacing of the intro→homepage reveal.

---

## 📄 Regenerating the résumé PDF

The résumé is generated from HTML (ATS-friendly, single-column) using headless Chrome:

```bash
# Edit resume/resume.html, then:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="resume/Abhishek-Kumar-Resume.pdf" \
  "file://$(pwd)/resume/resume.html"

# Copy into public so the site's RÉSUMÉ button serves the latest:
cp resume/Abhishek-Kumar-Resume.pdf public/Abhishek-Kumar-Resume.pdf
```

---

## 🧩 Project structure

```
src/
  app/            layout.tsx, page.tsx, globals.css
  components/     Preloader, Nav, Hero, About, Experience, Projects, ProjectDetail,
                  Skills, Contact, SectionHeading, TechIcon, Reveal
  data/content.ts ← ALL editable content
public/           portrait.png, résumé PDF, etc.
resume/           resume.html (source) + generated PDF
.github/workflows/deploy.yml   ← GitHub Pages CI
next.config.mjs   output: 'export' + base-path handling
```

---

## 🛠️ Troubleshooting GitHub Pages

| Symptom | Cause / Fix |
|---|---|
| Blank page, console 404s for `/_next/...` | Base path mismatch. The workflow sets `NEXT_PUBLIC_BASE_PATH=/<repo>` automatically — make sure you deployed via the workflow, not by uploading `out/` manually. |
| Images / résumé 404 | Ensure they're referenced through the `asset()` helper in `content.ts` and live in `public/`. |
| Assets blocked / styles missing | GitHub Pages + Jekyll ignores `_next` folders. The workflow runs `touch out/.nojekyll` to prevent this — keep that step. |
| 404 page on refresh of a subroute | This is a single-page site, so not applicable; `trailingSlash: true` is set for clean static paths. |

---

## Tech stack

Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Static export · GitHub Actions → GitHub Pages
