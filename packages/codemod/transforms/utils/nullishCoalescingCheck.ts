import { type JSCodeshift, type LogicalExpression } from "jscodeshift";
import { type ExpressionKind } from "../types";

export interface NullishCoalescingCheckOptions {
  j: JSCodeshift;
  expr: ExpressionKind;
}

export function nullishCoalescingCheck(
  options: NullishCoalescingCheckOptions
): LogicalExpression {
  const { j, expr } = options;

  return j.logicalExpression(
    "||",
    j.binaryExpression("===", expr, j.literal("undefined")),
    j.binaryExpression("===", expr, j.nullLiteral())
  );
}
