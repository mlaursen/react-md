import React, { PureComponent } from 'react';
import cn from 'classnames';
import { AccessibleFakeButton, Button, Portal } from 'react-md';

export default class SimpleOverlay extends PureComponent {
  state = {
    visible: false,
    active: false,
  };

  componentWillUnmount() {
    this.clearTimeout();
  }

  timeout = null;

  clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = null;
  };

  showOverlay = () => {
    this.clearTimeout();

    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ active: true });
    }, 17);
    this.setState({ visible: true });
  };

  hideOverlay = () => {
    this.clearTimeout();

    this.timeout = setTimeout(() => {
      this.timeout = null;

      this.setState({ visible: false });
    }, 150);
    this.setState({ active: false });
  };

  overlayRef = (overlay) => {
    if (overlay) {
      this.active = document.activeElement;
      setTimeout(() => {
        overlay.focus();
      }, 0);
    } else if (this.active) {
      this.active.focus();
    }
  };

  render() {
    const { visible, active } = this.state;
    return (
      <div>
        <Button raised onClick={this.showOverlay}>Show Overlay</Button>
        <Portal visible={visible}>
          <AccessibleFakeButton
            id="temporary-overlay"
            ref={this.overlayRef}
            className={cn('md-overlay', {
              'md-overlay--active': active,
            }, 'powerlevel-over-9000')}
            onClick={this.hideOverlay}
          />
        </Portal>
      </div>
    );
  }
}
