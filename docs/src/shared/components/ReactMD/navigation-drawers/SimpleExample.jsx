import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import SelectField from 'react-md/lib/SelectFields';
import Avatar from 'react-md/lib/Avatars';

import randomImage from 'utils/RandomUtils/randomImage';
import LoremIpsum from 'components/LoremIpsum';
import inboxListItems from 'constants/inboxListItems';
const avatarSrc = randomImage();

const drawerHeaderChildren = [
  <Avatar
    key={avatarSrc}
    src={avatarSrc}
    role="presentation"
    iconSized
    style={{ alignSelf: 'center', marginLeft: 16, marginRight: 16, flexShrink: 0 }}
  />,
  <SelectField
    id="account-switcher"
    defaultValue="Jonathan"
    menuItems={['Jonathan', 'Fred']}
    key="account-switcher"
    position={SelectField.Positions.BELOW}
    className="md-select-field--toolbar"
  />,
];

/**
 * OK.. This isn't really a _simple example_ because both the dialog and the navigation
 * drawer use the portal component.
 *
 * To get the Navigation Drawer rendered correctly, we can only display it once we have correctly
 * found the Dialog's container to render inside of. After it has been found, that render node is set
 * for the NavigationDrawer and finally rendered.
 *
 * Finally, we can't rely on the only focusOnMount of the dialog, so once the dialog has finished animating
 * and the Drawer has also been rendered, the menu button is focused.
 */
export default class SimpleExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { visible: false, dialog: null, key: inboxListItems[0].key };
    this._setPage = this._setPage.bind(this);
    this._findContent = this._findContent.bind(this);
    this._openDemo = this._openDemo.bind(this);
    this._closeDemo = this._closeDemo.bind(this);
    this._navItems = inboxListItems.map(item => {
      if (!item.divider) {
        item.onClick = () => this._setPage(item.key);
      }
      return item;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dialog && !prevState.dialog) {
      this._timeout = setTimeout(() => {
        this._timeout = null;

        this.state.dialog.querySelector('.md-btn').focus();
      }, 300);
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _setPage(key) {
    this._navItems = this._navItems.map(item => {
      if (!item.divider) {
        item.active = item.key === key;
      }
      return item;
    });

    this.setState({ key });
  }

  _findContent() {
    const dialog = document.querySelector('.md-dialog.md-dialog--full-page');
    this.setState({ dialog });
  }

  _openDemo() {
    this.setState({ visible: true });
  }

  _closeDemo() {
    this.setState({ visible: false, dialog: null });
  }

  render() {
    const { visible, dialog, key } = this.state;

    const closeButton = (
      <Button
        icon
        onClick={this._closeDemo}
        waitForInkTransition
        tooltipLabel="Close the interactive demo"
        tooltipDelay={150}
        tooltipPosition="left"
      >
        close
      </Button>
    );

    const navDrawer = (
      <NavigationDrawer
        navItems={this._navItems}
        renderNode={dialog}
        contentClassName="md-grid"
        drawerHeaderChildren={drawerHeaderChildren}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle="Hello, World!"
        toolbarActions={closeButton}
        toolbarProminentTitle
        contentId="main-content-demo"
      >
        <LoremIpsum key={key} className="md-text-container md-cell md-cell--12" count={20} />
      </NavigationDrawer>
    );

    let dialogChildren;
    if (dialog) {
      dialogChildren = navDrawer;
    }

    return (
      <div>
        <Button raised label="Open the demo" onClick={this._openDemo} />
        <Dialog
          id="nav-drawer-demo"
          aria-label="Navigation Drawer Demo"
          visible={visible}
          fullPage
          focusOnMount={false}
          onShow={this._findContent}
          onHide={this._closeDemo}
        >
          {dialogChildren}
        </Dialog>
      </div>
    );
  }
}
