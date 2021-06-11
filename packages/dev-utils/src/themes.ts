import cssnano from "cssnano";
import { writeFileSync } from "fs";
import { ensureDir, writeFile } from "fs-extra";
import { flatMap } from "lodash";
import log from "loglevel";
import { renderSync } from "sass";
import { join } from "path";
import postcss, { AcceptedPlugin } from "postcss";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssPresetEnv from "postcss-preset-env";

import { packagesRoot, projectRoot, tempStylesDir } from "./constants";
import { clean, copyStylesTemp, list } from "./utils";

const tones = ["light", "dark"] as const;
const toCSSColor = (name: string): string => name.replace("-", "_");
const themesDist = join(projectRoot, "themes");
const scssVariablesPath = join(
  packagesRoot,
  "theme",
  "dist",
  "scssVariables.js"
);
const isContrastCompliantPath = join(
  packagesRoot,
  "utils",
  "lib",
  "colors",
  "isContrastCompliant.js"
);
const CHUNK = 10;

function checkForInvalidCSS(css: string): void {
  const matches = css.match(/.*rmd(-[a-z]+)+\(.*\n/);
  if (!matches) {
    return;
  }

  const matchContext = css.match(/(.*\n){0,3}.*rmd(-[a-z]+)+\(.*\n(.*\n){0,3}/);
  if (!matchContext) {
    log.error(new Error().stack);
    process.exit(1);
  }

  log.error(
    "There is invalid compiled css in this bundle. Please check the scss files"
  );
  log.error("to try to fix these issues.");
  log.error(list(matches.slice(0, matches.length - 1)));
  log.error("");
  log.error(matchContext[0].trim());
  log.error("");
  process.exit(1);
}

interface Theme {
  fileName: string;
  primary: string;
  secondary: string;
  weight: number;
  theme: "light" | "dark";
}

async function compile({
  fileName,
  primary,
  secondary,
  weight,
  theme,
}: Theme): Promise<string> {
  const data = `@import '@react-md/theme/dist/scss/color-palette';

$rmd-theme-primary: $rmd-${primary}-500;
$rmd-theme-secondary: $rmd-${secondary}-a-${weight};
$rmd-theme-light: ${theme === "light"};

@import 'react-md/dist/scss/styles';
`;

  const outFile = join(themesDist, `react-md.${fileName}.min.css`);
  const unmodifiedCSS = renderSync({
    data,
    outFile,
    sourceMap: false,
    includePaths: [tempStylesDir],
  }).css.toString();

  // I **have** to run synchronously since the computer runs out of memory
  // otherwise...
  // eslint-disable-next-line no-await-in-loop
  const { css } = await postcss([
    postcssPresetEnv({
      stage: 3,
      autoprefixer: { flexbox: "no-2009" },
      browsers: ["last 2 versions", "not IE 11"],
    }),
    postcssFlexbugsFixes(),
    cssnano({ preset: "default" }) as AcceptedPlugin,
  ]).process(unmodifiedCSS, { from: outFile });

  checkForInvalidCSS(css);
  writeFileSync(outFile, css);

  return css;
}

function sanityCheck(
  [light1, dark1]: readonly Theme[],
  lightCSS: string,
  darkCSS: string
): void {
  if (light1.theme !== "light") {
    log.error("Expected light theme but got dark theme");
    process.exit(1);
  }
  if (dark1.theme !== "dark") {
    log.error("Expected dark theme but got light theme");
    process.exit(1);
  }
  if (light1.primary !== dark1.primary) {
    log.error("Unmatched primary theme colors");
    process.exit(1);
  }
  if (light1.secondary !== dark1.secondary) {
    log.error("Unmatched secondary theme colors");
    process.exit(1);
  }
  if (light1.weight !== dark1.weight) {
    log.error("Unmatched weights");
    process.exit(1);
  }

  const onPrimary = "var(--rmd-theme-on-primary,#000)";
  if (!lightCSS.includes(onPrimary) || !darkCSS.includes(onPrimary)) {
    log.error("Invalid compilation");
    process.exit(1);
  }
}

interface ReplaceThemeOptions {
  variables: Record<string, string>;
  baseLightTheme: string;
  baseDarkTheme: string;
  primaryRegExp: RegExp;
  onPrimaryRegExp: RegExp;
  secondaryRegExp: RegExp;
  onSecondaryRegExp: RegExp;
  progressRegExp: RegExp;
  switchDisabledRegExp: RegExp;
}

async function replaceTheme(
  { fileName, primary, secondary, weight, theme }: Theme,
  {
    variables,
    baseDarkTheme,
    baseLightTheme,
    primaryRegExp,
    onPrimaryRegExp,
    secondaryRegExp,
    onSecondaryRegExp,
    progressRegExp,
    switchDisabledRegExp,
  }: ReplaceThemeOptions
): Promise<void> {
  const isContrastCompliant = await import(isContrastCompliantPath).then(
    (mod) => mod.isContrastCompliant
  );
  const primaryColor = variables[`rmd-${primary}-500`];
  const onPrimaryColor = isContrastCompliant(primaryColor, "#000")
    ? "#000"
    : "#fff";

  const secondaryColor = variables[`rmd-${secondary}-a-${weight}`];
  const onSecondaryColor = isContrastCompliant(secondaryColor, "#000")
    ? "#000"
    : "#fff";

  const progressColor = variables[`rmd-${primary}-300`];
  const switchDisabledColor = variables[`rmd-${secondary}-200`];

  const original = theme === "light" ? baseLightTheme : baseDarkTheme;
  const contents = original
    .replace(primaryRegExp, primaryColor)
    .replace(onPrimaryRegExp, onPrimaryColor)
    .replace(secondaryRegExp, secondaryColor)
    .replace(onSecondaryRegExp, onSecondaryColor)
    .replace(progressRegExp, progressColor)
    .replace(switchDisabledRegExp, switchDisabledColor);

  if (contents === original) {
    log.error("Unable to replace a theme correctly.");
    log.error(
      JSON.stringify({ fileName, primary, secondary, weight, theme }, null, 2)
    );
    log.error(new Error().stack);
    process.exit(1);
  }

  return writeFile(join(themesDist, `react-md.${fileName}.min.css`), contents);
}

/**
 * This creates all the pre-compiled themes in react-md with the most of the
 * recommended feature toggles enabled. Since there are 2336 themes, only the
 * first light and dark themes are compiled and minified while the remaining
 * themes use a regexp+replace behavior because `cssnano` takes so long to run.
 * Without the regexp+replace behavior (hack), this would take an hour or so to
 * run...
 *
 * Not sure if anyone other than me uses this feature though since I've noticed
 * that before this rewrite (2.4.0), lots of the colors were "wrong" by default.
 */
export async function themes(): Promise<void> {
  await copyStylesTemp();
  await clean(themesDist);
  await ensureDir(themesDist);

  const variables = await import(scssVariablesPath).then(
    (result) => result.default
  );

  const colors = variables["rmd-theme-colors"] as readonly string[];
  const weights = variables["rmd-theme-accent-suffixes"] as readonly number[];
  const secondaries = colors.slice(0, colors.indexOf("brown"));

  const sortedColors = colors.slice().sort();
  const allThemes: Theme[] = flatMap(sortedColors, (primaryColor) =>
    flatMap(secondaries, (secondaryColor) => {
      if (primaryColor === secondaryColor) {
        return [];
      }

      const primary = toCSSColor(primaryColor);
      const secondary = toCSSColor(secondaryColor);

      return flatMap(weights, (weight) =>
        flatMap(tones, (lightOrDark) => ({
          fileName: `${primary}-${secondary}-${weight}-${lightOrDark}`,
          primary: primaryColor,
          secondary: secondaryColor,
          weight,
          theme: lightOrDark,
        }))
      );
    })
  );

  const [firstLight, firstDark, ...remainingThemes] = allThemes;
  const [lightCSS, darkCSS] = await Promise.all([
    compile(firstLight),
    compile(firstDark),
  ]);
  sanityCheck(allThemes, lightCSS, darkCSS);

  const { primary, secondary, weight } = firstLight;
  const primaryColor = variables[`rmd-${primary}-500`];
  const primaryRegExp = new RegExp(primaryColor, "g");
  const onPrimaryRegExp = new RegExp(
    `var(--rmd-theme-on-primary,${primaryColor})`,
    "g"
  );
  const secondaryColor = variables[`rmd-${secondary}-a-${weight}`];
  const secondaryRegExp = new RegExp(secondaryColor, "g");
  const onSecondaryRegExp = new RegExp(
    `var(--rmd-theme-on-secondary,${secondaryColor})`,
    "g"
  );
  const progressRegExp = new RegExp(variables[`rmd-${primary}-300`], "g");
  const switchDisabledRegExp = new RegExp(
    variables[`rmd-${secondary}-200`],
    "g"
  );

  const options: ReplaceThemeOptions = {
    variables,
    baseLightTheme: lightCSS,
    baseDarkTheme: darkCSS,
    primaryRegExp,
    onPrimaryRegExp,
    secondaryRegExp,
    onSecondaryRegExp,
    progressRegExp,
    switchDisabledRegExp,
  };

  for (let i = 0; i <= remainingThemes.length; i += CHUNK) {
    const currentChunk = remainingThemes.slice(i, i + CHUNK).filter(Boolean);
    // have to run in chunks since laptop runs out of memory otherwise since
    // there are 2300+ themes
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(
      currentChunk.map((theme) => replaceTheme(theme, options))
    );
  }
}
