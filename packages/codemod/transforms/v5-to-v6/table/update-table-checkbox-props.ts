import { type API, type FileInfo, type Options } from "jscodeshift";
import { removeProps } from "../../utils/removeProps";
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
    name: "TableCheckbox",
  }).forEach((name) => {
    removeProps({
      root,
      props: ["cellId"],
      component: name,
    });
  });

  return root.toSource(printOptions);
}
