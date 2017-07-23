/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import inboxListItems from 'constants/inboxListItems';
import loremIpsum from 'lorem-ipsum';

export default class Simple extends PureComponent {
  constructor() {
    super();

    // Update the items so they have an onClick handler to change the current page
    this.navItems = inboxListItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return {
        ...item,
        onClick: () => this.setPage(item.key, item.primaryText),
      };
    });

    this.state = {
      visible: false,
      key: inboxListItems[0].key,
      page: inboxListItems[0].primaryText,
    };
  }

  setPage = (key, page) => {
    this.navItems = this.navItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return { ...item, active: item.key === key };
    });

    this.setState({ key, page });
  };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, page } = this.state;
    return (
      <div>
        <Button raised onClick={this.show}>Open the Demo</Button>
        <Dialog
          id="navigation-drawer-demo"
          aria-label="Navigation Drawer Demo"
          visible={visible}
          fullPage
          focusOnMount={false}
          onHide={this.hide}
        >
          <NavigationDrawer
            navItems={this.navItems}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            toolbarTitle="Hello, World!"
            toolbarActions={<Button icon onClick={this.hide}>close</Button>}
            contentId="main-demo-content"
          >
            <h2>Currently on page: {page}</h2>
            <section className="md-text-container">
              <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
              <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
              <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
              <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
              <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
              <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
            </section>
          </NavigationDrawer>
        </Dialog>
      </div>
    );
  }
}
