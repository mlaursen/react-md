import { type API, type FileInfo, type Options } from "jscodeshift";
import { renameProps } from "../../utils/renameProps";
import { traverseIdentifiers } from "../../utils/traverseIdentifiers";
import { renameIdentifier } from "../../utils/renameIdentifier";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  traverseIdentifiers({
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
