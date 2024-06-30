import {
  type ASTPath,
  type JSXAttribute,
  type JSXSpreadAttribute,
} from "jscodeshift";

export function getPropName(
  attr:
    | JSXAttribute
    | JSXSpreadAttribute
    | ASTPath<JSXAttribute | JSXSpreadAttribute>
): string {
  const prop = "node" in attr ? attr.node : attr;
  if (prop.type !== "JSXAttribute") {
    return "";
  }

  return typeof prop.name.name === "string"
    ? prop.name.name
    : prop.name.name.name;
}
