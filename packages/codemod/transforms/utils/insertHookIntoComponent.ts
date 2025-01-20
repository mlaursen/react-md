import {
  type ASTPath,
  type ExpressionStatement,
  type JSCodeshift,
  type VariableDeclaration,
} from "jscodeshift";

import { type ComponentDefinition, type PatternKind } from "../types";
import { createConst } from "./createConst";
import { getClosestComponentDefinition } from "./getClosestComponentDefinition";
import { isRulesOfHooksReturnFound } from "./isRulesOfHooksReturnStatement";

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

  let component: ComponentDefinition | undefined;
  if ("node" in from) {
    component = getClosestComponentDefinition({ j, from });
  } else {
    component = from;
  }

  if (!component) {
    return;
  }

  const firstReturnStatement = j(component).find(j.ReturnStatement);
  const firstReturn = firstReturnStatement.get().node;
  if (!j.ReturnStatement.check(firstReturn)) {
    return;
  }

  const firstReturnIndex = component.body.body.findIndex((exp) =>
    isRulesOfHooksReturnFound({ j, node: exp })
  );
  if (firstReturnIndex === -1) {
    return;
  }

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

  component.body.body.splice(firstReturnIndex, 0, expression);
}
