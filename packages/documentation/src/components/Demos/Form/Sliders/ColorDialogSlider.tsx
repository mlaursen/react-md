import React, { ReactElement } from "react";
import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { Dialog, DialogContent } from "@react-md/dialog";
import { useSlider } from "@react-md/form";
import { CloseSVGIcon } from "@react-md/material-icons";
import { useAppSize, useToggle } from "@react-md/utils";

import ColorSlider from "./ColorSlider";

const id = "color-preview";
const titleId = `${id}-title`;

export default function ColorDialogSlider(): ReactElement | null {
  const { isPhone } = useAppSize();
  const [visible, show, hide] = useToggle(false);
  const [r, rControls] = useSlider(0, { max: 255 });
  const [g, gControls] = useSlider(150, { max: 255 });
  const [b, bControls] = useSlider(136, { max: 255 });

  return (
    <>
      <Button onClick={show} themeType="outline" theme="primary">
        Update Color
      </Button>
      <Dialog
        id={id}
        visible={visible}
        onRequestClose={hide}
        aria-labelledby={titleId}
        style={{ maxWidth: isPhone ? undefined : 320, width: "100%" }}
        type={isPhone ? "full-page" : "centered"}
      >
        <AppBar theme="default">
          <AppBarTitle id={titleId}>Color Preview</AppBarTitle>
          <AppBarAction first last aria-label="Close" onClick={hide}>
            <CloseSVGIcon />
          </AppBarAction>
        </AppBar>
        <div
          style={{
            height: 300,
            backgroundColor: `rgb(${r}, ${g}, ${b})`,
          }}
        />
        <DialogContent>
          <ColorSlider type="r" {...rControls} />
          <ColorSlider type="g" {...gControls} />
          <ColorSlider type="b" {...bControls} />
        </DialogContent>
      </Dialog>
    </>
  );
}
