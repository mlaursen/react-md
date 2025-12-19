/**
 * @since 6.4.0
 * @internal
 */
export function deselectNode(node: Node): void {
  const selection = globalThis.getSelection();
  if (!selection) {
    return;
  }

  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i);
    if (range.startContainer.contains(node)) {
      selection.removeRange(range);
    }
  }
}
