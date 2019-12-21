import React, { FC } from "react";
import {
  Tree,
  useTreeItemSelection,
  useTreeItemExpansion,
} from "@react-md/tree";

import folders from "./folders";

const MultiSelectTree: FC = () => {
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
};

export default MultiSelectTree;
