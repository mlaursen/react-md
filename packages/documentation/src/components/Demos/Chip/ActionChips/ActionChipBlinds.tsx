import React, { FC, MouseEventHandler } from "react";
import { ClearAllSVGIcon } from "@react-md/material-icons";
import ActionChip from "./ActionChip";

export interface ActionChipBlindsProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  visible: boolean;
}

const ActionChipBlinds: FC<ActionChipBlindsProps> = ({ onClick, visible }) => (
  <ActionChip
    selected={visible}
    onClick={onClick}
    leftIcon={<ClearAllSVGIcon />}
  >
    Close blinds
  </ActionChip>
);

export default ActionChipBlinds;
