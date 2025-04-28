import { type JSCodeshift } from "jscodeshift";

import { type JSXExpression } from "../../../../types";
import { type OptionsMapFunction } from "./types";

export function isOptionsDotMap(
  j: JSCodeshift,
  value: JSXExpression
): value is OptionsMapFunction {
  return (
    j.CallExpression.check(value) &&
    j.MemberExpression.check(value.callee) &&
    j.Identifier.check(value.callee.property) &&
    value.callee.property.name === "map" &&
    (j.ArrowFunctionExpression.check(value.arguments[0]) ||
      j.FunctionExpression.check(value.arguments[0]))
  );
}
