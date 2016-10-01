import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import BottomNavigation from 'react-md/lib/BottomNavigations';

import LoremIpsum from 'components/LoremIpsum';
import PhoneDemo from './PhoneDemo';

export default class SimpleExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { page: 0, bottomNav: null };
    this._setPage = this._setPage.bind(this);
    this._setBottomNav = this._setBottomNav.bind(this);
  }

  componentDidMount() {
    this.content = findDOMNode(this).querySelector('.demo-content');
  }

  _setBottomNav(bottomNav) {
    this.setState({ bottomNav });
  }

  _setPage(page) {
    this.content.scrollTop = 0;
    this.setState({ page });
  }

  render() {
    const { bottomNav, page } = this.state;
    const actions = [{
      label: 'Recents',
      iconChildren: 'access_time',
    }, {
      label: 'Favorites',
      iconChildren: 'favorite',
    }, {
      label: 'Nearby',
      iconChildren: 'place',
    }];

    return (
      <PhoneDemo inset={false} bottomNav={bottomNav} className="fixed-example">
        <CSSTransitionGroup
          component="div"
          transitionName="cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          <LoremIpsum key={page} count={6} className="container text-container" />
        </CSSTransitionGroup>
        <BottomNavigation
          actions={actions}
          ref={this._setBottomNav}
          dynamic={false}
          onChange={this._setPage}
        />
      </PhoneDemo>
    );
  }
}
