import React, { MouseEventHandler, ReactElement } from "react";
import { ClearAllSVGIcon } from "@react-md/material-icons";
import ActionChip from "./ActionChip";

export interface ActionChipBlindsProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  visible: boolean;
}

export default function ActionChipBlinds({
  onClick,
  visible,
}: ActionChipBlindsProps): ReactElement {
  return (
    <ActionChip
      selected={visible}
      onClick={onClick}
      leftIcon={<ClearAllSVGIcon />}
    >
      Close blinds
    </ActionChip>
  );
}
