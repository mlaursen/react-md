import { copyFile, ensureDir } from "fs-extra";
import log from "loglevel";
import { join, sep } from "path";

import { isRoot, nonWebpackDist, tempStylesDir } from "../constants";
import getCurrentPackageName from "./getCurrentPackageName";
import getPackages from "./getPackages";
import glob from "./glob";
import rmdir from "./rmdir";

export default async function moveToTempStyles(
  base: boolean = false
): Promise<void> {
  await ensureDir(tempStylesDir);
  const packages = isRoot ? getPackages(base) : [getCurrentPackageName()];

  const files = await glob(
    `packages/+(${packages.join("|")})/${nonWebpackDist}/**/*.scss`
  );

  log.debug("Copying the following files to the temp styles folder:");
  await Promise.all(
    files.map(async file => {
      const replacement = file.includes(`${sep}react-md${sep}`)
        ? `${tempStylesDir}${sep}`
        : join(tempStylesDir, `@react-md${sep}`);
      const dest = file.replace(`packages${sep}`, replacement);
      const parentFolders = dest.substring(0, dest.lastIndexOf(sep));

      log.debug(` - ${file} -> ${dest}`);
      await ensureDir(parentFolders);
      return copyFile(file, dest);
    })
  );
  log.debug();
}

export function cleanTempStyles(): Promise<void> {
  return rmdir(tempStylesDir, { recursive: true });
}
