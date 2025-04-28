import {
  type API,
  type FileInfo,
  type JSCodeshift,
  type NumericLiteral,
  type Options,
  type StringLiteral,
} from "jscodeshift";

import { type ExpressionKind, type JSXAttributes } from "../../types";
import { getPropName } from "../../utils/getPropName";
import { isPropBooleanExpression } from "../../utils/isPropBooleanExpression";
import { renameImportSpecifiers } from "../../utils/renameImportSpecifiers";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

function isStringable(
  j: JSCodeshift,
  expr: ExpressionKind
): expr is StringLiteral | NumericLiteral {
  return j.StringLiteral.check(expr) || j.NumericLiteral.check(expr);
}

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  renameImportSpecifiers({
    j,
    root,
    names: {
      MediaContainer: "ResponsiveItem",
      MediaContainerProps: "ResponsiveItemProps",
      MediaOverlay: "ResponsiveItemOverlay",
      MediaOverlayProps: "ResponsiveItemOverlayProps",
      MediaOverlayPosition: "ResponsiveItemOverlayPosition",
    },
  });

  traverseImportSpecifiers({
    j,
    root,
    name: "ResponsiveItem",
  }).forEach((name) => {
    root.findJSXElements(name).forEach((item) => {
      const props: JSXAttributes = [];
      let height: ExpressionKind | undefined;
      let width: ExpressionKind | undefined;
      item.node.openingElement.attributes?.forEach((attr) => {
        if (j.JSXSpreadAttribute.check(attr)) {
          props.push(attr);
          return;
        }

        const name = getPropName(attr);
        switch (name) {
          case "height":
            if (
              j.JSXExpressionContainer.check(attr.value) &&
              !j.JSXEmptyExpression.check(attr.value.expression)
            ) {
              height = attr.value.expression;
            } else if (j.StringLiteral.check(attr.value)) {
              height = attr.value;
            }
            break;
          case "width":
            if (
              j.JSXExpressionContainer.check(attr.value) &&
              !j.JSXEmptyExpression.check(attr.value.expression)
            ) {
              width = attr.value.expression;
            } else if (j.StringLiteral.check(attr.value)) {
              width = attr.value;
            }
            break;
          case "auto": {
            if (isPropBooleanExpression(attr) && !attr.value.expression) {
              props.push(
                j.jsxAttribute(
                  j.jsxIdentifier("responsive"),
                  j.stringLiteral("manual")
                )
              );
            } else if (
              j.JSXExpressionContainer.check(attr.value) &&
              !j.JSXEmptyExpression.check(attr.value.expression)
            ) {
              props.push(
                j.jsxAttribute(
                  j.jsxIdentifier("responsive"),
                  j.jsxExpressionContainer(
                    j.conditionalExpression(
                      attr.value.expression,
                      j.stringLiteral("manual"),
                      j.stringLiteral("auto")
                    )
                  )
                )
              );
            }
            break;
          }
          default:
            props.push(attr);
        }
      });

      if (height && width) {
        if (isStringable(j, height) && isStringable(j, width)) {
          props.push(
            j.jsxAttribute(
              j.jsxIdentifier("aspectRatio"),
              j.stringLiteral(`${width.value}-${height.value}`)
            )
          );
        } else {
          props.push(
            j.jsxAttribute(
              j.jsxIdentifier("aspectRatio"),
              j.jsxExpressionContainer(
                j.templateLiteral(
                  [
                    j.templateElement({ raw: "", cooked: "" }, false),
                    j.templateElement({ raw: "-", cooked: "-" }, false),
                    j.templateElement({ raw: "", cooked: "" }, true),
                  ],
                  [width, height]
                )
              )
            )
          );
        }
      }

      item.node.openingElement.attributes = props;
    });
  });

  return root.toSource(printOptions);
}
