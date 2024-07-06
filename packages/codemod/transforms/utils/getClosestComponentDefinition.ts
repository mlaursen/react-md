import { type ASTPath, type JSCodeshift } from "jscodeshift";
import { type ComponentDefinition } from "../types";

export interface GetClosestComponentDefinitionOptions {
  j: JSCodeshift;
  from: ASTPath;
}

export function getClosestComponentDefinition(
  options: GetClosestComponentDefinitionOptions
): ComponentDefinition | undefined {
  const { j, from } = options;

  const func = j(from).closestScope().get()?.node;
  if (
    (!j.ArrowFunctionExpression.check(func) &&
      !j.FunctionDeclaration.check(func) &&
      !j.FunctionExpression.check(func)) ||
    !j.BlockStatement.check(func.body)
  ) {
    return;
  }

  // @ts-expect-error ArrowFunctionExpression does not like the `Identifier` type from BlockStatement
  return func;
}
