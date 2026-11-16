# How to publish this portfolio (manually)

The ready-to-publish website is already built in the **`dist`** folder.
You do **not** need any coding tools for Option A or B. Just upload the files.

Your live address with Option A will be: **https://mustansarm285-create.github.io**

---

## Option A: GitHub Pages (free, recommended)

### 1. Create the repository
1. Sign in to https://github.com as **mustansarm285-create**.
2. Open https://github.com/new
3. **Repository name:** `mustansarm285-create.github.io`  (exactly this, it gives you the short address)
4. Choose **Public**.
5. Leave "Add a README", ".gitignore" and "license" **unticked**.
6. Click **Create repository**.

### 2. Upload the website files
1. On the new, empty repository page, click the link **"uploading an existing file"**.
2. On your computer, open the `dist` folder inside this project folder.
3. Select **everything inside `dist`** (Ctrl + A): `assets` folder, `index.html`, `404.html`,
   `favicon.svg`, `og-image.png`, `portrait.png`, `robots.txt`.
   Upload the *contents* of `dist`, not the `dist` folder itself.
4. Drag them into the GitHub upload box and wait until every file shows a tick.
5. Scroll down and click **Commit changes**.

### 3. Turn on GitHub Pages
1. In the repository, go to **Settings → Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. **Branch:** `main`, folder **`/ (root)`**, then click **Save**.
4. Wait 1–3 minutes, refresh the page, and GitHub shows
   "Your site is live at **https://mustansarm285-create.github.io**".

### Updating the site later
1. Make your changes (see "Editing content" below).
2. Rebuild: open a terminal in this folder and run `npm install` (first time only), then `npm run build`.
3. In the repository click **Add file → Upload files**, drag in the new contents of `dist`
   (GitHub replaces files with the same name) and **Commit changes**.

---

## Option B: Netlify Drop (fastest, about 1 minute)

1. Open https://app.netlify.com/drop and sign up / sign in (free, you can use GitHub).
2. Drag the whole **`dist`** folder onto the page.
3. Netlify gives you a live link like `random-name-123.netlify.app`.
4. Go to **Site configuration → Change site name** and pick e.g. `mustansar-munir`
   so the address becomes `https://mustansar-munir.netlify.app`.

Note: the link-preview tags in `index.html` point to the GitHub Pages address. If you choose
Netlify, replace `https://mustansarm285-create.github.io` in `index.html` with your Netlify
address and rebuild, so LinkedIn/WhatsApp previews show your photo.

---

## Option C: Keep your source code on GitHub as well (optional)

The `dist` folder is only the finished website. To also store the editable source code:
1. Create another repository, e.g. `portfolio` (Public or Private).
2. Upload everything in this project folder **except** `node_modules` and `dist`
   (include `src`, `public`, `.github`, `index.html`, `package.json`, `package-lock.json`,
   `tsconfig.json`, `vite.config.ts`, `README.md`).

This folder is also already a Git repository with one commit. If you install
GitHub Desktop (https://desktop.github.com), choose **File → Add local repository**,
pick this folder, then **Publish repository**.

---

## Running it on your computer
1. Install Node.js LTS from https://nodejs.org (once).
2. Open a terminal in this folder and run:
   - `npm install` (first time only, restores the `node_modules` folder)
   - `npm run dev` then open http://localhost:5173

## Editing content
- Text, projects, experience, skills, contact details: `src/data.ts`
- Photo: `public/portrait.png`
- Page title, description and link previews: `index.html`
