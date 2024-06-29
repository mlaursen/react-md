import { type JSXAttribute, type JSXSpreadAttribute } from "jscodeshift";

export function getPropName(prop: JSXAttribute | JSXSpreadAttribute): string {
  if (prop.type !== "JSXAttribute") {
    return "";
  }

  return typeof prop.name.name === "string"
    ? prop.name.name
    : prop.name.name.name;
}
