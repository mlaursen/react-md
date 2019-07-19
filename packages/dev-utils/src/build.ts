import { defaults, pick } from "lodash";
import log from "loglevel";

import runClean from "./clean";
import scripts, { buildUMD } from "./scripts";
import styles, { createScssVariables, generateThemeStyles } from "./styles";
import { printMinifiedSizes, time, createTsConfigFiles } from "./utils";

export interface BuildConfig {
  css: boolean;
  umd: boolean;
  clean: boolean;
  update: boolean;
  updateOnly: boolean;
  umdOnly: boolean;
  stylesOnly: boolean;
  themesOnly: boolean;
  scriptsOnly: boolean;
  variablesOnly: boolean;
}

const DEFAULT_CONFIG: BuildConfig = {
  css: false,
  umd: false,
  clean: false,
  update: false,
  updateOnly: false,
  umdOnly: false,
  stylesOnly: false,
  themesOnly: false,
  scriptsOnly: false,
  variablesOnly: false,
};

async function runBuild({
  css,
  umd,
  clean,
  umdOnly,
  update,
  updateOnly,
  stylesOnly,
  themesOnly,
  scriptsOnly,
  variablesOnly,
}: BuildConfig): Promise<void> {
  if (clean) {
    await time(runClean, "clean");
  }

  if (themesOnly) {
    await time(generateThemeStyles, "generate theme styles");
    return;
  }

  if (variablesOnly) {
    await time(createScssVariables, "create scss variables");
    return;
  }

  if (update || updateOnly) {
    await time(createTsConfigFiles, "create tsconfig files");

    if (updateOnly) {
      return;
    }
  }

  if ((!umdOnly && !scriptsOnly) || stylesOnly) {
    await time(() => styles(css), "styles");
  }

  if (!umdOnly && !scriptsOnly && !stylesOnly) {
    log.debug();
  }

  if (umdOnly) {
    await time(buildUMD, "umd");
  } else if (!stylesOnly || scriptsOnly) {
    await time(() => scripts(umd), "scripts");
  }

  let exclude: RegExp | undefined;
  if (umdOnly) {
    exclude = /\.css|es|lib/;
  } else if (scriptsOnly) {
    exclude = /\.css/;
  } else if (stylesOnly) {
    exclude = /\.js/;
  }

  await printMinifiedSizes(exclude);
}

export default async function build(
  config: Partial<BuildConfig> = DEFAULT_CONFIG
): Promise<void> {
  const buildConfig = defaults(
    pick(config, [
      "css",
      "umd",
      "clean",
      "update",
      "updateOnly",
      "umdOnly",
      "stylesOnly",
      "themesOnly",
      "variablesOnly",
    ]),
    DEFAULT_CONFIG
  );

  time(() => runBuild(buildConfig), "build");
}
