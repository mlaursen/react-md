import { type API, type FileInfo, type Options } from "jscodeshift";

import { addFileComments } from "../../utils/addFileComment";
import { mergeImportDeclarations } from "../../utils/mergeImportDeclarations";
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
    name: "TreeItemRenderer",
    replace: "TreeItemRendererProps",
    returnOriginalName: true,
  }).forEach((name) => {
    comments.add(
      `TODO: The \`${name}\` type has been replaced by the \`TreeItemRendererProps\` type and cannot automatically be converted`
    );
  });
  traverseImportSpecifiers({
    j,
    root,
    name: "defaultTreeItemRenderer",
    replace: "DefaultTreeItemRenderer",
    returnOriginalName: true,
  }).forEach((name) => {
    comments.add(
      `TODO: The \`${name}\` has been replaced by the \`DefaultTreeItemRenderer\` component and cannot automatically be converted`
    );
  });
  addFileComments({
    j,
    root,
    comments,
  });
  mergeImportDeclarations({
    j,
    root,
  });

  return root.toSource(printOptions);
}
