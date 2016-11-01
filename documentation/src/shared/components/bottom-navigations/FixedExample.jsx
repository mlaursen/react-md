import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import BottomNavigation from 'react-md/lib/BottomNavigations';

import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import LoremIpsum from 'components/LoremIpsum';

const links = [{
  label: 'Recents',
  iconChildren: 'access_time',
}, {
  label: 'Favorites',
  iconChildren: 'favorite',
}, {
  label: 'Nearby',
  iconChildren: 'place',
}];

export default class FixedExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { page: 0 };
    this._setPage = this._setPage.bind(this);
    this._setContainer = this._setContainer.bind(this);
  }

  _setPage(page) {
    if (this._container) {
      this._container.scrollTop = 0;
    }
    this.setState({ page });
  }

  _setContainer(phoneDemo) {
    this._container = findDOMNode(phoneDemo);
    if (this._container) {
      this.setState({ found: true });
    }
  }

  render() {
    const { page } = this.state;

    const navigation = (
      <BottomNavigation
        links={links}
        dynamic={false}
        onNavChange={this._setPage}
        renderNode={this._container}
      />
    );

    return (
      <PhoneSizeDemo
        contentProps={{
          transitionName: 'md-cross-fade',
          transitionEnterTimeout: 300,
          transitionLeave: false,
          ref: this._setContainer,
        }}
        contentClassName="md-grid"
        contentComponent={CSSTransitionGroup}
      >
        <LoremIpsum key={page} count={6} className="md-cell md-cell--12 md-text-container md-bottom-navigation-offset" />
        {this._container ? navigation : null}
      </PhoneSizeDemo>
    );
  }
}
