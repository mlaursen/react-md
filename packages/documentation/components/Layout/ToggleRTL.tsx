import React, { FunctionComponent, useEffect } from "react";
import { AppBarAction } from "@react-md/app-bar";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
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
    <AppBarAction id="toggle-rtl" onClick={toggle} last>
      {toggled ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />}
    </AppBarAction>
  );
};

export default ToggleRTL;
