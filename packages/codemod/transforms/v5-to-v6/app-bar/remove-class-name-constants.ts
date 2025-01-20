import { type API, type FileInfo, type Options } from "jscodeshift";

import { addFileComment } from "../../utils/addFileComment";
import { removeEmptyImportDeclaration } from "../../utils/removeEmptyImportDeclaration";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

const CONSTANTS = new Set([
  "APP_BAR_OFFSET_CLASSNAME",
  "APP_BAR_OFFSET_DENSE_CLASSNAME",
  "APP_BAR_OFFSET_PROMINENT_CLASSNAME",
  "APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME",
]);

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const constants = traverseImportSpecifiers({
    j,
    root,
    name: CONSTANTS,
    remove: true,
  });

  if (constants.size) {
    root
      .find(j.Identifier, (path) => constants.has(path.name))
      .forEach((identifier) => {
        const ident = j(identifier);
        ident.closest(j.LogicalExpression).forEach((logicalExpression) => {
          j(logicalExpression).remove();
        });

        ident.closest(j.ObjectProperty).forEach((property) => {
          j(property).remove();
        });
      });

    addFileComment({
      j,
      root,
      comment: "TODO: Add styles for app bar offset",
    });
  }

  removeEmptyImportDeclaration({ j, root });

  return root.toSource(printOptions);
}
