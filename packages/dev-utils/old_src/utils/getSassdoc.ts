import { Item, parse } from "sassdoc";

import { tempStylesDir } from "../constants";
import moveToTempStyles from "./moveToTempStyles";

/**
 * Gets a list of the sassdoc items for either all the packages within react-md
 * or the package that the script is being run in.
 *
 * A new temp folder will be created at the root of the project and all the
 * styles will be copied into this directory so that the `file` metadata's path
 * will include the full `@react-md/${PACKAGE_NAME}` so that the related package
 * metadata can be used for linking to a specific line or code.
 */
export default async function getSassdoc(): Promise<Item[]> {
  await moveToTempStyles();

  return parse(tempStylesDir);
}
