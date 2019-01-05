import fs from "fs-extra";
import path from "path";

import { filterAsync } from "./filterAsync";
import { getFolderContents } from "./getFolderContents";
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

export async function getDocumentablePackages() {
  const allPackages = await getFolderContents(PACKAGES_FOLDER);
  return filterAsync(allPackages, isPackagePublicTypescript);
}
