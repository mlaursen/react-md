"use client";

import { Button } from "@react-md/core/button/Button";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement, type ReactNode, useEffect } from "react";

import { AlgoliaSearch } from "./AlgoliaSearch.jsx";
import styles from "./WebsiteSearchContainer.module.scss";

export interface WebsiteSearchContainerProps {
  footer: ReactNode;
  unsearched: ReactNode;
  buttonChildren: ReactNode;
}

export function WebsiteSearchContainer({
  footer,
  unsearched,
  buttonChildren,
}: Readonly<WebsiteSearchContainerProps>): ReactElement {
  const { isPhone } = useAppSize();
  const { toggled: visible, enable: show, disable: hide } = useToggle();
  useEffect(() => {
    if (visible) {
      return;
    }

    const handler = (event: KeyboardEvent): void => {
      if (event.ctrlKey && event.key === "k") {
        show();
        event.preventDefault();
        event.stopPropagation();
      }
    };
    globalThis.addEventListener("keydown", handler);

    return () => {
      globalThis.removeEventListener("keydown", handler);
    };
  }, [show, visible]);

  return (
    <>
      <Button
        responsive
        themeType={isPhone ? "flat" : "outline"}
        className={styles.button}
        onClick={show}
      >
        {buttonChildren}
      </Button>
      <Dialog
        aria-label="Search"
        visible={visible}
        onRequestClose={hide}
        className={styles.dialog}
        width="medium"
        type={isPhone ? "full-page" : "centered"}
      >
        <AlgoliaSearch hide={hide} unsearched={unsearched} />
        {footer}
      </Dialog>
    </>
  );
}
