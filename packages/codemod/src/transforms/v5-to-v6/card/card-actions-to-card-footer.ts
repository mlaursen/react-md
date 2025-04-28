import { type API, type FileInfo, type Options } from "jscodeshift";

import { renameIdentifier } from "../../utils/renameIdentifier.js";
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
    name: "CardActions",
    replace: "CardFooter",
  }).forEach((name) => {
    renameProps({
      root,
      component: name,
      props: {
        align: "justify",
      },
    });
    renameIdentifier({
      j,
      root,
      from: name,
      to: "CardFooter",
    });
  });

  return root.toSource(printOptions);
}
