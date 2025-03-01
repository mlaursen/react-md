import {
  type API,
  type FileInfo,
  type ObjectProperty,
  type Options,
  type SpreadProperty,
} from "jscodeshift";

import { addFileComments } from "../../utils/addFileComment";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

const REPLACEMENTS = [
  {
    from: ["caseInsensitiveFilter", "findIgnoreCase"],
    to: "caseInsensitiveSearch",
  },
  {
    from: "fuzzyFilter",
    to: "fuzzySearch",
  },
] as const;

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const comments = new Set<string>();
  REPLACEMENTS.forEach(({ from, to }) => {
    traverseImportSpecifiers({
      j,
      root,
      name: from,
      replace: to,
      returnOriginalName: true,
    }).forEach((name) => {
      comments.add(
        `TODO: Check if \`${to}\` is using a list of objects and requires an \`extractor\` option`
      );

      root
        .find(j.CallExpression, { callee: { name } })
        .forEach((callExpression) => {
          if (!j.Identifier.check(callExpression.node.callee)) {
            return;
          }

          callExpression.node.callee.name = to;
          const [query, list, options] = callExpression.node.arguments;
          if (
            (!j.StringLiteral.check(query) && !j.Identifier.check(query)) ||
            (!j.ArrayExpression.check(list) && !j.Identifier.check(list))
          ) {
            comments.add(
              "TOOD: Unable to automatically convert `caseInsensitiveSearch`"
            );
            return;
          }

          const listProperty = j.objectProperty(j.identifier("list"), list);
          if (j.Identifier.check(list) && list.name === "list") {
            listProperty.shorthand = true;
          }

          const properties: (ObjectProperty | SpreadProperty)[] = [
            j.objectProperty(j.identifier("query"), query),
            listProperty,
          ];
          if (name === "findIgnoreCase") {
            properties.push(
              j.objectProperty(j.identifier("type"), j.literal("search"))
            );
          }

          if (j.ObjectExpression.check(options)) {
            options.properties.forEach((prop) => {
              // NOTE: `valueKey` cannot be converted
              if (
                !j.ObjectProperty.check(prop) ||
                !j.Identifier.check(prop.key)
              ) {
                return;
              }

              if (
                prop.key.name === "startsWith" &&
                (!j.BooleanLiteral.check(prop.value) || prop.value.value)
              ) {
                properties.push(prop);
                return;
              }

              if (prop.key.name === "getItemValue") {
                prop.key.name = "extractor";
                properties.push(prop);
                return;
              }

              const isTrim = prop.key.name === "trim";
              if (isTrim || prop.key.name === "ignoreWhitespace") {
                const whitespaceValue = isTrim
                  ? j.literal("trim")
                  : j.literal("ignore");
                if (
                  j.BinaryExpression.check(prop.value) ||
                  j.LogicalExpression.check(prop.value) ||
                  j.UnaryExpression.check(prop.value) ||
                  j.ConditionalExpression.check(prop.value) ||
                  j.Identifier.check(prop.value)
                ) {
                  prop.key = j.identifier("whitespace");
                  prop.value = j.conditionalExpression(
                    prop.value,
                    whitespaceValue,
                    j.literal("undefined")
                  );
                  properties.push(prop);
                } else if (
                  j.BooleanLiteral.check(prop.value) &&
                  prop.value.value
                ) {
                  prop.key = j.identifier("whitespace");
                  prop.value = whitespaceValue;
                  properties.push(prop);
                }
              }
            });
          } else if (j.Identifier.check(options)) {
            comments.add(
              "TOOD: Unable to automatically convert `caseInsensitiveSearch`"
            );
          }

          callExpression.node.arguments = [j.objectExpression(properties)];
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
