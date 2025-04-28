import {
  type API,
  type FileInfo,
  type Identifier,
  type JSCodeshift,
  type JSXAttribute,
  type JSXExpressionContainer,
  type ObjectExpression,
  type ObjectProperty,
  type Options,
} from "jscodeshift";

import { type ExpressionKind, type JSXAttributes } from "../../../types.js";
import { addFileComments } from "../../utils/addFileComment.js";
import { getPropName } from "../../utils/getPropName.js";
import { isJsxExpressionContainer } from "../../utils/isJsxExpressionContainer.js";
import { isPropBooleanExpression } from "../../utils/isPropBooleanExpression.js";
import { isPropEnabled } from "../../utils/isPropEnabled.js";
import { negateExpression } from "../../utils/negateExpression.js";
import { removeEmptyImportDeclaration } from "../../utils/removeEmptyImportDeclaration.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

function isPropExpressionKind(
  j: JSCodeshift,
  attr: JSXAttribute
): attr is JSXAttribute & {
  value: JSXExpressionContainer & {
    expression: ExpressionKind;
  };
} {
  return (
    j.JSXExpressionContainer.check(attr.value) &&
    !j.JSXExpressionContainer.check(attr.value.expression) &&
    (!j.BooleanLiteral.check(attr.value.expression) ||
      !attr.value.expression.value)
  );
}

const toExpression = (
  j: JSCodeshift,
  value: ExpressionKind | true | undefined
): ExpressionKind =>
  value === true || value === undefined ? j.literal(value === true) : value;

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const comments = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: ["Dialog", "FixedDialog"],
  }).forEach((name) => {
    const isFixedDialog = name === "FixedDialog";
    root.findJSXElements(name).forEach((jsxElement) => {
      let overlayProps: ObjectExpression | Identifier | undefined;
      let overlayHidden: ExpressionKind | true | undefined;
      let overlayStyle: ExpressionKind | undefined;
      let overlayClassName: ExpressionKind | undefined;
      let containerStyle: ExpressionKind | undefined;
      let containerClassName: ExpressionKind | undefined;
      let disableFocusOnMount: ExpressionKind | true | undefined;
      let disableFocusContainer: ExpressionKind | true | undefined;
      let disableTabFocusWrap: ExpressionKind | true | undefined;
      let disableFocusOnUnmount: ExpressionKind | true | undefined;
      const props: JSXAttributes = [];

      jsxElement.node.openingElement.attributes?.forEach((attr) => {
        if (!j.JSXAttribute.check(attr)) {
          props.push(attr);
          return;
        }

        const name = getPropName(attr);
        switch (name) {
          // convert:
          // - `overlay`/`overlay={true}` -> nothing
          // - `overlay={false}` to `disableOverlay`
          // - `overlay={someFlag}` to `disableOverlay={!someFlag}`
          case "overlay": {
            if (
              !isJsxExpressionContainer(j, attr.value) ||
              isPropEnabled(attr)
            ) {
              return;
            }

            let value: JSXExpressionContainer | null = null;
            if (!isPropBooleanExpression(attr)) {
              value = j.jsxExpressionContainer(
                negateExpression({ j, expr: attr.value.expression })
              );
            }

            props.push(
              j.jsxAttribute(j.jsxIdentifier("disableOverlay"), value)
            );
            break;
          }
          case "defaultFocus":
            comments.add(
              "TODO: A `Dialog` set the `defaultFocus` but that is no longer supported. Enable the `autoFocus` prop on the target element instead."
            );
            break;

          // remove
          case "component":
          case "forceContainer":
          case "disableNestedDialogFixes":
          case "disableFocusCache":
          case "unmountFocusFallback":
          case "disableFocusOnMountScroll":
            break;
          case "disableFocusContainer":
            if (isPropEnabled(attr)) {
              disableFocusContainer = true;
            } else if (isPropExpressionKind(j, attr)) {
              disableFocusContainer = attr.value.expression;
            }

            break;
          case "disableFocusOnMount":
            if (isPropEnabled(attr)) {
              disableFocusOnMount = true;
            } else if (isPropExpressionKind(j, attr)) {
              disableFocusOnMount = attr.value.expression;
            }
            break;
          case "disableFocusOnUnmount":
            if (isPropEnabled(attr)) {
              disableFocusOnUnmount = true;
            } else if (isPropExpressionKind(j, attr)) {
              disableFocusOnUnmount = attr.value.expression;
            }
            break;
          case "disableTabFocusWrap":
            if (isPropEnabled(attr)) {
              disableTabFocusWrap = true;
            } else if (isPropExpressionKind(j, attr)) {
              disableTabFocusWrap = attr.value.expression;
            }
            break;

          case "containerStyle":
            if (isPropExpressionKind(j, attr)) {
              containerStyle = attr.value.expression;
            }
            break;
          case "containerClassName":
            if (isPropExpressionKind(j, attr)) {
              containerClassName = attr.value.expression;
            } else if (j.StringLiteral.check(attr.value)) {
              containerClassName = attr.value;
            }
            break;
          case "overlayStyle":
            if (isPropExpressionKind(j, attr)) {
              overlayStyle = attr.value.expression;
            }
            break;
          case "overlayClassName":
            if (isPropExpressionKind(j, attr)) {
              overlayClassName = attr.value.expression;
            } else if (j.StringLiteral.check(attr.value)) {
              overlayClassName = attr.value;
            }
            break;
          case "overlayHidden":
            if (isPropEnabled(attr)) {
              overlayHidden = true;
            } else if (isPropExpressionKind(j, attr)) {
              overlayHidden = attr.value.expression;
            }
            break;
          case "overlayProps":
            if (
              isPropExpressionKind(j, attr) &&
              (j.Identifier.check(attr.value.expression) ||
                j.ObjectExpression.check(attr.value.expression))
            ) {
              overlayProps = attr.value.expression;
            }
            break;
          case "getOptions":
            if (isFixedDialog) {
              attr.name = j.jsxIdentifier("getFixedPositionOptions");
              props.push(attr);
            }
            break;
          default:
            props.push(attr);
        }
      });

      if (overlayStyle || overlayClassName || overlayHidden) {
        let resolved: ObjectExpression;
        if (j.ObjectExpression.check(overlayProps)) {
          resolved = overlayProps;
        } else if (overlayProps) {
          resolved = j.objectExpression([j.spreadProperty(overlayProps)]);
        } else {
          resolved = j.objectExpression([]);
        }

        if (overlayHidden) {
          resolved.properties.push(
            j.objectProperty(
              j.identifier("noOpacity"),
              toExpression(j, overlayHidden)
            )
          );
        }

        if (overlayStyle) {
          resolved.properties.push(
            j.objectProperty(j.identifier("style"), overlayStyle)
          );
        }

        if (overlayClassName) {
          resolved.properties.push(
            j.objectProperty(j.identifier("className"), overlayClassName)
          );
        }

        props.push(
          j.jsxAttribute(
            j.jsxIdentifier("overlayProps"),
            j.jsxExpressionContainer(resolved)
          )
        );
      }

      if (containerStyle || containerClassName) {
        const attrs: ObjectProperty[] = [];
        if (containerStyle) {
          attrs.push(j.objectProperty(j.identifier("style"), containerStyle));
        }
        if (containerClassName) {
          attrs.push(
            j.objectProperty(j.identifier("className"), containerClassName)
          );
        }

        props.push(
          j.jsxAttribute(
            j.jsxIdentifier("containerProps"),
            j.jsxExpressionContainer(j.objectExpression(attrs))
          )
        );
      }

      if (
        disableFocusContainer ||
        (disableTabFocusWrap === true &&
          disableFocusOnMount === true &&
          disableFocusOnUnmount === true)
      ) {
        props.push(
          j.jsxAttribute(
            j.jsxIdentifier("isFocusTypeDisabled"),
            j.jsxExpressionContainer(
              j.arrowFunctionExpression(
                [],
                toExpression(j, disableFocusContainer || true)
              )
            )
          )
        );
      } else if (
        disableFocusOnMount ||
        disableFocusOnUnmount ||
        disableTabFocusWrap
      ) {
        props.push(
          j.jsxAttribute(
            j.jsxIdentifier("isFocusTypeDisabled"),
            j.jsxExpressionContainer(
              j.arrowFunctionExpression(
                [j.identifier("focusType")],
                j.blockStatement([
                  j.ifStatement(
                    j.binaryExpression(
                      "===",
                      j.identifier("focusType"),
                      j.literal("mount")
                    ),
                    j.blockStatement([
                      j.returnStatement(toExpression(j, disableFocusOnMount)),
                    ])
                  ),
                  j.ifStatement(
                    j.binaryExpression(
                      "===",
                      j.identifier("focusType"),
                      j.literal("mount")
                    ),
                    j.blockStatement([
                      j.returnStatement(toExpression(j, disableFocusOnMount)),
                    ])
                  ),

                  j.returnStatement(toExpression(j, disableTabFocusWrap)),
                ])
              )
            )
          )
        );
      }

      jsxElement.node.openingElement.attributes = props;
    });
  });

  removeEmptyImportDeclaration({
    j,
    root,
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
