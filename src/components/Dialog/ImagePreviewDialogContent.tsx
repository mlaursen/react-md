import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { DialogContent } from "@react-md/dialog";
import ArrowBackIcon from "@react-md/material-icons/ArrowBackIcon";
import { VisualMediaContainer } from "@react-md/visual-media";
import type { ReactElement } from "react";

export interface ImagePreviewDialogContentProps {
  src: string;
  filename: string;
  onRequestClose(): void;
}

export function ImagePreviewDialogContent(
  props: ImagePreviewDialogContentProps
): ReactElement {
  const { src, filename, onRequestClose } = props;

  return (
    <>
      <AppBar>
        <Button onClick={onRequestClose} aria-label="Close" buttonType="icon">
          <ArrowBackIcon />
        </Button>
        <AppBarTitle id="dialog-title">{`Preview of ${filename}`}</AppBarTitle>
      </AppBar>
      <DialogContent>
        <VisualMediaContainer>
          <img src={src} alt="" />
        </VisualMediaContainer>
      </DialogContent>
    </>
  );
}
