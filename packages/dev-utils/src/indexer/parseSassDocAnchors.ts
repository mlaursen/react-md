import { readFileSync } from "fs";
import { existsSync } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import { documentationRoot, src } from "../constants";
import { toTitle } from "../utils";
import type { TOCAnchor } from "./types";

export function parseSassDocAnchors(packageName: string): readonly TOCAnchor[] {
  const sassdocPath = join(
    documentationRoot,
    src,
    "constants",
    "sassdoc",
    `${packageName}.ts`
  );
  if (!existsSync(sassdocPath)) {
    log.debug(
      `Not indexing sassdoc for ${packageName} since the lookup does not exist.`
    );
    return [];
  }

  const contents = readFileSync(sassdocPath, "utf8");

  // this is the order that they types appear in sassdoc pages
  const exports = ["variables", "mixins", "functions"].filter((type) =>
    // this is some great hacking
    contents.match(new RegExp(`^\\s\\s${type}: {\\r?\\n`, "m"))
  );

  return exports.map((name) => ({
    title: toTitle(name),
    anchor: `#${packageName}-${name}`,
  }));
}
