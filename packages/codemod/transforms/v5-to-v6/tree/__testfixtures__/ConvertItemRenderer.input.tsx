import { TreeItemRenderer, defaultTreeItemRenderer } from "react-md";
import { MyTreeItem } from "./types";
import MyFancyNonTreeItem from "./MyFancyNonTreeItem";

export const itemRenderer: TreeItemRenderer<MyTreeItem> = (
  itemProps,
  item,
  treeProps
) => {
  const { key } = itemProps;
  const { isCustom } = item;
  if (isCustom) {
    return <MyFancyNonTreeItem item={item} key={key} />;
  }

  return defaultTreeItemRenderer(itemProps, item, treeProps);
};
