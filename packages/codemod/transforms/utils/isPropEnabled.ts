import { type ASTPath, type JSXAttribute } from "jscodeshift";

import { isPropBooleanExpression } from "./isPropBooleanExpression";
import { isPropBooleanUnvalued } from "./isPropBooleanUnvalued";

export function isPropEnabled(
  attr: JSXAttribute | ASTPath<JSXAttribute>
): boolean {
  const node = "node" in attr ? attr.node : attr;
  return (
    isPropBooleanUnvalued(node) ||
    (isPropBooleanExpression(node) && node.value.expression.value)
  );
}
