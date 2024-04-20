// eslint-disable-next-line no-control-regex
const ASCI_REGEX = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * @see https://github.com/lodash/lodash/blob/c7c70a7da5172111b99bb45e45532ed034d7b5b9/src/words.ts
 */
export const words = (s: string): readonly string[] =>
  s.match(ASCI_REGEX) || [];

export const upperFirst = (s: string): string =>
  s.slice(0, 1).toUpperCase() + s.slice(1);

/**
 * @see https://github.com/lodash/lodash/blob/c7c70a7da5172111b99bb45e45532ed034d7b5b9/src/camelCase.ts
 *
 * @param s - The string to covnert to camel case
 * @param separator - An optional separator for each "word" in the string
 */
export const camelCase = (s: string, separator = ""): string =>
  words(s).reduce((result, word, i) => {
    word = word.toLowerCase();
    return result + (i ? separator : "") + (i ? upperFirst(word) : word);
  }, "");

/**
 * @param s - The string to convert
 * @param separator - an optional separator for each "word" in the string
 */
export const pascalCase = (s: string, separator?: string): string =>
  upperFirst(camelCase(s, separator));
