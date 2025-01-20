import { type Collection, type JSCodeshift } from "jscodeshift";

import { sortImportSpecifiers } from "./sortImportSpecifiers";

export interface OrganizeImportSpecifiersOptions {
  j: JSCodeshift;
  root: Collection;
  packages?: string | ReadonlySet<string> | readonly string[];
}

export function organizeImportSpecifiers(
  options: OrganizeImportSpecifiersOptions
): void {
  const { j, root, packages = "react-md" } = options;
  const validPackages = new Set(
    typeof packages === "string" ? [packages] : packages
  );
  root
    .find(
      j.ImportDeclaration,
      (path) =>
        typeof path.source.value === "string" &&
        validPackages.has(path.source.value)
    )
    .forEach((importDeclaration) => {
      importDeclaration.node.specifiers = sortImportSpecifiers(
        importDeclaration.node.specifiers ?? []
      );
    });
}
