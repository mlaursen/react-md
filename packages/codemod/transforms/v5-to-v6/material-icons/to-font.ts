import { type API, type FileInfo, type Options } from "jscodeshift";
import { getImportedName } from "../../utils/getImportedName";
import { sortImportSpecifiers } from "../../utils/sortImportSpecifiers";
import { ONLY_SYMBOL_AVAILABLE, RENAMED_ICONS } from "./constants";

/**
 * This transformer will:
 * - search for any **top-level** imports from `@react-md/material-icons` or
 *   `react-md`
 * - check the destructured imports for any *SVGIcon or *FontIcon imported
 *   components
 *   - if there is a match:
 *     - add new import statements to the top of the file for the new v6 import
 *       and naming convention. Also add them alphaNumerically sorted
 *     - rename the components to match the naming convention even if it was
 *       renamed with `as SomeOtherName`
 *     - remove the `@react-md/material-icons` import
 *     - remove the `*SVGIcon`/`*FontIcon` components from the `react-md`
 *       import (__should__ remove the entire react-md import if there are no
 *       other declarations)
 *
 * NOTE: Will throw an error if the Motorcycle or PhoneInTalk icons are used since they
 * are only available as a material symbol for some reason
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
  const importRenamed = new Map<string, string>();

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

          const localName = getImportedName(importSpecifier);
          if (localName !== name) {
            importRenamed.set(localName, name);
          }

          icons.add(localName);

          if (importDeclaration.value.source.value === "react-md") {
            j(importSpecifier).remove();
          }
        });

      if (importDeclaration.node.source.value === "@react-md/material-icons") {
        j(importDeclaration).remove();
      }
    });

  const rmd = root.find(j.ImportDeclaration, {
    source: { value: "react-md" },
  });
  if (rmd.length) {
    let found = false;
    rmd.forEach((decl) => {
      const iconComponent = j(decl).find(j.ImportSpecifier, {
        name: { name: "MaterialIcon" },
      });
      if (iconComponent.length) {
        found = true;
      }
    });
    if (!found) {
      let replaced = false;
      rmd.forEach((decl) => {
        if (replaced) {
          return;
        }

        replaced = true;
        const specifiers = sortImportSpecifiers([
          ...(decl.node.specifiers ?? []),
          j.importSpecifier({
            name: "MaterialIcon",
            type: "Identifier",
          }),
        ]);

        j(decl).replaceWith(
          j.importDeclaration.from({
            ...decl.node,
            specifiers,
          })
        );
      });
    }
  } else {
    root.get().node.program.body.unshift(
      j.importDeclaration(
        [
          j.importSpecifier({
            name: "MaterialIcon",
            type: "Identifier",
          }),
        ],
        j.stringLiteral("@react-md/core")
      )
    );
  }

  [...icons].forEach((iconName) => {
    let v6Name = (importRenamed.get(iconName) || iconName).replace(
      /(Font|SVG)Icon/,
      ""
    );
    const renamed = RENAMED_ICONS.get(v6Name);
    if (ONLY_SYMBOL_AVAILABLE.has(renamed || v6Name)) {
      throw new Error(`${v6Name} only supports material symbols`);
    }

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
              j.jsxIdentifier("MaterialIcon"),
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
