import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import ArrowBackIcon from "@react-md/material-icons/ArrowBackIcon";
import { visualMediaContainer } from "@react-md/visual-media";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";

import { useToggle } from "@react-md/core";
import styles from "./ImagePreviewDialogContent.module.scss";

export interface ImagePreviewDialogContentProps {
  src: string;
  filename: string;
  onRequestClose(): void;
}

export function ImagePreviewDialogContent(
  props: ImagePreviewDialogContentProps
): ReactElement {
  const { src, filename, onRequestClose } = props;
  const { toggle, toggled: fullResolution } = useToggle();

  return (
    <>
      <AppBar>
        <Button
          autoFocus
          onClick={onRequestClose}
          aria-label="Close"
          buttonType="icon"
        >
          <ArrowBackIcon />
        </Button>
        <AppBarTitle id="dialog-title" noWrap>
          {`Preview of ${filename}`}
        </AppBarTitle>
      </AppBar>
      <div
        aria-pressed={fullResolution}
        aria-label="Full resolution"
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(event) => {
          if (event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            event.currentTarget.click();
          } else if (event.key === "Enter") {
            event.stopPropagation();
            event.currentTarget.click();
          }
        }}
        className={cnb(
          fullResolution && styles.fullResolution,
          !fullResolution &&
            visualMediaContainer({
              className: styles.scaled,
              responsive: "container",
            })
        )}
      >
        <img src={src} alt="" className={styles.image} />
      </div>
    </>
  );
}
