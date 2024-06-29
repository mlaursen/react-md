import {
  type API,
  type FileInfo,
  type JSXAttribute,
  type JSXSpreadAttribute,
  type Options,
} from "jscodeshift";
import { getImportedName } from "../../utils/getImportedName";
import { isPropEnabled } from "../../utils/isPropEnabled";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  let appBarName = "";
  root
    .find(j.ImportDeclaration, (path) => path.source.value === "react-md")
    .forEach((importDeclaration) => {
      j(importDeclaration)
        .find(j.ImportSpecifier, (path) => path.imported.name === "AppBar")
        .forEach((importSpecifier) => {
          if (appBarName) {
            throw new Error("AppBar was imported multiple times");
          }

          appBarName = getImportedName(importSpecifier);
        });
    });

  if (appBarName) {
    root.findJSXElements(appBarName).forEach((appBar) => {
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
  }

  return root.toSource(printOptions);
}
