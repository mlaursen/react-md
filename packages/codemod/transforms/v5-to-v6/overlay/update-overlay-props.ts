import { type API, type FileInfo, type Options } from "jscodeshift";

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
    name: "Overlay",
  }).forEach((name) => {
    renameProps({
      root,
      props: {
        hidden: "noOpacity",
        // I'm not going to fix duplicated onClicks
        onRequestClose: "onClick",
      },
      component: name,
    });
  });

  return root.toSource(printOptions);
}
