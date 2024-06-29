import { type JSXAttribute } from "jscodeshift";

export function isPropEnabled(attr: JSXAttribute): boolean {
  return (
    (attr.name.type === "JSXIdentifier" && attr.value === null) ||
    (attr.value?.type === "JSXExpressionContainer" &&
      attr.value.expression.type === "BooleanLiteral" &&
      attr.value.expression.value)
  );
}
