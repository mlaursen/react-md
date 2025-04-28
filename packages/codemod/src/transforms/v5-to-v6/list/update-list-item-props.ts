import {
  type API,
  type Collection,
  type FileInfo,
  type JSCodeshift,
  type JSXExpressionContainer,
  type Options,
} from "jscodeshift";

import { type JSXAttributes } from "../../../types.js";
import { addImportSpecifiers } from "../../utils/addImportSpecifiers.js";
import { createJsxElement } from "../../utils/createJsxElement.js";
import { getPropName } from "../../utils/getPropName.js";
import { isJsxExpressionContainer } from "../../utils/isJsxExpressionContainer.js";
import { isPropBooleanExpression } from "../../utils/isPropBooleanExpression.js";
import { isPropEnabled } from "../../utils/isPropEnabled.js";
import { negateExpression } from "../../utils/negateExpression.js";
import { removeProps } from "../../utils/removeProps.js";
import { renameImportSpecifier } from "../../utils/renameImportSpecifier.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";
import { REMOVED_INTERACTION_PROPS } from "../interaction/constants.js";

interface UpdateListItemPropsOptions {
  j: JSCodeshift;
  root: Collection;
  name: string;
  renames?: Record<string, string>;
}

function updateListItemProps(options: UpdateListItemPropsOptions): void {
  const { j, root, name, renames } = options;

  traverseImportSpecifiers({
    j,
    root,
    name,
  }).forEach((name) => {
    removeProps({
      root,
      props: REMOVED_INTERACTION_PROPS,
      component: name,
    });

    root
      .find(j.JSXOpeningElement, { name: { name } })
      .forEach((jsxOpeningElement) => {
        const props: JSXAttributes = [];
        jsxOpeningElement.node.attributes?.forEach((attr) => {
          if (!j.JSXAttribute.check(attr)) {
            props.push(attr);
            return;
          }

          const name = getPropName(attr);
          switch (name) {
            // convert:
            // - `forceAddonWrap={false}` -> nothing
            // - `forceAddonWrap`/`forceAddonWrap={true}` -> `leftAddonForceWrap rightAddonForceWrap`
            // - `forceAddonWrap={flag}` -> `leftAddonForceWrap={flag} rightAddonForceWrap={flag}`
            case "forceAddonWrap": {
              if (
                isPropBooleanExpression(attr) &&
                !attr.value.expression.value
              ) {
                return;
              }

              let value: JSXExpressionContainer | null = null;
              if (isJsxExpressionContainer(j, attr.value)) {
                ({ value } = attr);
              }

              props.push(
                j.jsxAttribute(j.jsxIdentifier("leftAddonForceWrap"), value),
                j.jsxAttribute(j.jsxIdentifier("rightAddonForceWrap"), value)
              );
              break;
            }

            // convert:
            // - `textChildren`/`textChildren={true}` -> nothing
            // - `textChildren={false}` to `disableTextChildren`
            // - `textChildren={someFlag}` to `disableTextChildren={!someFlag}`
            case "textChildren": {
              if (
                !isJsxExpressionContainer(j, attr.value) ||
                isPropEnabled(attr)
              ) {
                return;
              }

              let value: JSXExpressionContainer | null = null;
              if (!isPropBooleanExpression(attr)) {
                value = j.jsxExpressionContainer(
                  negateExpression({ j, expr: attr.value.expression })
                );
              }

              props.push(
                j.jsxAttribute(j.jsxIdentifier("disableTextChildren"), value)
              );
              break;
            }

            case "threeLines":
              attr.name.name = "multiline";
              props.push(attr);
              break;

            default: {
              const rename = renames?.[name];
              if (rename) {
                attr.name.name = rename;
              }

              props.push(attr);
            }
          }
        });

        jsxOpeningElement.node.attributes = props;
      });
  });
}

const LIST_ITEM_CHILDREN_PROPS = new Set([
  "textClassName",
  "secondaryTextClassName",
  "primaryText",
  "secondaryText",
  "leftAddon",
  "leftAddonType",
  "leftAddonPosition",
  "rightAddon",
  "rightAddonType",
  "rightAddonPosition",

  // these are deprecated, but will be handled by the `updateListItemProps`
  "threeLines",
  "textChildren",
]);

interface ConvertSimpleListItemToListItemChildrenOptions {
  j: JSCodeshift;
  root: Collection;
  imports: Set<string>;
}

function convertSimpleListItemToListItemChildren(
  options: ConvertSimpleListItemToListItemChildrenOptions
): void {
  const { j, root, imports } = options;
  traverseImportSpecifiers({
    j,
    root,
    name: "SimpleListItem",
    remove: true,
  }).forEach((name) => {
    imports.add("ListItemChildren");

    root
      .find(j.JSXElement, { openingElement: { name: { name } } })
      .forEach((jsxElement) => {
        const props: JSXAttributes = [];
        const childrenProps: JSXAttributes = [];
        jsxElement.node.openingElement.attributes?.forEach((attr) => {
          if (j.JSXSpreadAttribute.check(attr)) {
            props.push(attr);
            return;
          }

          const name = getPropName(attr);
          if (LIST_ITEM_CHILDREN_PROPS.has(name)) {
            childrenProps.push(attr);
            return;
          }

          switch (name) {
            case "height":
            case "clickable":
            case "disabled":
            case "disabledOpacity":
              break;
            default:
              props.push(attr);
          }
        });

        j(jsxElement).replaceWith(
          createJsxElement({
            j,
            name: "li",
            props,
            children: [
              createJsxElement({
                j,
                name: "ListItemChildren",
                props: childrenProps,
                children: jsxElement.node.children,
              }),
            ],
          })
        );
      });
  });

  renameImportSpecifier({
    j,
    root,
    from: "SimpleListItemProps",
    to: "ListItemChildrenProps",
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

  const imports = new Set<string>();
  updateListItemProps({
    j,
    root,
    name: "ListItem",
  });
  updateListItemProps({
    j,
    root,
    name: "ListItemLink",
    renames: {
      component: "as",
    },
  });

  convertSimpleListItemToListItemChildren({
    j,
    root,
    imports,
  });
  updateListItemProps({
    j,
    root,
    name: "ListItemChildren",
  });

  addImportSpecifiers({
    j,
    root,
    imports,
  });

  return root.toSource(printOptions);
}
