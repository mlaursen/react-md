import {
  renameIdentifier,
  type RenameIdentifierOptions,
} from "./renameIdentifier";
import { traverseImportSpecifiers } from "./traverseImportSpecifiers";

export interface RenameImportSpecifierOptions extends RenameIdentifierOptions {
  packages?: string | ReadonlySet<string> | readonly string[];
}

export function renameImportSpecifier(
  options: RenameImportSpecifierOptions
): void {
  const { j, to, from, root, packages } = options;

  traverseImportSpecifiers({
    j,
    root,
    name: from,
    replace: to,
    packages,
  }).forEach((name) => {
    renameIdentifier({
      j,
      root,
      to,
      from: name,
    });
  });
}
