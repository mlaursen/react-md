import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';
import shallowEqual from 'shallowequal';
import Helmet from 'react-helmet';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import { updateMedia } from 'state/media';
import { updateLocation } from 'state/routing';
import navItems from 'constants/navItems';
import scrollRestoration from 'utils/scrollRestoration';
import Link from 'components/Link';
import DocumentationTabs from 'components/DocumentationTabs';

import Footer from './Footer';

const helmetConfig = {
  htmlAttributes: { lang: 'en' },
  defaultTitle: 'react-md',
  titleTemplate: '%s - react-md',
};

@withRouter
@connectAdvanced((dispatch) => {
  let result;

  return (state, props) => {
    const {
      drawer,
      helmet,
      media: { defaultMedia, desktop },
    } = state;

    const nextResult = {
      ...props,
      ...drawer,
      ...helmet,
      dispatch,
      defaultMedia,
      desktop,
    };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})
export default class App extends PureComponent {
  static propTypes = {
    desktop: PropTypes.bool.isRequired,
    defaultMedia: PropTypes.string.isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    toolbarProminent: PropTypes.bool.isRequired,
    visibleBoxShadow: PropTypes.bool.isRequired,
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

    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { history, dispatch } = this.props;
    history.listen((location) => {
      dispatch(updateLocation(location));
      if (typeof window.ga !== 'undefined') {
        window.ga('send', 'pageview', location.pathname);
      }
    });
    scrollRestoration();
  }

  componentDidUpdate() {
    scrollRestoration();
  }

  updateMedia = (drawerType, media) => {
    this.props.dispatch(updateMedia(drawerType, media));
  };

  render() {
    const {
      defaultMedia,
      toolbarTitle,
      visibleBoxShadow,
      toolbarProminent,
      desktop,
      meta,
      link,
    } = this.props;

    let { children } = this.props;
    let tabs;
    if (desktop && toolbarProminent) {
      tabs = <DocumentationTabs key="tabs" />;
    }

    if (children) {
      children = React.cloneElement(children, { key: location.pathname });
    }

    return (
      <NavigationDrawer
        drawerTitle="react-md"
        toolbarTitle={toolbarTitle}
        defaultMedia={defaultMedia}
        onMediaTypeChange={this.updateMedia}
        toolbarZDepth={visibleBoxShadow ? undefined : 0}
        toolbarProminent={desktop && toolbarProminent}
        toolbarChildren={tabs}
        navItems={navItems.map(({ divider, subheader, ...route }) => {
          if (divider || subheader) {
            return { divider, subheader, ...route };
          }

          return <Link {...route} />;
        })}
      >
        <Helmet {...helmetConfig} title={toolbarTitle} meta={meta} link={link} />
        {children}
        <Footer />
      </NavigationDrawer>
    );
  }
}
