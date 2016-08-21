import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import Divider from '../Dividers';
import { List, ListItem } from '../Lists';
import Subheader from '../Subheaders';
import DrawerHeader from './DrawerHeader';

/**
 * The `Drawer` component is another version of the `Sidebar` component
 * that is built into the `NavigationDrawer` component.
 */
export default class Drawer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * An optional style to apply to the drawer.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the drawer.
     */
    className: PropTypes.string,

    /**
     * Any additional children to display in the drawer's header.
     */
    children: PropTypes.node,

    /**
     * Any children used to render the close button for a persistent Drawer.
     */
    closeIconChildren: PropTypes.node,

    /**
     * The icon className to render the close button for a persistent Drawer.
     */
    closeIconClassName: PropTypes.string,

    /**
     * An optional title to display in the header.
     */
    title: PropTypes.string,

    /**
     * Boolean if the `closeDrawer` function should be called automatically when
     * a nav item is clicked.
     */
    autoclose: PropTypes.bool.isRequired,

    /**
     * A function to close the drawer for persistent and temporary drawers.
     */
    closeDrawer: PropTypes.func.isRequired,

    /**
     * Boolean if the drawer is temporary.
     */
    temporary: PropTypes.bool.isRequired,

    /**
     * Boolean if the drawer is persistent.
     */
    persistent: PropTypes.bool.isRequired,

    /**
     * Boolean if the drawer is the mini variant.
     */
    mini: PropTypes.bool.isRequired,

    /**
     * The current drawer type for the media size.
     */
    drawerType: PropTypes.string.isRequired,

    /**
     * Boolean if the drawer is currently open.
     */
    isOpen: PropTypes.bool.isRequired,

    /**
     * Boolean if this is a drawer on a mobile device.
     */
    mobile: PropTypes.bool,

    /**
     * The nav items to display in the drawer.
     *
     * @see NavigationDrawer for more info
     */
    navItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        /**
         * Boolean if this item should be rendered as a divider.
         */
        divider: PropTypes.bool,

        /**
         * Boolean if this item should be rendered as a subheader.
         */
        subheader: PropTypes.bool,

        /**
         * An optional component to render the `ListItem` as.
         */
        component: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
        ]),

        /**
         * The main text to be displayed in a `Subheader` or a `ListItem`.
         */
        primaryText: PropTypes.string,
      }),
    ])).isRequired,
  };

  mapItemsToComponents = (item, key) => {
    if(React.isValidElement(item)) {
      return item;
    }

    const { mini, isOpen } = this.props;
    const { divider, subheader, nestedItems, ...remainingProps } = item;
    let component;
    if(divider) {
      component = Divider;
    } else if(subheader) {
      component = Subheader;
    } else {
      component = ListItem;
    }

    const props = Object.assign({}, remainingProps, {
      key: item.key || key,
    });

    if(nestedItems && (!mini || isOpen)) {
      props.nestedItems = nestedItems.map(this.mapItemsToComponents);
    }

    return React.createElement(component, props);
  };

  render() {
    const {
      style,
      className,
      title,
      closeDrawer,
      closeIconChildren,
      closeIconClassName,
      navItems,
      persistent,
      temporary,
      drawerType,
      mini,
      isOpen,
      children,
      autoclose,
      mobile,
    } = this.props;

    const items = navItems.map(this.mapItemsToComponents);
    let header;
    if(!mini || (mini && isOpen)) {
      header = (
        <DrawerHeader
          key={header}
          title={title}
          closeDrawer={closeDrawer}
          closeIconChildren={closeIconChildren}
          closeIconClassName={closeIconClassName}
          persistent={persistent}
          temporary={temporary}
          children={children}
        />
      );
    }

    return (
      <nav
        style={style}
        className={classnames('md-navigation-drawer', className, drawerType, {
          mobile,
          'active': mini && isOpen,
          'mobile-inactive': mobile && !isOpen,
          'mobile-active': mobile && isOpen,
        })}
      >
        {header}
        <List key="nav-items" onClick={autoclose && temporary ? closeDrawer : null}>{items}</List>
      </nav>
    );
  }
}
