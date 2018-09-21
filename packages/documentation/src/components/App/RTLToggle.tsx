import * as React from "react";
import { Button } from "@react-md/button";
import { LanguageSVGIcon } from "@react-md/material-icons";

import "./rtl-toggle.scss";

export interface IRTLToggleState {}

export default class RTLToggle extends React.Component<{}, IRTLToggleState> {
  public render() {
    return (
      <Button
        btnType="icon"
        theme="secondary"
        themeType="contained"
        className="rtl-toggle"
        onClick={this.toggleRTL}
      >
        <LanguageSVGIcon />
      </Button>
    );
  }

  private toggleRTL = () => {
    const { body } = document;
    const dir = body.getAttribute("dir");
    if (dir !== "rtl") {
      body.setAttribute("dir", "rtl");
    } else {
      // have to specifically set back to ltr for Safari. Doesn't re-render back to ltr correctly otherwise.
      body.setAttribute("dir", "ltr");
    }
  };
}
