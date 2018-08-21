import { TreeViewElement } from "../types";

export default function buildItemIndexStack(
  element: HTMLElement,
  treeEl: TreeViewElement,
  includeCurrent: boolean = false
) {
  // Since this is only working with the DOM at this point, create a stack of treeitem indexes as they would
  // appear in `this.props.data` array so that a list of all item ids on the same level as this item can be
  // generated. Luckily, all this information is provided by the `aria-posinset` which we can just subtract
  // 1 from so it is the index within the items array.
  const itemIndexStack = [];

  if (includeCurrent) {
    const position = parseInt(element.getAttribute("aria-posinset") || "", 10);
    itemIndexStack.push(position - 1);
  }

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
