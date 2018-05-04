import React from "react";
import { Portal } from "react-md";

interface IPortalExampleState {
  visible: boolean;
}

export default class PortalExample extends React.Component<null, IPortalExampleState> {
  public state = { visible: false };

  public render() {
    const { visible } = this.state;

    return (
      <React.Fragment>
        <button onClick={this.show}>Show</button>
        <Portal visible={visible}>
          <button onClick={this.hide}>Hide</button>
        </Portal>
      </React.Fragment>
    );
  }

  private show = () => {
    console.log('SHOW');
    this.setState({ visible: true });
  }

  private hide = () => {
    this.setState({ visible: false });
  }
}
