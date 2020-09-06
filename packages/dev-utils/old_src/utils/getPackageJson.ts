import fs from "fs-extra";
import path from "path";
import { packageJson, packagesRoot } from "../constants";

export interface PackageJson {
  name: string;
  version: string;
  scripts?: JSON;
  dependencies?: JSON;
  devDependencies?: JSON;
}

/**
 * Gets the package.json for a specific package or the package that the script is
 * currently being run in.
 *
 * @param An optional package name to use. If this is omitted, the current working
 * directory's package.json will be returned instead.
 */
export default function getPackageJson(name?: string): PackageJson {
  let jsonPath = process.cwd();
  if (name) {
    jsonPath = path.join(packagesRoot, name);
  }

  return fs.readJsonSync(path.join(jsonPath, packageJson));
}
