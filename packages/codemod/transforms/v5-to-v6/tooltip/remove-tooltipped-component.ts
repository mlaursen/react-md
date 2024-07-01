import { type API, type FileInfo, type Options } from "jscodeshift";
import { addFileComments } from "../../utils/addFileComment";
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
    name: "Tooltipped",
    replace: "useTooltip",
  }).forEach(() => {
    comments.add(
      "TODO: The `Tooltipped` component has been removed. Update the code to use the `useTooltip` hook instead."
    );
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
