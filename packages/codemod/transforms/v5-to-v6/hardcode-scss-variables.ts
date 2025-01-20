import {
  type API,
  type FileInfo,
  type MemberExpression,
  type Options,
} from "jscodeshift";

import { getImportedName } from "../utils/getImportedName";
import { VARIABLE_LOOKUP } from "./scssVariables";

const getIdentifierName = (node: MemberExpression): string => {
  if (node.object.type === "MemberExpression") {
    return getIdentifierName(node.object);
  }

  if (node.object.type === "Identifier") {
    return node.object.name;
  }

  return "";
};

const getLookupKeys = (node: MemberExpression): string[] => {
  const keys: string[] = [];
  if (node.object.type === "MemberExpression") {
    keys.push(...getLookupKeys(node.object));
  }

  switch (node.property.type) {
    case "Identifier":
      if (node.computed) {
        throw new Error(
          "hardcode-scss-variables does not support computed keys"
        );
      }
      keys.push(node.property.name);
      break;
    case "StringLiteral":
      keys.push(node.property.value);
      break;
    case "NumericLiteral":
      keys.push(`${node.property.value}`);
      break;
    default:
      throw new Error(`${node.property.type} is not supported`);
  }

  return keys;
};

const getHardCodedValue = (
  keys: readonly string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lookup: Record<string, any>
): unknown => {
  let index = 0;
  let result = lookup;
  const length = keys.length;
  while (result != null && index < length) {
    result = result[keys[index++]];
  }

  return index && index === length ? result : undefined;
};

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const mapping = new Map<string, string>();

  root
    .find(j.ImportDeclaration, (path) => {
      const name =
        typeof path.source.value === "string" ? path.source.value : "";

      return /^@react-md\/.+dist\/scssVariables/.test(name);
    })
    .forEach((importDeclaration) => {
      const pkgPath = importDeclaration.node.source.value;
      if (typeof pkgPath !== "string") {
        throw new Error("Should not be possible");
      }

      const varLookupName = pkgPath.split("/")[1];

      j(importDeclaration)
        .find(j.ImportDefaultSpecifier)
        .forEach((defaultImport) => {
          const name = getImportedName(defaultImport);
          if (name) {
            mapping.set(name, varLookupName);
          }
        })
        .remove();

      j(importDeclaration).remove();
    });

  if (mapping.size) {
    root.find(j.MemberExpression).forEach((memberExpression) => {
      const { node } = memberExpression;
      const name = getIdentifierName(node);
      const lookupName = mapping.get(name);
      if (!lookupName) {
        return;
      }

      const lookup = VARIABLE_LOOKUP[lookupName];
      if (!lookup) {
        return;
      }

      const keys = getLookupKeys(node);
      const value = getHardCodedValue(keys, lookup);
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null
      ) {
        j(memberExpression).replaceWith(j.literal(value));
      } else if (typeof value === "object" && Array.isArray(value)) {
        j(memberExpression).replaceWith(
          j.arrayExpression(value.map((v) => j.literal(v)))
        );
      }
    });
  }

  return root.toSource(printOptions);
}
