import { ReactNode } from "react";

import { UnknownTreeItem } from "./types";

/**
 * A "reasonable" default implementation for rendering a label for a tree item.
 *
 * @internal
 */
export function defaultGetItemLabel(
  item: UnknownTreeItem,
  labelKey: string
): ReactNode {
  let result: ReactNode = item[labelKey] as ReactNode;
  if (typeof result === "undefined") {
    result = item.children;
  }

  if (typeof result === "undefined") {
    result = null;
  }

  return result;
}
