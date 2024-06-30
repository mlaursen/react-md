import { type JSXAttribute } from "jscodeshift";
import { isPropBooleanExpression } from "./isPropBooleanExpression";
import { isPropBooleanUnvalued } from "./isPropBooleanUnvalued";

export function isPropEnabled(attr: JSXAttribute): boolean {
  return (
    isPropBooleanUnvalued(attr) ||
    (isPropBooleanExpression(attr) && attr.value.expression.value)
  );
}
