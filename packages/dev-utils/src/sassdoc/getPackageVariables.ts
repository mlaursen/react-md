import { parse, Item, VariableSassDoc } from "sassdoc";

import { src } from "../paths";

export default async function getPackageVariables(
  sassdoc?: Item[]
): Promise<VariableSassDoc[]> {
  sassdoc = sassdoc || (await parse(src));

  return sassdoc.filter(
    ({ access, context: { type } }) =>
      access !== "private" && type === "variable"
  ) as VariableSassDoc[];
}
