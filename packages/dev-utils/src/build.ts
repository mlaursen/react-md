import styles from "./styles";
import scripts from "./scripts";
import { time, printMinifiedSizes } from "./utils";

export interface IBuildConfig {
  stylesOnly: boolean;
  scriptsOnly: boolean;
}

export default async function build(config: IBuildConfig) {
  time(() => runBuild(config), "build");
}

async function runBuild({ stylesOnly, scriptsOnly }: IBuildConfig) {
  if (!scriptsOnly || stylesOnly) {
    await time(styles, "styles");
  }

  if (!scriptsOnly && !stylesOnly) {
    console.log();
  }

  if (!stylesOnly || scriptsOnly) {
    await time(scripts, "scripts");
  }

  let exclude: RegExp | undefined;
  if (scriptsOnly) {
    exclude = /\.css/;
  } else if (stylesOnly) {
    exclude = /\.js/;
  }

  console.log();
  await printMinifiedSizes(exclude);
  console.log();
}
