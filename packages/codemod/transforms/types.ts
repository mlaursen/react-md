import {
  type ArrowFunctionExpression,
  type BlockStatement,
  type CallExpression,
  type FunctionDeclaration,
  type FunctionExpression,
  type ImportDefaultSpecifier,
  type ImportNamespaceSpecifier,
  type ImportSpecifier,
  type JSCodeshift,
  type JSXAttribute,
  type JSXSpreadAttribute,
  type ObjectExpression,
} from "jscodeshift";

export type AnyImportSpecifier =
  | ImportDefaultSpecifier
  | ImportNamespaceSpecifier
  | ImportSpecifier;

export type StatementKind = Parameters<JSCodeshift["blockStatement"]>[0][0];
export type ExpressionKind = NonNullable<
  Parameters<JSCodeshift["variableDeclarator"]>[1]
>;

export type Statements = StatementKind[];

export type JSXExpression = Parameters<
  JSCodeshift["jsxExpressionContainer"]
>[0];

export type AnyJSXAttribute = JSXAttribute | JSXSpreadAttribute;
export type JSXAttributes = AnyJSXAttribute[];
export type JSXReactNode = Parameters<JSCodeshift["jsxElement"]>[2];
export type JSXReactNodeItem = NonNullable<JSXReactNode>[number];

export type FunctionArgument = CallExpression["arguments"][number];
export type ObjectPropertyKind = ObjectExpression["properties"][number];

export type ComponentDefinition = (
  | ArrowFunctionExpression
  | FunctionDeclaration
  | FunctionExpression
) & { body: BlockStatement };
