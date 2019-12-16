import {
  FunctionItem,
  Item,
  MixinItem,
  PlaceholderItem,
  VariableItem,
} from "sassdoc";

export const isVariableItem = (item: Item): item is VariableItem =>
  item.context.type === "variable";

export const isPlaceholderItem = (item: Item): item is PlaceholderItem =>
  item.context.type === "placeholder";

export const isFunctionItem = (item: Item): item is FunctionItem =>
  item.context.type === "function";

export const isMixinItem = (item: Item): item is MixinItem =>
  item.context.type === "function";

export const isPublic = (item: Item): boolean => item.access !== "private";
