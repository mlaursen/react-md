import { type API, type FileInfo, type Options } from "jscodeshift";
import { renameProps } from "../../utils/renameProps";
import { traverseIdentifiers } from "../../utils/traverseIdentifiers";

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
    name: "Chip",
  }).forEach((name) => {
    renameProps({
      root,
      props: {
        noninteractable: "noninteractive",
      },
      component: name,
    });
  });

  return root.toSource(printOptions);
}
