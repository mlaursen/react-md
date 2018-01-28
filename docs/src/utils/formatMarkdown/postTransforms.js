import { get } from 'lodash/object';
import { upperFirst } from 'lodash/string';
import Prism from 'utils/Prism';

/**
 * Makes the accessible icon for the quick links.
 *
 * @param {String} text - The inner text of the header tag.
 * @return {String} an html string for the icon.
 */
export function makeIcon(text) {
  // remove any wrapping links in the text and escape any double quotes
  text = text.replace(/<a href=".*">(.+)<\/a>/g, '$1')
    .replace(/"/g, '\\"');
  return `<i class="md-icon material-icons" title="Quick link to ${text}">link</i>`;
}

/**
 * Makes a quick link for the provided header id and header text.
 *
 * @param {String} id - The id for the header
 * @param {String} text - The text in the header tag.
 * @return {String} an html string for the link related to the id and text provided.
 */
export function makeLink(id, text) {
  const icon = makeIcon(text);
  return `<a href="#${id}" class="quick-link__link quick-link__link--markdown">${icon}</a>`;
}

/**
 * Inserts the accessible quick link before any header tag and updates the header tag
 * to be a quick link container.
 *
 * @param {String} fullMatch - The full match of the quick link regex.
 * @param {String} openingTag - This will be everything in the match
 *    up to the first '>'. So something like: '<h1 id="h1"'
 * @param {String} headerId - The header id that was extracted from the openingTag.
 * @param {String} remainingHtml - This will be the remaining html after the first '>'
 * @param {String} headerText - All the text that is inbetween the opening and closing of the
 *    header tags.
 * @return {String} the string updated with quick link html
 */
function headerQuickLinkReplacer(fullMatch, openingTag, headerId, remainingHtml, headerText) {
  const link = makeLink(headerId, headerText);
  return `${openingTag} class="quick-link quick-link__container">${link}${remainingHtml}`;
}

/**
 * Updates the markdown-parsed html so that any header tags have a quick link icon button
 * injected before each one.
 *
 * @param {String} markdown - The markdown-parsed html string.
 * @return {String} the updated markdown-parsed html string;
 */
export function addHeaderQuickLinks(markdown) {
  return markdown.replace(/(<h[1-6] id="([a-z0-9-]+)")>((.+)<\/h[1-6]>)/g, headerQuickLinkReplacer);
}

/**
 * Updates the markdown-parsed html string so that all links that are not part of localhost
 * or react-md.mlaursen with 'rel="noopener noreferrer"'
 *
 * @param {String} markdown - The markdown-parsed html string.
 * @return {String} the updated markdown-parsed html string;
 */
export function addExternalLinkRel(markdown) {
  return markdown.replace(/(<a href="https?:\/\/(?!localhost|react-md\.mlaursen).+")>/, '$1 rel="noopener noreferrer">');
}

/**
 * This will update the markdown so that links now have a class of "link" for some
 * base styles.
 * @param {String} markdown - the transformed markdown
 * @return {String} the markdown updated with link styles.
 */
export function addLinkStyles(markdown) {
  return markdown.replace(/<a (href="[^"]+")>/g, '<a $1 class="link">');
}

/**
 * Gets the code within a <code></code> block. It also unescapes any html
 * that was escaped by marked.
 *
 * @param {String} match - the current match.
 * @param {String} lang - the current language.
 * @return {String} the code within the <code></code> block.
 */
function getCode(match, lang) {
  return match.substring(`<pre><code class="${lang}">`.length, match.indexOf('</code>'))
    .replace(/&#39;/g, '\'')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
}

/**
 * Get's a "prettified" name for the provided language.
 *
 * @param {String} lang - the language
 * @return {String} the "prettified" language string.
 */
function getLanguage(lang) {
  switch (lang) {
    case 'html':
      return 'HTML';
    case 'scss':
      return 'Sass (Scss)';
    default:
      return upperFirst(lang);
  }
}

/**
 * Updates the markdown-parsed html with colorized code blocks. The resulting html should include
 * line numbers for multiline code blocks, highlighted code bits, and a toolbar with the current
 * language.
 */
export function highlightCode(markdown) {
  return markdown.replace(/<pre><code class="(lang-\w+)">(.+\r?\n)((?!<).*\r?\n)*<\/code><\/pre>/g, (match, lang) => {
    const code = getCode(match, lang);
    const language = lang.replace('lang-', '');
    const lines = get(code.match(/\r?\n/g), 'length', 0);
    const highlighted = lang.match(/text/) ? code : Prism.highlight(code, Prism.languages[language]);
    let lineNumbers = '<span aria-hidden="true" class="line-numbers-rows">';
    for (let i = 0; lines > 1 && i < lines; i += 1) {
      lineNumbers += '<span></span>';
    }
    lineNumbers += '</span>';

    const codeTag = `<code class="language-${language}">${highlighted}${lineNumbers}</code>`;
    const toolbar = `<div class="toolbar"><div class="toolbar-item"><span>${getLanguage(language)}</span></div>`;
    return `<pre class="line-numbers code-toolbar language-${language}">${codeTag}${toolbar}</pre>`;
  });
}

export function addInlineColors(markdown) {
  return markdown.replace(/#color-([0-9A-z]{6})(?=\s|\))/g, (match, color) => (
    `<span class="color-markdown"><span style="background:#${color}" class="color-markdown__preview"></span>#${color}</span>`
  ));
}

/**
 * Updates the markdown so that any @see links in the prop types have the bottom margin removed.
 */
export function removeMarginFromSeeParagraphs(markdown) {
  return markdown.replace(/<p>@see/g, '<p style="margin-bottom:0">@see');
}

/**
 * Replaces emoji lists into correctly formatted html lists with emojis.
 */
export function addEmojiItems(markdown) {
  return markdown.replace(/\r?\n<li>✨\s?/g, '<li class="emoji-item emoji-item--sparkles">')
    .replace(/\r?\n<li>🎉\s?/g, '<li class="emoji-item emoji-item--tada">')
    .replace(/\r?\n<li>🐛\s?/g, '<li class="emoji-item emoji-item--bug">');
}

export default [
  addLinkStyles,
  addHeaderQuickLinks,
  addExternalLinkRel,
  highlightCode,
  addInlineColors,
  addEmojiItems,
  removeMarginFromSeeParagraphs,
];
