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
  const exports = contents.match(/\s\s(functions|variables|mixins): {\r?\n/g);

  return exports.map((name) => {
    const type = name.substring(2, name.indexOf(":"));

    return {
      title: toTitle(type),
      anchor: `#${packageName}-${type}`,
    };
  });
}
