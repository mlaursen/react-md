import {
  type JSXAttribute,
  type JSXExpressionContainer,
  type BooleanLiteral,
} from "jscodeshift";
import { type NonEmptyJSXExpresson } from "../types";

export function isPropConditionalExpression(
  attr: JSXAttribute
): attr is JSXAttribute & {
  value: JSXExpressionContainer & {
    expression: Exclude<NonEmptyJSXExpresson, BooleanLiteral>;
  };
} {
  return (
    attr.value?.type === "JSXExpressionContainer" &&
    attr.value?.expression &&
    attr.value.expression.type !== "JSXEmptyExpression" &&
    attr.value.expression.type !== "BooleanLiteral"
  );
}
