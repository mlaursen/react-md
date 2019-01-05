import * as fs from "fs-extra";
import * as path from "path";

import { filterAsync, getFolderContents } from "../utils";
import { PACKAGES_FOLDER } from "../constants";

interface IPackageJSON {
  name: string;
  private?: boolean;
  devDependencies?: {
    [key: string]: string;
  };
}

async function isPackagePublicTypescript(packageName: string) {
  const packageJson: IPackageJSON | null = await fs
    .readJson(path.join(PACKAGES_FOLDER, packageName, "package.json"))
    .catch(() => null);

  if (
    !packageJson ||
    packageJson.private ||
    !packageJson.name.startsWith("@react-md") ||
    /material-icons/.test(packageJson.name)
  ) {
    return false;
  }

  return !!(packageJson.devDependencies && packageJson.devDependencies.typescript);
}

export default async function getDocumentablePackages() {
  console.log("Finding documentable typescript packages...");
  const allPackages = await getFolderContents(PACKAGES_FOLDER);
  const packages = await filterAsync(allPackages, isPackagePublicTypescript);
  console.log(`Found ${packages.length} documentable packages.`);

  return packages;
  // return packages.filter(name => name === "typography");
}
