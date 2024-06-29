import {
  type API,
  type FileInfo,
  type ImportSpecifier,
  type Options,
} from "jscodeshift";
import { getImportedName } from "../../utils/getImportedName";
import { removeProps } from "../../utils/removeProps";
import { renameIdentifier } from "../../utils/renameIdentifier";
import { sortImportSpecifiers } from "../../utils/sortImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  let appBarNavName = "";
  let appBarNavPropsName = "";
  let appBarActionName = "";
  let appBarActionPropsName = "";
  root
    .find(j.ImportDeclaration, (path) => path.source.value === "react-md")
    .forEach((importDeclaration) => {
      let isButtonImported = false;
      let isButtonPropsImported = false;
      const specifiers: ImportSpecifier[] = [];
      importDeclaration.node.specifiers?.forEach((spec) => {
        if (spec.type !== "ImportSpecifier") {
          return;
        }

        const name = getImportedName(spec);
        switch (spec.imported.name) {
          // do not add these two
          case "AppBarNav":
            appBarNavName = name;
            return;
          case "AppBarNavProps":
            appBarNavPropsName = name;
            return;
          case "AppBarAction":
            appBarActionName = name;
            return;
          case "AppBarActionProps":
            appBarActionPropsName = name;
            return;

          case "Button":
            isButtonImported = true;
            break;
          case "ButtonProps":
            isButtonPropsImported = true;
            break;
        }

        specifiers.push(spec);
      });
      if (!isButtonImported && (appBarNavName || appBarActionName)) {
        specifiers.push(
          j.importSpecifier({
            name: "Button",
            type: "Identifier",
          })
        );
      }

      if (
        !isButtonPropsImported &&
        (appBarNavPropsName || appBarActionPropsName)
      ) {
        specifiers.push(
          j.importSpecifier({
            name: "ButtonProps",
            type: "Identifier",
          })
        );
      }

      j(importDeclaration).replaceWith(
        j.importDeclaration.from({
          ...importDeclaration.node,
          specifiers: sortImportSpecifiers(specifiers),
        })
      );
    });

  if (appBarNavName) {
    removeProps({
      root,
      props: ["inheritColor"],
      component: appBarNavName,
    });
    renameIdentifier({
      j,
      root,
      to: "Button",
      from: appBarNavName,
    });
  }

  if (appBarNavPropsName) {
    renameIdentifier({
      j,
      root,
      to: "ButtonProps",
      from: appBarNavPropsName,
    });
  }

  if (appBarActionName) {
    removeProps({
      root,
      props: ["inheritColor", "first", "last"],
      component: appBarActionName,
    });
    renameIdentifier({
      j,
      root,
      to: "Button",
      from: appBarActionName,
    });
  }

  if (appBarActionPropsName) {
    renameIdentifier({
      j,
      root,
      to: "ButtonProps",
      from: appBarNavPropsName,
    });
  }

  return root.toSource(printOptions);
}
