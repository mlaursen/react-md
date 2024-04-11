import { type namedTypes as n } from "ast-types";
import { type AnyImportSpecifier } from "./types.js";

export function getImportSpecifierName(specifier: AnyImportSpecifier): string {
  const name =
    specifier.type === "ImportSpecifier" && specifier.imported
      ? specifier.imported.name
      : specifier.local?.name;
  if (!name) {
    throw new Error("Unable to get import specifier name");
  }

  return name;
}

export function isTypeImport(
  specifier: AnyImportSpecifier | n.ImportDeclaration
): boolean {
  return "importKind" in specifier && specifier.importKind === "type";
}
