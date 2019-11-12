import React, { FC } from "react";
import {
  Tree,
  useTreeItemSelection,
  useTreeItemExpansion,
} from "@react-md/tree";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";

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
      expanderIcon={<KeyboardArrowDownSVGIcon />}
    />
  );
};

export default MultiSelectTree;
