import path from "path";
import { execSync } from "child_process";

export const projectRoot = execSync("git rev-parse --show-toplevel")
  .toString()
  .trim();

export const src = "src";
export const es = "es";
export const lib = "lib";
export const types = "types";
export const dist = "dist";
export const cssDist = path.join(dist, "css");
export const scssDist = path.join(dist, "scss");
export const umdDist = path.join(dist, "umd");
export const nodeModules = "node_modules";
export const packages = "packages";
export const documentation = "documentation";
export const rootNodeModules = path.join(projectRoot, nodeModules);
export const packagesRoot = path.join(projectRoot, packages);
export const documentationRoot = path.join(packagesRoot, documentation);
export const documentaionReadmes = path.join(documentationRoot, src, "readmes");
export const tempStylesFolder = "tempStyles";

export const devUtils = path.join(packagesRoot, "dev-utils");

export const packageJson = "package.json";
export const stylesScss = "styles.scss";
export const scssVariables = "scssVariables.ts";
export const tsConfigCommonJS = "tsconfig.cjs.json";
export const tsConfigESModule = "tsconfig.ejs.json";
export const tsConfigVariables = "tsconfig.var.json";
export const tsConfigRollup = "tsconfig.rollup.json";
export const tempRollupIndex = "rollupIndex.ts";
export const rollupConfig = "rollup.config.js";
