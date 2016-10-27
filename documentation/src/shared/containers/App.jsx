import React, { PureComponent, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import navItems from 'constants/navItems';
import DocumentationTabs from 'containers/DocumentationTabs';
import Notifications from 'containers/Notifications';
import AppFooter from 'containers/AppFooter';

@connect(({ ui: { drawer }}) => ({ ...drawer }))
export default class App extends PureComponent {
  static propTypes = {
    // Injected from connect and drawer state
    defaultMedia: NavigationDrawer.propTypes.defaultMedia,
    visibleBoxShadow: PropTypes.bool.isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    toolbarProminent: PropTypes.bool.isRequired,

    params: PropTypes.shape({
      component: PropTypes.string,
      section: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const {
      params,
      location: { pathname },
      defaultMedia,
      visibleBoxShadow,
      toolbarTitle,
      toolbarProminent,
    } = this.props;

    let { children } = this.props;
    if (children) {
      children = cloneElement(children, { key: pathname });
    }

    let tabs;
    if (toolbarProminent) {
      tabs = <DocumentationTabs params={params} pathname={pathname} />;
    }

    return (
      <NavigationDrawer
        drawerTitle="react-md"
        defaultMedia={defaultMedia}
        toolbarTitle={toolbarTitle}
        toolbarTitleClassName="md-text-capitalize"
        toolbarProminent={toolbarProminent}
        toolbarChildren={tabs}
        navItems={navItems}
        toolbarStyle={!visibleBoxShadow ? { boxShadow: 'none' } : null}
      >
        {children}
        <AppFooter key="footer" />
        <Notifications key="notifications" />
      </NavigationDrawer>
    );
  }
}
