import { type API, type FileInfo, type Options } from "jscodeshift";
import { addImportSpecifier } from "../../utils/addImportSpecifier";
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
    name: "Caption",
    remove: true,
  }).forEach((name) => {
    root.findJSXElements(name).forEach((jsxElement) => {
      addImportSpecifier({
        j,
        root,
        name: "Typography",
      });
      const { openingElement, closingElement } = jsxElement.node;
      openingElement.attributes ??= [];
      openingElement.attributes.push(
        j.jsxAttribute(
          {
            name: "type",
            type: "JSXIdentifier",
          },
          j.stringLiteral("caption")
        )
      );
      openingElement.name = {
        name: "Typography",
        type: "JSXIdentifier",
      };
      if (closingElement) {
        closingElement.name = {
          name: "Typography",
          type: "JSXIdentifier",
        };
      }
    });
  });

  return root.toSource(printOptions);
}
