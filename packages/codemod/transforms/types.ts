import {
  type ImportDefaultSpecifier,
  type ImportNamespaceSpecifier,
  type ImportSpecifier,
  type JSCodeshift,
  type JSXAttribute,
  type JSXSpreadAttribute,
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
