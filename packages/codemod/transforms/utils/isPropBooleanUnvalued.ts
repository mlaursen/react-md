import { type JSXAttribute } from "jscodeshift";

export function isPropBooleanUnvalued(attr: JSXAttribute): boolean {
  return attr.name.type === "JSXIdentifier" && attr.value === null;
}
