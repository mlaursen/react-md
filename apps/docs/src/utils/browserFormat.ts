import prettier from "prettier/standalone";
import parserTypescript from "prettier/parser-typescript";
import parserPostcss from "prettier/parser-postcss";
import parserHtml from "prettier/parser-html";

export type PrettierFormatOptions = NonNullable<
  Parameters<typeof prettier.format>[1]
>;

/**
 * This is a version of the prettier formatter that can work in the browser.
 */
export const formatInBrowser: typeof prettier.format = (source, options) => {
  return prettier.format(source, {
    parser: "typescript",
    trailingComma: "es5",
    ...options,
    plugins: [parserTypescript, parserPostcss, parserHtml],
  });
};
