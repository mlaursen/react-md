import {
  type ArrowFunctionExpression,
  type FunctionExpression,
  type Identifier,
  type TSTypeAnnotation,
  type TSTypeReference,
  type VariableDeclarator,
} from "jscodeshift";

export function isFunctionType(
  node: VariableDeclarator
): node is VariableDeclarator & {
  id: Identifier & {
    typeAnnotation: TSTypeAnnotation & {
      typeAnnotation: TSTypeReference;
    };
  };
  init: FunctionExpression | ArrowFunctionExpression;
} {
  return (
    node.init?.type === "ArrowFunctionExpression" ||
    node.init?.type === "FunctionExpression"
  );
}
