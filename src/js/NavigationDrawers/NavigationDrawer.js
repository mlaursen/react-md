import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import Drawer from './Drawer';
import DrawerToolbar from './DrawerToolbar';
import Overlay from '../Transitions/Overlay';

/**
 * Navigation Drawers are an excellent component to use to set up the initial
 * layout of your application. This component combines a Drawer
 * (a sidebar of nav items), an app bar, and displays any additional content.
 *
 * The `NavigationDrawer` component is customizable to have different
 * display states for mobile, tablet, and desktop displays.
 */
export default class NavigationDrawer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    const { initiallyOpen, initialDrawerType } = props;
    this.state = {
      isOpen: typeof initiallyOpen !== 'undefined'
        ? initiallyOpen
        : initialDrawerType !== 'mobile',
      mobile: initialDrawerType === 'mobile',
      tablet: initialDrawerType === 'tablet',
      desktop: initialDrawerType === 'desktop',
      drawerType: props[initialDrawerType + 'DrawerType'],
    };
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
     * An optional style to apply to the entire container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the entire container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the drawer.
     */
    drawerStyle: PropTypes.object,

    /**
     * An optional className to apply to the drawer.
     */
    drawerClassName: PropTypes.string,

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
     * An optional title to display in the navigation drawer header.
     */
    drawerTitle: PropTypes.string,

    /**
     * Any additional children you want to display in the navigation drawer header after
     * the optional title.
     */
    drawerChildren: PropTypes.node,

    /**
     * Boolean if the drawer header should be fixed to the top of the
     * sliding drawer. This will add the `className` `md-drawer-scrolling-list`
     * the list surrounding the `navItems`. The `md-drawer-scrolling-list`
     * `className` adjusts the max-height for the list content for the different
     * device sizes.
     */
    drawerHeaderFixed: PropTypes.bool,

    /**
     * An optional title to display in the toolbar.
     */
    toolbarTitle: PropTypes.string,

    /**
     * Any additional children you want to display in the main toolbar after the menu
     * button (for persistent drawers) and the optional title.
     */
    toolbarChildren: PropTypes.node,

    /**
     * The main content to display.
     */
    children: PropTypes.node,

    /**
     * An optional boolean if the drawer is open for persistent or temporary
     * drawers.
     */
    initiallyOpen: PropTypes.bool,

    /**
     * The initial drawer type to render. This is used for Server Side Rendering.
     */
    initialDrawerType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']).isRequired,

    /**
     * The `DrawerType` to use for mobile devices. If the `mobileMinWidth` prop
     * matches or the `tabletMinWidth` prop matches and the orientation is portrait,
     * this drawer type will be used.
     */
    mobileDrawerType: PropTypes.oneOf([
      NavigationDrawer.DrawerType.TEMPORARY,
      NavigationDrawer.DrawerType.TEMPORARY_MINI,
    ]).isRequired,

    /**
     * The `DrawerType` to use for landscape oriented tablets. If the
     * `tabletMinWidth` prop matches and the orientation is landscape, this drawer
     * type will be used.
     */
    tabletDrawerType: PropTypes.oneOf([
      NavigationDrawer.DrawerType.FULL_HEIGHT,
      NavigationDrawer.DrawerType.CLIPPED,
      NavigationDrawer.DrawerType.FLOATING,
      NavigationDrawer.DrawerType.PERSISTENT,
      NavigationDrawer.DrawerType.PERSISTENT_MINI,
      NavigationDrawer.DrawerType.TEMPORARY,
      NavigationDrawer.DrawerType.TEMPORARY_MINI,
    ]).isRequired,

    /**
     * The `DrawerType` to use for desktop displays. If the `desktopMinWidth`
     * prop matches, this drawer type will be used.
     */
    desktopDrawerType: PropTypes.oneOf([
      NavigationDrawer.DrawerType.FULL_HEIGHT,
      NavigationDrawer.DrawerType.CLIPPED,
      NavigationDrawer.DrawerType.FLOATING,
      NavigationDrawer.DrawerType.PERSISTENT,
      NavigationDrawer.DrawerType.PERSISTENT_MINI,
      NavigationDrawer.DrawerType.TEMPORARY,
      NavigationDrawer.DrawerType.TEMPORARY_MINI,
    ]).isRequired,

    /**
     * The min width to use for a mobile media query.
     */
    mobileMinWidth: PropTypes.number.isRequired,

    /**
     * The min width to use for a tablet media query.
     */
    tabletMinWidth: PropTypes.number.isRequired,

    /**
     * The min width to use for a desktop media query.
     */
    desktopMinWidth: PropTypes.number.isRequired,

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
     * Boolean if the sliding drawer should automatically close when a nav item
     * is clicked for a temporary or temporary mini drawer.
     */
    autoclose: PropTypes.bool.isRequired,

    /**
     * An optional function to call when the sliding drawer's open state changes.
     * This can happen from rotating a tablet, resizing the browser window,
     * or toggling the drawer for persistent and temporary versions. The
     * `onDrawerChange` prop will be given the new open state.
     *
     * `onDrawerChange(isOpen)`
     */
    onDrawerChange: PropTypes.func,

    /**
     * A list of items to render in the navigation drawer. If an item
     * is a prop object, all props will be passed to either a `ListItem`,
     * `Divider`, or `Subheader` component.
     *
     * ##### Additional Info
     */
    navItems: PropTypes.arrayOf(PropTypes.oneOfType([
      /**
       * Any react component you want to render instead of using props
       * to generate a component.
       */
      PropTypes.element,

      /**
       * An object of props to use that will generate either a `ListItem`, `Divider`,
       * or a `Subheader` component. Any props not listed will be passed
       * to the component.
       */
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
     * The transition name to use for the drawer sliding in and out of view.
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The transition enter duration for the drawer sliding in to view.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition leave duration for the drawer sliding out of view.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * An optional transition to use when the content changes. To disable this transition,
     * set the enter and leave timeouts to `0`, `null`, or `undefined`. Make sure your
     * child has a new key as well.
     */
    contentTransitionName: PropTypes.string.isRequired,

    /**
     * The transition enter timeout for when the main content changes. Settings this value
     * to `0`, `null`, or `undefined` will disable the enter transition.
     */
    contentTransitionEnterTimeout: PropTypes.number,

    /**
     * The transition leave timeout for when the main content changes. Settings this value
     * to `0`, `null`, or `undefined` will disable the leave transition.
     */
    contentTransitionLeaveTimeout: PropTypes.number,
  };

  static defaultProps = {
    initialDrawerType: 'desktop',
    mobileDrawerType: NavigationDrawer.DrawerType.TEMPORARY,
    tabletDrawerType: NavigationDrawer.DrawerType.PERSISTENT,
    desktopDrawerType: NavigationDrawer.DrawerType.FULL_HEIGHT,
    mobileMinWidth: 320,
    tabletMinWidth: 768,
    desktopMinWidth: 1025,
    menuIconChildren: 'menu',
    autoclose: true,
    closeIconChildren: 'keyboard_arrow_left',
    transitionName: 'drawer',
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 300,
    contentTransitionName: 'cross-fade',
    contentTransitionEnterTimeout: 300,
  };

  componentDidMount() {
    window.addEventListener('resize', this._updateMedia);
    this._updateMedia();
  }

  componentWillReceiveProps(nextProps) {
    const {
      mobileMinWidth,
      mobileDrawerType,
      tabletMinWidth,
      tabletDrawerType,
      desktopMinWidth,
      desktopDrawerType,
    } = this.props;

    if(nextProps.mobileMinWidth !== mobileMinWidth || nextProps.mobileDrawerType !== mobileDrawerType
      || nextProps.tabletMinWidth !== tabletMinWidth || nextProps.tabletDrawerType !== tabletDrawerType
      || nextProps.desktopMinWidth !== desktopMinWidth || nextProps.desktopDrawerType !== desktopDrawerType) {
      this._updateDrawerType(nextProps);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.isOpen !== nextState.isOpen && nextProps.onDrawerChange) {
      nextProps.onDrawerChange(nextState.isOpen);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateMedia);
  }

  _matches = (min, max, orientation) => {
    let media = 'only screen';
    if(orientation) {
      media += ` and (orientation: ${orientation})`;
    }

    media += ` and (min-width: ${min}px)`;

    if(max) {
      media += ` and (max-width: ${max}px)`;
    }

    return window.matchMedia(media).matches;
  };

  _updateDrawerType = (props) => {
    const {
      mobileMinWidth,
      mobileDrawerType,
      tabletMinWidth,
      tabletDrawerType,
      desktopMinWidth,
      desktopDrawerType,
    } = props;

    const nextState = {
      mobile: this._matches(mobileMinWidth, desktopMinWidth - 1),
      tablet: this._matches(tabletMinWidth, desktopMinWidth - 1, 'landscape'),
      desktop: this._matches(desktopMinWidth),
    };

    if(nextState.tablet) {
      nextState.drawerType = tabletDrawerType;
    } else if(nextState.mobile) {
      nextState.drawerType = mobileDrawerType;
    } else {
      nextState.drawerType = desktopDrawerType;
    }

    if(this._isFullHeight(nextState.drawerType) !== this._isFullHeight(this.state.drawerType)) {
      nextState.isOpen = this._isFullHeight(nextState.drawerType);
    }

    this.setState(nextState);
  };

  _updateMedia = () => {
    this._updateDrawerType(this.props);
  };

  openDrawer = () => {
    this.setState({ isOpen: true });
  };

  closeDrawer = () => {
    this.setState({ isOpen: false });
  };

  _isFullHeight = (drawerType) => {
    const { FULL_HEIGHT, CLIPPED, FLOATING } = NavigationDrawer.DrawerType;
    return [FULL_HEIGHT, CLIPPED, FLOATING].indexOf(drawerType) !== -1;
  };

  _isPersistent = (drawerType) => {
    const { PERSISTENT, PERSISTENT_MINI } = NavigationDrawer.DrawerType;
    return [PERSISTENT, PERSISTENT_MINI].indexOf(drawerType) !== -1;
  };

  _isTemporary = (drawerType) => {
    const { TEMPORARY, TEMPORARY_MINI } = NavigationDrawer.DrawerType;
    return [TEMPORARY, TEMPORARY_MINI].indexOf(drawerType) !== -1;
  };

  _isMini = (drawerType) => {
    const { PERSISTENT_MINI, TEMPORARY_MINI } = NavigationDrawer.DrawerType;
    return [PERSISTENT_MINI, TEMPORARY_MINI].indexOf(drawerType) !== -1;
  };

  render() {
    const {
      style,
      className,
      drawerStyle,
      drawerClassName,
      contentStyle,
      contentClassName,
      toolbarStyle,
      toolbarClassName,
      drawerTitle,
      drawerHeaderFixed,
      drawerChildren,
      menuIconChildren,
      menuIconClassName,
      closeIconChildren,
      closeIconClassName,
      toolbarTitle,
      toolbarChildren,
      autoclose,
      navItems,
      children,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      contentTransitionName,
      contentTransitionEnterTimeout,
      contentTransitionLeaveTimeout,
    } = this.props;

    const { isOpen, drawerType, mobile } = this.state;
    const persistent = this._isPersistent(drawerType);
    const temporary = this._isTemporary(drawerType);
    const mini = this._isMini(drawerType);

    let drawer, overlay;
    if(isOpen || mini || mobile) {
      drawer = (
        <Drawer
          key="drawer"
          style={drawerStyle}
          className={drawerClassName}
          drawerHeaderFixed={drawerHeaderFixed}
          autoclose={autoclose}
          title={drawerTitle}
          closeDrawer={this.closeDrawer}
          closeIconChildren={closeIconChildren}
          closeIconClassName={closeIconClassName}
          temporary={temporary}
          persistent={persistent}
          navItems={navItems}
          drawerType={drawerType}
          children={drawerChildren}
          mini={mini}
          isOpen={isOpen}
          mobile={mobile}
        />
      );
    }

    if(temporary) {
      overlay = <Overlay isOpen={isOpen} onClick={this.closeDrawer} />;
    }

    return (
      <CSSTransitionGroup
        style={style}
        className={classnames('md-navigation-drawer-container', className)}
        component="div"
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {drawer}
        <CSSTransitionGroup
          style={contentStyle}
          className={classnames('md-navigation-drawer-content', contentClassName, drawerType, {
            'active': isOpen && !temporary,
          })}
          component="div"
          transitionName={contentTransitionName}
          transitionEnter={!!contentTransitionEnterTimeout}
          transitionEnterTimeout={contentTransitionEnterTimeout}
          transitionLeave={!!contentTransitionLeaveTimeout}
          transitionLeaveTimeout={contentTransitionLeaveTimeout}
        >
          <DrawerToolbar
            isOpen={isOpen}
            drawerType={drawerType}
            style={toolbarStyle}
            className={toolbarClassName}
            temporary={temporary}
            persistent={persistent}
            openDrawer={this.openDrawer}
            menuIconChildren={menuIconChildren}
            menuIconClassName={menuIconClassName}
            title={toolbarTitle}
            children={toolbarChildren}
          />
          {children}
          {overlay}
        </CSSTransitionGroup>
      </CSSTransitionGroup>
    );
  }
}
