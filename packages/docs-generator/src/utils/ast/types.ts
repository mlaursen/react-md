import { type namedTypes as n } from "ast-types";

export type AnyImportSpecifier =
  | n.ImportSpecifier
  | n.ImportDefaultSpecifier
  | n.ImportNamespaceSpecifier;
