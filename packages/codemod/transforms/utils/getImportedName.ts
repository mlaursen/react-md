import {
  type ImportDefaultSpecifier,
  type ASTPath,
  type ImportSpecifier,
} from "jscodeshift";

type Specifier = ImportSpecifier | ImportDefaultSpecifier;

export function getImportedName(
  importSpecifier: Specifier | ASTPath<Specifier>,
  fallback = ""
): string {
  const node =
    "node" in importSpecifier ? importSpecifier.node : importSpecifier;

  return (
    node.local?.name ??
    ("imported" in node ? node.imported.name : node.name?.name ?? fallback)
  );
}
