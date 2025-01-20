import { type JSCodeshift, type JSXAttribute } from "jscodeshift";

import {
  type JSXAttributeExpression,
  type NormalExpression,
  createExpression,
} from "./createExpression";
import { isPropConditionalExpression } from "./isPropConditionalExpression";
import { isPropEnabled } from "./isPropEnabled";

export interface CreateJsxAttributeFromBooleanOptions {
  j: JSCodeshift;
  name: string;
  attr: JSXAttribute;
  value: string | null;
  fallback?: string | null;
  reversed?: boolean;
}

export function createJsxAttributeFromBoolean(
  options: CreateJsxAttributeFromBooleanOptions
): JSXAttribute | undefined {
  const {
    j,
    attr,
    name,
    value,
    fallback = "undefined",
    reversed = false,
  } = options;

  let jsxValue: JSXAttributeExpression | undefined;
  if (isPropConditionalExpression(attr)) {
    const args: [NormalExpression, NormalExpression] = [
      createExpression({ j, value }),
      createExpression({ j, value: fallback }),
    ];
    if (reversed) {
      args.reverse();
    }
    jsxValue = j.jsxExpressionContainer(
      j.conditionalExpression(attr.value.expression, ...args)
    );
  } else if (isPropEnabled(attr) !== reversed) {
    jsxValue = createExpression({
      j,
      jsx: true,
      value,
    });
  } else {
    return;
  }

  return j.jsxAttribute(j.jsxIdentifier(name), jsxValue);
}
