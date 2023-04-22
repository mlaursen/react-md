import { Tree, useTree } from "@react-md/core";
import type { ReactElement } from "react";
import { folders } from "src/constants/folders";

export function IconExpansionExample(): ReactElement {
  const tree = useTree();

  return (
    <Tree {...tree} data={folders} aria-label="Tree" expansionMode="manual" />
  );
}
