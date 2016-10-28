import React, { PureComponent, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import navItems from 'constants/navItems';
import DocumentationTabs from 'containers/DocumentationTabs';
import Notifications from 'containers/Notifications';
import AppFooter from 'containers/AppFooter';
import { updateMedia } from 'actions/ui';

@connect(({ ui: { drawer } }) => ({ ...drawer }), {
  onMediaTypeChange: updateMedia,
})
export default class App extends PureComponent {
  static propTypes = {
    // Injected from connect and drawer state
    defaultMedia: NavigationDrawer.propTypes.defaultMedia,
    visibleBoxShadow: PropTypes.bool.isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    toolbarProminent: PropTypes.bool.isRequired,
    onMediaTypeChange: PropTypes.func.isRequired,

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
      onMediaTypeChange,
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
        navItems={navItems(pathname)}
        toolbarStyle={!visibleBoxShadow ? { boxShadow: 'none' } : null}
        onMediaTypeChange={onMediaTypeChange}
      >
        {children}
        <AppFooter key="footer" />
        <Notifications key="notifications" />
      </NavigationDrawer>
    );
  }
}
