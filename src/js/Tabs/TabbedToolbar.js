import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import Tabs from './Tabs';
import Toolbar from '../Toolbars';

/**
 * This is a simple wrapper for using a toolbar and tabs together.
 */
export default class TabbedToolbar extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    tabsStyle: PropTypes.object,
    tabsClassName: PropTypes.string,
    toolbarStyle: PropTypes.object,
    toolbarClassName: PropTypes.string,
    children: PropTypes.node,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    fixed: PropTypes.bool,
    title: Toolbar.propTypes.title,
    titleMenu: Toolbar.propTypes.titleMenu,
    titleStyle: PropTypes.object,
    titleClassName: PropTypes.string,
    prominent: PropTypes.bool,
    prominentTitle: PropTypes.bool,
    nav: Toolbar.propTypes.nav,
    actions: Toolbar.propTypes.actions,
    colored: PropTypes.bool,
  };

  static defaultProps = {
    component: 'header',
    colored: true,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      component: Component,
      style,
      className,
      fixed,
      tabsStyle,
      tabsClassName,
      toolbarStyle,
      toolbarClassName,
      nav,
      title,
      titleMenu,
      titleStyle,
      titleClassName,
      actions,
      colored,
      prominent,
      prominentTitle,
      ...props,
    } = this.props;
    return (
      <Component
        style={style}
        className={cn('md-tab-toolbar', {
          'md-toolbar--fixed': fixed,
        }, className)}
      >
        <Toolbar
          colored={colored}
          themed={!colored}
          style={toolbarStyle}
          className={toolbarClassName}
          nav={nav}
          title={title}
          titleMenu={titleMenu}
          titleStyle={titleStyle}
          titleClassName={titleClassName}
          actions={actions}
          prominent={prominent}
          prominentTitle={prominentTitle}
        />
        <Tabs {...props} style={tabsStyle} className={tabsClassName} />
      </Component>
    );
  }
}
