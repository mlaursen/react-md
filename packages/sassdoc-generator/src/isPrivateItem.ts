import { type Item } from "sassdoc";

export function isPrivateItem(item: Item): boolean {
  return item.access === "private" || item.context.name.startsWith("_");
}
