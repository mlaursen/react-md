import { type API, type FileInfo, type Options } from "jscodeshift";
import { addFileComment } from "../../utils/addFileComment";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  let removed = false;
  traverseImportSpecifiers({
    j,
    root,
    name: "ScrollListener",
  }).forEach((name) => {
    root
      .find(j.JSXElement, { openingElement: { name: { name } } })
      .forEach((jsxElement) => {
        j(jsxElement).remove();
      });
  });

  traverseImportSpecifiers({
    j,
    root,
    name: "useScrollListener",
  }).forEach((name) => {
    root
      .find(j.CallExpression, { callee: { name } })
      .forEach((callExpression) => {
        j(callExpression.parent).remove();
      });
  });
  traverseImportSpecifiers({
    j,
    root,
    name: [
      // if there are still identifiers in the file for scroll listener, make sure to remove them here
      "ScrollListener",
      "useScrollListener",
      "ScrollListenerProps",
      "ScrollListenerHookOptions",
    ],
    remove: true,
  }).forEach((name) => {
    removed = true;
    root.find(j.Identifier, { name }).forEach((identifier) => {
      j(identifier).remove();
    });
  });

  if (removed) {
    addFileComment({
      j,
      root,
      comment:
        "TODO: The `ScrollListener`/`useScrollListener` have been removed from react-md. You will need to implement their behavior manually.",
    });
  }

  return root.toSource(printOptions);
}
