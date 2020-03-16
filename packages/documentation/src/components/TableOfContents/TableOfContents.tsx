import React, { FC } from "react";
import { Dialog, DialogContent, DialogHeader } from "@react-md/dialog";
import { Text } from "@react-md/typography";
import { bem, useAppSize } from "@react-md/utils";

import List from "./List";
import Toggle from "./Toggle";
import usePageHeadings from "./usePageHeadings";
import { useTOCActions, useTOCVisibility } from "./VisibilityContext";

import "./TableOfContents.scss";

export interface TableOfContentsProps {
  pathname: string;
}

const block = bem("table-of-contents");
const CLASSNAMES = {
  enter: "table-of-contents--enter",
  enterActive: "table-of-contents--enter-active",
  exit: "table-of-contents--exit",
  exitActive: "table-of-contents--exit-active",
};

const TableOfContents: FC<TableOfContentsProps> = ({ pathname }) => {
  const { isPhone, isLargeDesktop } = useAppSize();
  const { visible, rendered } = useTOCVisibility();
  const { hide, toggle } = useTOCActions();

  const headings = usePageHeadings(pathname, !rendered);
  if (!rendered) {
    return null;
  }

  return (
    <>
      {(!isPhone || visible) && (
        <Toggle
          onClick={toggle}
          isLargeDesktop={isLargeDesktop}
          isDialogVisible={visible}
        />
      )}
      <Dialog
        id="table-of-contents"
        aria-labelledby="table-of-contents-title"
        type="custom"
        portal={false}
        overlay={isPhone}
        visible={visible}
        onRequestClose={hide}
        className={block()}
        overlayClassName={block("overlay")}
        classNames={CLASSNAMES}
        disableScrollLock={!isPhone}
        disableFocusOnMount
        disableFocusContainer
      >
        <DialogHeader className={block("header")}>
          <Text id="table-of-contents-title" type="headline-6" margin="none">
            Table of Contents
          </Text>
        </DialogHeader>
        <DialogContent className={block("content")}>
          <List
            headings={headings}
            isLargeDesktop={isLargeDesktop}
            onRequestClose={hide}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableOfContents;
