import { remove } from "fs-extra";
import log from "loglevel";

import { list } from "./list";

/**
 * Handles removing a list of files/directories or a single file/directory.
 */
export async function clean(
  pathOrPaths: string | readonly string[]
): Promise<void> {
  const paths = Array.isArray(pathOrPaths) ? pathOrPaths : [pathOrPaths];

  log.debug(`Removing the following files:`);
  log.debug(list(paths));
  log.debug();

  await Promise.all(paths.map((path) => remove(path)));
}
