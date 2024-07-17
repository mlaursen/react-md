import {
  type JSCodeshift,
  type JSXEmptyExpression,
  type JSXExpressionContainer,
} from "jscodeshift";

type DefinedExpression = Exclude<
  JSXExpressionContainer["expression"],
  JSXEmptyExpression
>;

export function isJsxExpressionContainer(
  j: JSCodeshift,
  value: unknown
): value is JSXExpressionContainer & {
  expression: DefinedExpression;
} {
  return (
    j.JSXExpressionContainer.check(value) &&
    !j.JSXEmptyExpression.check(value.expression)
  );
}
