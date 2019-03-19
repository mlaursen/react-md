import React, { FunctionComponent, useState, useEffect } from "react";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import AppBarAction from "components/AppBarAction";
import { useVisibility } from "@react-md/utils";

const ToggleRTL: FunctionComponent = props => {
  const { visible, toggle } = useVisibility();

  useEffect(() => {
    const html = document.querySelector("html") as HTMLElement;
    if (visible) {
      html.setAttribute("dir", "rtl");
    } else {
      html.setAttribute("dir", "ltr");
    }
  }, [visible]);

  return (
    <AppBarAction
      id="toggle-rtl"
      tooltip="Toggle left-to-right/right-to-left"
      onClick={toggle}
      last
    >
      {visible ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />}
    </AppBarAction>
  );
};

export default ToggleRTL;
