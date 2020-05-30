import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { NavigationDrawer, bem } from 'react-md';

import { ROOT_PATH } from 'constants/application';
import navItems from 'constants/navItems';
import Link from 'components/Link';
import DocumentationTabs from 'components/DocumentationTabs';
import Messages from 'components/Messages';
import Search from 'components/Search';
import MobileNavigation from 'components/MobileNavigation';

import History from './History';
import Routes from './Routes';
import Footer from './Footer';
import NewDomain from './NewDomain';
import VersionPicker from './VersionPicker';

const helmetConfig = {
  htmlAttributes: { lang: 'en', class: 'custom-theme' },
  defaultTitle: 'react-md',
  titleTemplate: '%s - react-md',
};

const App = ({
  mobile,
  mobileNavigation,
  defaultMedia,
  toolbarTitle,
  toolbarProminent,
  visibleBoxShadow,
  contentProps,
  meta,
  link,
  searching,
  updateMedia,
  animationKey,
}) => {
  let bottomNav;
  if (mobileNavigation) {
    bottomNav = <MobileNavigation key="bottom-navigation" />;
  }

  return (
    <NavigationDrawer
      drawerId="main-navigation"
      drawerHeader={<VersionPicker />}
      defaultMedia={defaultMedia}
      onMediaTypeChange={updateMedia}
      toolbarId="main-toolbar"
      toolbarTitle={toolbarTitle}
      toolbarTitleClassName={bem('main-toolbar', 'title', { 'minified': searching })}
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
      <History />
      <Routes key={animationKey} />
      {bottomNav}
      <Messages />
      <Footer />
      {ROOT_PATH !== '/v1/' && process.env.NODE_ENV === 'production' && <NewDomain />}
    </NavigationDrawer>
  );
};

App.propTypes = {
  animationKey: PropTypes.string.isRequired,
  mobile: PropTypes.bool.isRequired,
  mobileNavigation: PropTypes.bool.isRequired,
  defaultMedia: PropTypes.string.isRequired,
  toolbarTitle: PropTypes.string.isRequired,
  toolbarProminent: PropTypes.bool.isRequired,
  visibleBoxShadow: PropTypes.bool.isRequired,
  contentProps: PropTypes.object,
  meta: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  link: PropTypes.arrayOf(PropTypes.shape({
    rel: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
  searching: PropTypes.bool.isRequired,
  updateMedia: PropTypes.func.isRequired,
};
export default App;
