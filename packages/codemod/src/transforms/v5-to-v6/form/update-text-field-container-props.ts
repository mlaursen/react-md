import { type API, type FileInfo, type Options } from "jscodeshift";

import { getPropName } from "../../utils/getPropName.js";
import { isPropBooleanExpression } from "../../utils/isPropBooleanExpression.js";
import { negateExpression } from "../../utils/negateExpression.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

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
    name: [
      "TextFieldContainer",
      "TextField",
      "TextArea",
      "Password",
      "TextFieldWithMessage",
      "TextAreaWithMessage",
      "PasswordWithMessage",
      "Select",
    ],
  }).forEach((name) => {
    root
      .findJSXElements(name)
      .find(j.JSXAttribute)
      .forEach((prop) => {
        const name = getPropName(prop);
        switch (name) {
          case "stretch":
            j(prop).remove();
            break;
          case "isLeftAddon":
          case "isRightAddon": {
            // convert `isLeftAddon`/`isRightAddon`:
            // - `isLeftAddon` -> remove
            // - `isLeftAddon={true}` -> remove
            // - `isLeftAddon={false}` -> `disableLeftAddonStyles`
            // - `isLeftAddon={isLeftAddon}` -> `disableLeftAddonStyles={!isLeftAddon}`
            // the last case just negates the value between `{}`
            if (
              !j.JSXExpressionContainer.check(prop.node.value) ||
              j.JSXEmptyExpression.check(prop.node.value.expression) ||
              (isPropBooleanExpression(prop.node) &&
                prop.node.value.expression.value)
            ) {
              j(prop).remove();
              return;
            }

            const expr = prop.node.value.expression;

            j(prop).replaceWith(
              j.jsxAttribute(
                j.jsxIdentifier(name.replace("is", "disable") + "Styles"),
                !j.BooleanLiteral.check(expr)
                  ? j.jsxExpressionContainer(
                      negateExpression({
                        j,
                        expr,
                      })
                    )
                  : null
              )
            );

            break;
          }
          case "leftChildren":
          case "rightChildren":
            // rename to `leftAddon`/`rightAddon`
            prop.node.name = j.jsxIdentifier(name.replace("Children", "Addon"));
            break;
        }
      });
  });

  return root.toSource(printOptions);
}
