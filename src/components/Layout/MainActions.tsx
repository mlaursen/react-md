import { Button } from "@react-md/button";
import { Sheet } from "@react-md/dialog";
import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
import type { ReactElement } from "react";
import { WebsiteConfiguration } from "./WebsiteConfiguration";

export interface MainActionsProps {
  showConfiguration(): void;
  hideConfiguration(): void;
  configurationVisible: boolean;
}

export function MainActions({
  showConfiguration,
  hideConfiguration,
  configurationVisible,
}: MainActionsProps): ReactElement {
  return (
    <>
      <Button
        aria-label="Configuration"
        onClick={showConfiguration}
        buttonType="icon"
      >
        <MoreVertIcon />
      </Button>
      <Sheet
        aria-label="Configuration"
        visible={configurationVisible}
        onRequestClose={hideConfiguration}
        position="right"
      >
        <WebsiteConfiguration />
      </Sheet>
    </>
  );
}
