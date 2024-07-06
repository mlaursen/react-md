import { type API, type FileInfo, type Options } from "jscodeshift";
import { getObjectPropertyName } from "../../utils/getObjectPropertyName";
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
    name: "useResizeListener",
  }).forEach((name) => {
    root
      .find(j.CallExpression, { callee: { name } })
      .forEach((callExpression) => {
        const [options] = callExpression.node.arguments;
        if (j.Identifier.check(options)) {
          const enabled = j.memberExpression(options, j.identifier("enabled"));
          const vars = ["once", "signal", "capture", "passive"];
          // vars.forEach((name) => {
          //   properties.push(
          //     j.objectProperty(
          //       j.identifier(name),
          //       j.memberExpression(property.argument, j.identifier(name))
          //     )
          //   );
          // });
          callExpression.node.arguments = [
            j.objectExpression([
              j.objectProperty(
                j.identifier("onUpdate"),
                j.memberExpression(options, j.identifier("onResize"))
              ),
              j.objectProperty(
                j.identifier("disabled"),
                j.logicalExpression(
                  "&&",
                  j.binaryExpression(
                    "===",
                    j.unaryExpression("typeof", enabled),
                    j.stringLiteral("boolean")
                  ),
                  j.unaryExpression("!", enabled)
                )
              ),
              ...vars.map((name) =>
                j.objectProperty(
                  j.identifier(name),
                  j.memberExpression(options, j.identifier(name))
                )
              ),
            ]),
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
                    j.spreadElement(
                      j.conditionalExpression(
                        j.binaryExpression(
                          "===",
                          j.unaryExpression("typeof", value),
                          j.stringLiteral("boolean")
                        ),
                        j.objectExpression([
                          j.objectProperty(j.identifier("capture"), value),
                        ]),
                        value
                      )
                    )
                  );
                }
                break;
            }
          }

          if (
            j.SpreadElement.check(property) &&
            j.Identifier.check(property.argument)
          ) {
            const enabled = j.memberExpression(
              property.argument,
              j.identifier("enabled")
            );
            properties.push(
              j.objectProperty(
                j.identifier("onUpdate"),
                j.memberExpression(property.argument, j.identifier("onResize"))
              ),
              j.objectProperty(
                j.identifier("disabled"),
                j.logicalExpression(
                  "&&",
                  j.binaryExpression(
                    "===",
                    j.unaryExpression("typeof", enabled),
                    j.stringLiteral("boolean")
                  ),
                  j.unaryExpression("!", enabled)
                )
              )
            );
            const vars = ["once", "signal", "capture", "passive"];
            vars.forEach((name) => {
              properties.push(
                j.objectProperty(
                  j.identifier(name),
                  j.memberExpression(property.argument, j.identifier(name))
                )
              );
            });
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
    //
  });

  // const isResizeListenerInFile =
  //   traverseImportSpecifiers({
  //     j,
  //     root,
  //     name: "ResizeListener",
  //     remove: true,
  //   }).size > 0;
  // if (isResizeListenerInFile) {
  //   addImportSpecifier({});
  // }

  return root.toSource(printOptions);
}
