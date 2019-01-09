import styles from "./styles";
import scripts from "./scripts";
import { time, printMinifiedSizes, log } from "./utils";

export interface IBuildConfig {
  umd: boolean;
  stylesOnly: boolean;
  scriptsOnly: boolean;
}

const DEFAULT_CONFIG = { umd: true, stylesOnly: false, scriptsOnly: false };
export default async function build(config: IBuildConfig = DEFAULT_CONFIG) {
  time(() => runBuild(config), "build");
}

async function runBuild({ stylesOnly, scriptsOnly, umd }: IBuildConfig) {
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
  await printMinifiedSizes(exclude);
  log();
}
