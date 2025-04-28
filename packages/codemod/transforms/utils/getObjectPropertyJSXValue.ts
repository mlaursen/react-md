import {
  type JSCodeshift,
  type ObjectMethod,
  type ObjectProperty,
} from "jscodeshift";

import { type JSXAttributeValue } from "../types";
import { createExpression } from "./createExpression";

interface Options {
  j: JSCodeshift;
  prop: ObjectProperty | ObjectMethod;
}

export function getObjectPropertyJSXValue({
  j,
  prop,
}: Options): JSXAttributeValue {
  if (j.ObjectMethod.check(prop)) {
    return j.jsxExpressionContainer(
      j.arrowFunctionExpression(prop.params, prop.body)
    );
  }

  const { value } = prop;
  if (j.BooleanLiteral.check(value)) {
    return createExpression({
      j,
      jsx: true,
      value: value.value,
    });
  }

  if (j.StringLiteral.check(value)) {
    return value;
  }

  if (j.ObjectExpression.check(value)) {
    // have to clone since the `.remove()` call deletes the properties references
    return j.jsxExpressionContainer(
      j.objectExpression.from({
        comments: value.comments || null,
        properties: [...value.properties],
      })
    );
  }

  if (
    !j.RestElement.check(value) &&
    !j.PropertyPattern.check(value) &&
    !j.ObjectPattern.check(value) &&
    !j.ArrayPattern.check(value) &&
    !j.AssignmentPattern.check(value) &&
    !j.SpreadPropertyPattern.check(value) &&
    !j.SpreadElementPattern.check(value) &&
    !j.TSParameterProperty.check(value)
  ) {
    return j.jsxExpressionContainer(value);
  }

  // shouldn't be possible
}
