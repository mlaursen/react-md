import { type API, type FileInfo, type Options } from "jscodeshift";

import { removeProps } from "../../utils/removeProps.js";
import { renameProps } from "../../utils/renameProps.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

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
    name: "Card",
  }).forEach((name) => {
    renameProps({
      root,
      props: { raiseable: "raisable" },
      component: name,
    });

    removeProps({
      root,
      component: name,
      props: ["raiseable"],
    });
  });

  return root.toSource(printOptions);
}
