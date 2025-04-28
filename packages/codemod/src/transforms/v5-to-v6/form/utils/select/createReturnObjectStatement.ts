import {
  type JSCodeshift,
  type JSXAttribute,
  type ReturnStatement,
} from "jscodeshift";

import {
  type SupportedLabelReference,
  type SupportedValueReference,
} from "./types.js";

export interface Options {
  j: JSCodeshift;
  label: SupportedLabelReference;
  value: SupportedValueReference;
  props?: JSXAttribute[];
}

export function createReturnOptionStatement({
  j,
  label,
  value,
  props = [],
}: Options): ReturnStatement {
  return j.returnStatement(
    j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier("Option"), [
        j.jsxAttribute(j.jsxIdentifier("key"), j.jsxExpressionContainer(value)),
        j.jsxAttribute(
          j.jsxIdentifier("value"),
          j.jsxExpressionContainer(value)
        ),
        ...props,
      ]),
      j.jsxClosingElement(j.jsxIdentifier("Option")),
      [j.jsxExpressionContainer(label)]
    )
  );
}
