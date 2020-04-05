import { Version } from 'react-md';
import { GITHUB_URL, ROOT_PATH } from 'constants/application';

/**
 * This will updated the generated markdown so all links that contain:
 * - [commit-HASH]
 * - [pull-NUMBER]
 * - [issues-NUMBER]
 *
 * to reference a github url.
 *
 * Example:
 * [commit-sha1234] -> [sha1234](https://github.com/mlaursen/react-md/commit/sha1234)
 *
 * @param {String} markdown - the markdown to update
 * @return {String} the markdown updated with github links.
 */
export function addGithubLinks(markdown) {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-console */
    const short = markdown.match(/\[commit-\w{0,6}]/g);
    const long = markdown.match(/\[commit-\w{8,}]/g);
    if (short || long) {
      let joined = short;
      if (long) {
        joined = joined ? joined.concat(long) : long;
      }

      const msg = 'Failed attempting to create a GitHub commit shortcut link. The commit hash must be 7 characters in length.';
      console.error(`${msg} Please fix the following: \`${joined.join(', ')}\``);
    }
  }

  return markdown.replace(/\[(pull|issues)-((\w+)(#issuecomment-\w+)?)]/g, `[#$3](${GITHUB_URL}/$1/$2)`)
    .replace(/\[commit-(\w{7})]/g, `[$1](${GITHUB_URL}/commit/$1)`);
}

/**
 * This will update the markdown so all links that contain:
 * - #commit-HASH
 * - #pull-NUMBER
 * - #issues-NUMBER
 *
 * to reference a github url.
 *
 * @param {String} markdown - the markdown to update.
 * @return {String} the markdown updated with github links.
 */
export function addGithubHashLinks(markdown) {
  return markdown.replace(/#(commit|pull|issues)-(\w+)/g, `${GITHUB_URL}/$1/$2`);
}

/**
 * This will update the generated markdown so that Github users can be quickly
 * referenced.
 *
 * Example:
 * [@mlaursen] -> [@mlaursen](https://github.com/mlaursen)
 *
 * @param {String} markdown - the markdown to update.
 * @return {String} the updated markdown with user links.
 */
export function addGithubUserLinks(markdown) {
  return markdown.replace(/(\[@(\w+(-\w+)*)])/g, '$1(https://github.com/$2)');
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
 * This will update the markdown so that there is an additional empty line between the
 * `@see` declaration in prop types so that it gets formatted better.
 *
 * @param {String} markdown - the transformed markdown
 * @return {String} the markdown updated.
 */
export function addAdditionalLineToSee(markdown) {
  return markdown.replace(/(\r?\n)(@see)/g, '$1$1$2');
}

/**
 * This will update the markdown for any react-md packages on unpkg.com to reference
 * the current version of react-md. This is just to help enforce the "best practice"
 * of specifying a version for production.
 *
 * @param {String} markdown - the transformed markdown
 * @return {String} the markdown updated.
 */
export function addVersionToUMD(markdown) {
  return markdown.replace(/unpkg.com\/react-md\/dist/g, `unpkg.com/react-md@${Version}/dist`);
}

export function fixRootPath(markdown) {
  return markdown.replace(/\(\/([A-z0-9-?=&]+)\)/g, `(${ROOT_PATH}$1)`);
}

/**
 * These are all the transformations that can be done **BEFORE** it is parsed into
 * html. So anything that will update the markdown to better links, or other things.
 */
export default [
  fixRootPath,
  addGithubLinks,
  addGithubHashLinks,
  addGithubUserLinks,
  addAdditionalLineToSee,
  addVersionToUMD,
];
