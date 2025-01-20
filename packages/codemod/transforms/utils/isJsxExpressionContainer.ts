import { type JSCodeshift, type JSXExpressionContainer } from "jscodeshift";

import { type NonEmptyJSXExpresson } from "../types";

export function isJsxExpressionContainer(
  j: JSCodeshift,
  value: unknown
): value is JSXExpressionContainer & {
  expression: NonEmptyJSXExpresson;
} {
  return (
    j.JSXExpressionContainer.check(value) &&
    !j.JSXEmptyExpression.check(value.expression)
  );
}
