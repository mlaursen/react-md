import { Tree, useTree } from "@react-md/core";
import type { ReactElement } from "react";
import { folders } from "src/constants/folders";

export function SingleSelectTree(): ReactElement {
  const tree = useTree();

  return <Tree {...tree} data={folders} aria-label="Tree" />;
}
