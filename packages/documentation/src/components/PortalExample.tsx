import React from "react";
import { Portal } from "@react-md/portal";
import { Text } from "@react-md/typography";

interface IPortalExampleState {
  visible: boolean;
}

export default class PortalExample extends React.Component<null, IPortalExampleState> {
  public state = { visible: false };

  public render() {
    const { visible } = this.state;

    return (
      <React.Fragment>
        <button onClick={this.show}>
          <Text type="button">Show</Text>
        </button>
        <Portal visible={visible}>
          <button onClick={this.hide}>
            <Text type="button">Hide</Text>
          </button>
        </Portal>
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
