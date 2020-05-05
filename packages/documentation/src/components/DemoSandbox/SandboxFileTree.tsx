import React, { FC, useMemo } from "react";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";
import {
  Tree,
  useTreeItemExpansion,
  TreeData,
  getItemsFrom,
} from "@react-md/tree";
import { bem } from "@react-md/utils";

import { FileTreeData } from "./useFiles";

export interface SandboxFileTreeProps {
  fileName: string;
  inline: boolean;
  visible: boolean;
  folders: readonly string[];
  files: TreeData<FileTreeData>;
  onFileChange: (fileName: string) => void;
  onRequestClose: () => void;
  disableTransition: boolean;
}

const block = bem("sandbox-modal");
const noop = (): void => {};

const SandboxFileTree: FC<SandboxFileTreeProps> = ({
  inline,
  visible,
  fileName,
  files,
  folders,
  onFileChange,
  onRequestClose,
  disableTransition,
}) => {
  const defaultExpandedIds = useMemo(() => {
    const children = getItemsFrom(files, fileName).reduce<string[]>(
      (folderIds, { itemId }) => {
        if (folders.includes(itemId)) {
          folderIds.push(itemId);
        }

        return folderIds;
      },
      []
    );

    return Array.from(new Set(["src", "public", ...children]));
  }, [folders, files, fileName]);

  return (
    <Sheet
      id="code-previewer-file-sheet"
      aria-label="Files sheet"
      visible={visible}
      onRequestClose={onRequestClose}
      position="left"
      overlay={!inline}
      portal={false}
      className={block("files", { inline })}
      mountOnEnter={!inline}
      unmountOnExit={!inline}
      disableScrollLock
      disableTransition={disableTransition}
    >
      <Tree
        id="code-previewer-files"
        aria-label="Files"
        data={files}
        onItemSelect={onFileChange}
        onMultiItemSelect={noop}
        selectedIds={[fileName]}
        {...useTreeItemExpansion(defaultExpandedIds)}
        labelKey="children"
        valueKey="children"
        expanderIcon={<KeyboardArrowDownSVGIcon />}
      />
    </Sheet>
  );
};

export default SandboxFileTree;
