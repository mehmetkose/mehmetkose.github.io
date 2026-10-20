# mehmetkose.github.io

Personal site and blog, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Commands

| Command           | What it does                                |
| ----------------- | ------------------------------------------- |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start the dev server at `localhost:4321`    |
| `npm run build`   | Build the site to `./dist/`                 |
| `npm run preview` | Preview the built site locally              |
| `npm run check`   | Type-check the project                      |

## Writing a post

Add a Markdown file to `src/content/blog/`. The file name becomes the URL:
`src/content/blog/my-post.md` → `/blog/my-post/`.

```md
---
title: 'My post'
description: 'One sentence that shows up in search results.'
pubDate: 2026-10-20
# pubDate: 2026-10-20T14:30:00Z   # add a time when two posts share a day, so the newer one lists first
# updatedDate: 2026-11-01
# draft: true   # visible in dev, left out of the built site
---

Post body in Markdown.
```

## SEO built in

- **Structured data (JSON-LD)** for Google rich results, in `src/lib/schema.ts`:
  WebSite + Person on every page, ProfilePage on the home page, Blog on `/blog/`,
  BlogPosting + breadcrumbs on each post.
- **Social preview images** generated at build time (`src/lib/og.ts`,
  `src/pages/og/`): one per page at `/og/...png`, 1200×630. New posts get one automatically.
- Canonical URLs, Open Graph / X cards, sitemap, RSS, `robots.txt`, and a `noindex` 404 page.
- Author details and social profiles live in `AUTHOR` in `src/consts.ts`.

After deploying, paste a post URL into Google's
[Rich Results Test](https://search.google.com/test/rich-results) to confirm it's eligible.

## Deploying

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and
publishes it. One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

## How this fits with other GitHub Pages sites

- This repo is the *user site*, so it's served at `https://mehmetkose.github.io/`.
- Project repos such as `react-websocket` are served at `/<repo-name>/` and deploy on
  their own. Don't add a page at a path that matches a project repo's name.
- `public/robots.txt` is the only robots.txt Google reads for the whole domain,
  including project sites. It lists the sitemaps for this site and react-websocket.

## Google Search Console

1. Add a **URL prefix** property for `https://mehmetkose.github.io/` (a Domain property
   isn't possible because `github.io` DNS isn't yours).
2. Choose the **HTML tag** method and paste the `content` value into
   `GOOGLE_SITE_VERIFICATION` in `src/consts.ts`.
3. Push, wait for the deploy to finish, then click **Verify**.
4. Submit `sitemap-index.xml` and `react-websocket/sitemap.xml` under **Sitemaps**.

This one property also covers everything under `/react-websocket/`.
