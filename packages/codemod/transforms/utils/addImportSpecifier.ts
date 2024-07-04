import { type Collection, type JSCodeshift } from "jscodeshift";
import { sortImportSpecifiers } from "./sortImportSpecifiers";

export interface AddImportSpecifierOptions {
  j: JSCodeshift;
  root: Collection<unknown>;
  name: string;
  packageName?: string;
}

export function addImportSpecifier(options: AddImportSpecifierOptions): void {
  const { j, root, name, packageName = "react-md" } = options;

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
