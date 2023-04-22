import type { TreeData } from "@react-md/core";
import { Box, Card, Tree, useTree } from "@react-md/core";
import type { ReactElement } from "react";
import { useState } from "react";

import type { Folder } from "src/constants/folders";
import { folders } from "src/constants/folders";

import { ContainerSplitter } from "./ContainerSplitter";
import { DragAndDropTreeItem } from "./DragAndDropTreeItem";
import styles from "./FolderTree.module.scss";
import { FolderSetterProvider } from "./useFolderSetter";

export function FolderTree(): ReactElement {
  const [data, setData] = useState<TreeData<Folder>>(() =>
    JSON.parse(JSON.stringify(folders))
  );
  const tree = useTree({
    defaultSelectedIds: ["folder-1"],
  });
  const { selectedIds } = tree;

  return (
    <FolderSetterProvider value={setData}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <Tree
            {...tree}
            aria-label="Folders"
            data={data}
            renderer={DragAndDropTreeItem}
            expanderLeft
            expansionMode="manual"
          />
        </Card>
        <ContainerSplitter />
        <Box align="start">
          {`Selected folder id: ${[...selectedIds.keys()][0]}`}
        </Box>
      </div>
    </FolderSetterProvider>
  );
}
