import { type API, type FileInfo, type Options } from "jscodeshift";

import { removeProps } from "../../utils/removeProps.js";
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
    name: "TextContainer",
  }).forEach((name) => {
    removeProps({
      root,
      props: ["size"],
      component: name,
    });
  });

  return root.toSource(printOptions);
}
