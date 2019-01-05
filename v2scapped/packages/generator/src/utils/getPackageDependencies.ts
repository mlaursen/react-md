import fs from "fs-extra";
import path from "path";

import { PACKAGES_FOLDER } from "../constants";

export function getPackageJson(name: string) {
  return fs.readJson(path.join(PACKAGES_FOLDER, name, "package.json"));
}

export async function getPackageDependencies(name: string) {
  const json = (await getPackageJson(name)) || {};
  return json.dependencies || {};
}
