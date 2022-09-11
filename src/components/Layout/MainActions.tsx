import { Button } from "@react-md/button";
import { useToggle } from "@react-md/core";
import { Sheet } from "@react-md/dialog";
import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
import type { ReactElement } from "react";
import { WebsiteConfiguration } from "./WebsiteConfiguration";

export function MainActions(): ReactElement {
  const { toggle, disable, toggled } = useToggle(false);
  return (
    <>
      <Button aria-label="Configuration" onClick={toggle} buttonType="icon">
        <MoreVertIcon />
      </Button>
      <Sheet
        aria-label="Configuration"
        visible={toggled}
        onRequestClose={disable}
        position="right"
      >
        <WebsiteConfiguration />
      </Sheet>
    </>
  );
}
