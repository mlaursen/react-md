import {
  type API,
  type BinaryExpression,
  type BlockStatement,
  type BooleanLiteral,
  type FileInfo,
  type Identifier,
  type JSCodeshift,
  type JSXOpeningElement,
  type LogicalExpression,
  type ObjectExpression,
  type ObjectProperty,
  type Options,
  type UnaryExpression,
} from "jscodeshift";

import { type ExpressionKind, type JSXAttributes } from "../../types";
import { addFileComments } from "../../utils/addFileComment";
import { addRelativeComment } from "../../utils/addRelativeComment";
import { getObjectPropertyJSXValue } from "../../utils/getObjectPropertyJSXValue";
import { getObjectPropertyName } from "../../utils/getObjectPropertyName";
import { removeVariableReferences } from "../../utils/removeVariableReferences";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

const COMMENT_PREFIX = "TODO: The `useContextMenu` no longer";

type DisableFocusType =
  | Identifier
  | BooleanLiteral
  | LogicalExpression
  | BinaryExpression
  | UnaryExpression;

const isDisableFocusType = (
  j: JSCodeshift,
  value: ObjectProperty["value"]
): value is DisableFocusType =>
  j.Identifier.check(value) ||
  j.BooleanLiteral.check(value) ||
  j.LogicalExpression.check(value) ||
  j.BinaryExpression.check(value) ||
  j.UnaryExpression.check(value);

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
    name: "useContextMenu",
  }).forEach((name) => {
    root
      .find(j.VariableDeclarator, {
        init: { callee: { name } },
      })
      .forEach((variableDeclarator) => {
        const { id, init } = variableDeclarator.node;
        if (!j.CallExpression.check(init)) {
          return;
        }

        if (!j.ObjectPattern.check(id)) {
          addRelativeComment({
            j,
            node: variableDeclarator,
            comment:
              "TODO: Unable to convert the `useContextMenu` to the latest API since it does not destructure the arguments.",
          });
          return;
        }

        // start by handling the destructured result
        const scope = j(variableDeclarator).closestScope();
        let menuPropsLocalName = "";
        j(id)
          .find(j.ObjectProperty)
          .forEach((property) => {
            const name = getObjectPropertyName(property.node);
            const isSetCoords = name === "setCoords";
            const isMenuNodeRef = name === "menuNodeRef";
            if (name === "menuProps") {
              menuPropsLocalName = getObjectPropertyName(property.node, true);
            }

            if (name === "menuRef" || isSetCoords || isMenuNodeRef) {
              if (isSetCoords || isMenuNodeRef) {
                const suffix = isMenuNodeRef
                  ? " and must be implemented manually"
                  : ". Manually provide an `initialX` and `initialY` to the `Menu` instead";
                comments.add(`${COMMENT_PREFIX} returns \`${name}\`${suffix}`);
              }

              removeVariableReferences({
                j,
                name,
                scope,
              });
              j(property).remove();
            }
          });
        if (
          !menuPropsLocalName ||
          !j.ObjectExpression.check(init.arguments[0])
        ) {
          return;
        }

        // next, move and/or delete options that are no longer valid to the Menu
        const menuProps: JSXAttributes = [];
        const options = init.arguments[0];
        const properties: ObjectExpression["properties"] = [];

        let disableFocusOnMount: DisableFocusType | undefined;
        let disableFocusOnUnmount: DisableFocusType | undefined;
        options.properties.forEach((prop) => {
          if (!(j.ObjectProperty.check(prop) || j.ObjectMethod.check(prop))) {
            return;
          }

          const name = getObjectPropertyName(prop);
          if (
            name === "anchor" ||
            name === "menuLabel" ||
            name === "onContextMenu" ||
            name === "preventScroll"
          ) {
            properties.push(prop);
            return;
          }

          if (
            name === "onFixedPositionResize" ||
            name === "onFixedPositionScroll"
          ) {
            comments.add(`${COMMENT_PREFIX} supports the \`${name}\` callback`);
            return;
          }

          if (name === "menuitem") {
            // no comments required for this one
            return;
          }

          let propName: string;
          switch (name) {
            case "baseId":
              propName = "id";
              break;
            case "closeOnResize":
            case "closeOnScroll":
            case "horizontal":
            case "onEnter":
            case "onEntering":
            case "onEntered":
            case "onExited":
            case "style":
            case "getFixedPositionOptions":
              propName = name;
              break;
            case "fixedPositionOptions":
              propName = "getFixedPositionOptions";
              break;
            case "disableFocusOnMount":
              if (
                !j.ObjectMethod.check(prop) &&
                isDisableFocusType(j, prop.value)
              ) {
                disableFocusOnMount = prop.value;
              }
              return;
            case "disableFocusOnUnmount":
              if (
                !j.ObjectMethod.check(prop) &&
                isDisableFocusType(j, prop.value)
              ) {
                disableFocusOnUnmount = prop.value;
              }
              return;
            default:
              return;
          }

          menuProps.push(
            j.jsxAttribute(
              j.jsxIdentifier(propName),
              getObjectPropertyJSXValue({ j, prop })
            )
          );
        });
        options.properties = properties;

        const isMount = j.binaryExpression(
          "===",
          j.identifier("type"),
          j.stringLiteral("mount")
        );
        const isUnmount = j.binaryExpression(
          "===",
          j.identifier("type"),
          j.stringLiteral("unmount")
        );
        let body: ExpressionKind | BlockStatement | undefined;
        if (disableFocusOnMount && disableFocusOnUnmount) {
          body = j.blockStatement([
            j.ifStatement(
              isMount,
              j.blockStatement([j.returnStatement(disableFocusOnMount)])
            ),
            j.ifStatement(
              isUnmount,
              j.blockStatement([j.returnStatement(disableFocusOnUnmount)])
            ),
            j.returnStatement(j.booleanLiteral(false)),
          ]);
        } else if (disableFocusOnMount) {
          body = j.logicalExpression("&&", isMount, disableFocusOnMount);
        } else if (disableFocusOnUnmount) {
          body = j.logicalExpression("&&", isUnmount, disableFocusOnUnmount);
        }

        if (body) {
          menuProps.push(
            j.jsxAttribute(
              j.jsxIdentifier("isFocusTypeDisabled"),
              j.jsxExpressionContainer(
                j.arrowFunctionExpression([j.identifier("type")], body)
              )
            )
          );
        }

        root
          .find(j.JSXSpreadAttribute, {
            argument: { name: menuPropsLocalName },
          })
          .forEach((spread) => {
            const menuComponent: JSXOpeningElement = spread.parentPath.node;
            menuComponent.attributes?.push(...menuProps);
          });
      });
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
