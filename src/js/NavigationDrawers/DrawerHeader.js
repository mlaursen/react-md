import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { IconButton } from '../Buttons';
import Divider from '../Dividers';

/**
 * The `DrawerHeader` component is used to create a simple header for the sidebar
 * in the Navigation Drawer. It consists of an optional title, any children, and
 * a close icon for persistent Navigation Drawers.
 */
export default class DrawerHeader extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * A className to apply.
     */
    className: PropTypes.string,

    /**
     * Any additional children to display after the close icon button (for persistent drawers)
     * and the optional title.
     */
    children: PropTypes.node,

    /**
     * An optional title.
     */
    title: PropTypes.string,

    /**
     * A function that will close the drawer.
     */
    closeDrawer: PropTypes.func.isRequired,

    /**
     * Any children to render the close icon button.
     */
    closeIconChildren: PropTypes.node,

    /**
     * The icon className to use to render the close icon button.
     */
    closeIconClassName: PropTypes.string,

    /**
     * Boolean if the drawer is persistent.
     */
    persistent: PropTypes.bool.isRequired,
  };

  render() {
    const {
      className,
      title,
      children,
      closeDrawer,
      closeIconChildren,
      closeIconClassName,
      persistent,
    } = this.props;

    let headerTitle, closeBtn;
    if(title) {
      headerTitle = <h3 key="title" className="md-title">{title}</h3>;
    }

    if(persistent) {
      closeBtn = (
        <IconButton
          key="close-btn"
          className="md-drawer-toggle"
          onClick={closeDrawer}
          children={closeIconChildren}
          className={closeIconClassName}
        />
      );
    }

    return (
      <header className={classnames('md-drawer-header', className)}>
        {headerTitle}
        {children}
        {closeBtn}
        <Divider key="divider" />
      </header>
    );
  }
}
