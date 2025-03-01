import { type API, type FileInfo, type Options } from "jscodeshift";

import { removeEmptyImportDeclaration } from "../../utils/removeEmptyImportDeclaration";
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
    name: "NestedDialogContextProvider",
    remove: true,
  }).forEach((name) => {
    root.findJSXElements(name).forEach((jsxElement) => {
      j(jsxElement).replaceWith(
        j.jsxFragment(
          j.jsxOpeningFragment(),
          j.jsxClosingFragment(),
          jsxElement.node.children
        )
      );
    });
  });

  removeEmptyImportDeclaration({
    j,
    root,
  });

  return root.toSource(printOptions);
}
