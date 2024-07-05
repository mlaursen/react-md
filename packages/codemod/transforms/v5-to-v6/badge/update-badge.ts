import {
  type API,
  type Collection,
  type FileInfo,
  type FunctionDeclaration,
  type JSCodeshift,
  type Options,
} from "jscodeshift";
import {
  type JSXAttributes,
  type JSXReactNode,
  type JSXReactNodeItem,
} from "../../types";
import { addImportSpecifier } from "../../utils/addImportSpecifier";
import { createJsxElement } from "../../utils/createJsxElement";
import { getPropName } from "../../utils/getPropName";
import { isJsxReactNodeItem } from "../../utils/isJsxReactNodeItem";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

function createThemeHelper(j: JSCodeshift): FunctionDeclaration {
  const themeParameter = j.identifier("theme");
  themeParameter.typeAnnotation = j.tsTypeAnnotation(
    j.tsUnionType([
      j.tsTypeReference(j.identifier("BadgeTheme")),
      j.tsLiteralType(j.stringLiteral("default")),
      j.tsUndefinedKeyword(),
    ])
  );
  const declaration = j.functionDeclaration(
    j.identifier("_toBadgeTheme"),
    [themeParameter],
    j.blockStatement([
      j.returnStatement(
        j.conditionalExpression(
          j.binaryExpression(
            "===",
            j.identifier("theme"),
            j.stringLiteral("default")
          ),
          j.stringLiteral("greyscale"),
          j.identifier("theme")
        )
      ),
    ])
  );

  declaration.returnType = j.tsTypeAnnotation(
    j.tsUnionType([
      j.tsTypeReference(j.identifier("BadgeTheme")),
      j.tsUndefinedKeyword(),
    ])
  );

  return declaration;
}

interface RenameBadgeThemeOptions {
  j: JSCodeshift;
  root: Collection;
  propName: "theme" | "badgeTheme";
  componentName: string;
}

function renameBadgeTheme(options: RenameBadgeThemeOptions): boolean {
  const { j, root, propName, componentName } = options;

  let isHelperRequired = false;
  root
    .find(j.JSXOpeningElement, { name: { name: componentName } })
    .forEach((jsxOpeningElement) => {
      j(jsxOpeningElement)
        .find(j.JSXAttribute, {
          name: { name: propName },
        })
        .forEach((jsxAttribute) => {
          j(jsxAttribute)
            .find(j.StringLiteral, { value: "default" })
            .forEach((literal) => {
              j(literal).replaceWith(j.stringLiteral("greyscale"));
            });

          j(jsxAttribute)
            .find(j.JSXExpressionContainer)
            .forEach((jsxExpressionContainer) => {
              const exp = jsxExpressionContainer.node.expression;
              if (
                !j.JSXEmptyExpression.check(exp) &&
                !j.StringLiteral.check(exp)
              ) {
                isHelperRequired = true;
                j(jsxExpressionContainer).replaceWith(
                  j.jsxExpressionContainer.from({
                    ...jsxExpressionContainer.node,
                    expression: j.callExpression(
                      j.identifier("_toBadgeTheme"),
                      [exp]
                    ),
                  })
                );
              }
            });
        });
    });
  return isHelperRequired;
}

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  let isThemeHelperRequired = false;
  traverseImportSpecifiers({
    j,
    root,
    name: "Badge",
  }).forEach((name) => {
    const result = renameBadgeTheme({
      j,
      root,
      propName: "theme",
      componentName: name,
    });

    isThemeHelperRequired ||= result;
  });

  traverseImportSpecifiers({
    j,
    root,
    name: "BadgedButton",
    remove: true,
  }).forEach((name) => {
    addImportSpecifier({
      j,
      root,
      name: "Button",
    });
    addImportSpecifier({
      j,
      root,
      name: "Badge",
    });
    addImportSpecifier({
      j,
      root,
      name: "getIcon",
    });

    const result = renameBadgeTheme({
      j,
      root,
      propName: "badgeTheme",
      componentName: name,
    });

    root.findJSXElements(name).forEach((jsxElement) => {
      let isLabelled = false;
      let isButtonType = false;
      let buttonChildren: JSXReactNodeItem | undefined;
      const badgeProps: JSXAttributes = [];
      const buttonProps: JSXAttributes = [];
      const openingElement = jsxElement.node.openingElement;
      openingElement.attributes?.forEach((attr) => {
        const name = getPropName(attr);
        switch (name) {
          case "badgeId":
          case "badgeTheme":
          case "badgeStyle":
          case "badgeClassName": {
            const withoutBadge = name.substring(5);
            const camelCased =
              withoutBadge.substring(0, 1).toLowerCase() +
              withoutBadge.substring(1);
            badgeProps.push(
              j.jsxAttribute.from({
                ...attr,
                name: j.jsxIdentifier(camelCased),
              })
            );
            break;
          }
          case "badgeRef":
            badgeProps.push(
              j.jsxAttribute.from({
                ...attr,
                name: j.jsxIdentifier("ref"),
              })
            );
            break;
          case "aria-label":
          case "aria-labelledby":
            isLabelled = true;
            buttonProps.push(attr);
            break;
          case "buttonType":
            isButtonType = true;
            buttonProps.push(attr);
            break;
          case "buttonChildren":
            if (!j.JSXAttribute.check(attr)) {
              return;
            }

            if (
              j.JSXExpressionContainer.check(attr.value) &&
              isJsxReactNodeItem(j, attr.value.expression)
            ) {
              buttonChildren = attr.value.expression;
            } else if (attr.value) {
              buttonChildren = attr.value;
            }
            break;

          default:
            buttonProps.push(attr);
        }
      });

      if (!isLabelled && !isButtonType) {
        buttonProps.push(
          j.jsxAttribute(
            j.jsxIdentifier("aria-label"),
            j.stringLiteral("Notifications")
          )
        );
      }
      if (!isButtonType) {
        buttonProps.push(
          j.jsxAttribute(j.jsxIdentifier("buttonType"), j.stringLiteral("icon"))
        );
      }

      const children: JSXReactNode = [
        createJsxElement({
          j,
          name: "Badge",
          props: badgeProps,
          children: jsxElement.node.children,
        }),
      ];
      if (buttonChildren) {
        children.unshift(buttonChildren);
      } else {
        children.unshift(
          j.jsxExpressionContainer(
            j.callExpression(j.identifier("getIcon"), [
              j.stringLiteral("notification"),
            ])
          )
        );
      }

      j(jsxElement).replaceWith(
        createJsxElement({
          j,
          name: "Button",
          props: buttonProps,
          children,
        })
      );
    });

    isThemeHelperRequired ||= result;
  });

  if (isThemeHelperRequired) {
    // add the helper to the bottom of the file
    root.get().node.program.body.push(createThemeHelper(j));
  }

  return root.toSource(printOptions);
}
