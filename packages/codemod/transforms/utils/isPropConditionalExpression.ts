import {
  type JSXText,
  type Identifier,
  type JSXAttribute,
  type JSXExpressionContainer,
  type Literal,
  type NumericLiteral,
  type StringLiteral,
} from "jscodeshift";

export function isPropConditionalExpression(
  attr: JSXAttribute
): attr is JSXAttribute & {
  value: JSXExpressionContainer & {
    expression: Identifier | Literal | StringLiteral | NumericLiteral | JSXText;
  };
} {
  return (
    attr.value?.type === "JSXExpressionContainer" &&
    attr.value?.expression &&
    attr.value.expression.type !== "JSXEmptyExpression" &&
    attr.value.expression.type !== "BooleanLiteral"
  );
}
