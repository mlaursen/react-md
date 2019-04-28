import runClean from "./clean";
import scripts, { buildUMD } from "./scripts";
import styles, { createScssVariables } from "./styles";
import { log, printMinifiedSizes, time } from "./utils";

export interface BuildConfig {
  umd: boolean;
  clean: boolean;
  umdOnly: boolean;
  stylesOnly: boolean;
  scriptsOnly: boolean;
  variablesOnly: boolean;
}

const DEFAULT_CONFIG: BuildConfig = {
  umd: true,
  clean: false,
  umdOnly: false,
  stylesOnly: false,
  scriptsOnly: false,
  variablesOnly: false,
};

export default async function build(config: BuildConfig = DEFAULT_CONFIG) {
  time(() => runBuild(config), "build");
}

async function runBuild({
  umd,
  clean,
  umdOnly,
  stylesOnly,
  scriptsOnly,
  variablesOnly,
}: BuildConfig) {
  if (clean) {
    await time(runClean, "clean");
  }

  if (variablesOnly) {
    await time(createScssVariables, "createScssVariables");
    return;
  }

  if ((!umdOnly && !scriptsOnly) || stylesOnly) {
    await time(styles, "styles");
  }

  if (!umdOnly && !scriptsOnly && !stylesOnly) {
    log();
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

  log();
  await printMinifiedSizes(exclude, process.argv.includes("--gzip-size"));
  log();
}
