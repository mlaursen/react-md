import { type Collection, type JSCodeshift } from "jscodeshift";

import { mergeImportDeclarations } from "./mergeImportDeclarations.js";
import { sortImportSpecifiers } from "./sortImportSpecifiers.js";

export interface AddImportSpecifierOptions {
  j: JSCodeshift;
  root: Collection<unknown>;
  name: string;
  packageName?: string;
}

export function addImportSpecifier(options: AddImportSpecifierOptions): void {
  const { j, root, name, packageName = "react-md" } = options;

  let declarations = root.find(j.ImportDeclaration, {
    source: { value: packageName },
  });
  if (declarations.length === 0) {
    root
      .get()
      .node.program.body.unshift(
        j.importDeclaration(
          [j.importSpecifier(j.identifier(name))],
          j.stringLiteral(packageName)
        )
      );
    return;
  }

  if (declarations.length > 1) {
    mergeImportDeclarations({
      j,
      root,
      name: packageName,
      force: true,
    });
    // eslint-disable-next-line no-useless-assignment
    declarations = root.find(j.ImportDeclaration, {
      source: { value: packageName },
    });
  }

  root
    .find(j.ImportDeclaration, { source: { value: packageName } })
    .at(0)
    .forEach((imp) => {
      imp.node.importKind = "value";
      imp.node.specifiers ||= [];
      imp.node.specifiers.push(j.importSpecifier(j.identifier(name)));
      imp.node.specifiers = sortImportSpecifiers(imp.node.specifiers);
    });
}
