import React, { FC } from "react";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";
import { Tree, useTreeItemExpansion } from "@react-md/tree";
import { bem } from "@react-md/utils";

import useFiles from "./useFiles";

export interface SandboxFileTreeProps {
  fileName: string;
  inline: boolean;
  visible: boolean;
  sandbox: IFiles | null;
  onFileChange: (fileName: string) => void;
  onRequestClose: () => void;
}

const block = bem("sandbox-modal");
const noop = (): void => {};
const EMPTY = {};

const SandboxFileTree: FC<SandboxFileTreeProps> = ({
  inline,
  visible,
  fileName,
  sandbox,
  onFileChange,
  onRequestClose,
}) => {
  const data = useFiles(sandbox || EMPTY);
  return (
    <Sheet
      id="code-previewer-file-sheet"
      aria-label="Files sheet"
      visible={visible}
      onRequestClose={onRequestClose}
      position="left"
      overlay={!inline}
      portal={!inline}
      portalIntoId="sandbox-modal"
      className={block("files", { inline })}
      mountOnEnter={false}
      unmountOnExit={false}
      disableScrollLock
    >
      <Tree
        id="code-previewer-files"
        aria-label="Files"
        data={data}
        onItemSelect={onFileChange}
        onMultiItemSelect={noop}
        selectedIds={[fileName]}
        {...useTreeItemExpansion(["src", "public"])}
        labelKey="children"
        valueKey="children"
        expanderIcon={<KeyboardArrowDownSVGIcon />}
      />
    </Sheet>
  );
};

export default SandboxFileTree;
