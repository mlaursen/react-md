import { getMaterialSymbolsUrl } from "@react-md/core/icon/getMaterialSymbolsUrl";
import { type MaterialSymbolName } from "@react-md/core/icon/material";
import { DEFAULT_MATERIAL_SYMBOL_NAMES } from "@react-md/core/icon/symbols";
import { glob, readFile } from "node:fs/promises";
import { join } from "node:path";
import { type HtmlTagDescriptor, type Plugin } from "vite";

import { addMaterialSymbolNames } from "./addMaterialSymbolNames.js";
import { PRECONNECT_LINKS } from "./constants.js";
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
    family,
    fill,
    grade,
    opticalSize,
    weight,
    pattern = "src/**/*.{ts,tsx,js,jsx}",
    defaultSymbolNames = DEFAULT_MATERIAL_SYMBOL_NAMES,
    disablePreconnectLinks,
  } = options;
  const symbolNames = new Set<MaterialSymbolName>(defaultSymbolNames);

  return {
    name: "@react-md/vite-material-symbols-plugin",
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

      const result: HtmlTagDescriptor[] = [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: getMaterialSymbolsUrl({
              names: [...symbolNames],
              family,
              fill,
              grade,
              weight,
              opticalSize,
            }),
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
