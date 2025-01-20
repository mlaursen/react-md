import {
  type API,
  type FileInfo,
  type JSCodeshift,
  type ObjectExpression,
  type ObjectPattern,
  type ObjectProperty,
  type Options,
  type RestElement,
  type RestProperty,
  type ReturnStatement,
} from "jscodeshift";

import {
  type JSXAttributes,
  type JSXExpression,
  type Statements,
} from "../../types";
import { addImportSpecifiers } from "../../utils/addImportSpecifiers";
import { createConst } from "../../utils/createConst";
import { createDestructuredConst } from "../../utils/createDestructuredConst";
import { createJsxElement } from "../../utils/createJsxElement";
import { createObjectProperty } from "../../utils/createObjectProperty";
import { getObjectPropertyName } from "../../utils/getObjectPropertyName";
import { isFunctionType } from "../../utils/isFunctionType";
import { isValidJsxExpression } from "../../utils/isValidJsxExpression";
import { removeEmptyImportDeclaration } from "../../utils/removeEmptyImportDeclaration";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

interface ConvertDestructuredOptions {
  j: JSCodeshift;
  statements: Statements;
  objectPattern: ObjectPattern;
  expanderIcon?: JSXExpression;
  rmdImports: Set<string>;
  reactImports: Set<string>;
  itemRendererProps: JSXAttributes;
}

function convertDestructuredItem(options: ConvertDestructuredOptions): string {
  const {
    j,
    statements,
    objectPattern,
    expanderIcon,
    rmdImports,
    reactImports,
    itemRendererProps,
  } = options;

  let itemIdName = "";
  let focusedName = "";
  let expandedName = "";
  let selectedName = "";
  let itemLocalName = "item";
  let restProperty: RestProperty | undefined;
  let restPropertyName = "";
  const props: (ObjectProperty | RestProperty)[] = [];
  objectPattern.properties.forEach((property) => {
    const prop = property as ObjectProperty | RestElement | RestProperty;
    if (j.ObjectProperty.check(prop)) {
      const localName = getObjectPropertyName(prop, true);
      switch (getObjectPropertyName(prop)) {
        case "itemId":
          itemIdName = localName;
          props.push(prop);
          break;
        case "focused":
          focusedName = localName;
          break;
        case "expanded":
          expandedName = localName;
          break;
        case "selected":
          selectedName = localName;
          break;
        default:
          props.push(prop);
      }
    } else if (
      j.RestProperty.check(prop) &&
      j.Identifier.check(prop.argument)
    ) {
      restPropertyName = prop.argument.name;
      restProperty = prop;
    } else if (j.RestElement.check(prop) && j.Identifier.check(prop.argument)) {
      restPropertyName = prop.argument.name;
      restProperty = j.restProperty(j.identifier(restPropertyName));
    } else {
      throw new Error("Shouldn't be possible");
    }
  });

  if (!itemIdName && (expandedName || selectedName || focusedName)) {
    props.push(createObjectProperty({ j, name: "itemId" }));
    itemIdName = "itemId";
  }

  if (restProperty) {
    props.push(restProperty);
    itemLocalName = restPropertyName === "item" ? "tempItem" : "item";
  }

  statements.push(
    createDestructuredConst({
      j,
      props,
      value: itemLocalName,
    })
  );

  const renames = [
    ["expandedIds", expandedName],
    ["selectedIds", selectedName],
  ].filter(([_name, localName]) => localName);
  if (renames.length) {
    const props = renames.map(
      ([name, localName]) => localName && createObjectProperty({ j, name })
    );

    rmdImports.add("useTreeContext");
    const useTreeContextIdentifier = j.identifier("useTreeContext");
    const useTreeContext = j.callExpression(useTreeContextIdentifier, []);
    let value = useTreeContextIdentifier;
    if (expanderIcon) {
      value = j.identifier("context");
      statements.push(
        createConst({
          j,
          id: value,
          value: useTreeContext,
        })
      );
    }

    statements.push(
      createDestructuredConst({
        j,
        props,
        value,
      })
    );

    renames.forEach(([name, localName]) => {
      statements.push(
        createConst({
          j,
          id: j.identifier(localName),
          value: j.callExpression(
            j.memberExpression(j.identifier(name), j.identifier("has")),
            [j.identifier(itemIdName)]
          ),
        })
      );
    });
  }

  if (focusedName) {
    itemRendererProps.push(
      j.jsxAttribute(
        j.jsxIdentifier("id"),
        j.jsxExpressionContainer(j.identifier("id"))
      )
    );

    reactImports.add("useId");
    rmdImports.add("useKeyboardMovementContext");
    statements.push(
      createConst({
        j,
        id: j.identifier("id"),
        value: j.callExpression(j.identifier("useId"), []),
      }),
      createConst({
        j,
        id: j.identifier(focusedName),
        value: j.binaryExpression(
          "===",
          j.memberExpression(
            j.callExpression(j.identifier("useKeyboardMovementContext"), []),
            j.identifier("activeDescendantId")
          ),
          j.identifier("id")
        ),
      })
    );
  }

  return itemLocalName;
}

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const reactImports = new Set<string>();
  const rmdImports = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "GetItemProps",
    remove: true,
  }).forEach((name) => {
    // find any variables that are defined using the GetItemProps type
    root
      .find(j.VariableDeclarator, (path) => {
        if (path.id.type !== "Identifier") {
          return false;
        }

        const ta = path.id.typeAnnotation?.typeAnnotation;
        if (
          !ta ||
          ta.type !== "TSTypeReference" ||
          ta.typeName?.type !== "Identifier" ||
          ta.typeName.name !== name
        ) {
          return false;
        }

        return true;
      })
      .forEach((variableDeclarator) => {
        const node = variableDeclarator.node;
        if (!isFunctionType(node)) {
          return;
        }

        const [itemVariable] = node.init.params;
        if (
          !j.ObjectPattern.check(itemVariable) &&
          !j.Identifier.check(itemVariable)
        ) {
          return;
        }

        const scope = j(variableDeclarator).closestScope();
        if (scope.length !== 1) {
          return;
        }

        // create the props identifier for the new Renderer function
        const id = node.id;
        const props = j.identifier("props");
        props.typeAnnotation = j.tsTypeAnnotation(
          j.tsTypeReference(
            j.identifier("TreeItemRendererProps"),
            id.typeAnnotation.typeAnnotation.typeParameters
          )
        );

        const { body } = node.init;
        if (!j.ObjectExpression.check(body) && !j.BlockStatement.check(body)) {
          return;
        }

        let existingReturnStatement: ObjectExpression | undefined;
        if (j.ObjectExpression.check(body)) {
          existingReturnStatement = body;
        } else {
          existingReturnStatement = body.body.find(
            (
              statement
            ): statement is ReturnStatement & { argument: ObjectExpression } =>
              j.ReturnStatement.check(statement) &&
              j.ObjectExpression.check(statement.argument)
          )?.argument;
        }

        // next, figure out which properties were destructured/accessed from the
        // item. it can be one of:
        // - destructured as an argument
        // - destructured in the body
        // - [x] (not supporting) member expression access
        // start by checking if it was destructured as an argument
        const statements: Statements = [];

        const itemRendererProps: JSXAttributes = [
          j.jsxSpreadAttribute(j.identifier("props")),
        ];

        let expanderIcon: JSXExpression | undefined;
        if (existingReturnStatement) {
          existingReturnStatement.properties.forEach((prop) => {
            if (j.SpreadElement.check(prop)) {
              itemRendererProps.push(j.jsxSpreadAttribute(prop.argument));
              return;
            }

            if (!j.ObjectProperty.check(prop)) {
              return;
            }

            const name = getObjectPropertyName(prop);
            if (name === "expanderIcon") {
              if (isValidJsxExpression(j, prop.value)) {
                expanderIcon = prop.value;
              }

              return;
            }

            const { value } = prop;
            if (!isValidJsxExpression(j, value)) {
              return;
            }

            itemRendererProps.push(
              j.jsxAttribute(
                j.jsxIdentifier(name),
                j.jsxExpressionContainer(value)
              )
            );
          });
        }

        let itemLocalName = "item";
        if (j.ObjectPattern.check(itemVariable)) {
          itemLocalName = convertDestructuredItem({
            j,
            statements,
            rmdImports,
            reactImports,
            objectPattern: itemVariable,
            expanderIcon,
            itemRendererProps,
          });
        } else {
          // I don't care about supporting:
          // const x = item.whatever
          // or
          // const y = item["whatever"]
          // or
          // const y = item[whatever]
          scope
            .find(j.VariableDeclarator, {
              init: { name: itemVariable.name },
              id: { type: "ObjectPattern" },
            })
            .forEach((variableDeclarator) => {
              if (!j.ObjectPattern.check(variableDeclarator.node.id)) {
                return;
              }

              itemLocalName = convertDestructuredItem({
                j,
                statements,
                rmdImports,
                reactImports,
                objectPattern: variableDeclarator.node.id,
                expanderIcon,
                itemRendererProps,
              });
              j(variableDeclarator.parent).remove();
            });
        }
        const copiedStatements: Statements = [];
        if (j.BlockStatement.check(body)) {
          copiedStatements.push(
            ...body.body.filter(
              (statement) => !j.ReturnStatement.check(statement)
            )
          );
        }

        statements.push(...copiedStatements);
        reactImports.add("ReactElement");
        rmdImports.add("DefaultTreeItemRenderer");
        rmdImports.add("TreeItemRendererProps");
        const defaultTreeItemRenderer = createJsxElement({
          j,
          name: "DefaultTreeItemRenderer",
          props: itemRendererProps,
        });
        let returnedJsx = defaultTreeItemRenderer;
        if (expanderIcon) {
          rmdImports.add("TreeProvider");
          returnedJsx = createJsxElement({
            j,
            name: "TreeProvider",
            props: [
              j.jsxSpreadAttribute(j.identifier("context")),
              j.jsxAttribute(
                j.jsxIdentifier("expanderIcon"),
                j.jsxExpressionContainer(expanderIcon)
              ),
            ],
            children: [defaultTreeItemRenderer],
          });
        }
        statements.push(j.returnStatement(returnedJsx));

        // the item will always need to be destructured from the `props`
        const destructureItemFromProps = createDestructuredConst({
          j,
          props: [
            createObjectProperty({
              j,
              name: "item",
              local: itemLocalName,
            }),
          ],
          value: j.identifier("props"),
        });
        const rendererFunction = j.functionExpression(
          j.identifier("Renderer"),
          [props],
          j.blockStatement([destructureItemFromProps, ...statements])
        );
        rendererFunction.returnType = j.tsTypeAnnotation(
          j.tsTypeReference(j.identifier("ReactElement"))
        );

        const comment = j.commentLine(
          " TODO: This might need to be renamed to match normal component naming conventions"
        );

        j(variableDeclarator).replaceWith(
          j.variableDeclarator(j.identifier(id.name), rendererFunction)
        );

        let exported = false;
        j(variableDeclarator)
          .closest(j.ExportNamedDeclaration)
          .forEach((exportDeclaration) => {
            exported = true;
            exportDeclaration.node.comments ??= [];
            exportDeclaration.node.comments.push(comment);
          });

        if (!exported) {
          j(variableDeclarator)
            .closest(j.VariableDeclaration)
            .forEach((variableDeclaration) => {
              variableDeclaration.node.comments ??= [];
              variableDeclaration.node.comments.push(comment);
            });
        }
      });
  });

  removeEmptyImportDeclaration({
    j,
    root,
  });

  addImportSpecifiers({
    j,
    root,
    imports: reactImports,
    packageName: "react",
  });
  addImportSpecifiers({
    j,
    root,
    imports: rmdImports,
  });

  return root.toSource(printOptions);
}
