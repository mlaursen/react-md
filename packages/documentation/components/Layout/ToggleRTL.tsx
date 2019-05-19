import React, { FunctionComponent, useEffect } from "react";
import { AppBarAction } from "@react-md/app-bar";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import { useToggle } from "@react-md/utils";

const ToggleRTL: FunctionComponent = () => {
  const { toggled, toggle } = useToggle();

  useEffect(() => {
    const html = document.querySelector("html") as HTMLElement;
    if (toggled) {
      html.setAttribute("dir", "rtl");
    } else {
      html.setAttribute("dir", "ltr");
    }
  }, [toggled]);

  return (
    <Tooltipped id="toggle-rtl" tooltip="Toggle right to left">
      <AppBarAction last onClick={toggle} aria-label="Toggle right to left">
        {toggled ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />}
      </AppBarAction>
    </Tooltipped>
  );
};

export default ToggleRTL;
