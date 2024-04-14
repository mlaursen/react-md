// eslint-disable-next-line no-control-regex
const ASCI_REGEX = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * https://github.com/lodash/lodash/blob/c7c70a7da5172111b99bb45e45532ed034d7b5b9/src/words.ts
 */
export const words = (s: string): readonly string[] =>
  s.match(ASCI_REGEX) || [];

export const upperFirst = (s: string): string =>
  s.slice(0, 1).toUpperCase() + s.slice(1);

/**
 * https://github.com/lodash/lodash/blob/c7c70a7da5172111b99bb45e45532ed034d7b5b9/src/camelCase.ts
 */
export const camelCase = (s: string): string =>
  words(s).reduce((result, word, i) => {
    word = word.toLowerCase();
    return result + (i ? upperFirst(word) : word);
  }, "");

export const pascalCase = (s: string): string => upperFirst(camelCase(s));
