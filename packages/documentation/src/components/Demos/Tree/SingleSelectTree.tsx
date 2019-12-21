import React, { FC } from "react";
import {
  Tree,
  useTreeItemSelection,
  useTreeItemExpansion,
} from "@react-md/tree";

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
    />
  );
};

export default SingleSelectTree;
