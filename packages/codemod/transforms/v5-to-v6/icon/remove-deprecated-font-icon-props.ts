import { type API, type FileInfo, type Options } from "jscodeshift";
import { removeProps } from "../../utils/removeProps";

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

  // need to see if the `FontIcon` has been imported from any react-md package
  // and find if it was aliased with `as AnotherName`
  let name = "";
  root
    .find(j.ImportDeclaration, (path) => {
      const { value } = path.source;

      return (
        value === "@react-md/icon" ||
        value === "react-md" ||
        value === "@react-md/core/icon/FontIcon"
      );
    })
    .forEach((importDeclaration) => {
      j(importDeclaration)
        .find(j.ImportSpecifier, (path) => path.imported.name === "FontIcon")
        .forEach((importSpecifier) => {
          if (name) {
            throw new Error("A named FontIcon already exists?");
          }

          // if renamed with `FontIcon as AnotherName`, use `AnotherName`. Otherwise `FontIcon`
          name =
            importSpecifier.node.local?.name ??
            importSpecifier.node.imported.name;
        });
    });

  // if it was imported, find all references in the file and remove the deprecated props
  if (name) {
    removeProps({
      root,
      props: REMOVED_PROPS,
      component: name,
    });
  }

  return root.toSource(printOptions);
}
