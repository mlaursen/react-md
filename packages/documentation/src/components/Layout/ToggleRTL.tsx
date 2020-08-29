import React, { FC } from "react";
import { AppBarAction } from "@react-md/app-bar";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import { useDir } from "@react-md/utils";

const ToggleRTL: FC = () => {
  const { dir, toggleDir } = useDir();
  const isRTL = dir === "rtl";

  return (
    <Tooltipped id="toggle-rtl" tooltip="Toggle right to left">
      <AppBarAction
        last
        onClick={toggleDir}
        aria-label="Right to left layout"
        aria-pressed={isRTL}
      >
        {isRTL ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />}
      </AppBarAction>
    </Tooltipped>
  );
};

export default ToggleRTL;
