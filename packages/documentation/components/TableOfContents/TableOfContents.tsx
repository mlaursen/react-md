import React, { Fragment, FC, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader } from "@react-md/dialog";
import { Text } from "@react-md/typography";
import { bem, useToggle } from "@react-md/utils";

import useAppSizeContext from "components/Layout/useAppSizeContext";

import "./TableOfContents.scss";

import List from "./List";
import Toggle from "./Toggle";
import usePageHeadings from "./usePageHeadings";

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
  const { isPhone, isLargeDesktop } = useAppSizeContext();
  const [visible, show, hide, toggle] = useToggle(isLargeDesktop);

  useEffect(() => {
    if (isLargeDesktop) {
      show();
    } else {
      hide();
    }
    // disabled since I only want to update it on desktop changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLargeDesktop]);

  const isHome = pathname === "/" || pathname.startsWith("/sandbox");
  const headings = usePageHeadings(pathname, isHome);

  if (isHome) {
    return null;
  }

  return (
    <Fragment>
      {!isPhone && (
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
    </Fragment>
  );
};

export default TableOfContents;
