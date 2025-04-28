import { type API, type FileInfo, type Options } from "jscodeshift";

import { addImportSpecifiers } from "../../utils/addImportSpecifiers";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";
import updateListItemProps from "../list/update-list-item-props";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const rmdImports = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "MenuItemLink",
    remove: true,
  }).forEach((name) => {
    rmdImports.add("ListItemLink");
    root.findJSXElements(name).forEach((jsxElement) => {
      jsxElement.node.openingElement.name = j.jsxIdentifier("ListItemLink");
      if (jsxElement.node.closingElement) {
        jsxElement.node.closingElement.name = j.jsxIdentifier("ListItemLink");
      }

      jsxElement.node.openingElement.attributes ??= [];
      jsxElement.node.openingElement.attributes.push(
        j.jsxAttribute(j.jsxIdentifier("role"), j.stringLiteral("menuitem"))
      );
    });
  });

  addImportSpecifiers({
    j,
    root,
    imports: rmdImports,
  });

  const source = root.toSource(printOptions);
  return updateListItemProps({ ...file, source }, api, options);
}
