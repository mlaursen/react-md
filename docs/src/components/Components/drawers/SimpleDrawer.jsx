import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Drawer from 'react-md/lib/Drawers';
import Toolbar from 'react-md/lib/Toolbars';

import inboxListItems from 'constants/inboxListItems';

export default class SimpleDrawer extends PureComponent {
  state = { visible: false, position: 'left' };

  openDrawerLeft = () => {
    this.setState({ visible: true, position: 'left' });
  };

  openDrawerRight = () => {
    this.setState({ visible: true, position: 'right' });
  };

  closeDrawer = () => {
    this.setState({ visible: false });
  };

  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { visible, position } = this.state;
    const isLeft = position === 'left';

    const closeBtn = <Button icon onClick={this.closeDrawer}>{isLeft ? 'arrow_back' : 'close'}</Button>;
    return (
      <div>
        <Button raised onClick={this.openDrawerLeft}>
          Open Drawer Left
        </Button>
        <Button raised onClick={this.openDrawerRight}>
          Open Drawer Right
        </Button>
        <Drawer
          id="simple-drawer-example"
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          position={position}
          onVisibilityChange={this.handleVisibility}
          navItems={inboxListItems}
          header={(
            <Toolbar
              nav={isLeft ? null : closeBtn}
              actions={isLeft ? closeBtn : null}
              className="md-divider-border md-divider-border--bottom"
            />
          )}
        />
      </div>
    );
  }
}
