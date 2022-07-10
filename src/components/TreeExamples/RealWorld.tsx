import { Box } from "@react-md/core";
import { Tree } from "@react-md/tree";
import { useTree } from "packages/tree/src/useTree";
import type { ReactElement } from "react";

const data = {} as const;

export function RealWorldTreeExample(): ReactElement {
  const treeImplementation = useTree();
  return (
    <Box>
      <Tree
        aria-label="Folders"
        {...treeImplementation}
        data={data}
        getTreeItemProps={(_item) => {
          return {};
        }}
      />
    </Box>
  );
}
