import * as React from "react";
import { AppBarAction } from "@react-md/app-bar";
import { Tooltip } from "@react-md/tooltip";
import { FormatAlignLeftSVGIcon, FormatAlignRightSVGIcon } from "@react-md/material-icons";

export interface IRTLToggleState {
  dir: "rtl" | "ltr";
}

export default class RTLToggle extends React.Component<any, IRTLToggleState> {
  private html: HTMLHtmlElement | null;
  public constructor(props: any) {
    super(props);

    this.html = null;
    this.state = { dir: "ltr" };
  }

  public componentDidMount() {
    this.html = document.documentElement as HTMLHtmlElement;
  }

  public componentDidUpdate(prevProps: any, prevState: IRTLToggleState) {
    if (this.state.dir !== prevState.dir) {
      this.updateDir();
    }
  }

  public render() {
    const { dir } = this.state;
    const rtl = dir === "rtl";
    return (
      <AppBarAction
        id="rtl-toggle"
        btnType="icon"
        onClick={this.toggleRTL}
        aria-describedby="rtl-toggle-tooltip"
      >
        {rtl ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />}
        <Tooltip id="rtl-toggle-tooltip">Toggle left-to-right/right-to-left</Tooltip>
      </AppBarAction>
    );
  }

  private toggleRTL = () => {
    this.setState(({ dir }) => ({
      dir: dir === "rtl" ? "ltr" : "rtl",
    }));
  };

  private updateDir = () => {
    if (!this.html) {
      return;
    }

    this.html.setAttribute("dir", this.state.dir);
  };
}
