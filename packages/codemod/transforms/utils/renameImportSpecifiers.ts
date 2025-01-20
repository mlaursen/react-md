import { type Collection, type JSCodeshift } from "jscodeshift";

import { renameImportSpecifier } from "./renameImportSpecifier";

export interface RenameImportSpecifiersOptions {
  j: JSCodeshift;
  root: Collection<unknown>;
  names: Record<string, string>;
  packages?: string | ReadonlySet<string> | readonly string[];
}

export function renameImportSpecifiers(
  options: RenameImportSpecifiersOptions
): void {
  const { j, root, names, packages } = options;

  Object.entries(names).forEach(([from, to]) => {
    renameImportSpecifier({
      j,
      root,
      from,
      to,
      packages,
    });
  });
}
