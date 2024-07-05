import { type JSCodeshift } from "jscodeshift";
import { type JSXReactNodeItem } from "../types";

export function isJsxReactNodeItem(
  j: JSCodeshift,
  thing: unknown
): thing is JSXReactNodeItem {
  return (
    j.JSXExpressionContainer.check(thing) ||
    j.JSXElement.check(thing) ||
    j.JSXFragment.check(thing) ||
    j.JSXSpreadChild.check(thing) ||
    j.JSXText.check(thing) ||
    j.Literal.check(thing) ||
    j.StringLiteral.check(thing) ||
    j.NumericLiteral.check(thing) ||
    j.BigIntLiteral.check(thing) ||
    j.NullLiteral.check(thing) ||
    j.BooleanLiteral.check(thing) ||
    j.RegExpLiteral.check(thing)
  );
}
