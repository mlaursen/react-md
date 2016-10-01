/* eslint-disable react/jsx-no-bind */
import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import NavigationDrawer from 'react-md/lib//NavigationDrawers';
import Button from 'react-md/lib/Buttons';

import NewPage from './NewPage';
import LoremIpsum from 'components/LoremIpsum';
import { randomAvatars } from 'utils/RandomUtils';

const avatars = randomAvatars(3, 'fake-icon');

export default class NewPageDemo extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { page: 1 };
    this._setNewPage = this._setNewPage.bind(this);
    this._closeDemo = this._closeDemo.bind(this);
    this._fakeChangePage = this._fakeChangePage.bind(this);
  }

  _setNewPage(newPage) {
    this._newPage = newPage;
  }

  _closeDemo() {
    if (this._newPage) {
      this._newPage.closeDemo();
    }
  }

  _fakeChangePage(page) {
    this.setState({ page });
  }

  render() {
    const { page } = this.state;

    const navItems = [{
      primaryText: 'Page 1',
      onClick: this.fakeChangePage.bind(this, 1),
      tileClassName: classnames({ active: page === 1 }),
      leftIcon: avatars[0],
    }, {
      primaryText: 'Page 2',
      onClick: this.fakeChangePage.bind(this, 2),
      tileClassName: classnames({ active: page === 2 }),
      leftIcon: avatars[1],
    }, {
      primaryText: 'Page 3',
      onClick: this.fakeChangePage.bind(this, 3),
      tileClassName: classnames({ active: page === 3 }),
      leftIcon: avatars[2],
    }];

    return (
      <NewPage ref={this._setNewPage}>
        <NavigationDrawer
          drawerTitle="Navigation Title"
          toolbarTitle="Main Toolbar Title"
          tabletDrawerType={NavigationDrawer.DrawerType.PERSISTENT_MINI}
          desktopDrawerType={NavigationDrawer.DrawerType.PERSISTENT_MINI}
          navItems={navItems}
          toolbarChildren={
            <Button
              icon
              onClick={this.closeDemo}
              tooltipLabel="Close Demo"
              tooltipPosition="left"
              className="md-navigation-drawer-btn fr"
            >
              close
            </Button>
          }
        >
          <section key={page} className="container text-container">
            <h1>On Page {page}</h1>
            <LoremIpsum count={20} />
          </section>
        </NavigationDrawer>
      </NewPage>
    );
  }
}
