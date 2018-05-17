import React from "react";
import { Portal } from "@react-md/portal";
import { Tooltip, BaseTooltip, MagicTooltip } from "@react-md/tooltip";
import { Text } from "@react-md/typography";

interface ITooltipExampleState {
  visible: boolean;
}

export default class TooltipExample extends React.Component<null, ITooltipExampleState> {
  constructor(props: any) {
    super(props);

    this.state = { visible: false };
  }

  public render() {
    const { visible } = this.state;
    return (
      <React.Fragment>
        <Text type="headline-2" className="something">Tooltip Example</Text>
        <button id="button-1" aria-describedby="tooltip-1" type="button">
          <Text type="button">Button</Text>
          <Tooltip id="tooltip-1">
            Tooltip!
          </Tooltip>
        </button>
        <div
          id="button-2"
          aria-describedby="tooltip-2"
          role="button"
          tabIndex={0}
          style={{ display: "inline-block", padding: "1rem 2rem" }}
        >
          This is a fake button.
          <MagicTooltip id="tooltip-2">
            This is a magic tooltip!
          </MagicTooltip>
        </div>
        <div
          id="button-3"
          aria-describedby="tooltip-3"
          role="button"
          tabIndex={0}
          style={{ display: "inline-block", padding: "1rem 2rem" }}
        >
          This is a button with a magic tooltip
        </div>
        <MagicTooltip id="tooltip-2">
          This is a magic tooltip!
        </MagicTooltip>
      </React.Fragment>
    );
  }

  private show = () => {
    this.setState({ visible: true });
  }

  private hide = () => {
    this.setState({ visible: false });
  }
}
