import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';
import shallowEqual from 'shallowequal';
import Helmet from 'react-helmet';
import { NavigationDrawer } from 'react-md';

import { updateMedia } from 'state/media';
import { updateLocation } from 'state/routing';
import navItems from 'constants/navItems';
import Link from 'components/Link';
import DocumentationTabs from 'components/DocumentationTabs';
import Messages from 'components/Messages';
import Search from 'components/Search';
import MobileNavigation from 'components/MobileNavigation';

import Routes from './Routes';
import Footer from './Footer';

const helmetConfig = {
  htmlAttributes: { lang: 'en', class: 'custom-theme' },
  defaultTitle: 'react-md',
  titleTemplate: '%s - react-md',
};

class App extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    defaultMedia: PropTypes.string.isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    toolbarProminent: PropTypes.bool.isRequired,
    visibleBoxShadow: PropTypes.bool.isRequired,
    contentProps: PropTypes.object,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.node,
    meta: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
    link: PropTypes.arrayOf(PropTypes.shape({
      rel: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })).isRequired,
    searching: PropTypes.bool.isRequired,

    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super();

    this.state = { key: this.getCurrentKey(props) };
  }

  componentDidMount() {
    const { history, dispatch } = this.props;
    dispatch(updateLocation(this.props.location));
    history.listen((location) => {
      dispatch(updateLocation(location));
      if (typeof window.ga !== 'undefined') {
        window.ga('send', 'pageview', location.pathname);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.setState({ key: this.getCurrentKey(nextProps) });
    }
  }

  getCurrentKey = ({ location: { pathname, search } }) => {
    // Want to animate content on everything except for routing example pages
    const routing = pathname.match(/routing-examples/);
    if (routing && this.state && this.state.key) {
      return this.state.key;
    } else if (routing) {
      return 'routing-example';
    }


    return `${pathname}${search}`;
  };

  updateMedia = (drawerType, media) => {
    this.props.dispatch(updateMedia(drawerType, media));
  };

  render() {
    const { key } = this.state;
    const {
      defaultMedia,
      toolbarTitle,
      visibleBoxShadow,
      toolbarProminent,
      contentProps,
      searching,
      mobile,
      meta,
      link,
      location: { pathname },
    } = this.props;

    let bottomNav;
    if (mobile && pathname.startsWith('/components')) {
      bottomNav = <MobileNavigation key="bottom-navigation" />;
    }

    return (
      <NavigationDrawer
        drawerId="main-navigation"
        drawerTitle="react-md"
        defaultMedia={defaultMedia}
        onMediaTypeChange={this.updateMedia}
        toolbarId="main-toolbar"
        toolbarTitle={toolbarTitle}
        toolbarTitleClassName={cn('main-toolbar__title', {
          'main-toolbar__title--minified': searching,
        })}
        toolbarZDepth={visibleBoxShadow ? undefined : 0}
        toolbarProminent={!mobile && toolbarProminent}
        toolbarChildren={<DocumentationTabs visible={!mobile && toolbarProminent} />}
        toolbarActions={<Search key="search" />}
        contentProps={contentProps}
        navItems={navItems.map(({ divider, subheader, ...route }) => {
          if (divider || subheader) {
            return { divider, subheader, ...route };
          }

          return <Link {...route} />;
        })}
      >
        <Helmet {...helmetConfig} title={toolbarTitle} meta={meta} link={link} />
        <Routes key={key} />
        {bottomNav}
        <Messages />
        <Footer />
      </NavigationDrawer>
    );
  }
}

export default withRouter(connectAdvanced((dispatch) => {
  let result;

  return (state, props) => {
    const {
      drawer,
      helmet,
      media: { defaultMedia, mobile },
      search: { searching },
    } = state;

    const nextResult = {
      ...props,
      ...drawer,
      ...helmet,
      searching,
      dispatch,
      defaultMedia,
      mobile,
    };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(App));
