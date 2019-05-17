import React, { FunctionComponent } from "react";
import { Sheet } from "@react-md/sheet";
import { Tree, useTreeItemExpansion, useFlattenedTree } from "@react-md/tree";
import { bem } from "@react-md/theme";

import { FlattenedFileTree } from "./useFiles";

export interface FileTreeProps {
  files: FlattenedFileTree;
  inline: boolean;
  visible: boolean;
  onRequestClose: () => void;
  selectedId: string;
  onItemSelect: (itemId: string) => void;
}

const block = bem("code-previewer");

const FileTree: FunctionComponent<FileTreeProps> = ({
  files,
  inline,
  visible,
  onRequestClose,
  selectedId,
  onItemSelect,
}) => {
  const data = useFlattenedTree(files, null);
  return (
    <Sheet
      id="code-previewer-file-sheet"
      visible={visible}
      onRequestClose={onRequestClose}
      position="left"
      overlay={!inline}
      inline={inline}
      className={block("files", { inline })}
      mountOnEnter={false}
      unmountOnExit={false}
    >
      <Tree
        id="code-previewer-files"
        aria-label="Files"
        data={data}
        onItemSelect={onItemSelect}
        selectedIds={[selectedId]}
        {...useTreeItemExpansion(["src"])}
      />
    </Sheet>
  );
};

export default FileTree;
