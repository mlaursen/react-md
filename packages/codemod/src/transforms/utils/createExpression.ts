import { type JSCodeshift } from "jscodeshift";

export type JSXAttributeExpression = Parameters<JSCodeshift["jsxAttribute"]>[1];
export type NormalExpression = Parameters<
  JSCodeshift["conditionalExpression"]
>[1];

export interface CreateExpressionOptions {
  j: JSCodeshift;
  jsx?: boolean;
  value: string | number | boolean | null;
}

const GLOBALS = ["undefined"];

export function createExpression(
  options: Omit<CreateExpressionOptions, "jsx">
): NormalExpression;
export function createExpression(
  options: CreateExpressionOptions & { jsx: true }
): JSXAttributeExpression;
export function createExpression(
  options: CreateExpressionOptions
): NormalExpression | JSXAttributeExpression {
  const { j, value, jsx } = options;

  let exp: NormalExpression;
  if (value === null) {
    exp = j.nullLiteral();
  } else if (typeof value === "number") {
    exp = j.numericLiteral(value);
  } else if (typeof value === "boolean") {
    exp = j.booleanLiteral(value);
  } else if (GLOBALS.includes(value)) {
    exp = j.identifier(value);
  } else {
    // strings should always be returned as a string literal. if it is in an
    // expression container, it would be `propName={"STRING_LITERAL"}`
    return j.stringLiteral(value);
  }

  if (!jsx) {
    return exp;
  }

  return j.jsxExpressionContainer(exp);
}
