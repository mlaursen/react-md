/**
 * Creates an "amazing" regular expression that matches the letters in order and
 * escapes any letters that could be part of a regex. This should normally be
 * used in fuzzy filters or determining fuzzy matches.
 *
 * @param query - The query string to convert into a "fuzzy" regular expression
 * @returns The "fuzzy" regular expression that can be used to determine
 * matches.
 */
export function getFuzzyRegExp(query: string): RegExp {
  return new RegExp(
    `${query}`
      .split("")
      .join("\\w*")
      .replace(/(\(|\||\)|\\(?!w\*)|\[|\|-|\.|\^|\+|\$|\?|^(?!w)\*)/g, "\\$1")
      // Couldn't get the matching of two '*' working, so replace them here..
      .replace(/\*\*/g, "*\\*"),
    "i"
  );
}
