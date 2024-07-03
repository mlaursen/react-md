import { type ASTNode, type Collection, type JSCodeshift } from "jscodeshift";

export interface RemoveVariableReferencesOptions {
  j: JSCodeshift;
  name: string;
  scope: Collection<ASTNode>;
}

export function removeVariableReferences(
  options: RemoveVariableReferencesOptions
): void {
  const { j, name, scope } = options;

  scope
    .find(j.JSXAttribute, {
      value: {
        type: "JSXExpressionContainer",
        expression: { type: "Identifier", name },
      },
    })
    .forEach((jsxAttribute) => {
      j(jsxAttribute).remove();
    });
  scope.find(j.ObjectExpression).forEach((objectExpression) => {
    j(objectExpression)
      .find(j.ObjectProperty, {
        value: { type: "Identifier", name },
      })
      .forEach((prop) => {
        j(prop).remove();
      });
  });
}
