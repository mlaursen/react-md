import { type JSCodeshift, type UnaryExpression } from "jscodeshift";

import { type ExpressionKind } from "../../types.js";
import { nullishCoalescingCheck } from "./nullishCoalescingCheck.js";

export interface NegateExpressionOptions {
  j: JSCodeshift;
  expr: ExpressionKind;
}

export function negateExpression(
  options: NegateExpressionOptions
): UnaryExpression {
  const { j, expr } = options;

  let arg: ExpressionKind;
  if (j.LogicalExpression.check(expr)) {
    arg =
      expr.operator === "??"
        ? nullishCoalescingCheck({ j, expr: expr.left })
        : expr.left;
  } else {
    arg = expr;
  }

  return j.unaryExpression("!", arg);
}
