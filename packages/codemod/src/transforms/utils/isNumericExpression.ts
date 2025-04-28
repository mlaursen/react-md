import {
  type JSCodeshift,
  type NumericLiteral,
  type SpreadElement,
  type UnaryExpression,
} from "jscodeshift";

import { type ExpressionKind } from "../../types.js";

export function isNumericExpression(
  j: JSCodeshift,
  expr: SpreadElement | ExpressionKind
): expr is NumericLiteral | UnaryExpression {
  return (
    j.NumericLiteral.check(expr) ||
    (j.UnaryExpression.check(expr) &&
      (expr.operator === "+" || expr.operator === "-"))
  );
}
