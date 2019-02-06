import React, { FunctionComponent, useState, useEffect } from "react";
import { AppBarAction } from "@react-md/app-bar";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";

const ToggleRTL: FunctionComponent = props => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html") as HTMLElement;
    if (toggled) {
      html.setAttribute("dir", "rtl");
    } else {
      html.setAttribute("dir", "ltr");
    }
  }, [toggled]);

  return (
    <Tooltipped
      id="toggle-rtl"
      tooltip="Toggle left-to-right/right-to-left"
      onClick={() => setToggled(prevToggled => !prevToggled)}
    >
      {({ tooltip, containerProps }) => (
        <AppBarAction {...containerProps} last>
          {toggled ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />}
          {tooltip}
        </AppBarAction>
      )}
    </Tooltipped>
  );
};

export default ToggleRTL;
