import * as React from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { Tooltip } from "@react-md/tooltip";

import LightbulbSVGIcon from "components/LightbulbSVGIcon";

import "./theme-toggle.scss";

type ThemeMode = "light" | "dark";

export interface IThemeToggleState {
  mode: ThemeMode;
  hover: boolean;
}

export default class ThemeToggle extends React.Component<any, IThemeToggleState> {
  private html: HTMLHtmlElement | null;
  public constructor(props: void) {
    super(props);

    let mode: ThemeMode = "dark";
    if (typeof window !== "undefined") {
      const stashed = window.localStorage.getItem("mode");
      if (stashed && /^(light|dark)$/.test(stashed)) {
        mode = stashed as ThemeMode;
      }
    }

    this.html = null;
    this.state = { mode, hover: false };
  }

  public componentDidMount() {
    this.html = document.documentElement as HTMLHtmlElement;
    this.setTheme();
  }

  public componentDidUpdate(prevProps: any, prevState: IThemeToggleState) {
    if (this.state.mode !== prevState.mode) {
      window.localStorage.setItem("mode", this.state.mode);
      this.setTheme();
    }
  }

  public render() {
    const { mode, hover } = this.state;
    const lightTheme = mode === "light";
    return (
      <AppBarAction
        id="dark-theme-toggle"
        aria-describedby="dark-theme-toggle-tooltip"
        first={true}
        onClick={this.toggleMode}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        className={cn("theme-toggle", {
          "theme-toggle--on": lightTheme,
          "theme-toggle--off": !lightTheme,
        })}
      >
        {lightTheme !== hover ? <LightbulbSVGIcon /> : <LightbulbOutlineSVGIcon />}
        <Tooltip id="dark-theme-toggle-tooltip">
          Toggle light/dark theme
        </Tooltip>
      </AppBarAction>
    );
  }

  private toggleMode = () => {
    this.setState(({ mode }) => ({
      mode: mode === "light" ? "dark" : "light",
    }));
  };

  private handleMouseOver = () => {
    if (!this.state.hover) {
      this.setState({ hover: true });
    }
  };

  private handleMouseLeave = () => {
    if (this.state.hover) {
      this.setState({ hover: false });
    }
  };

  private setTheme = (forceRemove: boolean = false) => {
    if (!this.html) {
      return;
    }

    const { mode } = this.state;
    if (mode !== "dark" || forceRemove) {
      this.html.classList.remove("dark-theme");
    } else if (mode === "dark") {
      this.html.classList.add("dark-theme");
    }
  };
}
