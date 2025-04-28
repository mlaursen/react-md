import type { ReactElement } from "react";
import { Tree, useTreeItemSelection, useTreeItemExpansion } from "react-md";

import folders from "./folders";

export default function Demo(): ReactElement {
  const { selectedIds, multiSelect, onItemSelect, onMultiItemSelect } =
    useTreeItemSelection([], false);
  const { expandedIds, onItemExpansion, onMultiItemExpansion } =
    useTreeItemExpansion([]);

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
