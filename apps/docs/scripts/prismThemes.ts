import { alphaNumericSort } from "@react-md/core";
import { glob, globSync } from "glob";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import postcss from "postcss";
import postcssCombineDuplicatedSelectors from "postcss-combine-duplicated-selectors";
import postcssRemovePrefixes from "postcss-remove-prefixes";
import postcssSorting from "postcss-sorting";
import { format } from "../src/utils/format.js";
import { pascalCase } from "../src/utils/strings.js";
import { GENERATED_FILE_BANNER } from "./constants.js";
import { getScriptFlags } from "./utils/getScriptFlags.js";

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

const INLINE_CODE_SELECTOR = ':not(pre) > code[class*="language-"]';
const PREFIX_OR_EXTENSION_REGEXP =
  /-moz|\.(highlight|diff-highlight|line-highlight|code-toolbar|command-line|rainbow-braces|prism-previewer|line-numbers)/;

const { isClean, isCleanOnly } = getScriptFlags();
if (isClean) {
  const files = await glob(`${prismThemesFolder}/**/*`, {
    ignore: ["**/VimSolarizedDark*"],
  });
  await Promise.all(files.map((file) => rm(file)));

  if (isCleanOnly) {
    process.exit(0);
  }
}
if (!existsSync(prismThemesFolder)) {
  await mkdir(prismThemesFolder);
}

async function transformCss(css: string): Promise<string> {
  const result = await postcss(
    // remove prefixes to make it easier to handle replacements
    postcssRemovePrefixes(),
    // sort everything alphabetically to make it easier for me to find
    // properties
    postcssSorting({
      "properties-order": "alphabetical",
    }),

    postcssCombineDuplicatedSelectors()
  )
    .process(css)
    .async();

  return result.css;
}

async function getThemeCss(filePath: string): Promise<string> {
  const themeCss = await readFile(filePath, "utf8");
  return await transformCss(themeCss);
}

function isCssRuleSkipped(selector: string): boolean {
  return [
    // code block
    'pre > code[class*="language-"]',
  ].includes(selector);
}

function isCssRuleRemoved(selector: string): boolean {
  return (
    // remove browser prefixes that weren't caught by postcssRemovePrefixes
    // and remove any selectors that were added for extensions that I don't use
    PREFIX_OR_EXTENSION_REGEXP.test(selector) ||
    selector === INLINE_CODE_SELECTOR
  );
}

function isCodeBlockStyles(selector: string): boolean {
  return 'pre[class*="language-"]' === selector;
}

function isLicenseCommentBlock(comment: string): boolean {
  return /License|@author|Author:|by [A-Z]|theme for prism\.js/.test(comment);
}

function isNoLicenseTheme(theme: string): boolean {
  return [
    "material-dark",
    "material-light",
    "material-oceanic",
    "vsc-dark-plus",
  ].includes(theme);
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

    const themeCss = await getThemeCss(filePath);
    const themeCssAst = postcss.parse(themeCss);
    const properties = new Map<string, string>();

    let license = "";
    themeCssAst.walkComments((comment) => {
      const commentString = comment.toString();
      if (isLicenseCommentBlock(commentString)) {
        if (license) {
          throw new Error(`Already found an author for ${name}`);
        }

        license = commentString;
      }

      comment.remove();
    });
    if (!license && !isNoLicenseTheme(name)) {
      throw new Error(`Missing license for ${name}`);
    }

    themeCssAst.walkAtRules((atRule) => {
      if (atRule.toString().includes("@media print")) {
        atRule.remove();
      }
    });
    themeCssAst.walkRules((rule) => {
      const { selector } = rule;
      if (isCssRuleSkipped(selector)) {
        return;
      }

      if (isCssRuleRemoved(selector)) {
        rule.remove();
        return;
      }

      if (selector.includes(INLINE_CODE_SELECTOR)) {
        rule.selector = rule.selector
          .replace(':not(pre) > code[class*="language-"],', "")
          .replace(',\n:not(pre) > code[class*="language-"]', "");
      }

      const isCodeBlock = isCodeBlockStyles(selector);
      const regexp = isCodeBlock
        ? /padding|border-left/
        : /font-size|font-family|line-height|tab-size/;
      rule.walkDecls(regexp, (decl) => {
        const { prop, value } = decl;
        if (properties.has(prop) && properties.get(prop) !== value) {
          console.log(themeName);
          console.log(decl.toString());
          return;
        }

        properties.set(prop, value);
        decl.value = `var(--code-${prop})`;
      });
      if (name === "coy" && isCodeBlock) {
        rule.walkDecls(/margin|margin-bottom/, (decl) => {
          if (decl.prop === "margin-bottom") {
            if (decl.value !== "1em") {
              throw new Error("coy theme has changed margin");
            }

            decl.remove();
          } else {
            decl.value = `${decl.value} 1em`;
            properties.set("margin", decl.value);
          }
        });
      }
    });

    // i could just prepend ({ prop, value }), but it adds too many newlines
    // between each declaration
    const sortedProperties = alphaNumericSort([...properties.entries()], {
      extractor: ([name]) => name,
    })
      .map(([prop, value]) => `--code-${prop}: ${value};`)
      .join("\n");
    themeCssAst.prepend(sortedProperties);

    // run in through postcss again to combine duplicated selectors and other
    // stuffs
    const updatedCss = await transformCss(themeCssAst.toResult().toString());
    const css = await format(
      `${GENERATED_FILE_BANNER}

${license}

@layer code {
  .container :global {
    ${updatedCss}
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

const allThemes = [
  "vim-solarized-dark",
  ...alphaNumericSort([...defaultThemes, ...additionalThemes]),
];

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
