import {
  type Collection,
  type ImportSpecifier,
  type JSCodeshift,
} from "jscodeshift";

import { sortImportSpecifiers } from "./sortImportSpecifiers.js";

export interface MergeImportDeclarationsOptions {
  j: JSCodeshift;
  root: Collection<unknown>;

  /**
   * @defaultValue `"react-md"`
   */
  name?: string;
  force?: boolean;
}

export function mergeImportDeclarations(
  options: MergeImportDeclarationsOptions
): void {
  const { j, root, name = "react-md", force } = options;

  const declarations = root.find(j.ImportDeclaration, {
    source: { value: name },
  });
  if (declarations.length < 2 && !force) {
    return;
  }

  const specifiers: ImportSpecifier[] = [];
  declarations.forEach((declaration, i) => {
    specifiers.push(
      ...(declaration.node.specifiers ?? []).filter(
        (spec): spec is ImportSpecifier => j.ImportSpecifier.check(spec)
      )
    );

    if (i === declarations.length - 1) {
      j(declaration).replaceWith(
        j.importDeclaration(
          sortImportSpecifiers(specifiers),
          j.stringLiteral(name)
        )
      );
    } else {
      j(declaration).remove();
    }
  });
}
