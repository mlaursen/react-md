import fs from "fs-extra";
import path from "path";

import { glob } from "./utils";
import { tempDownloadDir, svgsDir } from "./constants";

const EXCLUDE_REGEX = /(signal_wifi_[0-3])|(battery_(charging_)?\d)|((cellular|internet)_[^4]_bar)/;

export async function flatten() {
  await fs.remove(svgsDir);
  await fs.ensureDir(svgsDir);

  console.log(`Finding all unique icons and copying them into ${svgsDir}...`);
  const allProdIcons = await glob("**/production/*_24px.svg", {
    root: tempDownloadDir,
  });

  const result = await Promise.all(
    allProdIcons
      .map(iconPath => [
        iconPath
          .substring(iconPath.lastIndexOf("/") + 1)
          .substring("ic_".length)
          .replace(/_24px/, ""),
        iconPath,
      ])
      .filter(
        ([iconName], index, uniq) =>
          !EXCLUDE_REGEX.test(iconName) &&
          uniq.findIndex(([iconName2]) => iconName2 === iconName) === index
      )
      .map(([iconName, iconPath]) =>
        fs.copy(iconPath, path.join(svgsDir, iconName))
      )
  );
  console.log(`Copied ${result.length} icons into ${svgsDir}`);
}
