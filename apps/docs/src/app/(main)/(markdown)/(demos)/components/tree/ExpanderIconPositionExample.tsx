"use client";

import { Tree } from "@react-md/core/tree/Tree";
import { type TreeData } from "@react-md/core/tree/types";
import { useTree } from "@react-md/core/tree/useTree";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import { type ReactElement, type ReactNode, useMemo } from "react";

import { type Folder, folders } from "@/constants/folders.js";

type CustomTreeData = TreeData<Folder & { leftAddon?: ReactNode }>;

export default function ExpanderIconPositionExample(): ReactElement {
  const tree = useTree();
  const data = useMemo(() => {
    const treeData: CustomTreeData = {};
    for (const [folderId, folder] of Object.entries(folders)) {
      treeData[folderId] = {
        ...folder,
        leftAddon: <FolderIcon />,
      };
    }

    return treeData;
  }, []);

  return <Tree {...tree} data={data} aria-label="Tree" expanderLeft />;
}
