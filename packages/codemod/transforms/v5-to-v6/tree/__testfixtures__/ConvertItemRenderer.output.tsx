// TODO: The `defaultTreeItemRenderer` has been replaced by the `DefaultTreeItemRenderer` component and cannot automatically be converted
// TODO: The `TreeItemRenderer` type has been replaced by the `TreeItemRendererProps` type and cannot automatically be converted
import { TreeItemRendererProps, DefaultTreeItemRenderer } from "react-md";
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
