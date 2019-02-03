import path from "path";

export const src = "src";
export const es = "es";
export const lib = "lib";
export const types = "types";
export const dist = "dist";
export const cssDist = path.join(dist, "css");
export const umdDist = path.join(dist, "umd");
export const nodeModules = "node_modules";
export const projectRoot = path.join(process.cwd(), "..", "..");
export const rootNodeModules = path.join(projectRoot, nodeModules);

export const packageJson = "package.json";
export const stylesScss = "styles.scss";
export const scssVariables = "scssVariables.ts";
export const tsConfigCommonJS = "tsconfig.commonjs.json";
export const tsConfigESModule = "tsconfig.esmodule.json";
export const tsConfigRollup = "tsconfig.rollup.json";
export const tempRollupIndex = "rollupIndex.ts";
export const rollupConfig = "rollup.config.js";
