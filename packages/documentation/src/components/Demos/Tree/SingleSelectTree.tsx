import React, { FC } from "react";
import {
  Tree,
  useTreeItemSelection,
  useTreeItemExpansion,
} from "@react-md/tree";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";

import folders from "./folders";

const SingleSelectTree: FC = () => {
  const selection = useTreeItemSelection([], false);
  const expansion = useTreeItemExpansion([]);

  return (
    <Tree
      id="single-select-tree"
      data={folders}
      aria-label="Tree"
      {...selection}
      {...expansion}
      expanderIcon={<KeyboardArrowDownSVGIcon />}
    />
  );
};

export default SingleSelectTree;
