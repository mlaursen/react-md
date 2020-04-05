import { readFile } from "fs-extra";
import { BuiltInParserName } from "prettier";

import format from "./format";
import writeFile from "./writeFile";

export default async function copyFileWithWarning(
  from: string,
  to: string,
  parser?: BuiltInParserName
): Promise<void> {
  const contents = await readFile(from, "utf8");
  const banner = `/**
 * This file was generated from @react-md/dev-utils and should not be updated
 * manually.
 */
`;

  return writeFile(to, format(`${banner}${contents}`, parser));
}
