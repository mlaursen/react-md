import { type Collection, type JSCodeshift } from "jscodeshift";

interface Options {
  j: JSCodeshift;
  root: Collection<unknown>;
  /**
   * @defaultValue `"react-md"`
   */
  name?: string;
}

export function removeEmptyImportDeclaration(options: Options): void {
  const { j, root, name = "react-md" } = options;

  root
    .find(j.ImportDeclaration, { source: { value: name } })
    .forEach((importDeclaration) => {
      if (!importDeclaration.node.specifiers?.length) {
        j(importDeclaration).remove();
      }
    });
}
