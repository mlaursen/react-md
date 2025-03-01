import {
  type ArrayPattern,
  type ArrowFunctionExpression,
  type AssignmentPattern,
  type BlockStatement,
  type BooleanLiteral,
  type CallExpression,
  type FunctionDeclaration,
  type FunctionExpression,
  type Identifier,
  type ImportDefaultSpecifier,
  type ImportNamespaceSpecifier,
  type ImportSpecifier,
  type JSCodeshift,
  type JSXAttribute,
  type JSXEmptyExpression,
  type JSXExpressionContainer,
  type JSXIdentifier,
  type JSXSpreadAttribute,
  type ObjectExpression,
  type ObjectPattern,
  type PrivateName,
  type PropertyPattern,
  type RestElement,
  type SpreadElementPattern,
  type SpreadPropertyPattern,
  type TSAsExpression,
  type TSNonNullExpression,
  type TSParameterProperty,
  type TSTypeAssertion,
  type TSTypeParameter,
} from "jscodeshift";

export type AnyImportSpecifier =
  | ImportDefaultSpecifier
  | ImportNamespaceSpecifier
  | ImportSpecifier;

export type StatementKind = Parameters<JSCodeshift["blockStatement"]>[0][0];
export type ExpressionKind = NonNullable<
  Parameters<JSCodeshift["variableDeclarator"]>[1]
>;
export type PatternKind =
  | Identifier
  | RestElement
  | SpreadElementPattern
  | PropertyPattern
  | ObjectPattern
  | ArrayPattern
  | AssignmentPattern
  | SpreadPropertyPattern
  | JSXIdentifier
  | PrivateName
  | TSAsExpression
  | TSNonNullExpression
  | TSTypeParameter
  | TSTypeAssertion
  | TSParameterProperty;

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

export type NonEmptyJSXExpresson = Exclude<
  JSXExpressionContainer["expression"],
  JSXEmptyExpression
>;

export type BooleanJSXAttribute = JSXAttribute & {
  value: JSXExpressionContainer & {
    expression: BooleanLiteral;
  };
};
