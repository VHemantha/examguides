import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import attrs from 'markdown-it-attrs';

/**
 * Configured markdown-it instance with:
 * - Anchored headings (for TOC generation)
 * - Attribute injection {.class #id}
 * - Custom container blocks (:::flashcards, :::callout, :::accordion)
 * - Tables, code highlighting stubs
 */
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(anchor, {
    permalink: anchor.permalink.headerLink({ safariReaderFix: true }),
    level: [2, 3, 4],
    slugify: (s) =>
      s
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim(),
  })
  .use(attrs, {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class', 'data-.*'],
  });

// ─── Custom fence block handlers ─────────────────────────────────────────────

const fenceRenderers = {
  /**
   * :::flashcards
   * - front: "Question text"
   *   back: "Answer text"
   * :::
   */
  flashcards(content, id) {
    const cards = parseYamlList(content);
    if (!cards.length) return '';

    const deckId = id || `deck-${Math.random().toString(36).slice(2, 7)}`;
    const cardItems = cards
      .map(
        (card, i) => `
      <div class="flashcard" role="button" tabindex="0"
           aria-label="Flashcard ${i + 1}: click or press Space to flip"
           data-index="${i}">
        <div class="flashcard__face flashcard__front">
          <span class="flashcard__label">Question</span>
          <p>${escHtml(card.front || '')}</p>
        </div>
        <div class="flashcard__face flashcard__back">
          <span class="flashcard__label">Answer</span>
          <p>${escHtml(card.back || '')}</p>
        </div>
      </div>`
      )
      .join('');

    return `
<div class="flashcard-deck" id="${deckId}" data-total="${cards.length}">
  <div class="flashcard-controls" role="group" aria-label="Flashcard controls">
    <button class="btn btn--sm" data-action="prev" aria-label="Previous card" disabled>&#8592; Prev</button>
    <span class="flashcard-counter" aria-live="polite" aria-atomic="true">Card <span data-current>1</span> of ${cards.length}</span>
    <button class="btn btn--sm" data-action="next" aria-label="Next card">Next &#8594;</button>
    <button class="btn btn--sm btn--outline" data-action="shuffle" aria-label="Shuffle cards">&#9674; Shuffle</button>
    <button class="btn btn--sm btn--outline" data-action="reset" aria-label="Reset to first card">&#8635; Reset</button>
  </div>
  <div class="flashcard-viewport" aria-live="polite">
    ${cardItems}
  </div>
  <div class="flashcard-progress">
    <div class="flashcard-progress__bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${cards.length}"></div>
  </div>
</div>`;
  },

  /**
   * :::callout type="tip|warning|info|important"
   * Content here
   * :::
   */
  callout(content, type = 'info') {
    const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️', important: '📌', success: '✅' };
    const icon = icons[type] || icons.info;
    const rendered = md.render(content.trim());
    return `<div class="callout callout--${type}" role="note" aria-label="${type} callout">
  <span class="callout__icon" aria-hidden="true">${icon}</span>
  <div class="callout__content">${rendered}</div>
</div>`;
  },

  /**
   * :::accordion
   * ## Question one?
   * Answer content here
   * ## Question two?
   * More answer content
   * :::
   */
  accordion(content) {
    const sections = content.trim().split(/^##\s+/m).filter(Boolean);
    const items = sections
      .map((section, i) => {
        const [heading, ...body] = section.split('\n');
        const bodyHtml = md.render(body.join('\n').trim());
        const uid = `acc-${i}-${Math.random().toString(36).slice(2, 6)}`;
        return `
  <div class="accordion__item">
    <button class="accordion__trigger" id="${uid}-btn"
            aria-expanded="false" aria-controls="${uid}-panel">
      ${escHtml(heading.trim())}
      <span class="accordion__icon" aria-hidden="true">&#43;</span>
    </button>
    <div class="accordion__panel" id="${uid}-panel" role="region" aria-labelledby="${uid}-btn" hidden>
      <div class="accordion__body">${bodyHtml}</div>
    </div>
  </div>`;
      })
      .join('');

    return `<div class="accordion" data-accordion>${items}\n</div>`;
  },

  /**
   * :::tabs
   * ## Tab One Title
   * Tab one content
   * ## Tab Two Title
   * Tab two content
   * :::
   */
  tabs(content) {
    const sections = content.trim().split(/^##\s+/m).filter(Boolean);
    const uid = `tabs-${Math.random().toString(36).slice(2, 6)}`;
    const tabButtons = sections
      .map((section, i) => {
        const [heading] = section.split('\n');
        return `<button role="tab" class="tabs__tab${i === 0 ? ' is-active' : ''}"
          id="${uid}-tab-${i}" aria-selected="${i === 0}"
          aria-controls="${uid}-panel-${i}"
          tabindex="${i === 0 ? '0' : '-1'}">${escHtml(heading.trim())}</button>`;
      })
      .join('');

    const tabPanels = sections
      .map((section, i) => {
        const [, ...body] = section.split('\n');
        const bodyHtml = md.render(body.join('\n').trim());
        return `<div role="tabpanel" class="tabs__panel${i === 0 ? ' is-active' : ''}"
          id="${uid}-panel-${i}" aria-labelledby="${uid}-tab-${i}"
          ${i === 0 ? '' : 'hidden'}>${bodyHtml}</div>`;
      })
      .join('');

    return `<div class="tabs" data-tabs>
  <div class="tabs__list" role="tablist">${tabButtons}</div>
  <div class="tabs__panels">${tabPanels}</div>
</div>`;
  },
};

// Override the fence renderer to intercept custom blocks
const defaultFenceRenderer = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const info = token.info ? token.info.trim() : '';
  const content = token.content;

  // Check for custom block types
  if (info.startsWith('flashcards')) {
    const idMatch = info.match(/id="([^"]+)"/);
    return fenceRenderers.flashcards(content, idMatch ? idMatch[1] : null);
  }
  if (info.startsWith('callout')) {
    const typeMatch = info.match(/type="([^"]+)"/);
    return fenceRenderers.callout(content, typeMatch ? typeMatch[1] : 'info');
  }
  if (info === 'accordion') {
    return fenceRenderers.accordion(content);
  }
  if (info === 'tabs') {
    return fenceRenderers.tabs(content);
  }

  return defaultFenceRenderer(tokens, idx, options, env, self);
};

/**
 * Renders Markdown to HTML.
 * @param {string} markdownContent
 * @returns {string} HTML string
 */
export function renderMarkdown(markdownContent) {
  return md.render(markdownContent);
}

/**
 * Extracts h2/h3 headings from rendered HTML for TOC generation.
 * Returns array of { level, text, id } objects.
 * @param {string} html
 * @returns {Array<{level: number, text: string, id: string}>}
 */
export function extractHeadings(html) {
  const headings = [];
  const re = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[23]>/g;
  let match;
  while ((match = re.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // Strip inner HTML tags from heading text
    const text = match[3].replace(/<[^>]+>/g, '');
    headings.push({ level, text, id });
  }
  return headings;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Parses a simple YAML-like list from flashcard content.
 * Expected format:
 *   - front: "Question"
 *     back: "Answer"
 */
function parseYamlList(content) {
  const items = [];
  // Split by lines starting with "- front:"
  const blocks = content.split(/^- front:/m).filter(Boolean);
  for (const block of blocks) {
    const frontMatch = block.match(/^"([^"]+)"|^'([^']+)'|^(.+?)$/m);
    const backMatch = block.match(/^\s+back:\s+"([^"]+)"|^\s+back:\s+'([^']+)'|^\s+back:\s+(.+?)$/m);
    if (frontMatch && backMatch) {
      const front = (frontMatch[1] || frontMatch[2] || frontMatch[3] || '').trim();
      const back = (backMatch[1] || backMatch[2] || backMatch[3] || '').trim();
      if (front && back) items.push({ front, back });
    }
  }
  return items;
}
