import { type JSCodeshift } from "jscodeshift";

import { type ExpressionKind, type StatementKind } from "../types";

export interface IsRulesOfHooksReturnFoundOptions {
  j: JSCodeshift;
  node: StatementKind | ExpressionKind;
}

export function isRulesOfHooksReturnFound(
  options: IsRulesOfHooksReturnFoundOptions
): boolean {
  const { j, node: statement } = options;

  if (j.ReturnStatement.check(statement)) {
    return true;
  }

  if (!j.IfStatement.check(statement)) {
    return false;
  }

  const { consequent, alternate } = statement;

  return (
    // first check if it is:
    // if (x) return <>whatever</>
    (j.ExpressionStatement.check(consequent) &&
      isRulesOfHooksReturnFound({
        j,
        node: consequent.expression,
      })) ||
    // then check if it is:
    // if (x) { ... return <>whatever</> }
    (j.BlockStatement.check(consequent) &&
      !!consequent.body.find((stmt) =>
        isRulesOfHooksReturnFound({
          j,
          node: stmt,
        })
      )) ||
    // then check the same things for `else` which also supports optional `if`s
    (j.ExpressionStatement.check(alternate) &&
      isRulesOfHooksReturnFound({
        j,
        node: alternate.expression,
      })) ||
    (j.BlockStatement.check(alternate) &&
      !!alternate.body.find((stmt) =>
        isRulesOfHooksReturnFound({ j, node: stmt })
      ))
  );
}
