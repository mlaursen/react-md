import { type Collection, type JSCodeshift } from "jscodeshift";

import { addImportSpecifier } from "./addImportSpecifier";
import { mergeImportDeclarations } from "./mergeImportDeclarations";

export interface AddImportSpecifiersOptions {
  j: JSCodeshift;
  root: Collection;
  imports: readonly string[] | ReadonlySet<string>;
  packageName?: string;
}
export function addImportSpecifiers(options: AddImportSpecifiersOptions): void {
  const { j, root, imports, packageName = "react-md" } = options;
  if ("size" in imports ? imports.size : imports.length) {
    mergeImportDeclarations({
      j,
      root,
      name: packageName,
    });
  }

  imports.forEach((imp) => {
    addImportSpecifier({
      j,
      root,
      name: imp,
      packageName,
    });
  });
}
