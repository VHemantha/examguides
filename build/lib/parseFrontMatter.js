import matter from 'gray-matter';

/**
 * Parse a Markdown file's front matter and content.
 * Returns { data, content } where data is the parsed YAML object
 * and content is the raw Markdown string.
 *
 * @param {string} fileContent - Raw file contents
 * @param {string} filePath - Used for error messages
 * @returns {{ data: object, content: string }}
 */
export function parseFrontMatter(fileContent, filePath = '') {
  try {
    const { data, content } = matter(fileContent);

    // Normalize date to ISO string if it's a Date object
    if (data.date instanceof Date) {
      data.date = data.date.toISOString().split('T')[0];
    }

    // Default values for optional fields
    data.draft = data.draft ?? false;
    data.priority = data.priority ?? 0.7;
    data.tools = data.tools ?? [];
    data.tags = data.tags ?? [];
    data.related = data.related ?? [];
    data.difficulty = data.difficulty ?? null;
    data.author = data.author ?? 'ExamGuides Editorial Team';
    data.layout = data.layout ?? 'article';

    return { data, content };
  } catch (err) {
    throw new Error(`Failed to parse front matter in ${filePath}: ${err.message}`);
  }
}
