import { readFileSync } from "fs";
import { join } from "path";
import { documentationRoot, src } from "../constants";
import { TOCAnchor } from "./types";
import { toTitle } from "../utils/titles";

export default function parseSassDocAnchors(
  packageName: string
): readonly TOCAnchor[] {
  const sassdocPath = join(
    documentationRoot,
    src,
    "constants",
    "sassdoc",
    `${packageName}.ts`
  );
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
