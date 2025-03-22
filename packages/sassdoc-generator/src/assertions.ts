import {
  type DataType,
  type FunctionItem,
  type Item,
  type MixinItem,
  type VariableItem,
} from "sassdoc";

export function isMixinItem(item: Item): item is MixinItem {
  return item.context.type === "mixin";
}

export function isFunctionItem(item: Item): item is FunctionItem {
  return item.context.type === "function";
}

export function isVariableItem(item: Item): item is VariableItem {
  return item.context.type === "variable";
}

const DATA_TYPES = ["List", "Map", "Number", "Boolean", "String", "Color"];

export function isValidVariableDataType(type: unknown): type is DataType {
  return (
    typeof type === "string" &&
    type.split("|").every((part) => DATA_TYPES.includes(part.trim()))
  );
}

export function assertValidVariableDataType(
  type: unknown
): asserts type is DataType {
  if (!type || !isValidVariableDataType(type)) {
    throw new Error(`"${type}" is not a valid variable data type`);
  }
}
