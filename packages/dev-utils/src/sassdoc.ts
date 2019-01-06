import { parse } from "sassdoc";
import nodeSass from "node-sass";

import { src, nodeModules } from "./paths";

export default async function sassdoc() {}

export async function getPackageVariables(sassdoc?: any) {
  sassdoc = sassdoc || (await parse(src));

  return sassdoc.filter(
    ({ access, context: { type } }) =>
      access !== "private" && type === "variable"
  );
}

export function hackVariableValue(scssVariable: any, packageName: string) {
  const { name, value } = scssVariable.context;
  const prefix = `$${name}: `;

  try {
    const data = `@import 'src/${packageName}';
@error '${prefix}#{${value}}';
`;

    nodeSass
      .renderSync({
        data,
        includePaths: [src, nodeModules],
        outputStyle: "expanded",
      })
      .css.toString();
  } catch (error) {
    return {
      name,
      value: error.message.substring(prefix.length),
    };
  }
}
