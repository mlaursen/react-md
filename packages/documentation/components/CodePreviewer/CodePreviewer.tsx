import React, { FunctionComponent, useState, useEffect } from "react";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { Dialog, DialogContent } from "@react-md/dialog";
import { DialogProps } from "@react-md/dialog/types/Dialog";
import { bem } from "@react-md/theme";

import "./styles.scss";
import useFiles from "./useFiles";
import Header from "./Header";
import FileTree from "./FileTree";
import Code from "./Code";
import { useAppSizeContext } from "@react-md/sizing";
import { useToggle } from "@react-md/utils";

export interface CodePreviewerProps
  extends Pick<DialogProps, "visible" | "onRequestClose"> {
  projectName: string;
  getFiles: () => Promise<IFiles>;
}

const block = bem("code-previewer");

const CodePreviewer: FunctionComponent<CodePreviewerProps> = ({
  visible,
  onRequestClose,
  projectName,
  getFiles,
}) => {
  const files = useFiles(visible, getFiles);
  const [fileId, setFileId] = useState("src/Demo.tsx");

  const { isPhone, isTablet, isDesktop, isLandscape } = useAppSizeContext();
  const isLandscapeTablet = isLandscape && isTablet;
  const inline = isDesktop || isLandscapeTablet;
  const {
    toggled: isSheetVisible,
    disable: hideSheet,
    toggle: toggleSheet,
    setToggled: setSheetVisible,
  } = useToggle(isDesktop);

  useEffect(() => {
    if (isSheetVisible !== isDesktop) {
      setSheetVisible(isDesktop);
    }
  }, [isDesktop, isTablet, isPhone]);

  useEffect(() => {
    if (isSheetVisible && !isDesktop) {
      setSheetVisible(false);
    }
  }, [isDesktop, fileId]);

  return (
    <Dialog
      id="code-previewer"
      aria-label={projectName}
      visible={visible}
      onRequestClose={onRequestClose}
      type="full-page"
      className={block()}
    >
      <Header
        inline={inline}
        isDesktop={isDesktop}
        toggleSheet={toggleSheet}
        isSheetVisible={isSheetVisible}
        projectName={projectName}
        onRequestClose={onRequestClose}
      />
      <DialogContent disablePadding>
        <FileTree
          inline={inline}
          visible={isSheetVisible}
          onRequestClose={hideSheet}
          files={files}
          selectedId={fileId}
          onItemSelect={fileId => {
            if (files[fileId] && files[fileId].content) {
              setFileId(fileId);
            }
          }}
        />
        <Code offset={inline && isSheetVisible} fileId={fileId} files={files} />
      </DialogContent>
    </Dialog>
  );
};

export default CodePreviewer;
