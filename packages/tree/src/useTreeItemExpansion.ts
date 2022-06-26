import { useCallback, useState } from "react";
import type { TreeExpansion } from "./types";

export function useTreeExpansion(
  defaultExpandedIds?: readonly string[] | (() => readonly string[])
): TreeExpansion {
  const [expandedIds, setExpandedIds] = useState(() => {
    const defaultIds =
      typeof defaultExpandedIds === "function"
        ? defaultExpandedIds()
        : defaultExpandedIds;

    return new Set(defaultIds);
  });

  const onItemExpansion = useCallback((itemId: string, expanded: boolean) => {
    setExpandedIds((prevExpandedIds) => {
      const expandedIds = new Set(prevExpandedIds);
      if (expanded) {
        expandedIds.add(itemId);
      } else {
        expandedIds.delete(itemId);
      }

      return expandedIds;
    });
  }, []);

  return {
    expandedIds,
    onItemExpansion,
    onMultiItemExpansion: setExpandedIds,
  };
}
