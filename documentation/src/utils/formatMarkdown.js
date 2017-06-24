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
  return markdown.replace(/<a (href=".*")>/g, '<a $1 class="link">');
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

const transforms = [
  addSimpleGithubLinking,
  addLinkStyles,
  addAdditionalLineToSee,
];

export default function formatMarkdown(markdown) {
  return transforms.reduce((formatted, transform) => transform(formatted), marked(markdown));
}
