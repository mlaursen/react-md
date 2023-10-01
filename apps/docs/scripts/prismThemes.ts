import { globSync } from "glob";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { GENERATED_FILE_BANNER } from "./constants.js";
import { format } from "../src/utils/format.js";
import { pascalCase } from "../src/utils/strings.js";

const prismThemesFolder = resolve(process.cwd(), "src", "prism-themes");
const themesPath = resolve(prismThemesFolder, "themes.ts");
const loadThemePath = resolve(prismThemesFolder, "LoadPrismTheme.tsx");

const files = globSync("node_modules/prism@(js|-themes)/themes/*.css", {
  ignore: "**/*.min.css",
}).sort();

const defaultThemes = ["default"];
const additionalThemes: string[] = [];
const themeComponentLookup = new Map<string, string>();
const unknownTheme = new Set<string>();

const LIGHT_BG_THEMES = new Set([
  "default",
  "coy",
  "funky",
  "solarizedlight",
  "base16-ateliersulphurpool.light",
  "coldark-cold",
  "coy-without-shadows",
  "duotone-light",
  "ghcolors",
  "gruvbox-light",
  "material-light",
  "one-light",
  "vs",
]);
const DARK_BG_THEMES = new Set([
  "dark",
  "okaidia",
  "tomorrow",
  "twilight",
  "a11y-dark",
  "atom-dark",
  "cb",
  "coldark-dark",
  "darcula",
  "dracula",
  "duotone-dark",
  "duotone-earth",
  "duotone-forest",
  "duotone-sea",
  "duotone-space",
  "gruvbox-dark",
  "holi-theme",
  "hopscotch",
  "lucario",
  "material-dark",
  "material-oceanic",
  "night-owl",
  "nord",
  "one-dark",
  "pojoaque",
  "shades-of-purple",
  "solarized-dark-atom",
  "synthwave84",
  "vsc-dark-plus",
  "xonokai",
  "z-touch",
  // my custom theme
  "vim-solarized-dark",
]);

if (process.argv.includes("--clean") && existsSync(prismThemesFolder)) {
  await rm(prismThemesFolder, { recursive: true });
}
if (!existsSync(prismThemesFolder)) {
  await mkdir(prismThemesFolder);
}

await Promise.all(
  files.map(async (filePath) => {
    const themeName = filePath.replace(/^.*prism(-([A-z0-9.-]+))?\.css$/, "$2");
    if (filePath.includes("prismjs")) {
      if (themeName) {
        defaultThemes.push(themeName);
      }
    } else {
      additionalThemes.push(themeName);
    }

    const name = themeName || "default";
    const title = pascalCase(name);
    themeComponentLookup.set(name, title);
    if (!LIGHT_BG_THEMES.has(name) && !DARK_BG_THEMES.has(name)) {
      unknownTheme.add(name);
    }

    const originalCss = await readFile(filePath, "utf8");
    const css = await format(
      `${GENERATED_FILE_BANNER}

@layer code {
  .container :global {
    ${originalCss}
  }
}`,
      "scss"
    );
    const component = await format(
      `${GENERATED_FILE_BANNER}

import { useHtmlClassName } from "@react-md/core";
import styles from "./${title}.module.scss"

export default function ${title}(): null {
  useHtmlClassName(styles.container);

  return null;
}
`,
      "typescript"
    );

    await Promise.all([
      writeFile(join(prismThemesFolder, `${title}.module.scss`), css),
      writeFile(join(prismThemesFolder, `${title}.tsx`), component),
    ]);
  })
);

const allThemes = ["vim-solarized-dark", ...defaultThemes, ...additionalThemes];

const themesContent = await format(
  `${GENERATED_FILE_BANNER}

export const PRISM_THEMES = ${JSON.stringify(allThemes)} as const;
export const LIGHT_BG_THEMES = new Set(${JSON.stringify([...LIGHT_BG_THEMES])});

export type PrismTheme = typeof PRISM_THEMES[number];
`,
  "typescript"
);

const loadThemeContent = await format(
  `${GENERATED_FILE_BANNER}

import { usePrismThemeContext } from "@/providers/PrismThemeProvider.jsx";
import dynamic  from "next/dynamic.js";
import { type ReactElement } from "react";

${Array.from(themeComponentLookup.values())
  .map(
    (component) =>
      `const ${component} = dynamic(() => import("./${component}.jsx"));`
  )
  .join("\n")}
const VimSolarizedDark = dynamic(() => import("./VimSolarizedDark.jsx"));

export function LoadPrismTheme(): ReactElement {
  const { prismTheme } = usePrismThemeContext();

  return (
    <>
${Array.from(themeComponentLookup.entries())
  .map(([name, component]) => `{prismTheme === "${name}" && <${component} />}`)
  .join("\n")}
{prismTheme === "vim-solarized-dark" && <VimSolarizedDark />}
    </>
  )
}
`,
  "typescript"
);

await Promise.all([
  writeFile(themesPath, themesContent),
  writeFile(loadThemePath, loadThemeContent),
]);

if (unknownTheme.size) {
  console.error(
    `Unknown themes: ${[...unknownTheme].map((name) => `- ${name}`).join("\n")}`
  );
  process.exit(1);
}
