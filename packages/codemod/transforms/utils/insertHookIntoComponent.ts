import { type ASTPath, type JSCodeshift } from "jscodeshift";
import { type ComponentDefinition } from "../types";
import { getClosestComponentDefinition } from "./getClosestComponentDefinition";
import { isRulesOfHooksReturnFound } from "./isRulesOfHooksReturnStatement";

export interface InsertHookIntoComponentOptions {
  j: JSCodeshift;
  name: string;
  args?: Parameters<JSCodeshift["callExpression"]>[1];
  from: ASTPath | ComponentDefinition;
}

export function insertHookIntoComponent(
  options: InsertHookIntoComponentOptions
): void {
  const { j, name, args = [], from } = options;

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

  component.body.body.splice(
    firstReturnIndex,
    0,
    j.expressionStatement(j.callExpression(j.identifier(name), args))
  );
}
