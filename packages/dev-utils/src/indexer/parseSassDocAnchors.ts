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

  // this is some great hacking
  // const exports = contents.match(/\s\s(functions|variables|mixins): {\r?\n/g);
  const exports = ["variables", "functions", "mixins"].filter((type) =>
    contents.match(new RegExp(`^\\s\\s${type}: {\\r?\\n`, "m"))
  );

  return exports.map((name) => ({
    title: toTitle(name),
    anchor: `#${packageName}-${name}`,
  }));
}
