import { parse } from "sassdoc";

import { src } from "./paths";

export default async function sassdoc() {}

export async function getPackageVariables(sassdoc?: any) {
  sassdoc = sassdoc || (await parse(src));

  return sassdoc.filter(
    ({ access, context: { type } }) =>
      access !== "private" && type === "variable"
  );
}
