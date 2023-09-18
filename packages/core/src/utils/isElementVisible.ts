/**
 * Note: requires the `$disable-display-none-class` variable to remain `false`.
 *
 * @remarks \@since 6.0.0
 */
export const DISPLAY_NONE_CLASS = "rmd-display-none";

/**
 * This is a small util to check if an element within react-md is visible by
 * checking the element and all parents to see if they contain the
 * {@link DISPLAY_NONE_CLASS}.
 *
 * @example
 * Simple Example
 * ```tsx
 * const treeItem = screen.getByRole("treeitem", { name: "Tree Item" });
 * const subTreeItem = screen.getByRole("treeitem", { Name: "Sub Tree Item" });
 *
 * expect(isElementVisible(treeItem)).toBe(true);
 * expect(isElementVisible(subTreeItem)).toBe(false):
 *
 * await user.click(treeItem);
 * expect(isElementVisible(treeItem)).toBe(true);
 * expect(isElementVisible(subTreeItem)).toBe(true);
 * ```
 * @remarks \@since 6.0.0
 */
export function isElementVisible(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }

  let currentElement: HTMLElement | null = element;
  while (currentElement) {
    if (currentElement.classList.contains(DISPLAY_NONE_CLASS)) {
      return false;
    }

    currentElement = currentElement.parentElement;
  }

  return true;
}
