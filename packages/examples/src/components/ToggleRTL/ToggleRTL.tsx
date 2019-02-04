import React, { FunctionComponent, useState, useEffect } from "react";
import { Button } from "@react-md/button";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";

import styles from "./styles.module.scss";

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
    <Button
      id="toggle-rtl"
      onClick={() => setToggled(prevToggled => !prevToggled)}
      theme="primary"
      themeType="contained"
      buttonType="icon"
      className={styles.root}
    >
      {toggled ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />}
    </Button>
  );
};

export default ToggleRTL;
