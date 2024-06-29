import {
  type API,
  type FileInfo,
  type ImportSpecifier,
  type Options,
} from "jscodeshift";
import { sortImportSpecifiers } from "../utils/sortImportSpecifiers";

const V5_PACKAGES = [
  "@react-md/alert",
  "@react-md/app-bar",
  "@react-md/autocomplete",
  "@react-md/avatar",
  "@react-md/badge",
  "@react-md/button",
  "@react-md/card",
  "@react-md/chip",
  "@react-md/dialog",
  "@react-md/divider",
  "@react-md/elevation",
  "@react-md/expansion-panel",
  "@react-md/form",
  "@react-md/icon",
  "@react-md/layout",
  "@react-md/link",
  "@react-md/list",
  "@react-md/material-icons",
  "@react-md/media",
  "@react-md/menu",
  "@react-md/overlay",
  "@react-md/portal",
  "@react-md/progress",
  "@react-md/sheet",
  "@react-md/states",
  "@react-md/table",
  "@react-md/tabs",
  "@react-md/theme",
  "@react-md/tooltip",
  "@react-md/transition",
  "@react-md/tree",
  "@react-md/typography",
  "@react-md/utils",
];

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const specifiers = new Map<string, ImportSpecifier>();
  root
    .find(
      j.ImportDeclaration,
      (path) =>
        typeof path.source.value === "string" &&
        V5_PACKAGES.includes(path.source.value)
    )
    .forEach((importDeclaration) => {
      const decl = j(importDeclaration);
      decl.find(j.ImportSpecifier).forEach((specifier) => {
        const name = specifier.node.imported.name;
        if (importDeclaration.node.importKind === "type") {
          // NOTE: importKind does not currently exist on the ImportSpecifier
          // type, but is there during runtime
          const node = { ...specifier.node, importKind: "type" };
          specifiers.set(name, node);
        } else {
          specifiers.set(name, specifier.node);
        }
      });

      decl.remove();
    });

  if (specifiers.size) {
    let reactMdImport = root.find(
      j.ImportDeclaration,
      (path) => path.source.value === "react-md"
    );

    if (!reactMdImport.length) {
      const newImport = j.importDeclaration([], j.stringLiteral("react-md"));
      root.get().node.program.body.unshift(newImport);
      reactMdImport = root.find(
        j.ImportDeclaration,
        (path) => path.source.value === "react-md"
      );
    } else if (reactMdImport.length > 1) {
      // TODO
    }

    reactMdImport.forEach((importDeclaration) => {
      const merged = new Map(specifiers);
      importDeclaration.node.specifiers?.forEach((specifier) => {
        const name = specifier.name?.name;
        if (!name || specifier.type !== "ImportSpecifier") {
          return;
        }
        merged.set(name, specifier);
      });

      j(importDeclaration).replaceWith(
        j.importDeclaration.from({
          ...importDeclaration.node,
          specifiers: sortImportSpecifiers([...merged.values()]),
        })
      );
    });
  }

  return root.toSource(printOptions);
}
