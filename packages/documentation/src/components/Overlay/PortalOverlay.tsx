import * as React from "react";
import { Button } from "@react-md/button";
import { Portal } from "@react-md/portal";
import { Overlay, OverlayPortal } from "@react-md/overlay";

import "./portal-overlay.scss";

export interface ISimpleOverlayProps {}

export interface ISimpleOverlayState {
  visible: boolean;
  withPortal: boolean;
}

export default class SimpleOverlay extends React.Component<ISimpleOverlayProps, ISimpleOverlayState> {
  constructor(props: ISimpleOverlayProps) {
    super(props);

    this.state = { visible: false, withPortal: false };
  }

  public render() {
    const { visible, withPortal } = this.state;

    let overlay = <Overlay visible={visible} onRequestClose={this.hide} className="portal-overlay-example__overlay" />;
    if (withPortal) {
      overlay = (
        <OverlayPortal visible={visible} onRequestClose={this.hide} className="portal-overlay-example__overlay" />
      );
    }

    return (
      <React.Fragment>
        <Button onClick={this.show}>Show</Button>
        <label htmlFor="enable-overlay-portal">Enable portal?</label>
        <input type="checkbox" checked={withPortal} onChange={this.handlePortalChange} />
        <div className="portal-overlay-example">
          <div className="portal-overlay-example__container">{overlay}</div>
        </div>
      </React.Fragment>
    );
  }

  private show = () => {
    this.setState({ visible: true });
  };

  private hide = () => {
    this.setState({ visible: false });
  };

  private handlePortalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ withPortal: event.currentTarget.checked });
  };
}
