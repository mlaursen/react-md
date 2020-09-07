import { Item, parse } from "sassdoc";
import { copyStylesTemp } from "../copy";
import { tempStylesDir } from "../../constants";

export async function getSassdoc(): Promise<readonly Item[]> {
  await copyStylesTemp();

  return parse(tempStylesDir);
}
