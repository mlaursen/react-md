import type { ReactElement } from "react";
import { Tree, useTreeSelection, useTreeExpansion } from "react-md";

import folders from "./folders";

export default function Demo(): ReactElement {
  const selection = useTreeSelection([], false);
  const expansion = useTreeExpansion([]);
  const { selectedIds, toggleTreeItemSelection: onItemSelect, selectMultipleTreeItems: onMultiItemSelect } = selection;
  const { expandedIds, toggleTreeItemExpansion: onItemExpansion, expandMultipleTreeItems: onMultiItemExpansion } = expansion;

  const s1 = selection.selectedIds;
  const s2 = selection.toggleTreeItemSelection;
  const s3 = selection.selectMultipleTreeItems;
  const e1 = expansion.expandedIds;
  const e2 = expansion.toggleTreeItemExpansion;
  const e3 = expansion.expandMultipleTreeItems;

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
