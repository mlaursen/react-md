/* eslint-disable no-console */
import marked from 'marked';
import { GITHUB_URL } from 'constants/application';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

/**
 * This will updated the generated markdown so all links that contain:
 * - #commit-HASH
 * - #pull-NUMBER
 * - #issues-NUMBER
 *
 * to reference a github url.
 *
 * @param {String} markdown - the transformed markdown
 * @return {String} the markdown updated with github links.
 * @deprecated Use addGithubLinking instead
 */
function addSimpleGithubLinking(markdown) {
  return markdown.replace(/#(commit|pull|issues)-(\w+)/g, `${GITHUB_URL}/$1/$2`);
}

/**
 * This will update the markdown so that links now have a class of "link" for some
 * base styles.
 * @param {String} markdown - the transformed markdown
 * @return {String} the markdown updated with link styles.
 */
function addLinkStyles(markdown) {
  return markdown.replace(/<a (href="[^"]+")>/g, '<a $1 class="link">');
}

/**
 * This will update the markdown so that there is an additional empty line between the
 * `@see` declaration in prop types so that it gets formatted better.
 *
 * @param {String} markdown - the transformed markdown
 * @return {String} the markdown updated.
 */
function addAdditionalLineToSee(markdown) {
  return markdown.replace(/(\r?\n)(@see)/g, '$1$1$2');
}

function removeMarginFromSeeParagraphs(markdown) {
  return markdown.replace(/<p>@see/g, '<p style="margin-bottom:0">@see');
}

function addEmojiItems(markdown) {
  return markdown.replace(/\r?\n<li>✨\s?/g, '<li class="emoji-item emoji-item--sparkles">')
    .replace(/\r?\n<li>🎉\s?/g, '<li class="emoji-item emoji-item--tada">')
    .replace(/\r?\n<li>🐛\s?/g, '<li class="emoji-item emoji-item--bug"');
}

function addGithubLinks(markdown) {
  return markdown.replace(/\[(commit|pull|issues)-((\w+)(#issuecomment-\w+)?)]/g, `[#$3](${GITHUB_URL}/$1/$2)`);
}

function addGithubUserLinks(markdown) {
  return markdown.replace(/(\[@(\w+)])/g, '$1(https://github.com/$2)');
}


const preTransforms = [
  addGithubLinks,
  addGithubUserLinks,
  addAdditionalLineToSee,
  marked,
];

const postTransforms = [
  addSimpleGithubLinking,
  addLinkStyles,
  addEmojiItems,
  removeMarginFromSeeParagraphs,
];

function reduce(transforms, markdown) {
  return transforms.reduce((formatted, transform) => transform(formatted), markdown);
}

export default function formatMarkdown(markdown) {
  return reduce(postTransforms, reduce(preTransforms, markdown));
}
