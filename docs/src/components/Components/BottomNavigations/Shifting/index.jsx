import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import BottomNavigation from 'react-md/lib/BottomNavigations';
import FontIcon from 'react-md/lib/FontIcons';

import PhoneEmulator from 'components/PhoneEmulator';

import './_styles.scss';
import AppToolbar from './AppToolbar';
import MoviesAndTV from './MoviesAndTV';
import Music from './Music';
import Books from './Books';
import NewsStand from './NewsStand';
import CloseExample from './CloseExample';

const THEMES = ['movies-and-tv', 'music', 'book', 'news-stand'].map(theme => `bottom-navigations__dynamic--${theme}`);

const CONTENTS = [
  <MoviesAndTV key="movies-and-tv" />,
  <Music key="music" />,
  <Books key="books" />,
  <NewsStand key="news-stand" />,
];

const links = [{
  label: 'Movies & TV',
  icon: <FontIcon>ondemand_video</FontIcon>,
}, {
  label: 'Music',
  icon: <FontIcon>music_note</FontIcon>,
}, {
  label: 'Books',
  icon: <FontIcon>book</FontIcon>,
}, {
  label: 'Newsstand',
  icon: <FontIcon iconClassName="fa fa-newspaper-o" />,
}];

const contentId = 'shifting-bottom-navigation-example';

export class ShiftingPure extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
  };

  state = {
    visible: true,
    activeIndex: 0,
    className: THEMES[0],
    children: CONTENTS[0],
  };

  scrollRestoration = () => {
    // Either scroll the dialog on mobile devices, or the content on tablets/desktop
    const content = document.getElementById('phone-emulator-demo') || document.getElementById(contentId);
    if (content) {
      content.scrollTop = 0;
    }
  };

  handleNavChange = (activeIndex) => {
    const className = THEMES[activeIndex];
    const children = CONTENTS[activeIndex];
    if (this.state.activeIndex === activeIndex) {
      this.scrollRestoration();
    }

    this.setState({ activeIndex, className, children }, this.scrollRestoration);
  };

  handleNavVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { mobile } = this.props;
    const { activeIndex, className, children, visible } = this.state;
    const inset = activeIndex !== CONTENTS.length - 1;
    return (
      <PhoneEmulator
        className={className}
        dialogClassName={cn({
          'md-bottom-navigation-offset': mobile && visible,
        })}
        toolbar={false}
        transitionContent
        contentId={contentId}
        contentClassName={cn('bottom-navigations__dynamic__content', {
          'bottom-navigations__dynamic__content--inset': inset,
          'md-bottom-navigation-offset': !mobile && visible,
        })}
      >
        <AppToolbar inset={inset} />
        {children}
        <CloseExample navigationVisible={visible} />
        <BottomNavigation
          dynamic
          links={links}
          colored
          activeIndex={activeIndex}
          onNavChange={this.handleNavChange}
          onVisibilityChange={this.handleNavVisibility}
        />
      </PhoneEmulator>
    );
  }
}

export default connect(({ media: { mobile } }) => ({ mobile }))(ShiftingPure);
