import * as React from "react";
import { Button } from "@react-md/button";
import { MagicTooltipProvider, MagicTooltip } from "@react-md/tooltip";

export interface IMagicTooltipsProps {}

export interface IMagicTooltipsState {
  dense: boolean;
  delay: number;
  hoverMode: boolean;
  hoverModeDelay: number;
  keyboardFocusDelay: number;
}

export default class MagicTooltips extends React.Component<IMagicTooltipsProps, IMagicTooltipsState> {
  constructor(props: IMagicTooltipsProps) {
    super(props);

    this.state = {
      dense: false,
      delay: 1000,
      hoverMode: true,
      hoverModeDelay: 1000,
      keyboardFocusDelay: 300,
    };
  }

  public render() {
    return (
      <React.Fragment>
        <div id="magic-tooltip-example-portal" />
        <MagicTooltipProvider {...this.state}>
          <div style={{ maxHeight: 400, maxWidth: 400, width: "100%", margin: "1rem auto" }}>
            <Button
              id="magic-tooltip-button-1"
              aria-describedby="magic-tooltip-button-1-tooltip"
              className="example-group__example"
            >
              Button
              <MagicTooltip id="magic-tooltip-button-1-tooltip">This is a magic tooltip!</MagicTooltip>
            </Button>
          </div>
        </MagicTooltipProvider>
      </React.Fragment>
    );
  }
}
