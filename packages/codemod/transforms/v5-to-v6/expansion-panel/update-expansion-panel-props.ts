import { type API, type FileInfo, type Options } from "jscodeshift";
import { type NormalExpression } from "../../utils/createExpression";
import { isPropBooleanExpression } from "../../utils/isPropBooleanExpression";
import { isPropConditionalExpression } from "../../utils/isPropConditionalExpression";
import { isPropEnabled } from "../../utils/isPropEnabled";
import { removeProps } from "../../utils/removeProps";
import { renameProps } from "../../utils/renameProps";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  traverseImportSpecifiers({
    j,
    root,
    name: "ExpansionPanel",
  }).forEach((name) => {
    renameProps({
      root,
      props: {
        raiseable: "raisable",
        disablePadding: "disableContentPadding",
        header: "headerChildren",
        customHeader: "header",
      },
      component: name,
    });
    removeProps({
      root,
      props: ["disableLastParagraphMargin"],
      component: name,
    });

    root
      .find(j.JSXOpeningElement, { name: { name } })
      .forEach((jsxOpeningElement) => {
        let secondaryColor: NormalExpression | undefined;
        jsxOpeningElement.node.attributes ??= [];
        j(jsxOpeningElement)
          .find(j.JSXAttribute, {
            name: { name: "disableSecondaryColor" },
          })
          .forEach((jsxAttribute) => {
            const node = jsxAttribute.node;
            if (
              isPropConditionalExpression(node) ||
              (isPropBooleanExpression(node) && !isPropEnabled(node))
            ) {
              secondaryColor = node.value.expression;
            }
            j(jsxAttribute).remove();
          });

        if (secondaryColor) {
          jsxOpeningElement.node.attributes.push(
            j.jsxAttribute(
              j.jsxIdentifier("contentProps"),
              j.jsxExpressionContainer(
                j.objectExpression([
                  j.objectProperty(
                    j.identifier("disableSecondaryColor"),
                    secondaryColor
                  ),
                ])
              )
            )
          );
        }
      });
  });

  return root.toSource(printOptions);
}
