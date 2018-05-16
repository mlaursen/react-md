import React from "react";
import { Portal } from "@react-md/portal";
import { Tooltip } from "@react-md/tooltip";
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
        <Text type="headline-2">Tooltip Example</Text>
        <button id="button-1" aria-describedby="tooltip-1" type="button">
          <Text type="button">Button</Text>
          <Tooltip id="tooltip-1" dense={true}>
            Tooltip!
          </Tooltip>
        </button>
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
