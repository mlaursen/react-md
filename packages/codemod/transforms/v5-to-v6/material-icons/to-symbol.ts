import { type API, type FileInfo, type Options } from "jscodeshift";
import { sortImportSpecifiers } from "../../utils/sortImportSpecifiers";
import { RENAMED_ICONS } from "./constants";

/**
 * This transformer will:
 * - search for any **top-level** imports from `@react-md/material-icons` or
 *   `react-md`
 * - check the destructured imports for any *SVGIcon or *FontIcon imported
 *   components
 * - add a `MaterialSymbol` import to an existing `@react-md/core` import or
 *   add a new one to the top of the file
 * - replace the *SVGIcon/*FontIcon component usages with
 *   `<MaterialSymbol name="{{NAME}}" {...anyExistingProps} />`
 * - remove the `@react-md/material-icons` import
 * - remove the `*SVGIcon`/`*FontIcon` components from the `react-md`
 *   import (__should__ remove the entire react-md import if there are no
 *   other declarations)
 */
export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const icons = new Set<string>();
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

          icons.add(name);
          if (importDeclaration.value.source.value === "react-md") {
            j(importSpecifier).remove();
          }
        });

      if (importDeclaration.node.source.value === "@react-md/material-icons") {
        j(importDeclaration).remove();
      }
    });

  const rmdCore = root.find(j.ImportDeclaration, {
    source: { value: "@react-md/core" },
  });
  if (rmdCore.length) {
    let found = false;
    rmdCore.forEach((decl) => {
      const symbol = j(decl).find(j.ImportSpecifier, {
        name: { name: "MaterialSymbol" },
      });
      if (symbol.length) {
        found = true;
      }
    });
    if (!found) {
      let replaced = false;
      rmdCore.forEach((decl) => {
        if (replaced) {
          return;
        }

        replaced = true;
        j(decl).replaceWith(
          j.importDeclaration.from({
            ...decl.node,
            specifiers: sortImportSpecifiers([
              ...(decl.node.specifiers ?? []),
              j.importSpecifier({
                name: "MaterialSymbol",
                type: "Identifier",
              }),
            ]),
          })
        );
      });
    }
  } else {
    root.get().node.program.body.unshift(
      j.importDeclaration(
        [
          j.importSpecifier({
            name: "MaterialSymbol",
            type: "Identifier",
          }),
        ],
        j.stringLiteral("@react-md/core")
      )
    );
  }

  [...icons].forEach((iconName) => {
    let v6Name = iconName.replace(/(Font|SVG)Icon/, "");
    const renamed = RENAMED_ICONS.get(v6Name);
    v6Name = (renamed || v6Name)
      .split(/(?=[A-Z]+)/)
      .map((part) => part.toLowerCase())
      .join("_");

    root
      .find(j.JSXElement, { openingElement: { name: { name: iconName } } })
      .forEach((node) => {
        j(node).replaceWith(
          j.jsxElement.from({
            openingElement: j.jsxOpeningElement(
              j.jsxIdentifier("MaterialSymbol"),
              [
                j.jsxAttribute(
                  j.jsxIdentifier("name"),
                  j.stringLiteral(v6Name)
                ),
                ...(node.node.openingElement.attributes ?? []),
              ],
              true
            ),
            closingElement: null,
          })
        );
      });
  });

  return root.toSource(printOptions);
}
