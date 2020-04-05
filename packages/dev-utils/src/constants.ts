import { join } from "path";
import { execSync } from "child_process";

export const projectRoot = execSync("git rev-parse --show-toplevel")
  .toString()
  .trim();
export const packagesRoot = join(projectRoot, "packages");
export const documentationRoot = join(packagesRoot, "documentation");

export const isRoot = process.cwd() === projectRoot;

export const src = "src";
export const es = "es";
export const lib = "lib";
export const types = "types";
export const dist = "dist";
export const nonWebpackDist = `${dist}/scss`;
export const tempStylesDir = "tempStyles";

export const packageJson = "package.json";
export const tsConfigCommonJS = "tsconfig.cjs.json";
export const tsConfigESModule = "tsconfig.ejs.json";
export const tsConfigVariables = "tsconfig.var.json";
export const tsConfigRollup = "tsconfig.rollup.json";
export const rollupConfig = "rollup.config.js";

export const stylesScss = "styles.scss";
export const scssVariables = "scssVariables.ts";

// logging flags
export const DEBUG = "--debug";
export const SILENT = "--silent";

export const BANNER = `/**
 * This file was generated from @react-md/dev-utils and should not be updated
 * manually.
 */

`;
