import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'react-router';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import BottomNavigation from 'react-md/lib/BottomNavigations';
import FontIcon from 'react-md/lib/FontIcons';
import SVGIcon from 'react-md/lib/SVGIcons';

import PhoneEmulator from 'components/PhoneEmulator';
import video from 'icons/ondemand_video.svg';
import music from 'icons/music_note.svg';
import book from 'icons/book.svg';

import AppToolbar from './Shifting/AppToolbar';
import MoviesAndTV from './Shifting/MoviesAndTV';
import Music from './Shifting/Music';
import Books from './Shifting/Books';
import NewsStand from './Shifting/NewsStand';
import CloseExample from './Shifting/CloseExample';

const THEMES = ['movies-and-tv', 'music', 'book', 'news-stand'].map(theme => `bottom-navigations__dynamic--${theme}`);
const TO_PREFIX = '/discover-more/routing-examples/bottom-navigations';
const links = [{
  label: 'Movies & TV',
  icon: <SVGIcon use={video.url} />,
  to: TO_PREFIX,
  component: Link,
}, {
  label: 'Music',
  icon: <SVGIcon use={music.url} />,
  to: `${TO_PREFIX}/music`,
  component: Link,
}, {
  label: 'Books',
  icon: <SVGIcon use={book.url} />,
  to: `${TO_PREFIX}/books`,
  component: Link,
}, {
  label: 'Newsstand',
  icon: <FontIcon iconClassName="fa fa-newspaper-o" />,
  to: `${TO_PREFIX}/news-stand`,
  component: Link,
}];

const contentId = 'shifting-bottom-navigation-example';

@withRouter
export class RoutingExample extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super();

    this.state = {
      visible: true,
      defaultIndex: this.getInitialIndex(props.location.pathname),
      className: this.getThemeClassName(props.location.pathname),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    if (this.props.location.pathname !== pathname) {
      this.setState({ className: this.getThemeClassName(pathname) });
    } else if (this.props.location !== nextProps.location) {
      this.scrollRestoration();
    }
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    const prevPath = prevProps.location.pathname;
    if (pathname !== prevPath) {
      this.scrollRestoration();
    }
  }

  getInitialIndex = (pathname) => {
    let index = -1;
    links.some(({ to }, i) => {
      if (to === pathname) {
        index = i;
        return true;
      }

      return false;
    });

    return index === -1 ? 0 : index;
  };
  getThemeClassName = pathname => THEMES[this.getInitialIndex(pathname)];

  scrollRestoration = () => {
    // Either scroll the dialog on mobile devices, or the content on tablets/desktop
    const content = document.getElementById('phone-emulator-demo') || document.getElementById(contentId);
    if (content) {
      content.scrollTop = 0;
    }
  };

  handleNavVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { className, visible, defaultIndex } = this.state;
    const { mobile, location } = this.props;
    const { pathname } = location;
    const inset = !pathname.match(/news-stand/);

    return (
      <div className="md-grid md-grid--40-16">
        <div className="md-cell md-cell--12">
          <PhoneEmulator
            className={cn('bottom-navigations', className)}
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
            <Switch key={pathname}>
              <Route path={links[0].to} exact component={MoviesAndTV} />
              <Route path={links[1].to} component={Music} />
              <Route path={links[2].to} component={Books} />
              <Route path={links[3].to} component={NewsStand} />
            </Switch>
            <CloseExample navigationVisible={visible} />
            <BottomNavigation
              defaultActiveIndex={defaultIndex}
              dynamic
              links={links}
              colored
              onVisibilityChange={this.handleNavVisibility}
            />
          </PhoneEmulator>
        </div>
        <div className="md-cell md-cell--12">
          <Link to="/components/bottom-navigations#react-router-example">Return to BottomNavigation examples</Link>
        </div>
      </div>
    );
  }
}

export default connect(({ media: { mobile } }) => ({ mobile }))(RoutingExample);
