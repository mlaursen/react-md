import type { ReactElement } from "react";
import { Tree, useTreeItemSelection, useTreeItemExpansion } from "react-md";

import folders from "./folders";

export default function Demo(): ReactElement {
  const selection = useTreeItemSelection([], false);
  const expansion = useTreeItemExpansion([]);
  const { selectedIds, onItemSelect, onMultiItemSelect } = selection;
  const { expandedIds, onItemExpansion, onMultiItemExpansion } = expansion;

  const s1 = selection.selectedIds;
  const s2 = selection.onItemSelect;
  const s3 = selection.onMultiItemSelect;
  const e1 = expansion.expandedIds;
  const e2 = expansion.onItemExpansion;
  const e3 = expansion.onMultiItemExpansion;

  return (
    <Tree
      id="single-select-tree"
      data={folders}
      aria-label="Tree"
      {...selection}
      {...expansion}
    />
  );
}
