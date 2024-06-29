import {
  type API,
  type FileInfo,
  type JSXAttribute,
  type JSXSpreadAttribute,
  type Options,
} from "jscodeshift";
import { isPropEnabled } from "../../utils/isPropEnabled";
import { traverseIdentifiers } from "../../utils/traverseIdentifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  traverseIdentifiers({
    j,
    root,
    name: "AppBarTitle",
  }).forEach((name) => {
    root.findJSXElements(name).forEach((appBarTitle) => {
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
  });

  return root.toSource(printOptions);
}
