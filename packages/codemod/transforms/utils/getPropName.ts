import { type ASTPath } from "jscodeshift";

import { type AnyJSXAttribute } from "../types";

export function getPropName(
  attr: AnyJSXAttribute | ASTPath<AnyJSXAttribute>
): string {
  const prop = "node" in attr ? attr.node : attr;
  if (prop.type !== "JSXAttribute") {
    return "";
  }

  return typeof prop.name.name === "string"
    ? prop.name.name
    : prop.name.name.name;
}
