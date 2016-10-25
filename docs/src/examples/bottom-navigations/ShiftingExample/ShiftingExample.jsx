import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import BottomNavigation from 'react-md/lib/BottomNavigations';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';

import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import CloseButton from 'containers/PhoneSizeDemo/CloseButton';
import './_styles.scss';
import MoviesAndTV from './MoviesAndTV';
import Music from './Music';
import Books from './Books';
import NewsStand from './NewsStand';

const links = [{
  label: 'Movies & TV',
  iconChildren: 'ondemand_video',
}, {
  label: 'Music',
  iconChildren: 'music_note',
}, {
  label: 'Books',
  iconChildren: 'book',
}, {
  label: 'Newsstand',
  iconClassName: 'fa fa-newspaper-o',
}];

const themeClassNames = ['movies-and-tv', 'music', 'book', 'news-stand'];

const search = <TextField key="search" placeholder="Search" block />;

const contents = [
  <MoviesAndTV key="movies-and-tv" />,
  <Music key="music" />,
  <Books key="books" />,
  <NewsStand key="news-stand" />,
];

@connect(({ ui: { media: { tablet } } }) => ({ tablet }))
export default class ShiftingExample extends PureComponent {
  static propTypes = {
    tablet: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      className: themeClassNames[0],
      phone: null,
      visible: true,
    };

    this._previousScroll = 0;
    this._setContent = this._setContent.bind(this);
    this._setNavigation = this._setNavigation.bind(this);
    this._stopScroll = this._stopScroll.bind(this);
    this._enableScroll = this._enableScroll.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._handleNavChange = this._handleNavChange.bind(this);
    this._handleVisibilityChange = this._handleVisibilityChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('touchstart', this._stopScroll);
    window.addEventListener('mousemove', this._enableScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', this._stopScroll);
    window.removeEventListener('mousemove', this._enableScroll);
  }

  _setContent(content) {
    if (content) {
      this._content = findDOMNode(content).parentNode;

      this.setState({ phone: this._content.parentNode });
    } else {
      this.setState({ phone: null });
    }
  }

  _setNavigation(nav) {
    this._nav = nav;
  }

  _stopScroll() {
    if (this._enabled) {
      this._content.removeEventListener('scroll', this._handleScroll);
    }
    this._enabled = false;
  }

  _enableScroll() {
    if (!this._enabled) {
      this._content.addEventListener('scroll', this._handleScroll);
    }

    this._enabled = true;
  }

  _handleScroll(e) {
    if (!this._nav) {
      return;
    }
    if (typeof this._nav._pageY !== 'number') {
      this._nav._pageY = 0;
    }


    const scrollTop = -e.target.scrollTop;
    if (this._previousScroll < scrollTop && !this._switched) {
      this._nav._pageY = this._previousScroll;
      this._switched = true;
    } else if (this._previousScroll > scrollTop) {
      this._switched = false;
    }

    this._nav._scrolling = true;
    this._nav._handleTouchMove({ changedTouches: [{ pageY: scrollTop }] });
    this._previousScroll = scrollTop;
  }

  _handleNavChange(activeIndex) {
    if (this._content) {
      this._content.scrollTop = 0;
    }
    this.setState({ activeIndex, className: themeClassNames[activeIndex] });
  }

  _handleVisibilityChange(visible) {
    this.setState({ visible });
  }

  render() {
    const { activeIndex, className, visible } = this.state;
    const isNewsStand = activeIndex === contents.length;
    let toolbarActions = <Button key="vert" icon>more_vert</Button>;
    if (isNewsStand) {
      toolbarActions = [<Button key="refresh" icon>refresh</Button>, toolbarActions];
    }

    const navigation = (
      <BottomNavigation
        dynamic
        links={links}
        colored
        activeIndex={activeIndex}
        onNavChange={this._handleNavChange}
        onVisibilityChange={this._handleVisibilityChange}
        renderNode={this.state.phone}
        ref={this._setNavigation}
      />
    );

    let closeFAB;
    if (!this.props.tablet) {
      closeFAB = (
        <CloseButton floating fixed className={cn('fab-nav', { 'fab-nav--offset': visible })} secondary>close</CloseButton>
      );
    }

    return (
      <PhoneSizeDemo className={className} contentClassName="md-bottom-navigation-offset" toolbar={false}>
        <Toolbar
          inset={!isNewsStand}
          className={cn('bottom-nav-toolbar', {
            'bottom-nav-toolbar--active': isNewsStand,
            'md-background--card': !isNewsStand,
          })}
          nav={<Button icon>menu</Button>}
          actions={toolbarActions}
          fixed
        >
          {!isNewsStand ? search : null}
        </Toolbar>
        <CSSTransitionGroup
          ref={this._setContent}
          component="main"
          className="toolbar-offset"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          {contents[activeIndex]}
        </CSSTransitionGroup>
        {this.state.phone ? navigation : null}
        {closeFAB}
      </PhoneSizeDemo>
    );
  }
}
