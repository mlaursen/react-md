import React, { PureComponent } from 'react';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import Portal from 'react-md/lib/Helpers/Portal';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';

import TICK from 'react-md/lib/constants/CSSTransitionGroupTick';

export default class SimpleExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { overlay: false, overlayActive: false };
    this._showOverlay = this._showOverlay.bind(this);
    this._hideOverlay = this._hideOverlay.bind(this);
    this._setButton = this._setButton.bind(this);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _showOverlay() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ overlayActive: true });
    }, TICK);
    this.setState({ overlay: true });
  }

  _hideOverlay() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ overlay: false });
    }, 150);
    this.setState({ overlayActive: false });
  }

  _setButton(button) {
    this._button = button;
  }

  render() {
    const { overlay, overlayActive } = this.state;

    return (
      <div>
        <Button raised label="Show Overlay" onClick={this._showOverlay} ref={this._setButton} />
        <Portal visible={overlay}>
          <AccessibleFakeButton
            ref={overlay => {
              // For keyboard users
              if (overlay) {
                overlay.focus();
              } else if (this._button) {
                this._button.focus();
              }
            }}
            onClick={this._hideOverlay}
            style={{ zIndex: 9001 /* Over 9000! */ }}
            className={cn('md-overlay', {
              'md-overlay--active': overlayActive,
            })}
          />
        </Portal>
      </div>
    );
  }
}
