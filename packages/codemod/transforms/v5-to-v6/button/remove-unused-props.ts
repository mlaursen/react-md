import { type API, type FileInfo, type Options } from "jscodeshift";
import { getImportedName } from "../../utils/getImportedName";
import { removeProps } from "../../utils/removeProps";
import { REMOVED_INTERACTION_PROPS } from "../interaction/constants";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const names = new Set<string>();
  root
    .find(j.ImportDeclaration, { source: { value: "react-md" } })
    .forEach((importDeclaration) => {
      j(importDeclaration)
        .find(j.ImportSpecifier, {
          imported: { name: "Button" },
        })
        .forEach((button) => {
          names.add(getImportedName(button));
        });
    });

  [...names].forEach((name) => {
    removeProps({
      root,
      props: REMOVED_INTERACTION_PROPS,
      component: name,
    });
  });

  return root.toSource(printOptions);
}
