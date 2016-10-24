import React, { PureComponent, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import { getNavItems } from 'utils/RouteUtils';
import { mediaChange, setMobileSearch } from 'actions/ui';
import AppFooter from 'components/AppFooter';
import ThemeSwitcher from 'containers/ThemeSwitcher';

const ADJUSTED_PAGES = [
  '/getting-started/prerequisites',
  '/discover-more/community',
];

@connect(({ ui: { drawer, media } }) => ({
  defaultMedia: drawer.initialDrawerType,
  toolbarTitle: drawer.toolbarTitle,
  tabletDrawerType: drawer.tabletDrawerType,
  desktopDrawerType: drawer.desktopDrawerType,
  inactive: drawer.inactive,
  mobile: media.mobile,
  tablet: media.tablet,
  desktop: media.desktop,
}), { mediaChange, setMobileSearch })
export default class App extends PureComponent {
  static propTypes = {
    className: PropTypes.string,

    // Injected from react-router
    location: PropTypes.object.isRequired,
    children: PropTypes.node,

    // Injected from react-redux
    defaultMedia: PropTypes.string.isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    inactive: PropTypes.bool.isRequired,
    tabletDrawerType: PropTypes.string.isRequired,
    desktopDrawerType: PropTypes.string.isRequired,
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,
    mediaChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.mediaChange();
    window.addEventListener('resize', this.props.mediaChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.mediaChange);
  }

  render() {
    const {
      location: { pathname },
      children,
      inactive,
      defaultMedia,
      tabletDrawerType,
      desktopDrawerType,
      toolbarTitle,
      tablet,
    } = this.props;

    const footerAdjusted = ADJUSTED_PAGES[0] === pathname && tablet || ADJUSTED_PAGES[1] === pathname;
    return (
      <NavigationDrawer
        drawerTitle="react-md"
        defaultMedia={defaultMedia}
        drawerHeaderChildren={<ThemeSwitcher />}
        tabletDrawerType={tabletDrawerType}
        desktopDrawerType={desktopDrawerType}
        toolbarTitle={toolbarTitle}
        toolbarStyle={{ boxShadow: inactive ? 'none' : undefined }}
        drawerChildren={<h1>Helo, World!</h1>}
        navItems={getNavItems(pathname)}
        contentStyle={{ position: footerAdjusted ? 'relative' : null }}
      >
        {children ? cloneElement(children, { key: pathname + 'woop' }) : null}
        <AppFooter adjusted={footerAdjusted} />
      </NavigationDrawer>
    );
  }
}
