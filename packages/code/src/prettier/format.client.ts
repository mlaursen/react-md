import { type Options } from "prettier";
import estreePlugin from "prettier/plugins/estree.js";
import htmlPlugin from "prettier/plugins/html.js";
import postcssPlugin from "prettier/plugins/postcss.js";
import typescriptPlugin from "prettier/plugins/typescript.js";
import yamlPlugin from "prettier/plugins/yaml.js";
import prettier from "prettier/standalone.js";

export async function formatCode(
  source: string,
  options?: Options
): Promise<string> {
  return await prettier.format(source, {
    ...options,
    plugins: [
      yamlPlugin,
      estreePlugin,
      typescriptPlugin,
      htmlPlugin,
      postcssPlugin,
      ...(options?.plugins ?? []),
    ],
  });
}
