import {
  type ArrowFunctionExpression,
  type BinaryExpression,
  type CallExpression,
  type FunctionExpression,
  type Identifier,
  type JSXElement,
  type MemberExpression,
  type NumericLiteral,
  type StringLiteral,
  type UnaryExpression,
} from "jscodeshift";

export type OptionsMapFunction = CallExpression & {
  callee: MemberExpression & { property: Identifier };
  arguments: [ArrowFunctionExpression | FunctionExpression];
};

export type SupportedValueReference =
  | Identifier
  | StringLiteral
  | NumericLiteral
  | UnaryExpression
  | BinaryExpression;
export type SupportedLabelReference = SupportedValueReference | JSXElement;
