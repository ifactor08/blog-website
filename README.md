# blog-website

My personal tech blog — minimal editorial design, fast, free to run.

Built with **Astro** (static, near-zero JS), **Tailwind CSS v4**, Markdown/MDX
content, RSS + sitemap, and deployed on **Cloudflare Pages**.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the production build locally
```

## Writing a post

Add a Markdown/MDX file to `src/content/blog/`. The filename becomes the URL
slug (`my-post.mdx` → `/blog/my-post/`). Frontmatter:

```mdx
---
title: 'My post title'
description: 'One-sentence summary (used for cards, SEO, RSS).'
pubDate: 2026-06-13
updatedDate: 2026-06-20   # optional
tags: ['web', 'performance']
draft: false              # true = hidden from the production build
heroImage: '/images/x.png' # optional, place file in /public
---

Your content here. Markdown + MDX (you can import/use components).
```

- **Drafts** (`draft: true`) and **future-dated** posts are excluded from the
  production build but visible in `npm run dev` so you can preview them.
- Publishing = commit the file and push. Cloudflare rebuilds automatically.

## Personalizing

- **`src/config.ts`** — site title, description, author, nav, social links, and
  the Cloudflare Analytics token. Start here.
- **`astro.config.mjs`** — set `site` to your live URL (drives canonical URLs,
  sitemap, and RSS). Also where Markdown/Shiki code themes are configured.
- **`src/styles/global.css`** — design tokens (`--bg`, `--fg`, `--accent`, fonts,
  type scale) for both light and dark themes. Tweak the palette here.
- **`public/og-default.png`** — social share image (regenerate from
  `scripts/og.svg` if you change branding; see below).
- **`public/robots.txt`** — update the `Sitemap:` URL to your domain.
- **`src/pages/about.astro`** — your bio.

### Regenerating the OG image

```bash
node -e "require('sharp')('scripts/og.svg').png().toFile('public/og-default.png')"
```

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. Note the assigned `*.pages.dev` URL, then set it as `site` in
   `astro.config.mjs` and update `public/robots.txt`; commit & push.
5. **Analytics:** Cloudflare dashboard → **Web Analytics** → add your site, copy
   the token into `cloudflareAnalyticsToken` in `src/config.ts`. The beacon only
   loads in production builds.
6. **Custom domain (later):** Pages project → **Custom domains** → add domain →
   update `site` + `robots.txt` → push.

Every push to the default branch triggers a rebuild & deploy; pull requests get
preview URLs.

## Project structure

```
src/
├── config.ts            # site-wide settings (edit me)
├── content.config.ts    # blog collection schema
├── content/blog/        # your posts (.md / .mdx)
├── utils/posts.ts       # published-posts + tag helpers
├── layouts/             # BaseLayout, PostLayout
├── components/          # Header, Footer, ThemeToggle, SEO, PostCard
├── pages/               # routes (home, blog, tags, about, rss.xml)
└── styles/global.css    # design tokens + prose styles
public/                  # static assets (favicon, og image, robots.txt)
scripts/og.svg           # source for the OG share image
```
