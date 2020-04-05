import { existsSync } from "fs";
import log from "loglevel";
import { join } from "path";

import { dist, es, isRoot, lib, packagesRoot, types } from "./constants";
import list from "./utils/list";
import rmdir from "./utils/rmdir";
import getPackages from "./utils/getPackages";

const dists = [es, lib, dist, types];

export default async function clean(): Promise<void> {
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
  await Promise.all(directories.map((dir) => rmdir(dir, { recursive: true })));
}
