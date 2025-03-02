import {
  type API,
  type FileInfo,
  type ObjectExpression,
  type ObjectMethod,
  type ObjectPattern,
  type ObjectProperty,
  type Options,
} from "jscodeshift";

import { addRelativeComment } from "../../utils/addRelativeComment";
import { createObjectProperty } from "../../utils/createObjectProperty";
import { renameImportSpecifiers } from "../../utils/renameImportSpecifiers";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  // start by updating `defaultGetErrorIcon` to accept a single options object
  traverseImportSpecifiers({
    j,
    root,
    name: "defaultGetErrorIcon",
  }).forEach((name) => {
    root
      .find(j.CallExpression, { callee: { name } })
      .forEach((callExpression) => {
        const [errorMessage, error, errorIcon] = callExpression.node.arguments;
        if (
          !j.Identifier.check(errorMessage) ||
          !j.Identifier.check(error) ||
          !j.Identifier.check(errorIcon)
        ) {
          return;
        }

        callExpression.node.arguments = [
          j.objectExpression([
            createObjectProperty({
              j,
              name: "error",
              local: error.name,
            }),
            createObjectProperty({
              j,
              name: "errorIcon",
              local: errorIcon.name,
            }),
            createObjectProperty({
              j,
              name: "errorMessage",
              local: errorMessage.name,
            }),
          ]),
        ];
      });
  });

  // next, rename some type information
  renameImportSpecifiers({
    j,
    root,
    names: {
      TextConstraints: "TextFieldValidationOptions",
      ChangeValidationBehavior: "TextFieldValidationType",
    },
  });

  // next, update the useTextField and useNumberField hooks so that
  // - they return a single object instead of an ordered array
  // - the `validateOnChange` option was renamed to `validationType`
  // - `getErrorIcon` is updated to be a single options object
  // - i'm not supporting the other changes
  ["useTextField", "useNumberField"].forEach((hookName) => {
    traverseImportSpecifiers({
      j,
      root,
      name: hookName,
    }).forEach((name) => {
      root
        .find(j.VariableDeclarator, { init: { callee: { name } } })
        .forEach((variableDeclarator) => {
          const { id, init } = variableDeclarator.node;
          if (!j.CallExpression.check(init) || !j.ArrayPattern.check(id)) {
            return;
          }

          // start by converting [value, fieldProps, { setState, reset }] into an object
          const [value, fieldProps, actionsObject] = id.elements;
          const properties: ObjectPattern["properties"] = [];

          // the value could not exist if it was:
          // const [, fieldProps] = useTextField()
          if (j.Identifier.check(value)) {
            properties.push(
              createObjectProperty({
                j,
                name: "value",
                local: value.name,
              })
            );
          }

          if (j.Identifier.check(fieldProps)) {
            properties.push(
              createObjectProperty({
                j,
                name: "fieldProps",
                local: fieldProps.name,
              })
            );
          } else {
            // I don't support `const [, { ...whatever }] = useTextField(...whatever...)`
            addRelativeComment({
              j,
              node: variableDeclarator,
              comment: "TODO: Update to destructure fieldProps",
            });
          }

          if (j.ObjectPattern.check(actionsObject)) {
            properties.push(...actionsObject.properties);
          } else if (j.Identifier.check(actionsObject)) {
            // if the actions weren't destructured, destructure the remaining
            // fields and name as that identifier
            properties.push(j.spreadProperty(actionsObject));
          }

          variableDeclarator.node.id = j.objectPattern(properties);

          // next, update the options
          const [options] = init.arguments;
          if (!j.ObjectExpression.check(options)) {
            return;
          }

          const optionProperties: ObjectExpression["properties"] = [];
          options.properties.forEach((prop) => {
            if (
              j.SpreadProperty.check(prop) ||
              j.SpreadElement.check(prop) ||
              !j.Identifier.check(prop.key)
            ) {
              optionProperties.push(prop);
              return;
            }

            const name = prop.key.name;
            // change `validateOnChange` to `validationType`
            if (name === "validateOnChange" && !j.ObjectMethod.check(prop)) {
              prop.key.name = "validationType";

              // if it is a boolean, swap to `"change"` when `true` or an empty
              // array when false
              // I don't care about supporting identifiers. just assume it's
              // the correct type otherwise
              if (j.BooleanLiteral.check(prop.value)) {
                prop.value = prop.value.value
                  ? j.literal("change")
                  : j.arrayExpression([]);
              }
            } else if (name === "getErrorIcon") {
              let params: ObjectMethod["params"] | undefined;
              let body: ObjectMethod["body"]["body"] | undefined;

              // getErrorIcon(errorMessage, error, errorIcon) { ... },
              if (j.ObjectMethod.check(prop)) {
                ({ params } = prop);
                ({ body } = prop.body);
              } else if (
                // getErrorIcon: (errorMessage, error, errorIcon) => ...
                j.ArrowFunctionExpression.check(prop.value) ||
                j.FunctionExpression.check(prop.value)
              ) {
                ({ params } = prop.value);

                // it is () => { ... }
                if (j.BlockStatement.check(prop.value.body)) {
                  body = prop.value.body.body;
                } else if (
                  // it is `() => null` or similar renderable result
                  j.Identifier.check(prop.value.body) ||
                  j.NullLiteral.check(prop.value.body) ||
                  j.StringLiteral.check(prop.value.body) ||
                  j.UnaryExpression.check(prop.value.body) ||
                  j.BinaryExpression.check(prop.value.body) ||
                  j.ConditionalExpression.check(prop.value.body) ||
                  j.JSXFragment.check(prop.value.body) ||
                  j.JSXElement.check(prop.value.body)
                ) {
                  body = [j.returnStatement(prop.value.body)];
                }
              }

              if (!params || !body) {
                optionProperties.push(prop);
                return;
              }

              const [errorMessage, error, errorIcon] = params;
              const properties: ObjectProperty[] = [];
              if (j.Identifier.check(error)) {
                properties.push(
                  createObjectProperty({
                    j,
                    name: "error",
                    local: error.name,
                  })
                );
              }

              if (j.Identifier.check(errorIcon)) {
                properties.push(
                  createObjectProperty({
                    j,
                    name: "errorIcon",
                    local: errorIcon.name,
                  })
                );
              }

              if (j.Identifier.check(errorMessage)) {
                properties.push(
                  createObjectProperty({
                    j,
                    name: "errorMessage",
                    local: errorMessage.name,
                  })
                );
              }

              optionProperties.push(
                j.objectProperty(
                  j.identifier(name),
                  j.arrowFunctionExpression(
                    [j.identifier("options")],
                    j.blockStatement([
                      j.variableDeclaration("const", [
                        j.variableDeclarator(
                          j.objectPattern(properties),
                          j.identifier("options")
                        ),
                      ]),
                      ...body,
                    ])
                  )
                )
              );
              return;
            }

            optionProperties.push(prop);
          });

          options.properties = optionProperties;
        });
    });
  });

  return root.toSource(printOptions);
}
