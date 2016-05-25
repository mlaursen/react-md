import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { setOverflow, isTouchDevice } from '../utils';
import Divider from '../Dividers';
import { List, ListItem } from '../Lists';
import Subheader from '../Subheaders';
import Overlay from '../Transitions/Overlay';

import NavigationDrawerHeader from './NavigationDrawerHeader';
import NavigationDrawerToolbar from './NavigationDrawerToolbar';

/**
 * Navigation drawers are an excellent component to use to set up the initial
 * layout of your application. This component combines a Navigation drawer
 * (a sidebar of nav items), an app bar, and displays any additional content.
 */
export default class NavigationDrawer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { touch: false };
  }

  static DrawerType = {
    FULL_HEIGHT: 'full-height',
    CLIPPED: 'clipped',
    FLOATING: 'floating',
    PERSISTENT: 'persistent',
    PERSISTENT_MINI: 'mini',
    TEMPORARY: 'temporary',
    // want styles of temporary and mini. Little hacky.
    TEMPORARY_MINI: 'temporary mini',
  };

  static propTypes = {
    /**
     * An optional style to apply to the navigation drawer itself.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the navigation drawer iteself.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the navigation drawer container.
     */
    containerStyle: PropTypes.object,

    /**
     * An optional className to apply to the navigation drawer container.
     */
    containerClassName: PropTypes.string,

    /**
     * An optional style to apply to the main content.
     */
    contentStyle: PropTypes.object,

    /**
     * An optional className to apply to the main content.
     */
    contentClassName: PropTypes.string,

    /**
     * An optional style to apply to the main toolbar.
     */
    toolbarStyle: PropTypes.object,

    /**
     * An optional className to applt to the main toolbar.
     */
    toolbarClassName: PropTypes.string,

    /**
     * Boolean if the navigation drawer is currently open.
     */
    isOpen: PropTypes.bool.isRequired,

    /**
     * An optional title to display in the navigation drawer header.
     */
    title: PropTypes.string,

    /**
     * The main content to display.
     */
    children: PropTypes.node,

    /**
     * The icon className to use for the main menu icon.
     */
    menuIconClassName: PropTypes.string,

    /**
     * Any children required to render the main menu icon.
     */
    menuIconChildren: PropTypes.node,

    /**
     * The icon className to use for closing a persistent navigation drawer.
     */
    closeIconClassName: PropTypes.string,

    /**
     * Any children required to render the close icon for a persistent navigation drawer.
     */
    closeIconChildren: PropTypes.node,

    /**
     * A function to call that will open the navigation drawer. This will
     * be applied to the main menu button.
     */
    openDrawer: PropTypes.func,

    /**
     * A function to call that will close the navigation drawer. If the drawer
     * is persistent or persistent mini, this function is required.
     */
    closeDrawer: (props, propName, component) => {
      const { PERSISTENT, PERSISTENT_MINI } = NavigationDrawer.DrawerType;
      const { drawerType } = props;
      if(drawerType !== PERSISTENT && drawerType !== PERSISTENT_MINI) {
        return;
      }

      return PropTypes.func.isRequired(props, propName, component)
        || PropTypes.string(props, 'closeIconClassName', component)
        || PropTypes.node(props, 'closeIconChildren', component);
    },

    /**
     * A list of items to render in the navigation drawer. If an item
     * is a prop object, all props will be passed to either a `ListItem`,
     * `Divider`, or `Subheader` component.
     *
     * ##### Additional Info
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

    /**
     * The drawer type to use.
     */
    drawerType: PropTypes.oneOf(Object.keys(NavigationDrawer.DrawerType).map(k => NavigationDrawer.DrawerType[k])),

    /**
     * Any additional children to display in the main toolbar.
     */
    toolbarChildren: PropTypes.node,

    /**
     * An optional title to display in the main toolbar.
     */
    toolbarTitle: PropTypes.string,

    /**
     * An optional header to display in the navigation drawer. This will be rendered
     * before the `navItems`. This will replace the generated header if you gave the
     * `title` prop.
     */
    navHeader: PropTypes.node,

    /**
     * Any additional children to display in the navigation drawer's header after the
     * `title`.
     */
    navHeaderChildren: PropTypes.node,
  };

  static defaultProps = {
    drawerType: NavigationDrawer.DrawerType.FULL_HEIGHT,
    menuIconChildren: 'menu',
    closeIconChildren: 'keyboard_arrow_left',
  };

  componentDidMount() {
    this.setState({ touch: isTouchDevice() }); // eslint-disable-line
  }

  componentWillUpdate(nextProps) {
    if(nextProps.isOpen === this.props.isOpen && nextProps.drawerType === this.props.drawerType) {
      return;
    }

    const temps = [
      NavigationDrawer.DrawerType.TEMPORARY,
      NavigationDrawer.DrawerType.TEMPORARY_MINI,
    ];

    const isNextTemp = temps.indexOf(nextProps.drawerType) !== -1;
    const isCurrTemp = temps.indexOf(this.props.drawerType) !== -1;
    if(!isNextTemp && !isCurrTemp) { return; }
    if((isCurrTemp && !isNextTemp) || (!isCurrTemp && !isNextTemp)) {
      setOverflow(false);
    } else {
      setOverflow(nextProps.isOpen);
    }
  }

  mapItemsToComponents = (mini, active, item, key) => {
    if(React.isValidElement(item)) {
      return item;
    }

    const { divider, subheader, primaryText, nestedItems, ...itemProps } = item;
    let component;
    if(divider) {
      component = Divider;
    } else if(subheader) {
      component = Subheader;
    } else {
      component = ListItem;
    }

    const props = Object.assign({}, itemProps, {
      key: item.key || key,
      nestedItems: nestedItems && nestedItems.map(this.mapItemsToComponents.bind(this, mini, active)),
    });
    if(!mini || (mini && active)) {
      props.primaryText = primaryText;
    }

    return React.createElement(component, props);
  };

  render() {
    const {
      isOpen,
      title,
      toolbarTitle,
      style,
      className,
      containerStyle,
      containerClassName,
      contentStyle,
      contentClassName,
      toolbarStyle,
      toolbarClassName,
      menuIconClassName,
      menuIconChildren,
      children,
      openDrawer,
      closeDrawer,
      closeIconClassName,
      closeIconChildren,
      navItems,
      drawerType,
      toolbarChildren,
      navHeader,
      navHeaderChildren,
    } = this.props;

    const { touch } = this.state;
    const { PERSISTENT, PERSISTENT_MINI, TEMPORARY, TEMPORARY_MINI } = NavigationDrawer.DrawerType;

    const mini = drawerType === PERSISTENT_MINI || drawerType === TEMPORARY_MINI;
    const persistent = drawerType === PERSISTENT_MINI || drawerType === PERSISTENT;
    const temporary = drawerType === TEMPORARY || drawerType === TEMPORARY_MINI;
    const active = isOpen || (!temporary && (!persistent && !touch));

    let nav;
    if(active || mini) {
      const navigationItems = navItems.map(this.mapItemsToComponents.bind(this, mini, active));

      nav = <List>{navigationItems}</List>;
    }

    let header;
    if(navHeader) {
      header = React.cloneElement(navHeader, { persistent });
    } else if((active && mini) || !mini) {
      header = (
        <NavigationDrawerHeader
          title={title}
          closeDrawer={closeDrawer}
          closeIconChildren={closeIconChildren}
          closeIconClassName={closeIconClassName}
          persistent={persistent}
          children={navHeaderChildren}
        />
      );
    }

    const conditionalClassNames = { active };

    return (
      <div className={classnames('md-navigation-drawer-container', containerClassName, conditionalClassNames)} style={containerStyle}>
        <nav className={classnames('md-navigation-drawer', className, drawerType, conditionalClassNames)} style={style}>
          {header}
          {nav}
        </nav>
        <div className={classnames('md-navigation-drawer-content', contentClassName, drawerType, conditionalClassNames)} style={contentStyle}>
          <NavigationDrawerToolbar
            className={classnames(toolbarClassName, drawerType, conditionalClassNames)}
            temporary={temporary}
            isOpen={isOpen}
            persistent={persistent}
            openDrawer={openDrawer}
            menuIconClassName={menuIconClassName}
            menuIconChildren={menuIconChildren}
            title={toolbarTitle}
            children={toolbarChildren}
            style={toolbarStyle}
            touch={touch}
          />
          {children}
          <Overlay isOpen={isOpen && !persistent} onClick={closeDrawer} />
        </div>
      </div>
    );
  }
}
