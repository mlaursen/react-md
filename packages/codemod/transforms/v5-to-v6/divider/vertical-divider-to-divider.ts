import { type API, type FileInfo, type Options } from "jscodeshift";
import { addFileComment } from "../../utils/addFileComment";
import { addImportSpecifier } from "../../utils/addImportSpecifier";
import { getPropName } from "../../utils/getPropName";
import { removeEmptyImportDeclaration } from "../../utils/removeEmptyImportDeclaration";
import { renameIdentifier } from "../../utils/renameIdentifier";
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
    name: "VerticalDivider",
    remove: true,
  }).forEach((name) => {
    addImportSpecifier({
      j,
      root,
      name: "Divider",
    });

    root.findJSXElements(name).forEach((jsxElement) => {
      const { openingElement, closingElement } = jsxElement.node;
      const attributes = (openingElement.attributes ?? []).filter(
        (attr) => getPropName(attr) !== "maxHeight"
      );
      attributes.push(
        j.jsxAttribute({
          name: "vertical",
          type: "JSXIdentifier",
        })
      );

      openingElement.attributes = attributes;
      openingElement.name = {
        name: "Divider",
        type: "JSXIdentifier",
      };
      if (closingElement) {
        closingElement.name = {
          name: "Divider",
          type: "JSXIdentifier",
        };
      }
    });
  });
  traverseImportSpecifiers({
    j,
    root,
    name: "VerticalDividerProps",
    replace: "DividerProps",
  }).forEach((name) => {
    renameIdentifier({
      j,
      root,
      from: name,
      to: "DividerProps",
    });
  });

  const removed = traverseImportSpecifiers({
    j,
    root,
    name: [
      "VerticalDividerHookOptions",
      "VerticalDividerHeight",
      "useVerticalDividerHeight",
    ],
    remove: true,
    returnOriginalName: true,
  });
  if (removed.size) {
    addFileComment({
      j,
      root,
      comment: `TODO: The following react-md imports have been removed from the library and must be manually removed from the rest of the file: ${[...removed].join(", ")}`,
    });
  }

  removeEmptyImportDeclaration({
    j,
    root,
  });

  return root.toSource(printOptions);
}
