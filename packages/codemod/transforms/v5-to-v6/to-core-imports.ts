import {
  type API,
  type FileInfo,
  type ImportDeclaration,
  type Options,
} from "jscodeshift";

import { isTypeImport } from "../utils/isTypeImport";
import { sortImportSpecifiers } from "../utils/sortImportSpecifiers";
import { EXPORT_MAP } from "./coreExportMap";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  root
    .find(j.ImportDeclaration, (path) => path.source.value === "react-md")
    .forEach((importDeclaration) => {
      const declarations = new Map<string, ImportDeclaration>();

      j(importDeclaration)
        .find(j.ImportSpecifier)
        .forEach((importSpecifier) => {
          const { name } = importSpecifier.value.imported;
          const coreImportPath = EXPORT_MAP[name];
          if (!coreImportPath) {
            throw new Error(`${name} does not exist in v6`);
          }

          const newSpecifier = j.importSpecifier.from(importSpecifier.value);
          if (isTypeImport(importSpecifier.node)) {
            // @ts-expect-error It doesn't exist on the typedef for some reason
            newSpecifier.importKind = "type";
          }

          const replacement = j.importDeclaration(
            [
              ...(declarations.get(coreImportPath)?.specifiers ?? []),
              newSpecifier,
            ],
            j.stringLiteral(coreImportPath)
          );

          declarations.set(coreImportPath, replacement);
        });

      const sortedDeclarations = [...declarations.entries()];
      sortedDeclarations.sort(([a], [b]) => a.localeCompare(b));

      j(importDeclaration).replaceWith(
        sortedDeclarations.map(([_importPath, declaration]) => {
          return {
            ...declaration,
            specifiers: sortImportSpecifiers(declaration.specifiers ?? []),
          };
        })
      );
    });

  return root.toSource(printOptions);
}
