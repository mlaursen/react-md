import { glob, readFile } from "node:fs/promises";
import { join } from "node:path";
import { type HtmlTagDescriptor, type Plugin } from "vite";

import { addMaterialSymbolNames } from "./addMaterialSymbolNames.js";
import { PRECONNECT_LINKS } from "./constants.js";
import { getMaterialSymbolOption } from "./getMaterialSymbolOption.js";
import { type MaterialSymbolPluginOptions } from "./types.js";

/**
 * Uses basic regex matching to find `<MaterialSymbol name="{SYMBOL_NAME}" />`.
 * So this will not work if the symbol name is a variable or multiple lines
 * due to formatting and will include commented code.
 */
export function materialSymbolsPlugin(
  options: MaterialSymbolPluginOptions = {}
): Plugin {
  const {
    family = "outlined",
    pattern = "src/**/*.{ts,tsx,js,jsx}",
    defaultSymbolNames = [],
    disablePreconnectLinks,
  } = options;
  const symbolNames = new Set<string>(defaultSymbolNames);

  const variant = family.charAt(0).toUpperCase() + family.slice(1);
  const fill = getMaterialSymbolOption(options.fill, 0);
  const grade = getMaterialSymbolOption(options.grade, 0);
  const weight = getMaterialSymbolOption(options.weight, 400);
  const opticalSize = getMaterialSymbolOption(options.opticalSize, 48);

  const specs = `:opsz,wght,FILL,GRAD@${opticalSize},${weight},${fill},${grade}`;
  const baseUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+${variant}${specs}`;

  return {
    name: "@react-md/vite-plugin-material-symbols",
    async configResolved(config) {
      const root = config.root ?? process.cwd();

      const globbedFiles = glob(pattern, { cwd: root });
      for await (const file of globbedFiles) {
        try {
          const contents = await readFile(join(root, file), "utf8");
          addMaterialSymbolNames(contents, symbolNames);
        } catch {
          // skip failed files
        }
      }
    },

    transformIndexHtml() {
      if (symbolNames.size === 0) {
        return [];
      }

      const sortedNames = [...symbolNames].toSorted();

      const fontUrl = `${baseUrl}&icon_names=${sortedNames.join(",")}&display=block`;

      const result: HtmlTagDescriptor[] = [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: fontUrl,
          },
          injectTo: "head",
        },
      ];

      if (!disablePreconnectLinks) {
        return [...PRECONNECT_LINKS, ...result];
      }

      return result;
    },
  };
}
