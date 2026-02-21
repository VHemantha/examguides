# ExamGuides

Free exam prep for high-stakes professional certification exams. A static web application covering five high-CPC niches:

- 🏠 **Insurance Adjuster** — Licensing exam study guides by state
- ⚕️ **Medical Coding** — CPC/CCS exam prep with ICD-10-CM and CPT guides
- 🏡 **Real Estate** — License exam prep with math calculator
- ❄️ **HVAC** — EPA 608 certification and NATE exam prep
- 🔒 **Privacy / CIPP** — CIPP/US certification exam prep

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/examguides.git
cd examguides

# 2. Install dependencies
npm install

# 3. Build the site (development)
npm run build

# 4. Preview locally
npm run preview
# Open http://localhost:3000
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Content | Markdown with YAML front matter |
| Build | Node.js 22 + custom build pipeline |
| Markdown | markdown-it + markdown-it-anchor + markdown-it-attrs |
| Front matter | gray-matter |
| CSS | Single-file, mobile-first, CSS custom properties |
| JavaScript | Vanilla JS modules (no framework) |
| CSS minification | clean-css (production) |
| JS minification | Terser (production) |
| HTML minification | html-minifier-terser (production) |
| Hosting | Cloudflare Pages / Netlify / GitHub Pages (all free tier) |

---

## Project Structure

```
examguides/
├── build/                  # Build system
│   ├── build.js            # Master orchestrator
│   └── lib/
│       ├── nicheConfig.js  # Per-niche colors, metadata, ad slots
│       ├── parseFrontMatter.js
│       ├── renderMarkdown.js   # markdown-it + custom containers
│       ├── applyTemplate.js    # {{SLOT}} interpolation engine
│       ├── generateSitemap.js
│       └── generateSearchIndex.js
├── templates/
│   └── base.html           # Master HTML template
├── src/
│   ├── css/main.css        # All styles (one file)
│   └── js/                 # Vanilla JS modules
│       ├── app.js, dark-mode.js, flashcards.js
│       ├── calculators.js, search.js, progress.js
│       ├── bookmarks.js, accordion.js, tabs.js
├── content/                # Markdown source files
│   ├── index.md            # Homepage
│   ├── insurance-adjuster/ (3 pages)
│   ├── medical-coding/     (3 pages)
│   ├── real-estate/        (3 pages)
│   ├── hvac/               (3 pages)
│   └── privacy-cipp/       (3 pages)
├── static/                 # Copied verbatim to dist/
│   ├── manifest.json, sw.js, robots.txt
│   ├── ads.txt, _headers
├── netlify.toml
├── .github/workflows/deploy.yml
└── dist/                   # Build output (git-ignored)
```

---

## NPM Scripts

| Command | Description |
|---|---|
| `npm run build` | Development build (unminified) |
| `npm run build:prod` | Production build (minified CSS/JS/HTML) |
| `npm run dev` | Watch mode — rebuilds on file changes |
| `npm run clean` | Delete the `dist/` directory |
| `npm run preview` | Serve `dist/` locally on port 3000 |

---

## Adding New Content

### 1. Create a Markdown file

```
content/insurance-adjuster/california/exam-guide.md
```

### 2. Add front matter

```yaml
---
title: "California Insurance Adjuster Exam: Complete Study Guide"
description: "Pass the California adjuster exam. Coverage types, state laws, practice questions. Updated 2026."
layout: article
niche: insurance-adjuster
date: 2026-02-01
tags: [california adjuster exam, CDI, all-lines adjuster]
difficulty: intermediate
tools: [flashcards]
related:
  - /insurance-adjuster/
priority: 0.8
---
```

### 3. Special content containers

**Flashcards:**
````
```flashcards
- front: "Question here"
  back: "Answer here"
```
````

**Callout boxes** (types: tip, warning, info, important, success):
````
```callout type="tip"
Tip content here.
```
````

**Accordion (FAQ):**
````
```accordion
## Question One?
Answer here.
```
````

**Tabs:**
````
```tabs
## Tab One
Content one.
## Tab Two
Content two.
```
````

### 4. Build and preview

```bash
npm run build && npm run preview
```

---

## Configuration

### Site URL & AdSense

Set environment variables before building:

```bash
# Windows (PowerShell)
$env:SITE_BASE_URL="https://yoursite.com"
$env:ADSENSE_CLIENT="ca-pub-XXXXXXXXXXXXXXXXXX"
npm run build:prod

# macOS/Linux
SITE_BASE_URL="https://yoursite.com" ADSENSE_CLIENT="ca-pub-XXXXXXXXXXXXXXXXXX" npm run build:prod
```

### AdSense Setup

1. Get approved at [adsense.google.com](https://adsense.google.com)
2. Get your Publisher ID (`ca-pub-XXXXXXXXXXXXXXXXXX`)
3. Update `static/ads.txt` with your publisher ID
4. Set `ADSENSE_CLIENT` env var as above
5. Edit ad slot IDs in `build/lib/nicheConfig.js`

### Niche Colors & Metadata

Edit `build/lib/nicheConfig.js` to customize colors, exam names, keywords, and ad slot IDs per niche.

---

## Deployment

### Netlify (Recommended — zero config)

1. Push to GitHub
2. [app.netlify.com](https://app.netlify.com) → New site from Git
3. Build command: `npm run build:prod` | Publish dir: `dist`
4. Add env vars: `ADSENSE_CLIENT`, `SITE_BASE_URL`

### Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com) → Pages → Create project
2. Build command: `npm run build:prod` | Output dir: `dist`
3. Environment: `NODE_VERSION=22`, `SITE_BASE_URL`, `ADSENSE_CLIENT`

### GitHub Pages

The `.github/workflows/deploy.yml` workflow is included. Enable Pages (source: GitHub Actions) and add repository secrets: `ADSENSE_CLIENT` and variable `SITE_BASE_URL`.

---

## SEO Checklist (before launch)

- [ ] Update `static/robots.txt` sitemap URL to your domain
- [ ] Update `static/ads.txt` with your actual publisher ID
- [ ] Set `SITE_BASE_URL` to your actual domain before building
- [ ] Submit `dist/sitemap.xml` to Google Search Console
- [ ] Verify PageSpeed Insights scores (target: 90+ all metrics)
- [ ] All pages have unique titles (≤60 chars) and descriptions (≤160 chars)
- [ ] Test dark mode, flashcards, calculators, and search functionality
- [ ] Verify print styles look clean on `/real-estate/math-calculator/`

---

## Content Calendar Template

| Month | Priority Pages to Add | Estimated RPM |
|---|---|---|
| Month 1 | State-specific insurance adjuster pages (TX, FL, CA, NY) | $8–15 |
| Month 1 | Medical coding by specialty (cardiology, orthopedics) | $12–20 |
| Month 2 | HVAC refrigerant troubleshooting guides | $10–18 |
| Month 2 | Real estate appraisal license by state | $10–16 |
| Month 3 | Privacy law 2026 updates, CPRA enforcement news | $15–25 |
| Ongoing | 10 new practice questions per niche per month | Compound |

---

## Disclaimer

Study aid only. Not affiliated with or endorsed by any official exam body. Exam formats change — verify requirements with the official exam body before your exam.
