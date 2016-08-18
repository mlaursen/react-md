import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import Overlay from 'containers/Overlay';
import QuickNav from 'containers/QuickNav';
import QuickSearch from 'containers/QuickSearch';
import AppFooter from 'components/AppFooter';
import Notifications from 'containers/Notifications';
import { getNavItems } from 'utils/RouteUtils';
import { mediaChange } from 'actions/ui';

@connect(({ ui: { drawer, media } }) => ({ ...drawer, ...media }), {
  mediaChange,
})
export default class App extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,

    location: PropTypes.object.isRequired,
    initiallyOpen: PropTypes.bool.isRequired,
    initialDrawerType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']).isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    inactive: PropTypes.bool.isRequired,
    mobile: PropTypes.bool.isRequired,
    tabletDrawerType: PropTypes.string.isRequired,
    desktopDrawerType: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.mediaChange();
    window.addEventListener('resize', this.props.mediaChange);
  }

  render() {
    let { children } = this.props;

    const {
      location,
      inactive,
      mobile,
      initiallyOpen,
      initialDrawerType,
      toolbarTitle,
      tabletDrawerType,
      desktopDrawerType,
    } = this.props;

    if (children) {
      children = React.cloneElement(children, { key: location.pathname });
    }

    let quickNav;
    let toolbarChildren;
    if (location.pathname !== '/') {
      quickNav = <QuickNav key="quick-nav" />;

      if (!mobile) {
        toolbarChildren = <QuickSearch key="quick-search" />;
      }
    }

    return (
      <NavigationDrawer
        initiallyOpen={initiallyOpen}
        initialDrawerType={initialDrawerType}
        toolbarClassName={cn({ inactive })}
        drawerTitle="react-md"
        toolbarTitle={toolbarTitle}
        toolbarChildren={toolbarChildren}
        navItems={getNavItems(location.pathname)}
        contentClassName="text-page"
        tabletDrawerType={desktopDrawerType}
        desktopDrawerType={tabletDrawerType}
      >
        {children}
        {quickNav}
        <Overlay className="quick-search-overlay" />
        <AppFooter key="footer" />
        <Notifications key="notifications" />
      </NavigationDrawer>
    );
  }
}
