import {
  renameIdentifier,
  type RenameIdentifierOptions,
} from "./renameIdentifier";
import { traverseIdentifiers } from "./traverseIdentifiers";

export function renameRmdIdentifier(options: RenameIdentifierOptions): void {
  const { j, to, from, root } = options;

  traverseIdentifiers({
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
