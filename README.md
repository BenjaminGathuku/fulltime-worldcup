# FULL TIME — World Cup Blog (Astro)

World Cup publishing site. Static, fast, SEO-ready, with a browser-based
publishing dashboard at `/admin/` for uploading articles without touching code.

## What's inside

- **Astro 5** static site, FULL TIME design (pitch green / trophy gold)
- **Article system**: markdown files in `src/content/articles/` → each becomes
  its own SEO page at `/articles/<filename>/` with canonical URL, OpenGraph
  tags, Article JSON-LD and FAQ JSON-LD schema
- **12 category pages** (`/category/world-cup-2026/` etc.), auto-populated
- **Homepage**: ticker, countdown to the final, filterable article grid with
  search, terrace quiz, FAQ
- **RSS** (`/rss.xml`) and **sitemap** (`/sitemap-index.xml`), auto-generated
- **Decap CMS** at `/admin/` — the article upload dashboard

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static site to dist/
```

## Before deploying — two edits

1. `astro.config.mjs` → set `site:` to your real domain.
2. `public/admin/config.yml` → set `repo:` to your GitHub repo and `site_url:`
   to your domain.

## Deploy (Cloudflare Pages — free)

1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.
3. Framework preset: **Astro**. Build command `npm run build`, output `dist`.
4. Add your custom domain. Done — every push to `main` auto-deploys.

(Netlify works identically and makes the admin login simpler — see below.)

## Publishing articles — three ways

### A) The dashboard (no code) — `/admin/`

Open `https://yourdomain.com/admin/`, log in, click **New Article**, fill the
form (title, meta description, category, body, FAQ, internal links), hit
**Publish**. Decap commits the markdown file to GitHub; the site rebuilds and
the article is live in ~1 minute.

The form fields match the master prompt's output format exactly, so the
workflow is: run the master prompt → paste each output section into its field
→ Publish.

**Admin login setup (one-time):**

- **On Netlify (easiest):** enable Identity + Git Gateway in the Netlify
  dashboard, then in `public/admin/config.yml` replace the backend block with:
  ```yaml
  backend:
    name: git-gateway
    branch: main
  ```
  Invite yourself as a user. Done.
- **On Cloudflare Pages:** the `github` backend needs a tiny OAuth bridge.
  Deploy a ready-made one (search GitHub for "decap-proxy" or
  "netlify-cms-cloudflare-oauth" Cloudflare Worker templates), create a GitHub
  OAuth App pointing at it, and add `base_url:` to the backend block in
  `config.yml`. ~15 minutes, one-time.

### B) Drop a markdown file (developer mode)

Create `src/content/articles/my-article-slug.md`:

```markdown
---
title: "Article Title (H1)"
description: "Meta description, max 165 chars."
category: "World Cup History"
pubDate: 2026-06-12
readMins: 5
excerpt: "One punchy line for the article card."
related:
  - text: "Anchor text for internal link"
    slug: "other-article-filename"
faq:
  - q: "Question?"
    a: "Answer in 40–60 words."
---

Article body in markdown. Use ## for H2, ### for H3, > for quotes.
```

Commit, push — live in a minute. The filename is the URL slug.

### C) Straight from Claude

Paste the master prompt output into a message and ask Claude to format it as
the frontmatter file above. Then publish via A or B.

## Wiring up later (TODOs left in code)

- Newsletter button (`src/layouts/Base.astro`): connect to EmailJS or Firebase.
- Comments: add Giscus (free, GitHub-based) to the article page.
- Fan poll: needs a backend — a Firestore counter is the natural fit.

## Editorial rule

Every article goes through the master prompt's fact-check step. Anything
flagged `[VERIFY: ...]` gets confirmed before Publish. No exceptions — trust
is the product.
