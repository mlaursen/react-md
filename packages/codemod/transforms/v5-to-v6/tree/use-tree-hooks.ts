import {
  type API,
  type ASTPath,
  type FileInfo,
  type Options,
  type VariableDeclarator,
} from "jscodeshift";
import { renameIdentifier } from "../../utils/renameIdentifier";
import { renameObjectProperties } from "../../utils/renameObjectProperties";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

interface Changeset {
  from: string;
  to: string;
  typeRenames: Record<string, string>;
  resultRenames: Record<string, string>;
}

const RENAMES: Changeset[] = [
  {
    from: "useTreeItemSelection",
    to: "useTreeSelection",
    typeRenames: {
      TreeItemSelection: "TreeSelection",
    },
    resultRenames: {
      onItemSelect: "toggleTreeItemSelection",
      onMultiItemSelect: "selectMultipleTreeItems",
    },
  },

  {
    from: "useTreeItemExpansion",
    to: "useTreeExpansion",
    typeRenames: {
      TreeItemExpansion: "TreeExpansion",
    },
    resultRenames: {
      onItemExpansion: "toggleTreeItemExpansion",
      onMultiItemExpansion: "expandMultipleTreeItems",
    },
  },
];

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  RENAMES.forEach(({ to, from, typeRenames, resultRenames }) => {
    traverseImportSpecifiers({
      j,
      root,
      name: from,
      replace: to,
    }).forEach((name) => {
      root
        .find(j.CallExpression, { callee: { name } })
        .forEach((callExpression) => {
          if (callExpression.node.callee.type !== "Identifier") {
            return;
          }

          callExpression.node.callee.name = to;
          const path = j(callExpression);
          const variableDeclarator = path.closest(j.VariableDeclarator);
          const destructured = variableDeclarator.find(j.ObjectPattern);
          renameObjectProperties({
            j,
            props: resultRenames,
            object: destructured,
          });
          if (destructured.length) {
            return;
          }

          const { id } = (
            variableDeclarator.get(0) as ASTPath<VariableDeclarator>
          ).node;
          if (id.type !== "Identifier") {
            return;
          }

          const { name } = id;
          const scope = variableDeclarator.closestScope();
          const otherDestructured = scope
            .find(j.VariableDeclarator, { init: { name } })
            .find(j.ObjectPattern);
          renameObjectProperties({
            j,
            props: resultRenames,
            object: otherDestructured,
          });
          scope
            .find(j.MemberExpression, {
              object: { name },
            })
            .forEach((member) => {
              const { property } = member.node;
              if (property.type !== "Identifier") {
                return;
              }

              property.name = resultRenames[property.name] || property.name;
            });
        });
    });

    Object.entries(typeRenames).forEach(([from, to]) => {
      traverseImportSpecifiers({
        j,
        root,
        name: from,
        replace: to,
        returnOriginalName: true,
      }).forEach((name) => {
        renameIdentifier({
          j,
          root,
          from: name,
          to,
        });
      });
    });
  });

  return root.toSource(printOptions);
}
