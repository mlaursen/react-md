import { Button } from "@react-md/button";
import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
import type { ReactElement } from "react";

export interface MainActionsProps {
  showConfiguration(): void;
}

export function MainActions({
  showConfiguration,
}: MainActionsProps): ReactElement {
  return (
    <Button
      aria-label="Configuration"
      onClick={showConfiguration}
      buttonType="icon"
    >
      <MoreVertIcon />
    </Button>
  );
}
