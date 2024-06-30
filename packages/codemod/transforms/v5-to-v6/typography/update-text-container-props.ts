import { type API, type FileInfo, type Options } from "jscodeshift";
import { removeProps } from "../../utils/removeProps";
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
