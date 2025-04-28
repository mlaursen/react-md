import {
  type API,
  type FileInfo,
  type Identifier,
  type Options,
} from "jscodeshift";

import { addFileComments } from "../../utils/addFileComment.js";
import { addImportSpecifiers } from "../../utils/addImportSpecifiers.js";
import { getPropName } from "../../utils/getPropName.js";
import { isTypescriptFile } from "../../utils/isTypescriptFile.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";
import { isOptionsDotMap } from "./utils/select/isOptionsDotMap.js";
import { migrateOptionsToChildren } from "./utils/select/migrateOptionsToChildren.js";
import { tryToMigrateOnChange } from "./utils/select/tryToMigrateOnChange.js";
import { type OptionsMapFunction } from "./utils/select/types.js";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;
  const isTypescript = isTypescriptFile(file);

  const rmdImports = new Set<string>();
  const reactImports = new Set<string>();
  const comments = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "Select",
  }).forEach((name) => {
    const tooMuchEffortToMigrate = new Set<string>();
    root.findJSXElements(name).forEach((select) => {
      // let labelKey: StringLiteral | undefined;
      // let valueKey: StringLiteral | undefined;
      let options: Identifier | OptionsMapFunction | undefined;
      // let getOptionId;
      // let getOptionLabel;
      // let getOptionValue;
      // let isOptionDisabled;

      // const menuProps: ObjectProperty[] = [];
      j(select)
        .find(j.JSXAttribute)
        .forEach((prop) => {
          const name = getPropName(prop);
          let remove = false;

          switch (name) {
            case "disableMovementChange":
              remove = true;
              break;
            case "disableLeftAddon":
              prop.node.name = j.jsxIdentifier("disableOptionAddon");
              break;
            // case "labelKey":
            //   remove = true;
            //   if (j.StringLiteral.check(prop.value)) {
            //     labelKey = prop.value;
            //   }
            //   break;
            // case "valueKey":
            //   remove = true;
            //   if (j.StringLiteral.check(prop.value)) {
            //     valueKey = prop.value;
            //   }
            //   break;
            case "options": {
              remove = true;
              if (
                !j.JSXExpressionContainer.check(prop.node.value) ||
                j.JSXEmptyExpression.check(prop.node.value)
              ) {
                return;
              }

              const value = prop.node.value.expression;
              // i only support:
              // `options={options}`
              // `options={options.map(...)}`
              // ingore the rest and require manual updates. otherwise i'd have
              // to try to find the `.map` call or the end of the statement
              // before I could `.map` in the children
              // i.e. `options={options.reduce((opt, item) => opt), []).filter(item => !!item)}`
              // i.e. `options={options.reduce((opt, item) => opt), []).filter(item => !!item).map(another => ({
              //   ...whatever shape...
              // })}`
              if (!j.Identifier.check(value) && !isOptionsDotMap(j, value)) {
                comments.add(
                  "TOOD: The `Select` component cannot automatically be converted due to the options not being an identifier or .map"
                );
                return;
              }

              options = value;
              break;
            }
            // case "closeOnScroll":
            // case "closeOnResize":
            //   remove = true;
            //   break;
            // case "anchor":
            // case "positionOptions":
            // case "listboxWidth":
            // case "listboxStyle":
            // case "listboxClassName":
            //   remove = true;
            //   if (
            //     !j.JSXExpressionContainer.check(prop.node.value) ||
            //     j.JSXEmptyExpression.check(prop.node.value.expression)
            //   ) {
            //     return;
            //   }
            //   break;
            case "onChange":
              comments.add(
                "TODO: The `Select` component no longer provides the `option` and `listboxChangeEventData` as the 2nd and 3rd arguments for the `onChange` handler. Check if the code needs to be updated."
              );
              tryToMigrateOnChange({
                j,
                prop,
                comments,
              });
              break;
            case "closeOnScroll":
            case "closeOnResize":
            case "anchor":
            case "positionOptions":
            case "listboxWidth":
            case "listboxStyle":
            case "listboxClassName":
            case "labelKey":
            case "valueKey":
              tooMuchEffortToMigrate.add(name);
              break;
          }

          if (remove) {
            j(prop).remove();
          }
        });

      migrateOptionsToChildren({
        j,
        select,
        options,
        comments,
        rmdImports,
        reactImports,
        isTypescript,
      });

      if (tooMuchEffortToMigrate.size) {
        comments.add(
          `TODO: The \`Select\` component has props that are too difficult to migrate. Handle them manually: "${[...tooMuchEffortToMigrate].join(", ")}"`
        );
      }
    });
  });

  addImportSpecifiers({
    j,
    root,
    imports: rmdImports,
  });
  addImportSpecifiers({
    j,
    root,
    imports: reactImports,
    packageName: "react",
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
