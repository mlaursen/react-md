import React, { PureComponent } from 'react';
import Drawer from 'react-md/lib/Drawers';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import inboxListItems from 'constants/inboxListItems';


export default class SimpleExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      position: 'left',
    };

    this._toggleLeft = this._toggleLeft.bind(this);
    this._toggleRight = this._toggleRight.bind(this);
    this._closeDrawer = this._closeDrawer.bind(this);
    this._handleToggle = this._handleToggle.bind(this);
  }

  _handleToggle(visible) {
    this.setState({ visible });
  }

  _closeDrawer() {
    this.setState({ visible: false });
  }

  _toggleLeft() {
    this.setState({ visible: !this.state.visible, position: 'left' });
  }

  _toggleRight() {
    this.setState({ visible: !this.state.visible, position: 'right' });
  }

  render() {
    const left = this.state.position === 'left';
    const close = <Button waitForInkTransition icon onClick={this._closeDrawer}>{left ? 'arrow_back' : 'close'}</Button>;
    const header = (
      <Toolbar
        nav={left ? null : close}
        actions={left ? close : null}
        className="md-divider-border md-divider-border--bottom"
      />
    );
    return (
      <div className="md-grid">
        <Button raised label="Toggle Drawer Left" onClick={this._toggleLeft} />
        <Button raised label="Toggle Drawer Right" onClick={this._toggleRight} />
        <Drawer
          {...this.state}
          navItems={inboxListItems}
          onVisibilityToggle={this._handleToggle}
          type={Drawer.DrawerTypes.TEMPORARY}
          header={header}
          style={{ zIndex: 100 }}
        />
      </div>
    );
  }
}
