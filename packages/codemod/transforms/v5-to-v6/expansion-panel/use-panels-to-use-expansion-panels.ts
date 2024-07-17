import {
  type API,
  type CallExpression,
  type Collection,
  type FileInfo,
  type Identifier,
  type JSCodeshift,
  type ObjectProperty,
  type Options,
} from "jscodeshift";
import { addFileComments } from "../../utils/addFileComment";
import { addImportSpecifier } from "../../utils/addImportSpecifier";
import { createConst } from "../../utils/createConst";
import { createTypedIdentifier } from "../../utils/createTypedIdentifier";
import { getObjectPropertyName } from "../../utils/getObjectPropertyName";
import { isTypescriptFile } from "../../utils/isTypescriptFile";
import { removeVariableReferences } from "../../utils/removeVariableReferences";
import { renameObjectProperty } from "../../utils/renameObjectProperty";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

const NOT_ARRAY_PATTERN =
  " TODO: The codemod only supports destructuring the result from `usePanels`";
const DO_NOT_SUPPORT_SPREAD =
  " TODO: The codemod does not support the array spread pattern for the result from `usePanels`";
const CREATE_EXPAND_CLICK_COMMENT =
  " TODO: The codemod does not support converting the 5th argument";

interface PatchOptions {
  j: JSCodeshift;
  path: Collection<CallExpression>;
}

interface CommentOptions extends PatchOptions {
  comment: string;
}

function addCommentToHook(options: CommentOptions): void {
  const { j, path, comment } = options;

  path.closest(j.VariableDeclaration).forEach((v) => {
    v.node.comments ||= [];
    v.node.comments.push(j.commentLine(comment));
  });
}

function updateHookProps(options: PatchOptions): void {
  const { j, path } = options;

  path.find(j.ObjectExpression).forEach((options) => {
    j(options)
      .find(j.ObjectProperty)
      .forEach((objectProperty) => {
        const name = getObjectPropertyName(objectProperty);
        switch (name) {
          case "multiple":
          case "defaultExpandedIndex":
            // keep as-is
            break;
          case "idPrefix":
            renameObjectProperty({
              name: "baseId",
              prop: objectProperty,
            });
            break;
          case "preventAllClosed":
            renameObjectProperty({
              name: "preventAllCollapsed",
              prop: objectProperty,
            });
            break;
          default:
            // "count" and unknown properties should be removed
            j(objectProperty).remove();
        }
      });
  });
}

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const comments = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "usePanels",
    replace: "useExpansionPanels",
  }).forEach((name) => {
    const isTypescript = isTypescriptFile(file);

    let i = 0;
    root
      .find(j.CallExpression, { callee: { type: "Identifier", name } })
      .forEach((callExpression) => {
        if (callExpression.node.callee.type !== "Identifier") {
          return;
        }

        // start by renaming the hook
        callExpression.node.callee.name = "useExpansionPanels";
        const path = j(callExpression);

        updateHookProps({ j, path });

        let panelsName = "";
        let onKeyDownName = "";

        const destructuredArray = path
          .closest(j.VariableDeclarator, {
            id: { type: "ArrayPattern" },
          })
          .find(j.ArrayPattern);
        if (!destructuredArray.length) {
          addCommentToHook({ j, path, comment: NOT_ARRAY_PATTERN });
        } else if (destructuredArray.find(j.RestElement).length) {
          addCommentToHook({ j, path, comment: DO_NOT_SUPPORT_SPREAD });
        } else {
          // collect all the possible returned values from the hook and convert
          // it into an object
          const identifiers: Identifier[] = [];
          destructuredArray.find(j.Identifier).forEach((identifier) => {
            identifiers.push(identifier.node);
          });

          // panels and onKeyDown should always be defined since they are
          // required for it to work. the others are optional, so try to convert
          // the ones that are supported or just add a comment about it not
          // being supported
          const [
            panels,
            onKeyDown,
            expandedIds,
            setExpandedIds,
            createExpandClick,
          ] = identifiers;
          panelsName = panels.name;
          onKeyDownName = onKeyDown.name;

          const properties: ObjectProperty[] = [
            j.objectProperty(
              j.identifier("getPanelProps"),
              j.identifier("getPanelProps")
            ),
          ];

          if (expandedIds) {
            // if there are expandedIds, create a temp variable so we can
            // convert the new Set<string> to string[]
            const tempName = `TODO_${++i}_EXPANDED_IDS`;
            properties.push(
              j.objectProperty(
                j.identifier("expandedIds"),
                j.identifier(tempName)
              )
            );

            path.closest(j.VariableDeclaration).insertAfter(
              createConst({
                j,
                id: j.identifier(expandedIds.name),
                value: j.arrayExpression([
                  j.spreadElement(j.identifier(tempName)),
                ]),
              })
            );
          }

          if (setExpandedIds) {
            const tempName = `TODO_${++i}_SET_EXPANDED_IDS`;
            if (isTypescript) {
              addImportSpecifier({
                j,
                root,
                name: "UseStateSetter",
              });
            }

            properties.push(
              j.objectProperty(
                j.identifier("setExpandedIds"),
                j.identifier(tempName)
              )
            );

            // Makes code: `return new Set(value([...prevSet]))`
            const returnNewSet = j.blockStatement([
              j.returnStatement(
                j.newExpression(j.identifier("Set"), [
                  j.callExpression(j.identifier("value"), [
                    j.arrayExpression([
                      j.spreadElement(j.identifier("prevSet")),
                    ]),
                  ]),
                ])
              ),
            ]);
            const ifInstanceOf = j.ifStatement(
              j.binaryExpression(
                "instanceof",
                j.identifier("value"),
                j.identifier("Function")
              ),
              returnNewSet
            );
            const returnNewSetCalledValue = j.returnStatement(
              j.newExpression(j.identifier("Set"), [j.identifier("value")])
            );

            path.closest(j.VariableDeclaration).insertAfter(
              createConst({
                j,
                id: createTypedIdentifier({
                  j,
                  name: setExpandedIds.name,
                  type: j.tsTypeReference(
                    j.identifier("UseStateSetter"),
                    j.tsTypeParameterInstantiation([
                      j.tsArrayType(j.tsStringKeyword()),
                    ])
                  ),
                  isTypescript,
                }),
                value: j.arrowFunctionExpression(
                  [j.identifier("value")],
                  j.blockStatement([
                    j.expressionStatement(
                      j.callExpression(j.identifier(tempName), [
                        j.arrowFunctionExpression(
                          [j.identifier("prevSet")],
                          j.blockStatement([
                            ifInstanceOf,
                            returnNewSetCalledValue,
                          ])
                        ),
                      ])
                    ),
                  ])
                ),
              })
            );
          }
          // don't care about supporting since it wasn't really documented
          if (createExpandClick) {
            addCommentToHook({
              j,
              path,
              comment: CREATE_EXPAND_CLICK_COMMENT,
            });
          }

          destructuredArray.replaceWith(j.objectPattern(properties));
        }

        // now remove the onKeyDown usage since it is irrelevant
        const scope = path.closestScope();
        if (onKeyDownName) {
          removeVariableReferences({
            j,
            name: onKeyDownName,
            scope,
          });
        }

        if (!panelsName) {
          return;
        }

        // finally, try to use the getPanelProps to replace the panels
        // first check if doing `const [panel1, panel2, panel3] = panels`
        scope
          .find(j.VariableDeclarator, {
            id: { type: "ArrayPattern" },
            init: { name: panelsName },
          })
          .forEach((variableDeclarator) => {
            const v = j(variableDeclarator);
            const remap = new Map<string, number>();
            v.find(j.Identifier).forEach((identifier, i) => {
              const { name } = identifier.node;
              if (name === panelsName) {
                return;
              }

              remap.set(name, i);
            });
            v.remove();

            remap.forEach((index, name) => {
              scope.find(j.Identifier, { name }).forEach((identifier) => {
                j(identifier).replaceWith(
                  j.callExpression(j.identifier("getPanelProps"), [
                    j.numericLiteral(index),
                  ])
                );
              });
            });
          });

        // next check if just doing {...panels[0]} const panel2 = panels[1], etc
        scope
          .find(j.MemberExpression, { object: { name: panelsName } })
          .forEach((memberExpression) => {
            const index = memberExpression.node.property;
            j(memberExpression).replaceWith(
              j.callExpression(j.identifier("getPanelProps"), [index])
            );
          });
      });
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
