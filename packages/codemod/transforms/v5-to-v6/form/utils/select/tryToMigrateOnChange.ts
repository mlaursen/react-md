import { type ASTPath, type JSCodeshift, type JSXAttribute } from "jscodeshift";

import { type StatementKind } from "../../../../types";

interface Options {
  j: JSCodeshift;
  prop: ASTPath<JSXAttribute>;
  comments: Set<string>;
}

export function tryToMigrateOnChange({ j, prop, comments }: Options): void {
  const { value } = prop.node;
  // try to convert onChange to `onChange={event => {
  //   const value = event.currentTarget.value
  // }}`
  if (
    !j.JSXExpressionContainer.check(value) ||
    (!j.ArrowFunctionExpression.check(value.expression) &&
      !j.FunctionExpression.check(value.expression) &&
      !j.Identifier.check(value.expression))
  ) {
    return;
  }

  const eventCurrentTargetValue = j.memberExpression(
    j.memberExpression(j.identifier("event"), j.identifier("currentTarget")),
    j.identifier("value")
  );

  const statements: StatementKind[] = [];
  if (j.Identifier.check(value.expression)) {
    statements.push(
      j.expressionStatement(
        j.callExpression(value.expression, [eventCurrentTargetValue])
      )
    );
  } else {
    const [arg] = value.expression.params;
    // i'll only try to convert `onChange={value => {...}}` and
    // `onChange={({ ...destructured... }) => {...}}`.
    if (!j.Identifier.check(arg) && !j.ObjectPattern.check(arg)) {
      comments.add(
        "TODO: Unable to automatically convert the `Select`'s `onChange` handler"
      );
      return;
    }

    // if there is `() => { ... }`, reuse the `...`, otherwise convert to
    // `() => { ... }`
    const prevBody = j.BlockStatement.check(value.expression.body)
      ? value.expression.body.body
      : [j.expressionStatement(value.expression.body)];
    statements.push(
      // const value = event.currentTarget.value;
      // where `value` was the arg name
      j.variableDeclaration("const", [
        j.variableDeclarator(
          value.expression.params[0],
          eventCurrentTargetValue
        ),
      ]),
      ...prevBody
    );
  }

  prop.node.value = j.jsxExpressionContainer(
    j.arrowFunctionExpression(
      [j.identifier("event")],
      j.blockStatement(statements)
    )
  );
}
