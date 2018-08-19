import { IIndexKeyAny, TreeViewDataList, TreeViewElement } from "./types";

function handleSingleItemSelect(itemId: string, selectedIds: string[]) {
  if (selectedIds[0] === itemId && selectedIds.length === 1) {
    return selectedIds;
  }

  return [itemId];
}

function handleMultiItemSelect(itemId: string, selectedIds: string[]) {
  const i = selectedIds.indexOf(itemId);
  const nextSelectedIds = selectedIds.slice();
  if (i === -1) {
    nextSelectedIds.push(itemId);
  } else {
    nextSelectedIds.splice(i, 1);
  }

  return nextSelectedIds;
}

/**
 * A really simple helper function to implement the single item treeview selection logic.
 * A new `expandedIds` list will only be returned if the ids have changed, otherwise the
 * original `expandedIds` list will be returned.
 */
export function handleItemSelect(itemId: string, selectedIds: string[], multiSelect: boolean = false) {
  if (multiSelect) {
    return handleMultiItemSelect(itemId, selectedIds);
  }

  return handleSingleItemSelect(itemId, selectedIds);
}

/**
 * A really simple helper function to implment a treeitem's expansion change logic that can be
 * added to a component's state (or redux). A new `expandedIds` list will only be returned
 * if the ids have changed, otherwise the original `expandedIds` list will be returned.
 */
export function handleItemExpandedChange(itemId: string, expanded: boolean, expandedIds: string[]) {
  const i = expandedIds.indexOf(itemId);
  if (i === -1 && expanded) {
    const nextExpandedIds = expandedIds.slice();
    nextExpandedIds.push(itemId);
    return nextExpandedIds;
  } else if (i !== -1 && !expanded) {
    const nextExpandedIds = expandedIds.slice();
    nextExpandedIds.splice(i, 1);
    return nextExpandedIds;
  }

  return expandedIds;
}

/**
 * A utility function that will find all parent ids for the provided `toMatchIds`. This is generally used
 * to automatically expand parent lements if a child node has been expanded.
 */
export function findAllParentIds<D>(
  items: TreeViewDataList<D>,
  toMatchIds: string[],
  parentIds: string[] = []
): string[] {
  const ids: string[] = [];
  items.forEach(({ itemId, childItems }) => {
    if (childItems && childItems.length) {
      [].push.apply(ids, findAllParentIds(childItems, toMatchIds, parentIds.concat([itemId])));
    }

    if (toMatchIds.indexOf(itemId) !== -1) {
      [].push.apply(ids, parentIds);
    }
  });

  // remove duplicates
  return ids.filter((id, i, list) => list.indexOf(id) === i);
}

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
export function findTreeItemFromElement<D = IIndexKeyAny>(
  element: HTMLElement,
  data: TreeViewDataList<D>,
  treeEl: TreeViewElement | null
) {
  const itemElement = findTreeItemElement(element);
  if (!treeEl || !itemElement) {
    return null;
  }
  const itemIndex = parseInt(itemElement.getAttribute("aria-posinset") || "", 10) - 1;

  return findTreeItemDataList(buildItemIndexStack(itemElement, treeEl), data)[itemIndex] || null;
}

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
export function findTreeItemsFromElement<D = IIndexKeyAny>(
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

function findTreeItemElement(element: HTMLElement) {
  const role = element.getAttribute("role");
  if (role === "group") {
    return null;
  } else if (role !== "treeitem") {
    const closest = element.closest('[role="treeitem"]') as HTMLElement;
    if (!closest) {
      return null;
    }

    element = closest;
  }

  return element;
}

/**
 * Attempts to find the `TreeItemDataList` based on a stack of item indexes by digging down into the
 * provided `data` list.
 */
function findTreeItemDataList<D = IIndexKeyAny>(stack: number[], data: TreeViewDataList<D>) {
  let temp;
  let list = data;
  for (const index of stack) {
    temp = list[index];
    if (!temp.childItems) {
      return [];
    }

    list = temp.childItems;
  }

  return list;
}

function buildItemIndexStack(element: HTMLElement, treeEl: TreeViewElement) {
  // Since this is only working with the DOM at this point, create a stack of treeitem indexes as they would
  // appear in `this.props.data` array so that a list of all item ids on the same level as this item can be
  // generated. Luckily, all this information is provided by the `aria-posinset` which we can just subtract
  // 1 from so it is the index within the items array.
  const itemIndexStack = [];

  // don't need to add the current element into the stack since it will automatically be included once the
  // parent indexes are found
  let node: HTMLElement | null = element.parentElement;
  while (node && treeEl.contains(node)) {
    const position = parseInt(node.getAttribute("aria-posinset") || "", 10);
    if (node.getAttribute("role") === "treeitem" && position > 0) {
      itemIndexStack.unshift(position - 1);
    }

    node = node.parentElement;
  }

  return itemIndexStack;
}
