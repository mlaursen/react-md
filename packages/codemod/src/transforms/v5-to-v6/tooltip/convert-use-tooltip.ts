import {
  type API,
  type FileInfo,
  type Identifier,
  type NumericLiteral,
  type ObjectProperty,
  type Options,
} from "jscodeshift";

import { addFileComments } from "../../utils/addFileComment.js";
import { addImportSpecifier } from "../../utils/addImportSpecifier.js";
import { createDestructuredConst } from "../../utils/createDestructuredConst.js";
import { type NormalExpression } from "../../utils/createExpression.js";
import { getObjectPropertyName } from "../../utils/getObjectPropertyName.js";
import { removeEmptyImportDeclaration } from "../../utils/removeEmptyImportDeclaration.js";
import { renameIdentifier } from "../../utils/renameIdentifier.js";
import { renameObjectProperty } from "../../utils/renameObjectProperty.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

const REMOVED_TYPES = new Set([
  "TooltipInitiatedBy",
  "TooltipTouchEventHandlers",
  "TooltipKeyboardEventHandlers",
]);

const RENAMED_TYPES: Record<string, string> = {
  TooltipHookProvidedTooltipProps: "ProvidedTooltipProps",
  TooltipHookProvidedElementProps: "ProvidedTooltippedElementProps",
  BaseTooltipHookOptions: "TooltipOptions",
  TooltipHookOptions: "TooltipOptions",
  TooltipHookReturnValue: "TooltipImplementation",
};

const HANDLERS_COMMENT =
  "TODO: `useTooltip` no longer returns the `handlers` object. The event handlers can be extracted from the `elementProps` if they are still needed.";
const REMOVED_COMMENT =
  "TODO: `useTooltip` no longer returns the following keys from the hover mode api and must manually be updated: ";
const DISABLE_HOVER_MODE_COMMENT =
  "TODO: `useTooltip` no longer supports the `disableHoverMode` option and was removed. See the new hover mode API docs or define the `hoverTimeout` to option.";

const isNumberOrIdentifier = (
  o: ObjectProperty
): o is ObjectProperty & { value: NumericLiteral | Identifier } => {
  return o.value.type === "NumericLiteral" || o.value.type === "Identifier";
};

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
    name: "useTooltip",
  }).forEach((name) => {
    root
      .find(j.CallExpression, {
        callee: { name },
        arguments: [{ type: "ObjectExpression" }],
      })
      .forEach((callExpression) => {
        // first:
        // - handle renaming `baseId` -> `id`
        // - try converting `touchTime` and `focusTime` to `hoverTimeout`
        //   preferring the `focusTime`
        let hoverTimeout: NormalExpression | undefined;
        const options = j(callExpression).find(j.ObjectExpression);
        j(callExpression)
          .find(j.ObjectProperty)
          .forEach((objectProperty) => {
            const node = objectProperty.node;
            const name = getObjectPropertyName(node);
            switch (name) {
              case "baseId":
                renameObjectProperty({
                  name: "id",
                  prop: node,
                });
                break;
              case "touchTime":
                if (isNumberOrIdentifier(node)) {
                  hoverTimeout ??= node.value;
                }
                j(objectProperty).remove();
                break;
              case "focusTime":
                if (isNumberOrIdentifier(node)) {
                  hoverTimeout = node.value;
                }
                j(objectProperty).remove();
                break;
              case "disableHoverMode":
                comments.add(DISABLE_HOVER_MODE_COMMENT);
                j(objectProperty).remove();
                break;
            }
          });
        if (hoverTimeout) {
          const value = hoverTimeout;
          options.forEach((optionObject) => {
            optionObject.node.properties.push(
              j.objectProperty(
                {
                  name: "hoverTimeout",
                  type: "JSXIdentifier",
                },
                value
              )
            );
          });
        }

        // Next, check to see if using the undocumented hover mode behavior
        // built into the tooltip hook.
        //
        // I don't care about auto-migrating the hover mode at this time, so
        // just warn and remove those keys.
        //
        // Same thing for the `handlers` convenience key.
        //
        // Do a simple rename for the `clearHoverTimeout` and migrate the easy
        // hover mode stuff
        const removed = new Set<string>();
        const useTooltipHoverModeProperties = new Set<ObjectProperty>();
        j(callExpression)
          .closest(j.VariableDeclarator, {
            id: { type: "ObjectPattern" },
          })
          .forEach((variable) => {
            j(variable)
              .find(j.ObjectProperty)
              .forEach((objectProperty) => {
                const node = objectProperty.node;
                const name = getObjectPropertyName(node);
                switch (name) {
                  case "stuck":
                  case "active":
                  case "onClick":
                  case "onMouseEnter":
                  case "onMouseLeave":
                    removed.add(name);
                    j(objectProperty).remove();
                    break;
                  case "handlers":
                    comments.add(HANDLERS_COMMENT);
                    j(objectProperty).remove();
                    break;
                  case "clearHoverTimeout":
                    renameObjectProperty({
                      name: "clearVisibilityTimeout",
                      prop: node,
                    });
                    break;
                  case "enableHoverMode":
                  case "disableHoverMode":
                  case "startDisableTimer":
                    useTooltipHoverModeProperties.add(
                      j.objectProperty.from(objectProperty.node)
                    );
                    j(objectProperty).remove();
                    break;
                }
              });
          });

        if (removed.size) {
          const s = [...removed].join(", ");
          comments.add(REMOVED_COMMENT + s);
        }

        if (useTooltipHoverModeProperties.size) {
          addImportSpecifier({
            j,
            root,
            name: "useTooltipHoverMode",
          });

          const hook = createDestructuredConst({
            j,
            props: [...useTooltipHoverModeProperties],
            value: j.callExpression(j.identifier("useTooltipHoverMode"), []),
          });

          j(callExpression)
            .closest(j.VariableDeclarator)
            .forEach((path) => {
              j(path.parent).insertBefore(hook);
            });
        }
      });
  });

  traverseImportSpecifiers({
    j,
    root,
    name: Object.keys(RENAMED_TYPES),
    replace: RENAMED_TYPES,
  }).forEach((name) => {
    renameIdentifier({
      j,
      root,
      from: name,
      to: RENAMED_TYPES[name],
    });
  });

  traverseImportSpecifiers({
    j,
    root,
    name: REMOVED_TYPES,
    remove: true,
    returnOriginalName: true,
  }).forEach((name) => {
    comments.add(`TODO: \`${name}\` type has been removed from react-md.`);
  });
  addFileComments({
    j,
    root,
    comments,
  });
  removeEmptyImportDeclaration({
    j,
    root,
  });

  return root.toSource(printOptions);
}
