import React, { PureComponent } from 'react';
import Drawer from 'react-md/lib/Drawers';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import inboxListItems from 'constants/inboxListItems';


export default class SimpleExample extends PureComponent {
  state = { visible: false, position: 'left' };

  _handleToggle = (visible) => {
    this.setState({ visible });
  };

  _closeDrawer = () => {
    this.setState({ visible: false });
  };

  _toggleLeft = () => {
    this.setState({ visible: !this.state.visible, position: 'left' });
  };

  _toggleRight = () => {
    this.setState({ visible: !this.state.visible, position: 'right' });
  };

  render() {
    const left = this.state.position === 'left';
    const close = <Button icon onClick={this._closeDrawer}>{left ? 'arrow_back' : 'close'}</Button>;
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
          onVisibilityChange={this._handleToggle}
          type={Drawer.DrawerTypes.TEMPORARY}
          header={header}
          style={{ zIndex: 100 }}
        />
      </div>
    );
  }
}
