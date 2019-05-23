export default function getTemporaryParent(element: HTMLElement) {
  return element.closest('[role="menu"],[role="dialog"]');
}
