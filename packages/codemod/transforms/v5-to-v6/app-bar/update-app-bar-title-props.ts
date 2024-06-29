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
  let appBarTitleName = "";
  root
    .find(j.ImportDeclaration, (path) => path.source.value === "react-md")
    .forEach((importDeclaration) => {
      j(importDeclaration)
        .find(j.ImportSpecifier, (path) => path.imported.name === "AppBarTitle")
        .forEach((importSpecifier) => {
          if (appBarTitleName) {
            throw new Error("AppBarTitle was imported multiple times");
          }

          appBarTitleName = getImportedName(importSpecifier);
        });
    });

  if (appBarTitleName) {
    root.findJSXElements(appBarTitleName).forEach((appBarTitle) => {
      const attributes: (JSXAttribute | JSXSpreadAttribute)[] = [];
      appBarTitle.node.openingElement.attributes?.forEach((attr) => {
        if (
          attr.type === "JSXSpreadAttribute" ||
          typeof attr.name.name !== "string"
        ) {
          attributes.push(attr);
          return;
        }
        const { name } = attr.name;
        if (name === "noWrap") {
          if (isPropEnabled(attr)) {
            attributes.push(
              j.jsxAttribute(
                {
                  name: "textOverflow",
                  type: "JSXIdentifier",
                },
                j.stringLiteral("nowrap")
              )
            );
          }
        } else if (name === "keyline") {
          if (isPropEnabled(attr)) {
            attributes.push(
              j.jsxAttribute(
                {
                  name: "keyline",
                  type: "JSXIdentifier",
                },
                j.stringLiteral("nav")
              )
            );
          }
        }
      });

      appBarTitle.node.openingElement.attributes = attributes;
    });
  }

  return root.toSource(printOptions);
}
