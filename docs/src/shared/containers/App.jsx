import React, { PureComponent, PropTypes, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import { updateMedia, setCustomTheme } from 'actions/ui';
import { THEME_STORAGE_KEY } from 'constants/application';
import hasStorage from 'utils/hasStorage';
import loadCustomTheme from 'utils/loadCustomTheme';
import navItems from 'constants/navItems';
import DocumentationTabs from 'containers/DocumentationTabs';
import Notifications from 'containers/Notifications';
import AppFooter from 'containers/AppFooter';

@connect(({ ui: { drawer } }) => ({ ...drawer }), {
  onMediaTypeChange: updateMedia,
  setCustomTheme,
})
export default class App extends PureComponent {
  static propTypes = {
    // Injected from connect and drawer state
    defaultMedia: NavigationDrawer.propTypes.defaultMedia,
    visibleBoxShadow: PropTypes.bool.isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    toolbarProminent: PropTypes.bool.isRequired,
    onMediaTypeChange: PropTypes.func.isRequired,
    setCustomTheme: PropTypes.func.isRequired,
    customDrawerType: PropTypes.string,

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

  constructor(props) {
    super(props);

    this.state = {
      minOffset: 256 + 64,
    };

    this._setContainer = this._setContainer.bind(this);
    this._calcMinHeight = this._calcMinHeight.bind(this);
    this._handleMediaTypeChange = this._handleMediaTypeChange.bind(this);
  }

  componentWillMount() {
    if (hasStorage() && localStorage.getItem(THEME_STORAGE_KEY) !== null) {
      this.props.setCustomTheme(true);
    }
  }

  componentDidMount() {
    if (hasStorage() && localStorage.getItem(THEME_STORAGE_KEY) !== null) {
      const { primary, secondary, light, hue } = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY));
      loadCustomTheme(primary, secondary, hue, light);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.toolbarProminent !== prevProps.toolbarProminent) {
      this._calcMinHeight();
    }
  }

  _setContainer(container) {
    this._container = findDOMNode(container);
    this._calcMinHeight();
  }

  _calcMinHeight() {
    if (!this._container) {
      return;
    }

    const { offsetHeight: toolbarHeight } = this._container.querySelector('.main-toolbar');
    const { offsetHeight: footerHeight } = this._container.querySelector('.app-footer');
    this.setState({ minOffset: toolbarHeight + footerHeight });
  }

  _handleMediaTypeChange(drawerType, media) {
    this._calcMinHeight();
    this.props.onMediaTypeChange(drawerType, media);
  }

  render() {
    const {
      params,
      location: { pathname },
      defaultMedia,
      visibleBoxShadow,
      toolbarTitle,
      toolbarProminent,
      customDrawerType,
    } = this.props;

    const { minOffset } = this.state;

    let { children } = this.props;
    if (children) {
      children = cloneElement(children, { key: pathname, style: { minHeight: `calc(100vh - ${minOffset}px)` } });
    }

    let tabs;
    if (toolbarProminent) {
      tabs = <DocumentationTabs params={params} pathname={pathname} />;
    }

    return (
      <NavigationDrawer
        ref={this._setContainer}
        drawerTitle="react-md"
        defaultMedia={defaultMedia}
        toolbarClassName="main-toolbar"
        toolbarTitle={toolbarTitle}
        toolbarProminent={toolbarProminent}
        toolbarChildren={tabs}
        navItems={navItems(pathname)}
        drawerType={customDrawerType}
        toolbarStyle={!visibleBoxShadow ? { boxShadow: 'none' } : null}
        onMediaTypeChange={this._handleMediaTypeChange}
      >
        {children}
        <AppFooter key="footer" home={pathname === '/'} />
        <Notifications key="notifications" />
      </NavigationDrawer>
    );
  }
}
