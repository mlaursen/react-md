import { type FormattedItem } from "sassdoc-generator/types";

export const getGroupName = (itemOrGroup: FormattedItem | string): string => {
  const group =
    typeof itemOrGroup === "string" ? itemOrGroup : itemOrGroup.group;
  return group.replace(/^core\./, "");
};
