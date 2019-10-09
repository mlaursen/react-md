import React, { FC } from "react";
import { AppBarAction } from "@react-md/app-bar";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import useRTLToggle from "./useRTLToggle";

const ToggleRTL: FC = () => {
  const { isRTL, toggleRTL } = useRTLToggle();

  return (
    <Tooltipped id="toggle-rtl" tooltip="Toggle right to left">
      <AppBarAction last onClick={toggleRTL} aria-label="Toggle right to left">
        {isRTL ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />}
      </AppBarAction>
    </Tooltipped>
  );
};

export default ToggleRTL;
