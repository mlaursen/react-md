import React, { ReactElement } from "react";
import {
  Tree,
  useTreeItemSelection,
  useTreeItemExpansion,
} from "@react-md/tree";

import folders from "./folders";

export default function MultiSelectTree(): ReactElement {
  const selection = useTreeItemSelection([], true);
  const expansion = useTreeItemExpansion([]);

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
