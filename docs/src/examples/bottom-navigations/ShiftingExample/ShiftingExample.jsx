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

    this._setContent = this._setContent.bind(this);
    this._handleNavChange = this._handleNavChange.bind(this);
    this._handleVisibilityChange = this._handleVisibilityChange.bind(this);
  }

  _setContent(content) {
    this._content = findDOMNode(content);
    if (this._content) {
      this.setState({ phone: this._content.parentNode.parentNode });
    } else {
      this.setState({ phone: null });
    }
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
