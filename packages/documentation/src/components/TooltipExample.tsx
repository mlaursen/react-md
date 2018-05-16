import React from "react";
import { Portal } from "@react-md/portal";
import { Tooltip, BaseTooltip } from "@react-md/tooltip";
import { Text } from "@react-md/typography";

interface ITooltipExampleState {
  visible: boolean;
}

class Something extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { visible: false, style: null };
  }

  public render() {
    const { visible, style } = this.state;
    return (
      <div style={{ height: 120, overflow: "auto", maxWidth: 200, margin: "0 auto" }}>
        <div
          role="button"
          id="fake-button-1"
          tabIndex={0}
          aria-describedby="tooltip-2"
          style={{ display: "inline-block", position: "relative" }}
        >
          This is a fake button.
        </div>
        <Portal visible={true}>
          <BaseTooltip style={style} id="tooltip-2" visible={visible} onShow={this.show} onHide={this.hide}>
            This is a second tooltip!
          </BaseTooltip>
        </Portal>
      </div>
    );
  }

  private show = () => {
    if (!this.state.visible) {
      const container = document.getElementById("fake-button-1");
      let style = null;
      if (container) {
        const rect = container.getBoundingClientRect();
        style = {
          position: "fixed",
          bottom: `calc(${window.innerHeight - rect.top}px - 1.5rem)`,
          left: rect.left + (rect.width / 2),
        };
      }
      this.setState({ visible: true, style });
    }
  }

  private hide = () => {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }
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
          <Tooltip id="tooltip-1">
            Tooltip!
          </Tooltip>
        </button>
        <Something />
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
