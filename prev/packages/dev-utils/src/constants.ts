import { execSync } from "child_process";
import { join } from "path";

export const COPY_BANNER = `/*
 * This file was generated from @react-md/dev-utils and should not be updated
 * manually.
 */

`;

export const projectRoot = execSync("git rev-parse --show-toplevel")
  .toString()
  .trim();
export const themesDist = join(projectRoot, "themes");
export const packagesRoot = join(projectRoot, "packages");
export const documentationRoot = join(packagesRoot, "documentation");

// common folders
export const src = "src";
export const es = "es";
export const lib = "lib";
export const types = "types";
export const dist = "dist";
export const nonWebpackDist = join(dist, "scss");
export const tempStylesDir = "tempStyles";

export const reactMdDist = join(packagesRoot, "react-md", dist);
export const everythingScss = join(reactMdDist, "_everything.scss");

// common files
export const stylesScss = "styles.scss";
export const scssVariables = "scssVariables.ts";

// common config files
export const packageJson = "package.json";
export const tsConfigCommonJS = "tsconfig.cjs.json";
export const tsConfigESModule = "tsconfig.ejs.json";
export const tsConfigVariables = "tsconfig.var.json";
export const tsConfigRollup = "tsconfig.rollup.json";
export const rollupConfig = "rollup.config.js";

// common cli flags
export const DEBUG = "--debug";
export const SILENT = "--silent";
export const CLEAN = "--clean";

export const NO_STYLES_PACKAGES = /autocomplete|material-icons|portal/;
// Note: this ignores the scssVariables file
export const NO_SCRIPT_PACKAGES = /elevation|theme/;

// common types
export type SimplePrimative = boolean | number | string | null;
export type Primative = SimplePrimative | SimplePrimative[];

// https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540
export type JSONValue = Primative | JSONObject | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {} // eslint-disable-line @typescript-eslint/no-empty-interface

export type TSConfigType = "ejs" | "cjs" | "var";
export type PackageType = "scss" | "typescript" | boolean;

export interface PackageJson {
  readonly name: string;
  readonly version: string;
  readonly scripts?: Record<string, string>;
  readonly dependencies?: Record<string, string>;
  readonly devDependencies?: Record<string, string>;
}

export interface VersionedDependency {
  readonly name: string;
  readonly version: string;
}

export interface CopyConfig {
  readonly src: string;
  readonly dest: string;
}
