/**
 * ExamGuides Static Site Build System
 *
 * Usage:
 *   node build/build.js              # Development build
 *   NODE_ENV=production node build/build.js  # Production build (minified)
 *   node build/build.js --watch      # Watch mode
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync, rmSync, existsSync, copyFileSync } from 'fs';
import { join, dirname, relative, basename, extname } from 'path';
import { fileURLToPath } from 'url';

import { parseFrontMatter } from './lib/parseFrontMatter.js';
import { renderMarkdown } from './lib/renderMarkdown.js';
import { applyTemplate, interpolate } from './lib/applyTemplate.js';
import { generateSitemap } from './lib/generateSitemap.js';
import { generateSearchIndex } from './lib/generateSearchIndex.js';
import { NICHES, SITE_NAME, SITE_TAGLINE, BASE_URL } from './lib/nicheConfig.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content');
const DIST_DIR = join(ROOT, 'dist');
const SRC_DIR = join(ROOT, 'src');
const STATIC_DIR = join(ROOT, 'static');

const isProd = process.env.NODE_ENV === 'production';
const isWatch = process.argv.includes('--watch');

const log = {
  info: (msg) => console.log(`\x1b[36m[build]\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m[build]\x1b[0m ${msg}`),
  warn: (msg) => console.log(`\x1b[33m[build]\x1b[0m ${msg}`),
  error: (msg) => console.error(`\x1b[31m[build]\x1b[0m ${msg}`),
};

// ─── Main Build Entry Point ───────────────────────────────────────────────────

async function build() {
  const startTime = Date.now();
  log.info(`Starting ${isProd ? 'production' : 'development'} build...`);

  try {
    await phase1_clean();
    await phase2_assets();
    const pages = await phase3_content();
    await phase4_homepage(pages);
    await phase5_searchIndex(pages);
    await phase6_sitemap(pages);

    await phase7_offline();

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    log.success(`Build complete in ${elapsed}s. Output: dist/ (${pages.length} pages)`);
  } catch (err) {
    log.error(`Build failed: ${err.message}`);
    console.error(err);
    if (!isWatch) process.exit(1);
  }
}

// ─── Phase 1: Clean ───────────────────────────────────────────────────────────

async function phase1_clean() {
  log.info('Phase 1: Cleaning dist/...');
  if (existsSync(DIST_DIR)) {
    rmSync(DIST_DIR, { recursive: true, force: true });
  }
  mkdirSync(DIST_DIR, { recursive: true });
  mkdirSync(join(DIST_DIR, 'css'), { recursive: true });
  mkdirSync(join(DIST_DIR, 'js'), { recursive: true });
  mkdirSync(join(DIST_DIR, 'images'), { recursive: true });
}

// ─── Phase 2: Asset Pipeline ──────────────────────────────────────────────────

async function phase2_assets() {
  log.info('Phase 2: Processing assets...');

  // CSS
  const cssPath = join(SRC_DIR, 'css', 'main.css');
  if (existsSync(cssPath)) {
    if (isProd) {
      const { default: CleanCSS } = await import('clean-css');
      const css = readFileSync(cssPath, 'utf-8');
      const result = new CleanCSS({ level: 2 }).minify(css);
      writeFileSync(join(DIST_DIR, 'css', 'main.min.css'), result.styles);
      writeFileSync(join(DIST_DIR, 'css', 'main.css'), css); // also copy original
    } else {
      copyFileSync(cssPath, join(DIST_DIR, 'css', 'main.css'));
    }
    log.info('  CSS processed');
  }

  // JavaScript - concatenate all modules in dependency order
  const jsModules = [
    'dark-mode.js',
    'accordion.js',
    'tabs.js',
    'flashcards.js',
    'calculators.js',
    'search.js',
    'progress.js',
    'bookmarks.js',
    'app.js',
  ];

  const jsDir = join(SRC_DIR, 'js');
  let combinedJs = '';
  for (const mod of jsModules) {
    const modPath = join(jsDir, mod);
    if (existsSync(modPath)) {
      combinedJs += `\n/* === ${mod} === */\n` + readFileSync(modPath, 'utf-8') + '\n';
    }
  }

  if (isProd) {
    const { minify } = await import('terser');
    const result = await minify(combinedJs, {
      compress: { drop_console: false },
      mangle: true,
    });
    writeFileSync(join(DIST_DIR, 'js', 'app.min.js'), result.code);
    writeFileSync(join(DIST_DIR, 'js', 'app.js'), combinedJs);
  } else {
    writeFileSync(join(DIST_DIR, 'js', 'app.js'), combinedJs);
  }
  log.info('  JavaScript processed');

  // Static files (manifest, sw, robots, etc.)
  if (existsSync(STATIC_DIR)) {
    cpSync(STATIC_DIR, DIST_DIR, { recursive: true });
    log.info('  Static files copied');
  }

  // Images
  const imagesDir = join(SRC_DIR, 'images');
  if (existsSync(imagesDir)) {
    cpSync(imagesDir, join(DIST_DIR, 'images'), { recursive: true });
    log.info('  Images copied');
  }
}

// ─── Phase 3: Content Processing ─────────────────────────────────────────────

async function phase3_content() {
  log.info('Phase 3: Processing content pages...');
  const allPages = [];
  const mdFiles = walkDir(CONTENT_DIR, '.md');

  for (const mdFile of mdFiles) {
    // Skip homepage — handled separately in phase4
    const relPath = relative(CONTENT_DIR, mdFile);
    if (relPath === 'index.md') continue;

    try {
      const page = await processContentPage(mdFile);
      if (page && !page.draft) {
        allPages.push(page);
      }
    } catch (err) {
      log.error(`  Failed to process ${mdFile}: ${err.message}`);
    }
  }

  log.info(`  Processed ${allPages.length} content pages`);
  return allPages;
}

async function processContentPage(mdFile) {
  const relPath = relative(CONTENT_DIR, mdFile);
  const fileContent = readFileSync(mdFile, 'utf-8');
  const { data, content } = parseFrontMatter(fileContent, mdFile);

  // Derive URL path from file location
  const parts = relPath.replace(/\\/g, '/').replace(/\.md$/, '').split('/');
  let urlPath;

  if (parts[parts.length - 1] === 'index') {
    urlPath = '/' + parts.slice(0, -1).join('/') + '/';
  } else {
    urlPath = '/' + parts.join('/') + '/';
  }

  // Infer niche from directory
  if (!data.niche) {
    data.niche = parts[0] || '';
  }

  data.urlPath = urlPath;

  // Determine output file path
  const outputPath = join(DIST_DIR, ...urlPath.split('/').filter(Boolean), 'index.html');
  mkdirSync(dirname(outputPath), { recursive: true });

  // Render markdown
  const renderedContent = renderMarkdown(content);

  // Apply template
  const html = applyTemplate(data, renderedContent, { isProd });

  // Minify HTML in production
  const finalHtml = isProd ? await minifyHtml(html) : html;

  writeFileSync(outputPath, finalHtml, 'utf-8');
  log.info(`  Built: ${urlPath}`);

  // Return metadata for sitemap/search index
  return { ...data, renderedContent };
}

// ─── Phase 4: Homepage ────────────────────────────────────────────────────────

async function phase4_homepage(allPages) {
  log.info('Phase 4: Building homepage...');

  const indexMdPath = join(CONTENT_DIR, 'index.md');
  let homepageData = {
    title: `${SITE_NAME} - Free Exam Prep for High-Stakes Certifications`,
    description: 'Free study guides, practice questions, and reference tools for insurance adjuster, medical coding, real estate, HVAC, and privacy certification exams.',
    niche: '',
    layout: 'home',
    urlPath: '/',
    priority: 1.0,
    tools: [],
    tags: [],
    related: [],
  };
  let homepageContent = '';

  if (existsSync(indexMdPath)) {
    const { data, content } = parseFrontMatter(readFileSync(indexMdPath, 'utf-8'), indexMdPath);
    homepageData = { ...homepageData, ...data, urlPath: '/' };
    homepageContent = renderMarkdown(content);
  } else {
    // Generate default homepage
    homepageContent = generateHomepageContent(allPages);
  }

  const html = buildHomepage(homepageData, homepageContent, allPages);
  const finalHtml = isProd ? await minifyHtml(html) : html;
  writeFileSync(join(DIST_DIR, 'index.html'), finalHtml, 'utf-8');
  log.info('  Built: /');

  // Return homepage as a page for sitemap
  return [{ ...homepageData }];
}

function generateHomepageContent(pages) {
  return `<p class="hero__description">Free, comprehensive study resources for high-value certification exams. No registration required.</p>`;
}

function buildHomepage(pageData, mainContent, allPages) {
  // Group pages by niche
  const byNiche = {};
  for (const p of allPages) {
    if (!byNiche[p.niche]) byNiche[p.niche] = [];
    byNiche[p.niche].push(p);
  }

  const nicheCards = Object.values(NICHES)
    .map((niche) => {
      const pages = byNiche[niche.slug] || [];
      const pageLinks = pages
        .filter((p) => p.layout !== 'index')
        .slice(0, 4)
        .map((p) => `<li><a href="${p.urlPath}">${escHtml(p.title || p.urlPath)}</a></li>`)
        .join('');

      return `<article class="niche-card niche-card--${niche.slug}" style="--card-color: ${niche.colorPrimary}">
  <div class="niche-card__header">
    <span class="niche-card__icon" aria-hidden="true">${niche.icon}</span>
    <h2 class="niche-card__title"><a href="/${niche.slug}/">${niche.name}</a></h2>
  </div>
  <p class="niche-card__desc">${niche.description}</p>
  <ul class="niche-card__links">${pageLinks}</ul>
  <a href="/${niche.slug}/" class="btn btn--primary niche-card__cta" style="background:${niche.colorPrimary}">
    Start Studying &#8594;
  </a>
</article>`;
    })
    .join('');

  const featuredContent = `
<section class="hero" aria-labelledby="hero-heading">
  <h1 id="hero-heading" class="hero__title">${SITE_NAME}</h1>
  <p class="hero__tagline">${SITE_TAGLINE}</p>
  ${mainContent}
  <div class="hero__search">
    <label for="global-search" class="sr-only">Search all study guides</label>
    <input type="search" id="global-search" class="search__input search__input--hero"
           placeholder="Search guides, formulas, practice questions..."
           autocomplete="off" role="combobox" aria-expanded="false"
           aria-autocomplete="list" aria-controls="search-results">
    <div id="search-results" class="search__results" role="listbox" aria-label="Search results" hidden></div>
  </div>
</section>

<section class="niches" aria-labelledby="niches-heading">
  <h2 id="niches-heading" class="section-title">Choose Your Exam</h2>
  <div class="niche-grid">${nicheCards}</div>
</section>

<section class="features" aria-labelledby="features-heading">
  <h2 id="features-heading" class="section-title">Why ExamGuides?</h2>
  <div class="features-grid">
    <div class="feature-card">
      <span class="feature-card__icon" aria-hidden="true">📚</span>
      <h3>Comprehensive Guides</h3>
      <p>In-depth study materials covering every exam topic, written by certification experts.</p>
    </div>
    <div class="feature-card">
      <span class="feature-card__icon" aria-hidden="true">🃏</span>
      <h3>Interactive Flashcards</h3>
      <p>Study key terms and concepts with our keyboard-navigable flashcard system.</p>
    </div>
    <div class="feature-card">
      <span class="feature-card__icon" aria-hidden="true">🧮</span>
      <h3>Built-in Calculators</h3>
      <p>Real estate math and HVAC load calculators built directly into study pages.</p>
    </div>
    <div class="feature-card">
      <span class="feature-card__icon" aria-hidden="true">🖨️</span>
      <h3>Print-Ready Cheat Sheets</h3>
      <p>All pages include print-optimized styles. No ads on printed pages.</p>
    </div>
    <div class="feature-card">
      <span class="feature-card__icon" aria-hidden="true">📱</span>
      <h3>Works Offline</h3>
      <p>Install as a PWA and study anywhere, even without an internet connection.</p>
    </div>
    <div class="feature-card">
      <span class="feature-card__icon" aria-hidden="true">🌙</span>
      <h3>Dark Mode</h3>
      <p>Easy on your eyes during late-night study sessions. Preference is saved.</p>
    </div>
  </div>
</section>`;

  const slots = {
    PAGE_TITLE: `${SITE_NAME} - Free Exam Prep for High-Stakes Certifications`,
    META_DESCRIPTION: pageData.description,
    CANONICAL_URL: BASE_URL + '/',
    OG_TITLE: `${SITE_NAME} - Free Exam Prep`,
    OG_DESCRIPTION: pageData.description,
    OG_IMAGE: `${BASE_URL}/images/og-default.png`,
    OG_TYPE: 'website',
    ROBOTS_META: 'index, follow',
    NICHE_SLUG: '',
    NICHE_COLOR_PRIMARY: '#1a4a8a',
    NICHE_COLOR_ACCENT: '#e8a020',
    NICHE_NAME: SITE_NAME,
    SCHEMA_JSON: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: BASE_URL,
      description: pageData.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    }, null, 2),
    NAV_LINKS: Object.values(NICHES).map((n) => `<li class="nav__item"><a href="/${n.slug}/" class="nav__link"><span class="nav__icon" aria-hidden="true">${n.icon}</span><span class="nav__text">${n.name}</span></a></li>`).join(''),
    BREADCRUMB_HTML: '',
    PAGE_CONTENT: featuredContent,
    SIDEBAR_HTML: '',
    ARTICLE_DATE: '',
    AUTHOR_NAME: 'ExamGuides',
    CSS_PATH: isProd ? '/css/main.min.css' : '/css/main.css',
    JS_PATH: isProd ? '/js/app.min.js' : '/js/app.js',
    MANIFEST_PATH: '/manifest.json',
    ADSENSE_CLIENT: process.env.ADSENSE_CLIENT || '',
    AD_BANNER_TOP: '',
    AD_SIDEBAR_HTML: '',
    ADSENSE_LOADER: process.env.ADSENSE_CLIENT
      ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_CLIENT}" crossorigin="anonymous"></script>`
      : '',
    TAGS_HTML: '',
    DIFFICULTY_HTML: '',
    DATA_TOOLS: '',
    SITE_NAME,
    SITE_TAGLINE,
    RELATED_HTML: '',
    EXAM_NAME: '',
    NICHE_DESCRIPTION: '',
    LAST_UPDATED: '',
  };

  // Load base template (readFileSync already imported at top of file)
  const baseTemplate = readFileSync(join(ROOT, 'templates', 'base.html'), 'utf-8');
  return interpolate(baseTemplate, slots);
}

// ─── Phase 5: Search Index ────────────────────────────────────────────────────

async function phase5_searchIndex(pages) {
  log.info('Phase 5: Generating search index...');
  const indexJson = generateSearchIndex(pages);
  writeFileSync(join(DIST_DIR, 'search-index.json'), indexJson, 'utf-8');
  log.info(`  Generated search-index.json (${pages.length} entries)`);
}

// ─── Phase 6: Sitemap ─────────────────────────────────────────────────────────

async function phase6_sitemap(pages) {
  log.info('Phase 6: Generating sitemap.xml...');
  // Include homepage
  const allPages = [
    { urlPath: '/', date: new Date().toISOString().split('T')[0], priority: 1.0, layout: 'home' },
    ...pages,
  ];
  const sitemapXml = generateSitemap(allPages);
  writeFileSync(join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  log.info(`  Generated sitemap.xml (${allPages.length} URLs)`);
}

// ─── Phase 7: Offline Page ────────────────────────────────────────────────────

async function phase7_offline() {
  const offlinePath = join(DIST_DIR, 'offline.html');
  if (!existsSync(offlinePath)) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Offline - ExamGuides</title>
<link rel="stylesheet" href="/css/main${isProd ? '.min' : ''}.css">
</head>
<body>
<main class="offline-page" style="text-align:center;padding:4rem 2rem">
<h1>You're offline</h1>
<p>It looks like you've lost your internet connection. Previously visited pages are still available from cache.</p>
<a href="/" class="btn btn--primary">Go to Homepage</a>
</main>
</body>
</html>`;
    writeFileSync(offlinePath, html, 'utf-8');
  }
}

// ─── HTML Minification ────────────────────────────────────────────────────────

async function minifyHtml(html) {
  try {
    const { minify } = await import('html-minifier-terser');
    return await minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true,
    });
  } catch {
    return html;
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function walkDir(dir, ext) {
  if (!existsSync(dir)) return [];
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkDir(full, ext));
    } else if (extname(full) === ext) {
      results.push(full);
    }
  }
  return results;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ─── Watch Mode ───────────────────────────────────────────────────────────────

if (isWatch) {
  await build();
  log.info('Watching for changes...');
  const { watch } = await import('fs');
  const watchDirs = [CONTENT_DIR, join(SRC_DIR), join(ROOT, 'templates')];

  let debounceTimer;
  for (const dir of watchDirs) {
    if (existsSync(dir)) {
      watch(dir, { recursive: true }, (event, filename) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          log.info(`Changed: ${filename}. Rebuilding...`);
          build().catch((err) => log.error(err.message));
        }, 300);
      });
    }
  }
} else {
  await build();
}
