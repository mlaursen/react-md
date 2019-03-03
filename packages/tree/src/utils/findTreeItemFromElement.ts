import { IAnyRecord, TreeDataList, TreeElement } from "../types.d";
import findTreeItemElement from "./findTreeItemElement";
import findTreeItemDataList from "./findTreeItemDataList";
import buildItemIndexStack from "./buildItemIndexStack";

/**
 * Attempts to find the `TreeViewData` based on the provided `element` and `data`. This is generally
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
 * // foundItemData = { itemId: "item-2-1", children: "Item 2-1" }
 * ```
 */
export default function findTreeItemFromElement<D = IAnyRecord>(
  element: HTMLElement,
  data: TreeDataList<D>,
  treeEl: TreeElement | null
) {
  const itemElement = findTreeItemElement(element);
  if (!treeEl || !itemElement) {
    return null;
  }

  const itemIndex =
    parseInt(itemElement.getAttribute("aria-posinset") || "", 10) - 1;

  const list = findTreeItemDataList(
    buildItemIndexStack(itemElement, treeEl),
    data
  );

  return list[itemIndex] || null;
}
