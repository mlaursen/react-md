import { Tree, useTree } from "@react-md/core";
import type { ReactElement } from "react";
import { folders } from "src/constants/folders";

export function MultiSelectTree(): ReactElement {
  const tree = useTree({
    multiSelect: true,
  });

  return <Tree {...tree} data={folders} aria-label="Tree" />;
}
