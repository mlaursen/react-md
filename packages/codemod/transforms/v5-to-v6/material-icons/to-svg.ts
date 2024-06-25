import {
  type API,
  type FileInfo,
  type ImportDeclaration,
  type Options,
} from "jscodeshift";
import { ONLY_SYMBOL_AVAILABLE, RENAMED_ICONS } from "./constants";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const declarations = new Map<string, ImportDeclaration>();

  root
    .find(
      j.ImportDeclaration,
      (path) =>
        path.source.value === "@react-md/material-icons" ||
        path.source.value === "react-md"
    )
    .forEach((importDeclaration) => {
      j(importDeclaration)
        .find(j.ImportSpecifier)
        .forEach((importSpecifier) => {
          const { name } = importSpecifier.value.imported;
          if (!/[A-Za-z0-9](Font|SVG)Icon$/.test(name)) {
            return;
          }

          let v6Name = name.replace(/(Font|SVG)Icon/, "");
          const renamed = RENAMED_ICONS.get(v6Name);
          v6Name = renamed || v6Name;

          if (ONLY_SYMBOL_AVAILABLE.has(v6Name)) {
            throw new Error(`${v6Name} only supports material symbols`);
          }

          v6Name = `${v6Name}Icon`;
          const updatedPath = `@react-md/material-icons/${v6Name}`;
          const defaultSpecifier = j.importDefaultSpecifier({
            name: v6Name,
            type: "Identifier",
          });
          const declaration = j.importDeclaration(
            [defaultSpecifier],
            j.stringLiteral(updatedPath)
          );

          // rename any references to the v6Name
          root
            .find(j.Identifier, {
              name: importSpecifier.value.local?.name ?? name,
            })
            .forEach((identifier) => {
              j(identifier).replaceWith(
                j.identifier.from({
                  name: v6Name,
                })
              );
            });

          declarations.set(updatedPath, declaration);

          if (importDeclaration.value.source.value === "react-md") {
            j(importSpecifier).remove();
          }
        });

      if (importDeclaration.node.source.value === "@react-md/material-icons") {
        j(importDeclaration).remove();
      }
    });

  // Now merge any already existing v6 icon imports
  root
    .find(j.ImportDeclaration, (path) => {
      const name =
        typeof path.source.value === "string" ? path.source.value : "";

      return /^@react-md\/material-icons/.test(name);
    })
    .forEach((importDeclaration) => {
      const sourcePath = importDeclaration.value.source.value;
      const importPath = typeof sourcePath === "string" ? sourcePath : "";
      if (importPath && !declarations.has(importPath)) {
        declarations.set(importPath, importDeclaration.value);
      }
    });

  const sorted = [...declarations.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, decl]) => decl);

  root.get().node.program.body.unshift(...sorted);

  return root.toSource(printOptions);
}
