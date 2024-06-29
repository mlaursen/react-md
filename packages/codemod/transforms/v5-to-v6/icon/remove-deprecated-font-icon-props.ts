import { type API, type FileInfo, type Options } from "jscodeshift";
import { removeProps } from "../../utils/removeProps";
import { traverseIdentifiers } from "../../utils/traverseIdentifiers";

const REMOVED_PROPS = ["forceSize", "forceFontSize"];

/**
 * This transformer will just remove the `forceSize`/`forceFontSize` from the
 * `FontIcon` component since it is no longer required.
 */
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
    name: "FontIcon",
    packages: ["react-md", "@react-md/icon", "@react-md/core/icon/FontIcon"],
  }).forEach((name) => {
    removeProps({
      root,
      props: REMOVED_PROPS,
      component: name,
    });
  });

  return root.toSource(printOptions);
}
