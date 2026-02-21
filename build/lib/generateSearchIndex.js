/**
 * Generates a search index JSON from all page records.
 * The index is fetched client-side by search.js on first input focus.
 *
 * Each entry: { title, url, excerpt, niche, tags, difficulty }
 *
 * @param {Array<object>} pages - Array of page metadata objects
 * @returns {string} JSON string of search index array
 */
export function generateSearchIndex(pages) {
  const index = pages
    .filter((p) => !p.draft)
    .map((p) => ({
      title: p.title || '',
      url: p.urlPath || '/',
      excerpt: p.description || '',
      niche: p.niche || '',
      tags: p.tags || [],
      difficulty: p.difficulty || null,
    }));

  return JSON.stringify(index);
}
