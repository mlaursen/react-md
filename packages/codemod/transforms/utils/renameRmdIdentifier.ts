import { getImportedName } from "./getImportedName";
import {
  renameIdentifier,
  type RenameIdentifierOptions,
} from "./renameIdentifier";

export function renameRmdIdentifier(options: RenameIdentifierOptions): void {
  const { j, to, from, root } = options;

  const names = new Set<string>();
  root
    .find(j.ImportDeclaration, { source: { value: "react-md" } })
    .forEach((importDeclaration) => {
      j(importDeclaration)
        .find(j.ImportSpecifier, {
          imported: { name: from },
        })
        .forEach((importSpecifier) => {
          names.add(getImportedName(importSpecifier));

          j(importSpecifier).replaceWith(
            j.importSpecifier({
              name: to,
              type: "Identifier",
              comments: importSpecifier.node.comments,
            })
          );
        });
    });

  [...names].forEach((name) => {
    renameIdentifier({
      j,
      root,
      to,
      from: name,
    });
  });
}
