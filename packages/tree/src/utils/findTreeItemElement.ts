export default function findTreeItemElement(element: HTMLElement) {
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
