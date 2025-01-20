import { type API, type FileInfo, type Options } from "jscodeshift";

import { addFileComments } from "../../utils/addFileComment";
import { removeEmptyImportDeclaration } from "../../utils/removeEmptyImportDeclaration";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const comments = new Set<string>();
  root
    .find(j.ImportDeclaration, { source: { value: "react-md" } })
    .forEach((importDeclaration) => {
      j(importDeclaration)
        .find(j.ImportSpecifier, (path) =>
          [
            "TextContainerSize",
            "TextContainerRenderFunction",
            "TypographyRenderFunction",
          ].includes(path.imported.name)
        )
        .forEach((importSpecifier) => {
          const { name } = importSpecifier.node.imported;
          comments.add(
            `TODO: Remove the \`${name}\` usage since it no longer exists.`
          );

          j(importSpecifier).remove();
        });
    });

  removeEmptyImportDeclaration({
    j,
    root,
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
