import { type API, type FileInfo, type Options } from "jscodeshift";
import { removeProps } from "../../utils/removeProps";
import { traverseIdentifiers } from "../../utils/traverseIdentifiers";
import { REMOVED_INTERACTION_PROPS } from "../interaction/constants";

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
    name: "Button",
  }).forEach((name) => {
    removeProps({
      root,
      props: REMOVED_INTERACTION_PROPS,
      component: name,
    });
  });

  return root.toSource(printOptions);
}
