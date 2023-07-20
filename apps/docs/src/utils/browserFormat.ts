import prettier from "prettier/standalone";
import typescriptPlugin from "prettier/plugins/typescript";
import postcssPlugin from "prettier/plugins/postcss";
import htmlPlugin from "prettier/plugins/html";
import estreePlugin from "prettier/plugins/estree";

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
    plugins: [estreePlugin, typescriptPlugin, postcssPlugin, htmlPlugin],
  });
};
