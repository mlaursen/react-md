import prettier from "prettier/standalone";
import parserTypescript from "prettier/parser-typescript";
import parserPostcss from "prettier/parser-postcss";

/**
 * This is a version of the prettier formatter that can work in the browser.
 */
export const format: typeof prettier.format = (source, options) => {
  return prettier.format(source, {
    parser: "typescript",
    trailingComma: "es5",
    ...options,
    plugins: [parserTypescript, parserPostcss],
  });
};
