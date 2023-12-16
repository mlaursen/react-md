"use client";
import { folders, type Folder } from "@/constants/folders.js";
import { Tree, useTree, type TreeData } from "@react-md/core";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import { useMemo, type ReactElement, type ReactNode } from "react";

type CustomTreeData = TreeData<Folder & { leftAddon?: ReactNode }>;

export default function ExpanderIconPositionExample(): ReactElement {
  const tree = useTree();
  const data = useMemo(
    () =>
      Object.entries(folders).reduce<CustomTreeData>(
        (updated, [folderId, folder]) => {
          updated[folderId] = {
            ...folder,
            leftAddon: <FolderIcon />,
          };
          return updated;
        },
        {}
      ),
    []
  );

  return <Tree {...tree} data={data} aria-label="Tree" expanderLeft />;
}
