import type { ReactElement } from "react";
import { Tree, useTreeSelection, useTreeExpansion } from "react-md";

import folders from "./folders";

export default function Demo(): ReactElement {
  const selection = useTreeSelection([], false);
  const expansion = useTreeExpansion([]);

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
