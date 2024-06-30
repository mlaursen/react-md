import {
  type BooleanLiteral,
  type JSXAttribute,
  type JSXExpressionContainer,
} from "jscodeshift";

export function isPropBooleanExpression(
  attr: JSXAttribute
): attr is JSXAttribute & {
  value: JSXExpressionContainer & {
    expression: BooleanLiteral;
  };
} {
  return (
    attr.value?.type === "JSXExpressionContainer" &&
    attr.value.expression.type === "BooleanLiteral"
  );
}
