import type { Item } from "sassdoc";
import { parse } from "sassdoc";

import { tempStylesDir } from "../../constants";
import { copyStylesTemp } from "../copy";

export async function getSassdoc(): Promise<readonly Item[]> {
  await copyStylesTemp();

  return parse(tempStylesDir);
}
