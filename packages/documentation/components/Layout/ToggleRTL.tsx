import React, { FunctionComponent, useState, useEffect } from "react";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import { useToggle } from "@react-md/utils";
import AppBarAction from "components/AppBarAction";

const ToggleRTL: FunctionComponent = props => {
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
    <AppBarAction
      id="toggle-rtl"
      tooltip="Toggle left-to-right/right-to-left"
      onClick={toggle}
      last
    >
      {toggled ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />}
    </AppBarAction>
  );
};

export default ToggleRTL;
