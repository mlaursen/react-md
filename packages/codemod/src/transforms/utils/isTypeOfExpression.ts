import {
  type BinaryExpression,
  type Identifier,
  type JSCodeshift,
  type MemberExpression,
} from "jscodeshift";

export interface IsTypeOfExpressionOptions {
  j: JSCodeshift;
  eq?: boolean;
  type?: "string" | "boolean";
  value: Identifier | MemberExpression;
}

export function isTypeOfExpression(
  options: IsTypeOfExpressionOptions
): BinaryExpression {
  const { j, eq = true, type = "string", value } = options;

  return j.binaryExpression(
    eq ? "===" : "!==",
    j.unaryExpression("typeof", value),
    j.stringLiteral(type)
  );
}
