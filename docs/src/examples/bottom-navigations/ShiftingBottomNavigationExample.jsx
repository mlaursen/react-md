import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import BottomNavigation from 'react-md/lib/BottomNavigations';

import PhoneDemo from './PhoneDemo';
import MoviesAndTV from './MoviesAndTV';
import Music from './Music';
import Books from './Books';
import NewsStand from './NewsStand';

const themeClassNames = ['movies-and-tv', 'music', 'book', 'newsstand'];

export default class ShiftingBottomNavigationExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      bottomNav: null,
    };

    this._handleActionClick = this._handleActionClick.bind(this);
    this._setBottomNav = this._setBottomNav.bind(this);
  }

  componentDidMount() {
    this.content = findDOMNode(this).querySelector('.demo-content');
  }

  _setBottomNav(bottomNav) {
    if (bottomNav) {
      this.setState({ bottomNav });
    }
  }

  _handleActionClick(activeIndex) {
    this.content.scrollTop = 0;
    this.setState({ activeIndex, className: themeClassNames[activeIndex] });
  }

  render() {
    const { className, activeIndex, bottomNav } = this.state;
    const actions = [{
      label: 'Movies & TV',
      iconChildren: 'ondemand_video',
      onClick: this._handleActionClick,
    }, {
      label: 'Music',
      iconChildren: 'music_note',
      onClick: this._handleActionClick,
    }, {
      label: 'Books',
      iconChildren: 'book',
      onClick: this._handleActionClick,
    }, {
      label: 'Newsstand',
      iconClassName: 'fa fa-newspaper-o',
      onClick: this._handleActionClick,
    }];

    let content;
    switch (activeIndex) {
      case 0:
        content = <MoviesAndTV key="movies-and-tv" />;
        break;
      case 1:
        content = <Music key="music" />;
        break;
      case 2:
        content = <Books key="books" />;
        break;
      default:
        content = <NewsStand key="newsstand" />;
    }

    return (
      <PhoneDemo inset={activeIndex !== 3} className={`demoing demo-${className}`} bottomNav={bottomNav}>
        <CSSTransitionGroup
          component="div"
          transitionName="cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          {content}
        </CSSTransitionGroup>
        <BottomNavigation actions={actions} colored ref={this._setBottomNav} />
      </PhoneDemo>
    );
  }
}
