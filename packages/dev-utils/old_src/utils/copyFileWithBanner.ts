import { readFile } from "fs-extra";
import { BuiltInParserName } from "prettier";

import format from "./format";
import writeFile from "./writeFile";
import { BANNER } from "../constants";

export default async function copyFileWithWarning(
  from: string,
  to: string,
  parser?: BuiltInParserName
): Promise<void> {
  const contents = await readFile(from, "utf8");

  return writeFile(to, format(`${BANNER}${contents}`, parser));
}
