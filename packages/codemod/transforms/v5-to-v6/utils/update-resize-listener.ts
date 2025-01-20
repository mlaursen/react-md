import {
  type API,
  type FileInfo,
  type Identifier,
  type JSCodeshift,
  type ObjectProperty,
  type Options,
  type SpreadElement,
} from "jscodeshift";

import { type ObjectPropertyKind } from "../../types";
import { addImportSpecifier } from "../../utils/addImportSpecifier";
import { getObjectPropertyName } from "../../utils/getObjectPropertyName";
import { getPropName } from "../../utils/getPropName";
import { insertHookIntoComponent } from "../../utils/insertHookIntoComponent";
import { isJsxExpressionContainer } from "../../utils/isJsxExpressionContainer";
import { isTypeOfExpression } from "../../utils/isTypeOfExpression";
import { negateExpression } from "../../utils/negateExpression";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

const ADD_EVENT_LISTENER_KEYS = ["once", "signal", "capture", "passive"];

function convertEnabledToDisabled(
  j: JSCodeshift,
  identifier: Identifier
): ObjectProperty {
  const enabled = j.memberExpression(identifier, j.identifier("enabled"));
  return j.objectProperty(
    j.identifier("disabled"),
    j.logicalExpression(
      "&&",
      isTypeOfExpression({
        j,
        type: "boolean",
        value: enabled,
      }),
      j.unaryExpression("!", enabled)
    )
  );
}

/**
 * Creates:
 *
 * ...(typeof thing === 'boolean' ? { capture: thing } : thing)
 */
function createTypeofCaptureSpread(
  j: JSCodeshift,
  identifier: Identifier
): SpreadElement {
  return j.spreadElement(
    j.conditionalExpression(
      isTypeOfExpression({
        j,
        type: "boolean",
        value: identifier,
      }),
      j.objectExpression([
        j.objectProperty(j.identifier("capture"), identifier),
      ]),
      identifier
    )
  );
}

interface ExtractOptionsFromIdentifierOptions {
  j: JSCodeshift;
  identifier: Identifier;
}

function getOptionsFromIdentifier(
  options: ExtractOptionsFromIdentifierOptions
): ObjectPropertyKind[] {
  const { j, identifier } = options;

  return [
    j.objectProperty(
      j.identifier("onUpdate"),
      j.memberExpression(identifier, j.identifier("onResize"))
    ),
    convertEnabledToDisabled(j, identifier),
    ...ADD_EVENT_LISTENER_KEYS.map((name) =>
      j.objectProperty(
        j.identifier(name),
        j.memberExpression(identifier, j.identifier(name))
      )
    ),
  ];
}

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
    name: "useResizeListener",
  }).forEach((name) => {
    root
      .find(j.CallExpression, { callee: { name } })
      .forEach((callExpression) => {
        const [options] = callExpression.node.arguments;
        if (j.Identifier.check(options)) {
          callExpression.node.arguments = [
            j.objectExpression(
              getOptionsFromIdentifier({
                j,
                identifier: options,
              })
            ),
          ];
          return;
        }

        if (!j.ObjectExpression.check(options)) {
          return;
        }

        const properties: typeof options.properties = [];
        let spreadCount = 0;
        options.properties.forEach((property) => {
          if (j.ObjectProperty.check(property)) {
            const name = getObjectPropertyName(property);
            const value = property.value;
            switch (name) {
              case "onResize":
                properties.push(
                  j.objectProperty.from({
                    ...property,
                    key: j.identifier("onUpdate"),
                  })
                );
                break;
              case "enabled": {
                if (j.BooleanLiteral.check(value) && !value.value) {
                  properties.push(
                    j.objectProperty.from({
                      ...property,
                      key: j.identifier("disabled"),
                      value: j.booleanLiteral(true),
                    })
                  );
                } else if (
                  j.Identifier.check(value) ||
                  j.UnaryExpression.check(value) ||
                  j.LogicalExpression.check(value)
                ) {
                  properties.push(
                    j.objectProperty.from({
                      ...property,
                      key: j.identifier("disabled"),
                      value: j.unaryExpression("!", value),
                    })
                  );
                }
                break;
              }
              case "options":
                if (j.BooleanLiteral.check(value)) {
                  properties.push(
                    j.objectProperty.from({
                      ...property,
                      key: j.identifier("capture"),
                      value,
                    })
                  );
                } else if (j.ObjectExpression.check(value)) {
                  properties.push(...value.properties);
                } else if (j.Identifier.check(value)) {
                  // this must be first
                  properties.splice(
                    spreadCount++,
                    0,
                    createTypeofCaptureSpread(j, value)
                  );
                }
                break;
            }
          }

          if (
            j.SpreadElement.check(property) &&
            j.Identifier.check(property.argument)
          ) {
            properties.push(
              ...getOptionsFromIdentifier({
                j,
                identifier: property.argument,
              })
            );
            return;
          }

          if (
            j.ObjectMethod.check(property) &&
            j.Identifier.check(property.key) &&
            property.key.name === "onResize"
          ) {
            properties.push(
              j.objectMethod.from({
                ...property,
                key: j.identifier("onUpdate"),
              })
            );
            return;
          }
        });
        options.properties = properties;
      });
  });
  traverseImportSpecifiers({
    j,
    root,
    name: "ResizeListener",
    remove: true,
  }).forEach((name) => {
    addImportSpecifier({
      j,
      root,
      name: "useResizeListener",
    });

    root
      .find(j.JSXElement, { openingElement: { name: { name } } })
      .forEach((jsxElement) => {
        const options: ObjectPropertyKind[] = [];
        jsxElement.node.openingElement.attributes?.forEach((attr) => {
          if (
            j.JSXSpreadAttribute.check(attr) &&
            j.Identifier.check(attr.argument)
          ) {
            options.push(
              ...getOptionsFromIdentifier({
                j,
                identifier: attr.argument,
              })
            );
          } else if (
            j.JSXAttribute.check(attr) &&
            isJsxExpressionContainer(j, attr.value)
          ) {
            const name = getPropName(attr);
            const value = attr.value.expression;
            if (name === "onResize") {
              options.push(j.objectProperty(j.identifier("onUpdate"), value));
            } else if (name === "options") {
              if (j.Identifier.check(value)) {
                options.push(createTypeofCaptureSpread(j, value));
              } else if (j.ObjectExpression.check(value)) {
                options.push(...value.properties);
              }
            }
          }
        });

        const isInJsxElement = j(jsxElement).closest(j.JSXElement).length;
        const expressionContainer = j(jsxElement).closest(
          j.JSXExpressionContainer
        );
        const node =
          expressionContainer.length && expressionContainer.get()?.node;
        // check if the ResizeListener is an a jsx expression like:
        // {enabled && <ResizeListener />}
        // {enabled && <CustomWrapper><ResizeListener /></CustomWrapper>}
        // {someFlag ? <ResizeListener /> : null}
        // {someFlag ? null : <ResizeListener />}
        // {someFlag ? <ResizeListener /> : <OtherJsx />}
        // {someFlag ? <OtherJsx /> : <ResizeListener />}
        // etc
        if (
          !isInJsxElement &&
          expressionContainer.length &&
          j.JSXExpressionContainer.check(node)
        ) {
          const expr = node.expression;

          // if it is:
          // {someFlag && <ResizeListener />}
          // {someFlag && <OtherContent><ResizeListener /></OtherContent>}
          // {someFlag || <ResizeListener />}
          // {something ?? <ResizeListener />}
          // etc...
          //
          // set that to the disable flag
          if (j.LogicalExpression.check(expr)) {
            options.push(
              j.objectProperty(
                j.identifier("disabled"),
                negateExpression({ j, expr })
              )
            );
          } else if (j.ConditionalExpression.check(expr)) {
            // if it is:
            // {something ? <ResizeListener /> : <OtherContent />}
            // {something ? <ResizeListener /> : null}
            // {something ? null : <OtherContent><ResizeListener /></OtherContent>}
            // etc...
            //
            // Try to figure out if ResizeListener is the `consequent` or
            // `alternate` in that check. If it is the `consequent`, `something`
            // should be negated otherwise it is the boolean checker for
            // `disabled`
            if (
              j(expr.consequent).find(j.JSXElement, {
                openingElement: { name: { name } },
              }).length
            ) {
              options.push(
                j.objectProperty(
                  j.identifier("disabled"),
                  negateExpression({ j, expr: expr.test })
                )
              );
            } else {
              options.push(
                j.objectProperty(j.identifier("disabled"), expr.test)
              );
            }
          }
          expressionContainer.remove();
        } else {
          j(jsxElement).remove();
        }

        insertHookIntoComponent({
          j,
          name: "useResizeListener",
          args: [j.objectExpression(options)],
          from: jsxElement,
        });
      });
  });

  return root.toSource(printOptions);
}
