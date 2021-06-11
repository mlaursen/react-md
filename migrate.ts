import { execSync } from "child_process";
import { resolve } from "path";
import { glob } from "glob";
import { copyFileSync } from "fs";

if (process.argv.includes("--styles")) {
  const type = "module"; // or "division"
  // const type = "division";

  const current = "typography";
  // const file = "_color-a11y.scss";
  // const file = "_variables.scss";
  const file = `_rmd-${current}.scss`;

  const loadPaths = ["utils", "theme", "divider"]
    .map((name) => `--load-path=packages/${name}/src`)
    .join(" ");

  execSync(
    `npx sass-migrator ${type} ${loadPaths} packages/${current}/src/${file}`,
    { stdio: "inherit" }
  );
} else {
  const packages = ["utils", "theme", "divider", "typography"];
  const otherNodeModules = resolve("../test-cra-modules/node_modules");

  packages.forEach((name) => {
    const prefix = `packages/${name}/src`;
    const nodeModules = `${otherNodeModules}/@react-md/${name}`;
    const files = glob.sync(`${prefix}/*.scss`);
    files.forEach((srcPath) => {
      const dest = srcPath.replace(prefix, `${nodeModules}/dist`);

      copyFileSync(srcPath, dest);
    });

    copyFileSync(
      `packages/${name}/package.json`,
      `${nodeModules}/package.json`
    );
  });
}
