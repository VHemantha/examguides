import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { NICHES, SITE_NAME, SITE_TAGLINE, BASE_URL, ADSENSE_CLIENT } from './nicheConfig.js';
import { extractHeadings } from './renderMarkdown.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '..', '..', 'templates');

// Cache loaded template strings
const templateCache = new Map();

function loadTemplate(relativePath) {
  if (templateCache.has(relativePath)) return templateCache.get(relativePath);
  const full = join(TEMPLATES_DIR, relativePath);
  const content = readFileSync(full, 'utf-8');
  templateCache.set(relativePath, content);
  return content;
}

/**
 * Applies {{SLOT}} substitution to a template string.
 * Processes all slots in a single pass.
 */
export function interpolate(template, vars) {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
}

/**
 * Builds a complete HTML page from page data + rendered content.
 *
 * @param {object} pageData - Merged front matter + niche config + computed values
 * @param {string} renderedContent - HTML string from renderMarkdown()
 * @param {object} options - { isProd: boolean }
 * @returns {string} Complete HTML page
 */
export function applyTemplate(pageData, renderedContent, options = {}) {
  const { isProd = false } = options;
  const niche = NICHES[pageData.niche] || null;

  // ── Compute canonical URL ──────────────────────────────────────────────────
  const canonicalUrl = pageData.canonicalUrl || `${BASE_URL}${pageData.urlPath || '/'}`;

  // ── Build breadcrumb ───────────────────────────────────────────────────────
  const breadcrumbHtml = buildBreadcrumb(pageData, niche);
  const breadcrumbSchema = buildBreadcrumbSchema(pageData, niche);

  // ── Build Table of Contents from headings ─────────────────────────────────
  const headings = extractHeadings(renderedContent);
  const tocHtml = buildToc(headings);

  // ── Inject mid-content ad ─────────────────────────────────────────────────
  const adMidHtml = buildAdUnit('mid', niche);
  const contentWithAd = injectMidAd(renderedContent, adMidHtml);

  // ── Build navigation ───────────────────────────────────────────────────────
  const navHtml = buildNicheNav(pageData);

  // ── Generate Schema.org JSON-LD ────────────────────────────────────────────
  const schemaJson = generateSchema(pageData, niche, canonicalUrl, breadcrumbSchema);

  // ── CSS and JS paths ──────────────────────────────────────────────────────
  const cssPath = isProd ? '/css/main.min.css' : '/css/main.css';
  const jsPath = isProd ? '/js/app.min.js' : '/js/app.js';

  // ── Title ─────────────────────────────────────────────────────────────────
  const fullTitle = pageData.title
    ? `${pageData.title} | ${niche ? niche.name + ' | ' : ''}${SITE_NAME}`
    : SITE_NAME + ' - ' + SITE_TAGLINE;

  // ── AdSense ───────────────────────────────────────────────────────────────
  const adBannerTop = buildAdUnit('banner', niche);
  const adSidebar = buildAdUnit('sidebar', niche);

  // ── Sidebar ───────────────────────────────────────────────────────────────
  const sidebarHtml = buildSidebar(tocHtml, adSidebar, pageData.related || []);

  // ── Related links ─────────────────────────────────────────────────────────
  const relatedHtml = buildRelatedLinks(pageData.related || []);

  // ── Tags HTML ─────────────────────────────────────────────────────────────
  const tagsHtml = (pageData.tags || [])
    .map((t) => `<span class="tag">${escHtml(String(t))}</span>`)
    .join('');

  // ── Difficulty badge ──────────────────────────────────────────────────────
  const difficultyHtml = pageData.difficulty
    ? `<span class="badge badge--${pageData.difficulty}">${pageData.difficulty}</span>`
    : '';

  // ── Data tools attribute ──────────────────────────────────────────────────
  const dataTools = (pageData.tools || []).length > 0
    ? `data-tools="${pageData.tools.join(',')}"`
    : '';

  // ── AdSense loader ────────────────────────────────────────────────────────
  const adsenseLoader = ADSENSE_CLIENT
    ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>`
    : '<!-- AdSense: add ADSENSE_CLIENT env var before deploying -->';

  // ── Assemble slots ────────────────────────────────────────────────────────
  const slots = {
    PAGE_TITLE: fullTitle,
    META_DESCRIPTION: escAttr(pageData.description || niche?.description || SITE_TAGLINE),
    CANONICAL_URL: canonicalUrl,
    OG_TITLE: escAttr(pageData.title || fullTitle),
    OG_DESCRIPTION: escAttr(pageData.description || niche?.description || SITE_TAGLINE),
    OG_IMAGE: `${BASE_URL}/images/og-${pageData.niche || 'default'}.png`,
    OG_TYPE: pageData.layout === 'index' ? 'website' : 'article',
    ROBOTS_META: pageData.draft ? 'noindex, nofollow' : 'index, follow',
    NICHE_SLUG: pageData.niche || '',
    NICHE_COLOR_PRIMARY: niche?.colorPrimary || '#1a4a8a',
    NICHE_COLOR_ACCENT: niche?.colorAccent || '#e8a020',
    NICHE_NAME: niche?.name || SITE_NAME,
    SCHEMA_JSON: schemaJson,
    NAV_LINKS: navHtml,
    BREADCRUMB_HTML: breadcrumbHtml,
    PAGE_CONTENT: contentWithAd,
    SIDEBAR_HTML: sidebarHtml,
    ARTICLE_DATE: pageData.date || '',
    AUTHOR_NAME: pageData.author || 'ExamGuides Editorial Team',
    CSS_PATH: cssPath,
    JS_PATH: jsPath,
    MANIFEST_PATH: '/manifest.json',
    ADSENSE_CLIENT: ADSENSE_CLIENT,
    AD_BANNER_TOP: adBannerTop,
    AD_SIDEBAR_HTML: adSidebar,
    ADSENSE_LOADER: adsenseLoader,
    TAGS_HTML: tagsHtml,
    DIFFICULTY_HTML: difficultyHtml,
    DATA_TOOLS: dataTools,
    SITE_NAME: SITE_NAME,
    SITE_TAGLINE: SITE_TAGLINE,
    RELATED_HTML: relatedHtml,
    EXAM_NAME: niche?.examName || '',
    NICHE_DESCRIPTION: niche?.description || '',
    LAST_UPDATED: pageData.date ? formatDate(pageData.date) : '',
  };

  // Load and interpolate base template
  const baseTemplate = loadTemplate('base.html');
  return interpolate(baseTemplate, slots);
}

// ─── Schema.org JSON-LD ───────────────────────────────────────────────────────

function generateSchema(pageData, niche, canonicalUrl, breadcrumbSchema) {
  const graph = [];

  if (pageData.layout === 'index' && niche) {
    graph.push({
      '@type': 'Course',
      name: `${niche.name} Exam Prep`,
      description: niche.description,
      provider: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      url: canonicalUrl,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        instructor: { '@type': 'Organization', name: SITE_NAME },
      },
    });
  } else {
    graph.push({
      '@type': 'Article',
      headline: pageData.title || '',
      description: pageData.description || '',
      author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo.png` },
      },
      datePublished: pageData.date || '',
      dateModified: pageData.date || '',
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      url: canonicalUrl,
    });
  }

  if (breadcrumbSchema) graph.push(breadcrumbSchema);

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function buildBreadcrumb(pageData, niche) {
  const items = [
    { name: SITE_NAME, url: BASE_URL + '/' },
  ];

  if (niche) {
    items.push({ name: niche.name, url: `${BASE_URL}/${niche.slug}/` });
  }

  if (pageData.title && pageData.layout !== 'index') {
    items.push({ name: pageData.title, url: BASE_URL + (pageData.urlPath || '/') });
  }

  const listItems = items
    .map((item, i) => {
      const isLast = i === items.length - 1;
      return isLast
        ? `<li class="breadcrumb__item breadcrumb__item--active" aria-current="page"><span>${escHtml(item.name)}</span></li>`
        : `<li class="breadcrumb__item"><a href="${item.url}" class="breadcrumb__link">${escHtml(item.name)}</a></li>`;
    })
    .join('');

  return `<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">${listItems}</ol>
</nav>`;
}

function buildBreadcrumbSchema(pageData, niche) {
  const items = [{ name: SITE_NAME, url: BASE_URL + '/' }];
  if (niche) items.push({ name: niche.name, url: `${BASE_URL}/${niche.slug}/` });
  if (pageData.title && pageData.layout !== 'index') {
    items.push({ name: pageData.title, url: BASE_URL + (pageData.urlPath || '/') });
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Table of Contents ────────────────────────────────────────────────────────

function buildToc(headings) {
  if (headings.length < 2) return '';

  const items = headings
    .map((h) => {
      const indent = h.level === 3 ? ' class="toc__item toc__item--sub"' : ' class="toc__item"';
      return `<li${indent}><a href="#${h.id}" class="toc__link">${escHtml(h.text)}</a></li>`;
    })
    .join('');

  return `<nav class="toc" aria-label="Table of contents">
  <h2 class="toc__title">On this page</h2>
  <ol class="toc__list">${items}</ol>
</nav>`;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function buildSidebar(tocHtml, adSidebarHtml, relatedLinks) {
  const relatedSection = relatedLinks.length > 0
    ? `<section class="sidebar__section">
  <h3 class="sidebar__heading">Related Pages</h3>
  <ul class="sidebar__links">${relatedLinks.map((l) => `<li><a href="${l}">${escHtml(l.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || l)}</a></li>`).join('')}</ul>
</section>`
    : '';

  const bookmarkBtn = `<section class="sidebar__section">
  <button class="btn btn--outline btn--full" id="bookmark-btn" aria-pressed="false">
    <span class="bookmark-icon">&#9733;</span> Bookmark This Page
  </button>
</section>`;

  return `${tocHtml ? `<section class="sidebar__section">${tocHtml}</section>` : ''}
${adSidebarHtml ? `<div class="sidebar__ad">${adSidebarHtml}</div>` : ''}
${relatedSection}
${bookmarkBtn}`;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function buildNicheNav(pageData) {
  return Object.values(NICHES)
    .map((n) => {
      const isActive = n.slug === pageData.niche;
      return `<li class="nav__item${isActive ? ' nav__item--active' : ''}">
      <a href="/${n.slug}/" class="nav__link${isActive ? ' nav__link--active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
        <span class="nav__icon" aria-hidden="true">${n.icon}</span>
        <span class="nav__text">${n.name}</span>
      </a>
    </li>`;
    })
    .join('');
}

// ─── Ad Units ─────────────────────────────────────────────────────────────────

function buildAdUnit(type, niche) {
  if (!ADSENSE_CLIENT) {
    const sizes = {
      banner: 'width:100%;max-width:728px;height:90px',
      sidebar: 'width:300px;height:250px',
      mid: 'width:100%;max-width:728px;height:90px',
    };
    return `<div class="ad-unit ad-unit--${type} ad-placeholder" aria-label="Advertisement" style="${sizes[type] || ''}">
  <span class="ad-placeholder__label">Ad Slot (${type})</span>
</div>`;
  }

  const slot = niche?.adSlots?.[type] || '';
  return `<div class="ad-unit ad-unit--${type}">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="${ADSENSE_CLIENT}"
       data-ad-slot="${slot}"
       data-ad-format="${type === 'sidebar' ? 'rectangle' : 'auto'}"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>`;
}

// ─── Mid-content ad injection ─────────────────────────────────────────────────

function injectMidAd(html, adHtml) {
  if (!adHtml) return html;
  // Insert after the 3rd closing </p> or after 2nd </h2>
  let count = 0;
  const injected = html.replace(/<\/p>/g, (match) => {
    count++;
    if (count === 3) return `</p>\n${adHtml}`;
    return match;
  });
  // If fewer than 3 paragraphs, don't inject
  return count >= 3 ? injected : html;
}

// ─── Related links ────────────────────────────────────────────────────────────

function buildRelatedLinks(relatedLinks) {
  if (!relatedLinks.length) return '';
  const items = relatedLinks
    .map((link) => {
      const label = link.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || link;
      return `<li><a href="${link}">${escHtml(toTitleCase(label))}</a></li>`;
    })
    .join('');
  return `<section class="related-pages" aria-label="Related pages">
  <h2 class="related-pages__title">Related Study Resources</h2>
  <ul class="related-pages__list">${items}</ul>
</section>`;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function toTitleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}
