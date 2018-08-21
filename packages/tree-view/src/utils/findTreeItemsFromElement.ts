import { IIndexKeyAny, TreeViewDataList, TreeViewElement } from "../types";
import findTreeItemElement from "./findTreeItemElement";
import findTreeItemDataList from "./findTreeItemDataList";
import buildItemIndexStack from "./buildItemIndexStack";

/**
 * Attempts to find the `TreeViewDataList` based on the provided `element` and `data`. This is generally
 * used for click or keyboard events to navigate and select different items within the `TreeView`
 * component internally, but can also be used to add additional custom click and keyboard handlers.
 *
 * Example:
 * ```html
 * <ul role="treeview" id="tree">
 *   <li role="treeitem" id="item-1">Item 1</li>
 *   <li role="treeitem" id="item-2">
 *     Item 2
 *     <ul role="group">
 *      <li role="treeitem" id="item-2-1">Item 2-1</li>
 *      <li role="treeitem" id="item-2-2">Item 2-2</li>
 *     </ul>
 *   </li>
 *   <li role="treeitem" id="item-3">Item 3</li>
 * ```
 *
 * ```js
 * const data = [{
 *   itemId: "item-1",
 *   children: "Item 1",
 * }, {
 *   itemId: "item-2",
 *   children: "Item 2",
 *   childItems: [{
 *     itemId: "item-2-1",
 *     children: "Item 2-1",
 *   }, {
 *    itemId: "item-2-2",
 *    children: "Item 2-2",
 *   }],
 * }];
 * const item = document.getElementById("item-2-1") as HTMLElement | null;
 * const tree = document.getElementByid("tree") as HTMLElement | null;
 * const foundItemData = TreeView.findTreeItemFromElement(item, data, tree);
 * // foundItemData = [{ itemId: "item-2-1", children: "Item 2-1" }, { itemId: "item-2-2", children: "Item 2-2" }]
 * ```
 */
export default function findTreeItemsFromElement<D = IIndexKeyAny>(
  element: HTMLElement,
  data: TreeViewDataList<D>,
  treeEl: TreeViewElement | null
) {
  const itemElement = findTreeItemElement(element);
  if (!treeEl || !itemElement) {
    return [];
  }

  return findTreeItemDataList(buildItemIndexStack(itemElement, treeEl), data);
}
