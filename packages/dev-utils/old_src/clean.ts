import { existsSync } from "fs";
import { remove } from "fs-extra";
import log from "loglevel";
import { join } from "path";
import { dist, es, isRoot, lib, packagesRoot, types } from "./constants";
import getPackages from "./utils/getPackages";
import glob from "./utils/glob";
import list from "./utils/list";

const dists = [es, lib, dist, types];

export default async function clean(
  includeTsBuildInfo: boolean = false
): Promise<void> {
  if (includeTsBuildInfo) {
    let pattern = "*.tsbuildinfo";
    if (isRoot) {
      pattern = `packages/*/${pattern}`;
    }

    const buildInfoPaths = await glob(pattern);
    if (!buildInfoPaths.length) {
      log.debug("No .tsbuildinfo files to remove");
    } else {
      log.debug("Removing the following .tsbuildinfo:");
      log.debug(
        list(
          buildInfoPaths.map((dir) => dir.substring(dir.indexOf("packages")))
        )
      );

      await Promise.all(buildInfoPaths.map((path) => remove(path)));
    }
  }
  let directories: string[];
  if (!isRoot) {
    directories = dists.map((dist) => join(process.cwd(), dist));
  } else {
    directories = getPackages(true).flatMap((name) =>
      dists.map((dist) => join(packagesRoot, name, dist))
    );
  }

  directories = directories.filter((dir) => existsSync(dir));
  if (!directories.length) {
    log.debug("Already clean!");
    return;
  }

  log.debug("Removing the following directories:");
  log.debug(
    list(directories.map((dir) => dir.substring(dir.indexOf("packages"))))
  );
  log.debug();
  await Promise.all(directories.map((dir) => remove(dir)));
}
