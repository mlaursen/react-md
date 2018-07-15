/* tslint:disable */
import * as React from "react";
import "./App.css";
import { positionRelativeTo, HorizontalPosition, VerticalPosition } from "@react-md/utils";
import { RelativeTooltip, MagicTooltipProvider, MagicTooltip } from "@react-md/tooltip";
import { Button } from "@react-md/button";
import { StatesProvider } from "@react-md/states";

// import ResizeObservers from "./components/Resize/ResizeObserver";
import Buttons from "./components/Buttons";
import Icons from "./components/Icons";

export interface IAppState {
  dense: boolean;
  visible: boolean;
  style: React.CSSProperties | undefined;
}

function random(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = { visible: false, style: undefined, dense: false };
  }

  public render() {
    const { style, dense } = this.state;
    return (
      <StatesProvider advancedFocus={true}>
      <main>
        <MagicTooltipProvider dense={dense}>
          <Buttons />
          <Icons />
          <Button themeType="contained" onClick={this.randomFocus}>Random Focus</Button>
          <button id="toggle-1" type="button" onClick={this.toggle}>
            Toggle
          </button>
          <ul id="toggle-1-menu" role="menu" style={style} className="list list--inline">
            <li role="menuitem" tabIndex={-1}>
              Item 1
            </li>
            <li role="menuitem" tabIndex={-1}>
              Item 2
            </li>
            <li role="menuitem" tabIndex={-1}>
              Item 3
            </li>
            <li role="menuitem" tabIndex={-1}>
              Item 4
            </li>
            <li role="menuitem" tabIndex={-1}>
              Item 5
            </li>
          </ul>
          <button id="button-2" type="button" aria-describedby="button-2-tooltip" className="btn">
            Button
            <RelativeTooltip id="button-2-tooltip">Tooltip contents!</RelativeTooltip>
          </button>
          <div className="btn-group">
            <div id="div-1" aria-describedby="magic-tooltip-1" tabIndex={0} role="button" className="btn">
              This is a button
              <MagicTooltip id="magic-tooltip-1">This is some content</MagicTooltip>
            </div>
            <div id="div-2" aria-describedby="magic-tooltip-2" tabIndex={0} role="button" className="btn">
              This is a button
              <MagicTooltip id="magic-tooltip-2">This is some content</MagicTooltip>
            </div>
            <div id="div-3" aria-describedby="magic-tooltip-3" tabIndex={0} role="button" className="btn">
              This is a button
              <MagicTooltip id="magic-tooltip-3">This is some content</MagicTooltip>
            </div>
            <div id="div-4" aria-describedby="magic-tooltip-4" tabIndex={0} role="button" className="btn">
              This is a button
              <MagicTooltip id="magic-tooltip-4">This is some content</MagicTooltip>
            </div>
          </div>
          <button type="button" onClick={this.toggleDense} className="btn">
            Toggle dense
          </button>
        </MagicTooltipProvider>
      </main>
      </StatesProvider>
    );
  }

  private randomFocus = () => {
    const BASE_FOCUSABLE_ELEMENTS = '[href],[tabindex]:not([tabindex="-1"]),input:not([disabled]):not([type="hidden"])';
    const FOCUSABLE_QUERY = ["button", "textarea", "select"].reduce(
      (queryString, element) => `${queryString},${element}:not([disabled])`,
      BASE_FOCUSABLE_ELEMENTS
    );

    window.setTimeout(() => {
      const elements = Array.from(document.querySelectorAll(FOCUSABLE_QUERY)) as HTMLElement[];
      const i = random(0, elements.length - 1);
      const el = elements[i];
      if (el) {
        el.focus();
      }
    }, 200);
  };

  private toggleDense = () => {
    this.setState({ dense: !this.state.dense });
  };

  private toggle = () => {
    const container = document.getElementById("toggle-1") as HTMLButtonElement;
    const target = document.getElementById("toggle-1-menu") as HTMLUListElement;
    const style = positionRelativeTo(container, target, {
      // heightOverlapMultiplier: 0,
      horizontalPosition: HorizontalPosition.LEFT,
      verticalPosition: VerticalPosition.CENTER,
      // verticalSpacing: "1.5rem",
      widthOverlapMultiplier: 0,
    });
    this.setState({ style: !style ? undefined : style });
    // this.setState({ style: style ? { ...styles,menu, ....style } : styles.menu });
  };
}

export default App;
