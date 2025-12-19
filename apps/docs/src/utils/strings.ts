import { type KebabCase } from "./types.js";

// eslint-disable-next-line no-control-regex
const ASCI_REGEX = /[^\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007F]+/g;

/**
 * @see https://github.com/lodash/lodash/blob/c7c70a7da5172111b99bb45e45532ed034d7b5b9/src/words.ts
 */
export const words = (s: string): readonly string[] =>
  s.match(ASCI_REGEX) || [];

export const upperFirst = <S extends string>(s: S): Capitalize<S> =>
  (s.slice(0, 1).toUpperCase() + s.slice(1)) as Capitalize<S>;

/**
 * @see https://github.com/lodash/lodash/blob/c7c70a7da5172111b99bb45e45532ed034d7b5b9/src/camelCase.ts
 *
 * @param s - The string to convert to camel case
 * @param separator - An optional separator for each "word" in the string
 */
export const camelCase = (s: string, separator = ""): string =>
  // eslint-disable-next-line unicorn/no-array-reduce
  words(s).reduce((result, word, i) => {
    const w = word.toLowerCase();
    return result + (i ? separator : "") + (i ? upperFirst(w) : w);
  }, "");

/**
 * @param s - The string to convert
 * @param separator - an optional separator for each "word" in the string
 */
export const pascalCase = (s: string, separator?: string): string =>
  upperFirst(camelCase(s, separator));

/**
 * @param s - The string to convert
 */
export const titleCase = (
  s: string,
  splitter: RegExp | string = /(?=[A-Z])/
): string =>
  s.split(splitter).reduce((result, part, i) => {
    return result + (i ? " " : "") + upperFirst(part);
  }, "");

/**
 * @param s - The string to convert
 */
export const kebabCase = <S extends string>(s: S): KebabCase<S> =>
  s.split(/(?=[A-Z])/).reduce((result, part, i) => {
    return result + (i ? "-" : "") + part.toLowerCase();
  }, "") as KebabCase<S>;
