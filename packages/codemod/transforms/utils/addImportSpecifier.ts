import { type Collection, type JSCodeshift } from "jscodeshift";

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
      if (
        !imp.node.specifiers?.find(
          (spec) =>
            spec.type === "ImportSpecifier" && spec.imported.name === name
        )
      ) {
        imp.node.specifiers ||= [];
        imp.node.specifiers.push(
          j.importSpecifier({
            name,
            type: "Identifier",
          })
        );
      }
    });
}
