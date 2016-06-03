import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { IconButton } from '../Buttons';

/**
 * The `DrawerToolbar` component is the Toolbar that gets rendered to the right
 * of the sliding drawer and above the main content.
 */
export default class DrawerToolbar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The current drawer type.
     */
    drawerType: PropTypes.string.isRequired,

    /**
     * Any additional children to display after the menu button (if temporary or persistent)
     * and the optional title.
     */
    children: PropTypes.node,

    /**
     * Boolean if the sliding drawer is currently open.
     */
    isOpen: PropTypes.bool.isRequired,

    /**
     * Boolean if the sliding drawer is temporary.
     */
    temporary: PropTypes.bool.isRequired,

    /**
     * Boolean if the sliding drawer is persistent.
     */
    persistent: PropTypes.bool.isRequired,

    /**
     * A function that will open the sliding drawer. This will be
     * added to the menu button on temporary and persistent drawers.
     */
    openDrawer: PropTypes.func.isRequired,

    /**
     * Any children to render the menu icon button.
     */
    menuIconChildren: PropTypes.node,

    /**
     * The icon className to use to render the menu icon button.
     */
    menuIconClassName: PropTypes.string,

    /**
     * An optional title to display
     */
    title: PropTypes.string,
  };

  render() {
    const {
      style,
      className,
      drawerType,
      isOpen,
      openDrawer,
      persistent,
      temporary,
      menuIconChildren,
      menuIconClassName,
      title,
      children,
    } = this.props;

    let menuBtn, toolbarTitle;
    if(temporary || (!isOpen && persistent)) {
      menuBtn = (
        <IconButton
          key="menu-btn"
          onClick={openDrawer}
          children={menuIconChildren}
          iconClassName={menuIconClassName}
        />
      );
    }

    if(title) {
      toolbarTitle = <h3 key="title" className="md-title">{title}</h3>;
    }

    return (
      <header
        style={style}
        className={classnames('md-navigation-drawer-toolbar', className, drawerType, {
          'active': isOpen && !temporary,
        })}
      >
        {menuBtn}
        {toolbarTitle}
        {children}
      </header>
    );
  }
}
