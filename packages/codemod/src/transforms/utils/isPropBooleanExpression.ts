import { type JSXAttribute } from "jscodeshift";

import { type BooleanJSXAttribute } from "../../types.js";

export function isPropBooleanExpression(
  attr: JSXAttribute
): attr is BooleanJSXAttribute {
  return (
    attr.value?.type === "JSXExpressionContainer" &&
    attr.value.expression.type === "BooleanLiteral"
  );
}
