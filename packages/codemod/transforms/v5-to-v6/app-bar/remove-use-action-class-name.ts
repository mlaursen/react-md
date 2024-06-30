import {
  type API,
  type FileInfo,
  type Identifier,
  type ObjectExpression,
  type ObjectProperty,
  type Options,
} from "jscodeshift";
import { removeEmptyImportDeclaration } from "../../utils/removeEmptyImportDeclaration";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const names = traverseImportSpecifiers({
    j,
    root,
    name: "useActionClassName",
    remove: true,
  });

  if (names.size) {
    // if the names exist, find their calls to figure out how to remove the code
    root
      .find(
        j.CallExpression,
        (path) =>
          path.callee.type === "Identifier" && names.has(path.callee.name)
      )
      .forEach((callExpression) => {
        const node = j(callExpression);

        // the only hook option that can be used as a replacement is the
        // `className`, so try to see if there are any arguments and the
        // className exists
        const className = callExpression.node.arguments
          .find(
            (arg): arg is ObjectExpression => arg.type === "ObjectExpression"
          )
          ?.properties.find(
            (
              prop
            ): prop is ObjectProperty & {
              key: Identifier;
              value: Identifier;
            } =>
              prop.type === "ObjectProperty" &&
              prop.key.type === "Identifier" &&
              prop.key.name === "className"
          )?.value;

        // the transforms/removals needs to happen in order or else it'll cause
        // issues
        if (className) {
          let replaced = false;
          // Start by updating objects that were using the hook to just have a
          // value of the `className`
          node.closest(j.ObjectProperty).forEach((objectProperty) => {
            replaced = true;
            objectProperty.node.value = className;
          });

          if (!replaced) {
            // If the hook wasn't used in an object, try to see if it was set to
            // a variable and just set the variable to the className if it was
            node.closest(j.VariableDeclarator).forEach((variableDeclarator) => {
              replaced = true;
              j(variableDeclarator).replaceWith(
                j.variableDeclarator.from({
                  ...variableDeclarator.node,
                  init: className,
                })
              );
            });
          }

          if (!replaced) {
            // If the hook wasn't used in an object or set to a variable, it was
            // most likely used a component prop, so just swap the expression
            // statement with the className
            node
              .closest(j.JSXExpressionContainer)
              .forEach((jsxExpressionContainer) => {
                replaced = true;
                j(jsxExpressionContainer).replaceWith(
                  j.jsxExpressionContainer(className)
                );
              });
          }
        } else {
          // If there wasn't a className, it's a bit trickier since we need to
          // remove more code
          //
          // Start by updating objects that were using the hook to just delete
          // the property
          let replaced = false;
          node.closest(j.ObjectProperty).forEach((objectProperty) => {
            replaced = true;
            j(objectProperty).remove();
          });

          if (!replaced) {
            // If it wasn't used in an object, try to see if it was used as a
            // variable. If it was used as a variable:
            // - determine what the variable name is
            // - remove the entire variable declarator statement
            // - find the scope for where the hook was called to search for any
            //   references for that variable
            //   - the variable must not be a key for an object property or a
            //     JSX Property Identifier
            node
              .closest(j.VariableDeclarator)
              .forEach((variableDeclarator) => {
                const { id } = variableDeclarator.node;
                const name = (id.type === "Identifier" && id.name) || "";

                j(variableDeclarator)
                  .closestScope()
                  .find(j.Identifier, { name })
                  .forEach((identifier) => {
                    const i = j(identifier);
                    if (
                      !i.closest(j.ObjectProperty).length &&
                      i.closest(j.JSXExpressionContainer).length
                    ) {
                      replaced = true;
                      i.closest(j.JSXAttribute).remove();
                    }
                  });
              })
              .remove();
          }

          if (!replaced) {
            // If it wasn't used in an object or a variable, it was most likely
            // used as a component prop and should be removed
            node.closest(j.JSXExpressionContainer).forEach((expr) => {
              j(expr)
                .closest(j.JSXAttribute)
                .forEach((jsxAttribute) => {
                  replaced = true;
                  j(jsxAttribute).remove();
                });
            });
          }
        }
      });
  }

  removeEmptyImportDeclaration({ j, root });

  return root.toSource(printOptions);
}
