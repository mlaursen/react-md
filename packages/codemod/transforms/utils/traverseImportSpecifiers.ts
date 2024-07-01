import { type Collection, type JSCodeshift } from "jscodeshift";
import { getImportedName } from "./getImportedName";

export interface TraverseImportSpecifiersOptions {
  j: JSCodeshift;
  root: Collection<unknown>;
  name: string | ReadonlySet<string> | readonly string[];
  remove?: boolean;
  replace?: string | Record<string, string>;
  packages?: string | ReadonlySet<string> | readonly string[];
  returnOriginalName?: boolean;
}

export function traverseImportSpecifiers(
  options: TraverseImportSpecifiersOptions
): ReadonlySet<string> {
  const {
    j,
    root,
    name,
    remove,
    replace,
    packages = "react-md",
    returnOriginalName,
  } = options;

  const validPackages = new Set(
    typeof packages === "string" ? [packages] : packages
  );
  const validSpecifiers = new Set(typeof name === "string" ? [name] : name);

  const names = new Set<string>();
  root
    .find(
      j.ImportDeclaration,
      (path) =>
        typeof path.source.value === "string" &&
        validPackages.has(path.source.value)
    )
    .forEach((importDeclaration) => {
      j(importDeclaration)
        .find(j.ImportSpecifier, (path) =>
          validSpecifiers.has(path.imported.name)
        )
        .forEach((importSpecifier) => {
          const importName = returnOriginalName
            ? importSpecifier.node.imported.name
            : getImportedName(importSpecifier);
          names.add(importName);

          let replacedName = typeof replace === "string" ? replace : "";
          if (!replacedName && replace && typeof replace !== "string") {
            replacedName = replace[importName] || "";
          }

          if (replacedName) {
            j(importSpecifier).replaceWith(
              j.importSpecifier({
                name: replacedName,
                type: "Identifier",
                comments: importSpecifier.node.comments,
              })
            );
          } else if (remove) {
            j(importSpecifier).remove();
          }
        });
    });

  return names;
}
