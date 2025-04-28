import { type API, type FileInfo, type Options } from "jscodeshift";

import { addFileComment } from "../../utils/addFileComment.js";
import { getPropName } from "../../utils/getPropName.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

const REMOVED_PROPS = new Set([
  "labelKey",
  "valueKey",
  "getItemLabel",
  "getItemValue",
]);

const RENAMED_PROPS: Record<string, string> = {
  onItemExpansion: "toggleTreeItemExpansion",
  onMultiItemExpansion: "expandMultipleTreeItems",
  onItemSelect: "toggleTreeItemSelection",
  onMultiItemSelect: "selectMultipleTreeItems",
};

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const props = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "Tree",
  }).forEach((name) => {
    root
      .find(j.JSXOpeningElement, { name: { name } })
      .find(j.JSXAttribute)
      .forEach((jsxAttribute) => {
        const name = getPropName(jsxAttribute);
        if (REMOVED_PROPS.has(name)) {
          j(jsxAttribute).remove();
          return;
        }

        const renamed = RENAMED_PROPS[name];
        if (renamed) {
          jsxAttribute.node.name.name = renamed;
          return;
        }

        if (["itemRenderer", "getItemProps"].includes(name)) {
          props.add(name);
        }
      });
  });

  if (props.size) {
    const named = [...props].map((name) => "`" + name + "`").join(", ");

    addFileComment({
      j,
      root,
      comment: `TODO: The ${named} have been removed from the \`Tree\` component and need to be manually changed. The \`renderer\` prop is the closest in functionality.`,
    });
  }

  return root.toSource(printOptions);
}
