import {
  type API,
  type FileInfo,
  type JSXAttribute,
  type JSXSpreadAttribute,
  type Options,
} from "jscodeshift";

import { createJsxAttributeFromBoolean } from "../../utils/createJsxAttributeFromBoolean.js";
import { getPropName } from "../../utils/getPropName.js";
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
    name: "CardTitle",
  }).forEach((name) => {
    root.findJSXElements(name).forEach((cardTitle) => {
      const attributes: (JSXAttribute | JSXSpreadAttribute)[] = [];
      cardTitle.node.openingElement.attributes?.forEach((attr) => {
        if (attr.type !== "JSXAttribute") {
          attributes.push(attr);
          return;
        }

        const name = getPropName(attr);
        switch (name) {
          case "noWrap": {
            const jsxAttr = createJsxAttributeFromBoolean({
              j,
              attr,
              name: "textOverflow",
              value: "nowrap",
            });
            if (jsxAttr) {
              attributes.push(jsxAttr);
            }
            break;
          }
          case "small": {
            const jsxAttr = createJsxAttributeFromBoolean({
              j,
              attr,
              name: "type",
              value: "subtitle-1",
            });
            if (jsxAttr) {
              attributes.push(jsxAttr);
            }

            break;
          }
          default:
            attributes.push(attr);
        }
      });

      cardTitle.node.openingElement.attributes = attributes;
    });
  });

  return root.toSource(printOptions);
}
