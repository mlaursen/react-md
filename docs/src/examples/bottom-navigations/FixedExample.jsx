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
    this._findContent = this._findContent.bind(this);
  }

  _setPage(page) {
    if (this._content) {
      this._content.scrollTop = 0;
    }
    this.setState({ page });
  }

  _findContent(phoneDemo) {
    const container = findDOMNode(phoneDemo);
    if (container) {
      this._content = container.querySelector('.phone-size-content');
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
        renderNode={this._content}
      />
    );
    return (
      <PhoneSizeDemo contentClassName="md-grid" ref={this._findContent}>
        <CSSTransitionGroup
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          <LoremIpsum key={page} count={6} className="md-cell md-cell--12 md-text-container md-bottom-navigation-offset" />
        </CSSTransitionGroup>
        {this._content ? navigation : null}
      </PhoneSizeDemo>
    );
  }
}
