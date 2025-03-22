import {
  type FormattedItem,
  FormattedSassDocItem,
  ItemReferenceLink,
} from "sassdoc-generator/types";

export const getGroupName = (itemOrGroup: FormattedItem | string): string => {
  const group =
    typeof itemOrGroup === "string" ? itemOrGroup : itemOrGroup.group;
  return group.replace(/^core\./, "");
};

export function getSassDocLink(
  item: FormattedSassDocItem | ItemReferenceLink
): string {
  let { name, type, group } = item;
  if (
    "originalName" in item &&
    item.type !== "function" &&
    item.type !== "mixin"
  ) {
    type = "variable";
  }

  return `/sassdoc/${getGroupName(group)}#${type}s-${name}`;
}
