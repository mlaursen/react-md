import cssnano from "cssnano";
import { ensureDir, writeFileSync } from "fs-extra";
import log from "loglevel";
import { renderSync } from "node-sass";
import { join } from "path";
import postcss, { AcceptedPlugin } from "postcss";
import combineDuplicatedSelectors from "postcss-combine-duplicated-selectors";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssPresetEnv from "postcss-preset-env";
import sorting from "postcss-sorting";

import { dist, packagesRoot, tempStylesDir } from "../constants";
import copyStyles from "./copyStyles";
import list from "./list";
import moveToTempStyles, { cleanTempStyles } from "./moveToTempStyles";
import writeFile from "./writeFile";

const cssDist = join(packagesRoot, "react-md", dist, "css");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let variables: any = {};
let colors: string[] = [];
let weights: number[] = [];
let secondaries: string[] = [];

const tones = ["light", "dark"];

const toCSSColor = (name: string): string => name.replace("-", "_");
const fromCSSColor = (name: string): string => name.replace("_", "-");

function getThemeVariables(theme: string): [string, string, string, string] {
  const [primary, secondary, weight, tone] = theme.split("-");
  return [
    `rmd-${fromCSSColor(primary)}`,
    `rmd-${fromCSSColor(secondary)}`,
    weight,
    tone,
  ];
}

function getThemes(): string[] {
  return colors.flatMap((primary) =>
    secondaries.flatMap((secondary) => {
      if (primary === secondary) {
        return [];
      }

      primary = toCSSColor(primary);
      secondary = toCSSColor(secondary);
      return weights.flatMap((weight) =>
        tones.map((theme) => `${primary}-${secondary}-${weight}-${theme}`)
      );
    })
  );
}

function checkForInvalidCSS(css: string): void {
  const matches = css.match(/.*rmd(-[a-z]+)+\(.*\n/);
  if (!matches) {
    return;
  }

  const matchContext = css.match(/(.*\n){0,3}.*rmd(-[a-z]+)+\(.*\n(.*\n){0,3}/);
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

async function compile(theme: string): Promise<string> {
  const [primary, secondary, weight, tone] = getThemeVariables(theme);
  const data = `@import '@react-md/theme/dist/scss/color-palette';

$rmd-theme-primary: $${primary}-500;
$rmd-theme-secondary: $${secondary}-a-${weight};
$rmd-theme-light: ${tone === "light"};

@import 'react-md/dist/scss/styles';
`;

  const outFile = join(cssDist, `react-md.${theme}.min.css`);
  const unmodifiedCSS = renderSync({
    data,
    outFile,
    sourceMap: false,
    includePaths: [tempStylesDir],
  }).css.toString();

  const { css } = await postcss([
    postcssPresetEnv({ stage: 3, autoprefixer: { flexbox: "no-2009" } }),
    postcssFlexbugsFixes(),
    sorting({
      order: ["custom-properties", "declarations"],
      "properties-order": "alphabetical",
      "unspecified-properties-position": "bottom",
    }),
    combineDuplicatedSelectors,
    cssnano({ preset: "default" }) as AcceptedPlugin,
  ]).process(unmodifiedCSS, { from: outFile });

  checkForInvalidCSS(css);
  await writeFile(outFile, css);
  return css;
}

export default async function createThemes(): Promise<void> {
  await copyStyles();
  await ensureDir(cssDist);
  await moveToTempStyles(true);

  // Due to the prepublish build steps, the scssVariables file might be deleted
  // while the prepublish command is being run which causes the script to crash.
  // Lazy setting the variables is a workaround for this issue, but not super
  // ideal

  // eslint-disable-next-line import/no-dynamic-require
  variables = require(join(packagesRoot, "theme", "dist", "scssVariables"))
    .default;

  colors = variables["rmd-theme-colors"] as string[];
  weights = variables["rmd-theme-accent-suffixes"] as number[];
  secondaries = colors.slice(0, colors.indexOf("brown"));

  const [firstLight, firstDark, ...themes] = getThemes();

  log.debug("Compiling the first light and dark themes.");
  const [lightFile, darkFile] = await Promise.all([
    compile(firstLight),
    compile(firstDark),
  ]);

  const [primary, secondary, weight] = getThemeVariables(firstLight);
  const primaryRegExp = new RegExp(variables[`${primary}-500`], "g");
  const secondaryRegExp = new RegExp(
    variables[`${secondary}-a-${weight}`],
    "g"
  );
  const progressRegExp = new RegExp(variables[`${primary}-300`], "g");
  const switchDisabledRegExp = new RegExp(variables[`${secondary}-200`], "g");

  log.debug(`Generating the remaining ${themes.length} themes.`);

  // have to do these synchronously since normally run out of memory if all 2345 themes
  // are being created in parallel
  themes.forEach((theme) => {
    const [primary, secondary, weight, tone] = getThemeVariables(theme);
    const primaryColor = variables[`${primary}-500`];
    const secondaryColor = variables[`${secondary}-a-${weight}`];
    const progressColor = variables[`${primary}-300`];
    const switchDisabledColor = variables[`${secondary}-200`];

    const original = tone === "dark" ? darkFile : lightFile;
    const contents = original
      .replace(primaryRegExp, primaryColor)
      .replace(secondaryRegExp, secondaryColor)
      .replace(progressRegExp, progressColor)
      .replace(switchDisabledRegExp, switchDisabledColor);

    if (contents === original) {
      throw new Error("No theme changes.");
    }

    writeFileSync(join(cssDist, `react-md.${theme}.min.css`), contents);
  });
  log.debug();

  await cleanTempStyles();
}
