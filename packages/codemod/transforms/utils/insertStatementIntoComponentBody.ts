import { type ASTPath, type JSCodeshift } from "jscodeshift";

import { type ComponentDefinition, type StatementKind } from "../types";
import { getClosestComponentDefinition } from "./getClosestComponentDefinition";
import { isRulesOfHooksReturnFound } from "./isRulesOfHooksReturnStatement";

interface Options {
  j: JSCodeshift;
  from: ASTPath | ComponentDefinition;
  statement: StatementKind;
}

export function insertStatementIntoComponentBody({
  j,
  from,
  statement,
}: Options): void {
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

  component.body.body.splice(firstReturnIndex, 0, statement);
}
