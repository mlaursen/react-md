import {
  type API,
  type FileInfo,
  type ObjectExpression,
  type Options,
} from "jscodeshift";

import { addFileComments } from "../../utils/addFileComment.js";
import { addRelativeComment } from "../../utils/addRelativeComment.js";
import { getPropName } from "../../utils/getPropName.js";
import { renameImportSpecifiers } from "../../utils/renameImportSpecifiers.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

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
      SliderAddons: "SliderAddonProps",
      RangeSlider: "Slider",
    },
  });

  const comments = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "Slider",
  }).forEach((name) => {
    root.findJSXElements(name).forEach((slider) => {
      j(slider)
        .find(j.JSXAttribute)
        .forEach((attr) => {
          if (j.JSXSpreadAttribute.check(attr)) {
            return;
          }

          const name = getPropName(attr);
          switch (name) {
            case "baseId":
              attr.node.name.name = "id";
              break;
            case "label":
              comments.add(
                "TODO: Unable to automatically convert the `Slider` label prop"
              );
              break;
            case "labelProps":
              comments.add(
                "TODO: Unable to automatically convert the `Slider` labelProps prop"
              );
              break;
            case "beforeAddon":
            case "minimum":
            case "maximum":
            case "increment":
            case "incrementJump":
            case "decrement":
            case "decrementJump":
            case "persist":
              j(attr).remove();
              break;
          }
        });
    });
  });

  traverseImportSpecifiers({
    j,
    root,
    name: "useSlider",
  }).forEach((name) => {
    root
      .find(j.VariableDeclarator, {
        id: { type: "ArrayPattern" },
        init: { callee: { name } },
      })
      .forEach((variableDeclarator) => {
        const { id, init } = variableDeclarator.node;
        if (!j.ArrayPattern.check(id) || !j.CallExpression.check(init)) {
          return;
        }

        if (init.arguments.length) {
          const [defaultValue, options] = init.arguments;
          const properties: ObjectExpression["properties"] = [];
          if (
            j.Identifier.check(defaultValue) ||
            j.NumericLiteral.check(defaultValue) ||
            j.Literal.check(defaultValue)
          ) {
            properties.push(
              j.objectProperty(j.identifier("defaultValue"), defaultValue)
            );
          }

          if (j.ObjectExpression.check(options)) {
            properties.push(...options.properties);
          }
          init.arguments = [j.objectExpression(properties)];
        }

        const [value, controls] = id.elements;
        if (!j.Identifier.check(controls)) {
          comments.add(
            "TODO: Unable to convert the useRangeSlider hook controls"
          );
          return;
        }

        j(variableDeclarator).replaceWith(j.variableDeclarator(controls, init));
        if (j.Identifier.check(value)) {
          j(variableDeclarator)
            .closest(j.VariableDeclaration)
            .insertAfter(
              j.variableDeclaration("const", [
                j.variableDeclarator(
                  value,
                  j.memberExpression(controls, j.identifier("value"))
                ),
              ])
            );
        }
      });
  });
  traverseImportSpecifiers({
    j,
    root,
    name: "useRangeSlider",
  }).forEach((name) => {
    root
      .find(j.VariableDeclarator, {
        id: { type: "ArrayPattern" },
        init: { callee: { name } },
      })
      .forEach((variableDeclarator) => {
        const { id, init } = variableDeclarator.node;
        if (!j.ArrayPattern.check(id) || !j.CallExpression.check(init)) {
          return;
        }

        if (init.arguments.length) {
          const [defaultValue, options] = init.arguments;
          const properties: ObjectExpression["properties"] = [];
          if (
            j.Identifier.check(defaultValue) ||
            j.ArrayExpression.check(defaultValue)
          ) {
            properties.push(
              j.objectProperty(j.identifier("defaultValue"), defaultValue)
            );
          }

          if (j.ObjectExpression.check(options)) {
            properties.push(...options.properties);
          }
          init.arguments = [j.objectExpression(properties)];
        }

        const [value, controls] = id.elements;
        if (!j.Identifier.check(controls)) {
          comments.add(
            "TODO: Unable to convert the useRangeSlider hook controls"
          );
          return;
        }

        j(variableDeclarator).replaceWith(j.variableDeclarator(controls, init));
        if (j.ArrayPattern.check(value)) {
          j(variableDeclarator)
            .closest(j.VariableDeclaration)
            .insertAfter(
              j.variableDeclaration("const", [
                j.variableDeclarator(
                  value,
                  j.memberExpression(controls, j.identifier("rangeValue"))
                ),
              ])
            );
        } else {
          addRelativeComment({
            j,
            node: variableDeclarator,
            comment: "TODO: Get the range values from `controls.rangeValue`",
          });
        }
      });
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
