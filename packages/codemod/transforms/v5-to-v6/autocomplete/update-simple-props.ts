import {
  type API,
  type FileInfo,
  type ObjectProperty,
  type Options,
  type SpreadProperty,
} from "jscodeshift";

import { type JSXAttributes } from "../../types";
import { addFileComments } from "../../utils/addFileComment";
import { addImportSpecifiers } from "../../utils/addImportSpecifiers";
import { createObjectProperty } from "../../utils/createObjectProperty";
import { getPropName } from "../../utils/getPropName";
import { isJsxExpressionContainer } from "../../utils/isJsxExpressionContainer";
import { renameIdentifier } from "../../utils/renameIdentifier";
import { renameProps } from "../../utils/renameProps";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const comments = new Set<string>();
  const imports = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "AutoComplete",
  }).forEach((name) => {
    // start by renaming simple props that might cause other issues
    renameProps({
      root,
      props: {
        data: "options",
        value: "query",
        defaultValue: "defaultQuery",
      },
      component: name,
    });

    root.findJSXElements(name).forEach((jsxElement) => {
      comments.add(
        "TODO: Ensure the `Autocomplete` options are strings or add the `getOptionLabel` prop"
      );
      const props: JSXAttributes = [];
      const listboxProps: ObjectProperty[] = [];
      jsxElement.node.openingElement.attributes?.forEach((attr) => {
        if (j.JSXSpreadAttribute.check(attr)) {
          props.push(attr);
          return;
        }

        const name = getPropName(attr);
        switch (name) {
          case "highlight":
          case "highlightRepeating":
          case "highlightStyle":
          case "highlightClassName":
            comments.add(
              "TODO: The `Autocomplete` no longer supports highlighting matches and must be added manually"
            );
            break;
          case "beforeResultsChildren":
          case "afterResultsChildren":
            comments.add(
              "TODO: The `Autocomplete` no longer supports the `beforeResultsChildren` and `afterResultsChildren` props"
            );
            break;
          case "autoComplete":
            if (j.StringLiteral.check(attr.value)) {
              if (attr.value.value !== "list") {
                comments.add(
                  "TODO: The `Autocomplete` no longer supports inline autocomplete behavior"
                );
              }
            }
            break;
          case "filter":
            if (j.StringLiteral.check(attr.value)) {
              const v = attr.value.value;
              // don't need to do anything for case-insensitive
              const name =
                v === "fuzzy"
                  ? "fuzzySearch"
                  : v === "none"
                    ? "noopAutocompleteFilter"
                    : "";
              if (name) {
                imports.add(name);
                attr.value = j.jsxExpressionContainer(j.identifier(name));
                props.push(attr);
              }
            } else if (
              j.JSXExpressionContainer.check(attr.value) &&
              j.ArrowFunctionExpression.check(attr.value.expression)
            ) {
              const [query, list, options] = attr.value.expression.params;
              const properties: (ObjectProperty | SpreadProperty)[] = [];
              if (j.Identifier.check(query)) {
                properties.push(
                  createObjectProperty({
                    j,
                    name: "query",
                    local: query.name,
                  })
                );
              }

              if (j.Identifier.check(list)) {
                properties.push(
                  createObjectProperty({
                    j,
                    name: "list",
                    local: list.name,
                  })
                );
              }

              if (j.Identifier.check(options)) {
                properties.push(j.spreadProperty(options));
              }
              attr.value.expression.params = [j.objectPattern(properties)];

              props.push(attr);
            } else {
              comments.add(
                "TODO: The `Autocomplete` filter behavior cannot be updated automatically"
              );
            }
            break;

          case "clearOnAutocomplete":
            props.push(
              j.jsxAttribute(
                j.jsxIdentifier("updateQueryOnSelect"),
                j.literal("clear")
              )
            );
            break;

          case "labelKey":
          case "valueKey":
          case "omitKeys":
          case "getResultId":
          case "getResultLabel":
            comments.add(
              "TODO: The `Autocomplete` cannot automatically convert to the `getOptionProps` API"
            );
            break;
          case "getResultValue":
          case "disableShowOnFocus":
            break;

          case "listboxWidth":
            if (isJsxExpressionContainer(j, attr.value)) {
              listboxProps.push(
                j.objectProperty(j.identifier("width"), attr.value.expression)
              );
            }
            break;

          case "anchor":
          case "xMargin":
          case "yMargin":
          case "vwMargin":
          case "vhMargin":
          case "transformOrigin":
          case "preventOverlap":
          case "disableVHBounds":
          case "disableSwapping":
          case "closeOnResize":
          case "closeOnScroll":
            if (isJsxExpressionContainer(j, attr.value)) {
              listboxProps.push(
                j.objectProperty(j.identifier(name), attr.value.expression)
              );
            }
            break;
          default:
            props.push(attr);
        }
        //
      });

      if (listboxProps.length) {
        props.push(
          j.jsxAttribute(
            j.jsxIdentifier("listboxProps"),
            j.jsxExpressionContainer(j.objectExpression(listboxProps))
          )
        );
      }

      jsxElement.node.openingElement.attributes = props;
    });

    renameIdentifier({
      j,
      from: name,
      to: "Autocomplete",
      root,
    });
  });

  addImportSpecifiers({
    j,
    root,
    imports,
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
