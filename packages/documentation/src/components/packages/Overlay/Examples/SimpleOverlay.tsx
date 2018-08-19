import * as React from "react";
import { Button } from "@react-md/button";
import { Overlay } from "@react-md/overlay";

export interface ISimpleOverlayProps {}

export interface ISimpleOverlayState {
  visible: boolean;
}

export default class SimpleOverlay extends React.Component<ISimpleOverlayProps, ISimpleOverlayState> {
  constructor(props: ISimpleOverlayProps) {
    super(props);

    this.state = { visible: false };
  }

  public render() {
    const { visible } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.show}>Show</Button>
        <Overlay visible={visible} onRequestClose={this.close} />
      </React.Fragment>
    );
  }

  private show = () => {
    this.setState({ visible: true });
  };

  private close = () => {
    this.setState({ visible: false });
  };
}
