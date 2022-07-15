import { Button } from "@react-md/button";
import type { ReactElement } from "react";
import { useState } from "react";
import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
import { WebsiteConfiguration } from "./WebsiteConfiguration";
import { Sheet } from "@react-md/dialog";

export function MainActions(): ReactElement {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible((p) => !p)} buttonType="icon">
        <MoreVertIcon />
      </Button>
      <Sheet
        aria-label="Configuration"
        visible={visible}
        onRequestClose={() => setVisible(false)}
        position="right"
      >
        <WebsiteConfiguration />
      </Sheet>
    </>
  );
}
