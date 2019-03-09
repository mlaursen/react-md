import styles, { createScssVariables } from "./styles";
import scripts from "./scripts";
import { time, printMinifiedSizes, log } from "./utils";
import runClean from "./clean";

export interface IBuildConfig {
  umd: boolean;
  clean: boolean;
  stylesOnly: boolean;
  scriptsOnly: boolean;
  variablesOnly: boolean;
}

const DEFAULT_CONFIG: IBuildConfig = {
  umd: true,
  clean: false,
  stylesOnly: false,
  scriptsOnly: false,
  variablesOnly: false,
};

export default async function build(config: IBuildConfig = DEFAULT_CONFIG) {
  time(() => runBuild(config), "build");
}

async function runBuild({
  stylesOnly,
  scriptsOnly,
  variablesOnly,
  umd,
  clean,
}: IBuildConfig) {
  if (clean) {
    await time(runClean, "clean");
  }
  if (variablesOnly) {
    await time(createScssVariables, "createScssVariables");
    return;
  }

  if (!scriptsOnly || stylesOnly) {
    await time(styles, "styles");
  }

  if (!scriptsOnly && !stylesOnly) {
    log();
  }

  if (!stylesOnly || scriptsOnly) {
    await time(() => scripts(umd), "scripts");
  }

  let exclude: RegExp | undefined;
  if (scriptsOnly) {
    exclude = /\.css/;
  } else if (stylesOnly) {
    exclude = /\.js/;
  }

  log();
  await printMinifiedSizes(exclude, process.argv.includes("--gzip-size"));
  log();
}
