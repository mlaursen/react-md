import {
  type ASTPath,
  type ExpressionStatement,
  type JSCodeshift,
  type VariableDeclaration,
} from "jscodeshift";

import { type ComponentDefinition, type PatternKind } from "../types";
import { createConst } from "./createConst";
import { insertStatementIntoComponentBody } from "./insertStatementIntoComponentBody";

export interface InsertHookIntoComponentOptions {
  j: JSCodeshift;
  name: string;
  args?: Parameters<JSCodeshift["callExpression"]>[1];
  from: ASTPath | ComponentDefinition;
  result?: PatternKind;
}

export function insertHookIntoComponent(
  options: InsertHookIntoComponentOptions
): void {
  const { j, name, args = [], from, result } = options;

  const hookCall = j.callExpression(j.identifier(name), args);
  let expression: ExpressionStatement | VariableDeclaration =
    j.expressionStatement(hookCall);
  if (result) {
    expression = createConst({
      j,
      id: result,
      value: hookCall,
    });
  }
  insertStatementIntoComponentBody({
    j,
    from,
    statement: expression,
  });
}
