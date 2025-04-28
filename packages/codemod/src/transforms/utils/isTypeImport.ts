import { type ImportSpecifier } from "jscodeshift";

export const isTypeImport = (specifier: ImportSpecifier): boolean =>
  "importKind" in specifier && specifier.importKind === "type";
