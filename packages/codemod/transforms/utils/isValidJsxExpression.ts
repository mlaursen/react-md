import { type JSCodeshift } from "jscodeshift";
import { type JSXExpression } from "../types";

export function isValidJsxExpression(
  j: JSCodeshift,
  value: unknown
): value is JSXExpression {
  return (
    j.Identifier.check(value) ||
    j.JSXElement.check(value) ||
    j.StringLiteral.check(value) ||
    j.NumericLiteral.check(value) ||
    j.NullLiteral.check(value) ||
    j.FunctionExpression.check(value) ||
    j.ArrowFunctionExpression.check(value) ||
    j.CallExpression.check(value)
  );
}
