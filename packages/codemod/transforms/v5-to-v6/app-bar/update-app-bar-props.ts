import {
  type API,
  type FileInfo,
  type JSXAttribute,
  type JSXSpreadAttribute,
  type Options,
} from "jscodeshift";
import { isPropEnabled } from "../../utils/isPropEnabled";
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
    name: "AppBar",
  }).forEach((name) => {
    root.findJSXElements(name).forEach((appBar) => {
      const attributes: (JSXAttribute | JSXSpreadAttribute)[] = [];
      appBar.node.openingElement.attributes?.forEach((attr) => {
        if (
          attr.type === "JSXSpreadAttribute" ||
          typeof attr.name.name !== "string"
        ) {
          attributes.push(attr);
          return;
        }
        const { name } = attr.name;

        switch (name) {
          case "component":
            attr.name.name = "as";
            attributes.push(attr);
            break;
          case "fixed":
            if (isPropEnabled(attr)) {
              attr.name.name = "position";
              attr.value = j.stringLiteral("fixed");
              attributes.push(attr);
            }
            break;
          case "fixedElevation":
            if (!isPropEnabled(attr)) {
              attributes.push(
                j.jsxAttribute({
                  name: "disableFixedElevation",
                  type: "JSXIdentifier",
                })
              );
            }
            break;

          // deprecated
          case "flexWrap":
          case "inheritColor":
            break;
        }
      });

      appBar.node.openingElement.attributes = attributes;
    });
  });

  return root.toSource(printOptions);
}
