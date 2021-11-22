import { ReactElement } from "react";
import {
  Tree,
  useTreeItemSelection,
  useTreeItemExpansion,
} from "@react-md/tree";

import folders from "./folders";

export default function SingleSelectTree(): ReactElement {
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
}
