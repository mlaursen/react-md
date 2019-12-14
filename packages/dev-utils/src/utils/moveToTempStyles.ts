import { copyFile, ensureDir } from "fs-extra";
import { join, sep } from "path";
import log from "loglevel";

import { isRoot, nonWebpackDist, tempStylesDir } from "../constants";
import getCurrentPackageName from "./getCurrentPackageName";
import getPackages from "./getPackages";
import glob from "./glob";

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
