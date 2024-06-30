import {
  renameIdentifier,
  type RenameIdentifierOptions,
} from "./renameIdentifier";
import { traverseImportSpecifiers } from "./traverseImportSpecifiers";

export function renameRmdIdentifier(options: RenameIdentifierOptions): void {
  const { j, to, from, root } = options;

  traverseImportSpecifiers({
    j,
    root,
    name: from,
    replace: to,
  }).forEach((name) => {
    renameIdentifier({
      j,
      root,
      to,
      from: name,
    });
  });
}
