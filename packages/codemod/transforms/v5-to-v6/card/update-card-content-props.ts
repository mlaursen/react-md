import { type API, type FileInfo, type Options } from "jscodeshift";
import { removeProps } from "../../utils/removeProps";
import { renameProps } from "../../utils/renameProps";
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
    name: "CardContent",
  }).forEach((name) => {
    renameProps({
      root,
      props: {
        disableExtraPadding: "disableLastChildPadding",
      },
      component: name,
    });
    removeProps({
      root,
      props: ["disableParagraphMargin"],
      component: name,
    });
  });

  return root.toSource(printOptions);
}
