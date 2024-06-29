import {
  type JSCodeshift,
  type JSXAttribute,
  type JSXExpressionContainer,
  type StringLiteral,
} from "jscodeshift";
import { isPropConditionalExpression } from "./isPropConditionalExpression";
import { isPropEnabled } from "./isPropEnabled";

export interface CreateJsxAttributeFromBooleanOptions {
  j: JSCodeshift;
  name: string;
  attr: JSXAttribute;
  value: string | null;
}

export function createJsxAttributeFromBoolean(
  options: CreateJsxAttributeFromBooleanOptions
): JSXAttribute | undefined {
  const { j, attr, name, value } = options;
  const isNull = value === null;

  let jsxValue: JSXExpressionContainer | StringLiteral | undefined;
  if (isPropConditionalExpression(attr)) {
    jsxValue = j.jsxExpressionContainer(
      j.conditionalExpression(
        attr.value.expression,
        isNull ? j.nullLiteral() : j.stringLiteral(value),
        j.identifier("undefined")
      )
    );
  } else if (isPropEnabled(attr)) {
    jsxValue = isNull
      ? j.jsxExpressionContainer(j.nullLiteral())
      : j.stringLiteral(value);
  } else {
    return;
  }

  return j.jsxAttribute(
    {
      name,
      type: "JSXIdentifier",
    },
    jsxValue
  );
}
