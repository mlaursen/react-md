import { type API, type FileInfo, type Options } from "jscodeshift";
import { addFileComments } from "../../utils/addFileComment";
import { getPropName } from "../../utils/getPropName";
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

  const comments = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "TableCell",
  }).forEach((name) => {
    root
      .find(j.JSXOpeningElement, { name: { name } })
      .forEach((jsxOpeningElement) => {
        j(jsxOpeningElement)
          .find(j.JSXAttribute)
          .forEach((jsxAttribute) => {
            const name = getPropName(jsxAttribute);
            if (
              name === "colSpan" &&
              jsxAttribute.node.value?.type === "StringLiteral"
            ) {
              comments.add(
                "TODO: Update the `TableCell` to have a `colSpan` number equal to the total number of columns in the table"
              );
              j(jsxAttribute).remove();
            }
            if (name === "disablePadding" && isPropEnabled(jsxAttribute.node)) {
              j(jsxAttribute).replaceWith(
                j.jsxAttribute(
                  {
                    name: "padding",
                    type: "JSXIdentifier",
                  },
                  j.stringLiteral("none")
                )
              );
            }
          });
      });
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
