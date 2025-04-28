import { type API, type FileInfo, type Options } from "jscodeshift";

import { organizeImportSpecifiers } from "../../utils/organizeImportSpecifiers.js";
import { renameIdentifier } from "../../utils/renameIdentifier.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

const RENAMES = [
  ["TreeItemId", "string"],
  ["TreeItemIds", "TreeItemNode"],
  [["ExpandedIds", "SelectedIds"], "TreeItemIdSet"],
] as const;

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  let isAtLeastOneChange = false;
  RENAMES.forEach(([fromName, to]) => {
    traverseImportSpecifiers({
      j,
      root,
      name: fromName,
      remove: to === "string",
      replace: to !== "string" ? to : "",
    }).forEach((name) => {
      isAtLeastOneChange = true;
      renameIdentifier({
        j,
        root,
        from: name,
        to,
      });
    });
  });
  if (isAtLeastOneChange) {
    organizeImportSpecifiers({
      j,
      root,
    });
  }

  return root.toSource(printOptions);
}
