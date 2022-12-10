import { Tree, useTreeExpansion, useTreeSelection } from "@react-md/tree";
import type { ReactElement } from "react";
import { folders } from "src/constants/folders";

export function MultiSelectTree(): ReactElement {
  const selection = useTreeSelection([], true);
  const expansion = useTreeExpansion([]);

  return (
    <Tree
      id="multi-select-tree"
      data={folders}
      aria-label="Tree"
      {...selection}
      {...expansion}
    />
  );
}
