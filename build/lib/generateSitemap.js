import { BASE_URL } from './nicheConfig.js';

/**
 * Generates sitemap.xml content from an array of page records.
 *
 * @param {Array<{urlPath: string, date: string, priority: number, niche: string}>} pages
 * @returns {string} XML string
 */
export function generateSitemap(pages) {
  const today = new Date().toISOString().split('T')[0];

  const urls = pages
    .filter((p) => !p.draft)
    .map((p) => {
      const loc = `${BASE_URL}${p.urlPath}`;
      const lastmod = p.date || today;
      const priority = p.priority || 0.7;
      const changefreq = p.layout === 'index' ? 'weekly' : 'monthly';

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
