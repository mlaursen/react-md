import {
  type ASTPath,
  type ImportDefaultSpecifier,
  type ImportSpecifier,
} from "jscodeshift";

import { getIdentifierName } from "./getIdentifierName.js";

type Specifier = ImportSpecifier | ImportDefaultSpecifier;

export function getImportedName(
  importSpecifier: Specifier | ASTPath<Specifier>,
  fallback = ""
): string {
  const node =
    "node" in importSpecifier ? importSpecifier.node : importSpecifier;

  const identifier =
    node.local ?? ("imported" in node ? node.imported : node.name);
  return getIdentifierName(identifier, fallback);
}
