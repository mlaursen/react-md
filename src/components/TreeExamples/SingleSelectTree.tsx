import { Tree, useTree } from "@react-md/tree";
import type { ReactElement } from "react";
import { folders } from "src/constants/folders";

export function SingleSelectTree(): ReactElement {
  const tree = useTree();

  return (
    <Tree id="single-select-tree" data={folders} aria-label="Tree" {...tree} />
  );
}
