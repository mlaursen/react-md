import {
  type JSCodeshift,
  type ObjectProperty,
  type Property,
} from "jscodeshift";

import {
  type SupportedLabelReference,
  type SupportedValueReference,
} from "./types";

export function isSupportedValueReference(
  j: JSCodeshift,
  prop: ObjectProperty | Property
): prop is ObjectProperty & { value: SupportedValueReference } {
  return (
    j.StringLiteral.check(prop.value) ||
    j.NumericLiteral.check(prop.value) ||
    j.Identifier.check(prop.value) ||
    j.ConditionalExpression.check(prop.value) ||
    j.LogicalExpression.check(prop.value) ||
    j.UnaryExpression.check(prop.value)
  );
}

export function isSupportedLabelReference(
  j: JSCodeshift,
  prop: ObjectProperty | Property
): prop is ObjectProperty & { value: SupportedLabelReference } {
  return isSupportedValueReference(j, prop) || j.JSXElement.check(prop.value);
}
