import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import ThemeSwitcher from 'containers/ThemeSwitcher';
import Overlay from 'containers/Overlay';
import QuickNav from 'containers/QuickNav';
import AppFooter from 'components/AppFooter';
import Notifications from 'containers/Notifications';
import ToolbarChildren from 'components/ToolbarChildren';
import { getNavItems } from 'utils/RouteUtils';
import { mediaChange, setMobileSearch } from 'actions/ui';

@connect(({ ui: { drawer, media } }) => ({
  themeable: drawer.themeable,
  includeHeader: drawer.includeHeader,
  initialDrawerType: drawer.initialDrawerType,
  toolbarTitle: drawer.toolbarTitle,
  inactive: drawer.inactive,
  tabletDrawerType: drawer.tabletDrawerType,
  desktopDrawerType: drawer.desktopDrawerType,
  mobileSearch: drawer.mobileSearch,
  mobile: media.mobile,
}), {
  mediaChange,
  setMobileSearch,
})
export default class App extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,

    location: PropTypes.object.isRequired,
    themeable: PropTypes.bool.isRequired,
    includeHeader: PropTypes.bool.isRequired,
    initialDrawerType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']).isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    inactive: PropTypes.bool.isRequired,
    mobile: PropTypes.bool.isRequired,
    tabletDrawerType: PropTypes.string.isRequired,
    desktopDrawerType: PropTypes.string.isRequired,
    mediaChange: PropTypes.func.isRequired,
    mobileSearch: PropTypes.bool.isRequired,
    setMobileSearch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.mediaChange();
    window.addEventListener('resize', this.props.mediaChange);
  }

  render() {
    let { children, toolbarTitle } = this.props;

    const {
      location: { pathname },
      inactive,
      mobile,
      mobileSearch,
      initialDrawerType,
      tabletDrawerType,
      desktopDrawerType,
      setMobileSearch,
      themeable,
      includeHeader,
    } = this.props;

    if (children) {
      children = React.cloneElement(children, { key: pathname });
    }

    if (mobileSearch) {
      toolbarTitle = null;
    }

    let quickNav;
    let toolbarChildren;
    if (pathname !== '/') {
      quickNav = <QuickNav key="quick-nav" />;
      toolbarChildren = (
        <ToolbarChildren
          key="children"
          mobile={mobile}
          mobileSearch={mobileSearch}
          setMobileSearch={setMobileSearch}
        />
      );
    }

    let drawerChildren;
    if (themeable) {
      drawerChildren = <ThemeSwitcher key="theme-switcher" />;
    }

    const props = {
      initialDrawerType,
      drawerTitle: 'react-md',
      drawerClassName: 'fixed-drawer',
      drawerHeaderFixed: true,
      drawerChildren,
      toolbarTitle,
      toolbarChildren,
      toolbarClassName: cn('doc-toolbar', { inactive }),
      navItems: getNavItems(pathname),
      contentClassName: 'text-page',
      tabletDrawerType,
      desktopDrawerType,
    };

    if (!includeHeader) {
      delete props.drawerChildren;
      delete props.drawerTitle;
      delete props.drawerHeaderFixed;
    }

    return (
      <NavigationDrawer {...props}>
        {children}
        {quickNav}
        <Overlay className="quick-search-overlay" />
        <AppFooter key="footer" />
        <Notifications key="notifications" />
      </NavigationDrawer>
    );
  }
}
