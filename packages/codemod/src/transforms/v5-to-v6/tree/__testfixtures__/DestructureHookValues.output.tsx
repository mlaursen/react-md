import type { ReactElement } from "react";
import { Tree, useTreeSelection, useTreeExpansion } from "react-md";

import folders from "./folders";

export default function Demo(): ReactElement {
  const { selectedIds, multiSelect, toggleTreeItemSelection: onItemSelect, selectMultipleTreeItems: onMultiItemSelect } =
    useTreeSelection([], false);
  const { expandedIds, toggleTreeItemExpansion: onItemExpansion, expandMultipleTreeItems: onMultiItemExpansion } =
    useTreeExpansion([]);

  return (
    <Tree
      id="single-select-tree"
      data={folders}
      aria-label="Tree"
      selectedIds={selectedIds}
      multiSelect={multiSelect}
      onItemSelect={onItemSelect}
      onMultiItemSelect={onMultiItemSelect}
      {...expansion}
    />
  );
}
