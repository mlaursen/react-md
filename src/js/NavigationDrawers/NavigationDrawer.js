import React, { PureComponent, PropTypes, isValidElement } from 'react';
import cn from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import invalidIf from '../utils/PropTypes/invalidIf';
import Button from '../Buttons/Button';
import Drawer from '../Drawers/Drawer';
import List from '../Lists/List';
import Toolbar from '../Toolbars/Toolbar';

const { DrawerTypes } = Drawer;
import { isTemporary, isPersistent, isPermanent, isMini } from '../Drawers/isType';
import JumpToContentLink from './JumpToContentLink';
import CloseButton from './CloseButton';
import MiniListItem from './MiniListItem';

function getNonMiniType(type) {
  const { PERSISTENT_MINI: pMini, TEMPORARY_MINI: tMini } = DrawerTypes;
  if ([pMini, tMini].indexOf(type) === -1) {
    return type;
  }

  return pMini === type ? DrawerTypes.PERSISTENT : DrawerTypes.TEMPORARY;
}

function toMiniListItem(item, index) {
  if (isValidElement(item)) {
    return item;
  }

  const { divider, subheader, key, ...itemProps } = item;
  if (divider || subheader) {
    return null;
  }

  delete itemProps.primaryText;
  delete itemProps.secondaryText;
  delete itemProps.rightIcon;
  delete itemProps.rightAvatar;
  delete itemProps.threeLines;
  delete itemProps.nestedItems;
  delete itemProps.expanderIconChildren;
  delete itemProps.expanderIconClassName;
  delete itemProps.children;

  return <MiniListItem key={key || index} {...itemProps} />;
}

/**
 * The `NavigationDrawer` is used when you want a full layout configuration. It is a combination
 * of the `Toolbar` component and the `Drawer` component.
 *
 * The main benfit of using this component is that it will manage adding respective offset
 * classes automatically for you to the content and the drawer. It will also manage using
 * a mini drawer type for you.
 */
export default class NavigationDrawer extends PureComponent {
  static DrawerType = { // deprecated
    /* eslint-disable no-console */
    _warned: false,
    _msg: 'Invalid use of `NavigationDrawer.DrawerType.{{TYPE}}`. The `NavigationDrawer.DrawerType` ' +
      'has been deprecated and will be removed in the next release. Please use the ' +
      '`NavigationDrawer.DrawerTypes.{{TYPE}}` instead.',

    get FULL_HEIGHT() {
      if (!this._warned) {
        console.error(this._msg.replace(/{{TYPE}}/g, 'FULL_HEIGHT'));
      }
      this._warned = true;

      return DrawerTypes.FULL_HEIGHT;
    },

    get CLIPPED() {
      if (!this._warned) {
        console.error(this._msg.replace(/{{TYPE}}/g, 'CLIPPED'));
      }
      this._warned = true;

      return DrawerTypes.CLIPPED;
    },

    get FLOATING() {
      if (!this._warned) {
        console.error(this._msg.replace(/{{TYPE}}/g, 'FLOATING'));
      }
      this._warned = true;

      return DrawerTypes.FLOATING;
    },

    get PERSISTENT() {
      if (!this._warned) {
        console.error(this._msg.replace(/{{TYPE}}/g, 'PERSISTENT'));
      }
      this._warned = true;

      return DrawerTypes.PERSISTENT;
    },

    get PERSISTENT_MINI() {
      if (!this._warned) {
        console.error(this._msg.replace(/{{TYPE}}/g, 'PERSISTENT_MINI'));
      }
      this._warned = true;

      return DrawerTypes.PERSISTENT_MINI;
    },

    get TEMPORARY() {
      if (!this._warned) {
        console.error(this._msg.replace(/{{TYPE}}/g, 'TEMPORARY'));
      }
      this._warned = true;

      return DrawerTypes.TEMPORARY;
    },

    get TEMPORARY_MINI() {
      if (!this._warned) {
        console.error(this._msg.replace(/{{TYPE}}/g, 'TEMPORARY_MINI'));
      }
      this._warned = true;

      return DrawerTypes.TEMPORARY_MINI;
    },
    /* eslint-enable no-console */
  };

  static DrawerTypes = DrawerTypes;

  static propTypes = {
    /**
     * An optional style to apply to the surrounding container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the surrounding container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the main toolbar.
     */
    toolbarStyle: PropTypes.object,

    /**
     * An optional className to apply to the toolbar.
     */
    toolbarClassName: PropTypes.string,

    /**
     * An optional style to apply to the main toolbar's title.
     */
    toolbarTitleStyle: PropTypes.object,

    /**
     * An optional className to apply to the main toolbar's title.
     */
    toolbarTitleClassName: PropTypes.string,

    /**
     * An optional style to apply to the drawer.
     */
    drawerStyle: PropTypes.object,

    /**
     * An optional className to apply to the drawer.
     */
    drawerClassName: PropTypes.string,

    /**
     * An optional style to apply to the content. This is the container surrounding whatever
     * `children` are passed in.
     */
    contentStyle: PropTypes.object,

    /**
     * An optional className to apply to the content. This is the container surrounding whatever
     * `children` are passed in.
     */
    contentClassName: PropTypes.string,

    /**
     * The children to display in the main content.
     */
    children: PropTypes.node,

    /**
     * Boolean if the `drawerHeader` component should be built if the `drawerHeader` prop is not
     * passed in.
     */
    includeDrawerHeader: PropTypes.bool,

    /**
     * An optional header to display in the drawer. This will normally be the `Toolbar` component
     * or any other type of header. You can either use this prop with the `CloseButton` component
     * when displaying a persistent drawer, or use the `drawerTitle` and `drawerHeaderChildren` prop
     * to build a toolbar.
     */
    drawerHeader: PropTypes.node,

    /**
     * An optional title to use for the drawer's header toolbar. If the `drawerHeader` prop is defined,
     * this is invalid.
     */
    drawerTitle: invalidIf(PropTypes.node, 'drawerHeader'),

    /**
     * Any additional children to display in the drawer's header `Toolbar`. If the `drawerHeader` prop is defined,
     * this is invalud.
     */
    drawerHeaderChildren: invalidIf(PropTypes.node, 'drawerHeader'),

    /**
     * Any additional children to display after the `drawerHeader` and `navItems` list in the drawer.
     */
    drawerChildren: PropTypes.node,

    /**
     * The position for the drawer to be displayed.
     */
    position: PropTypes.oneOf(['left', 'right']).isRequired,

    /**
     * An optional list of elements or props to use to build a navigational list in the drawer.
     * When the item is an object of props, it will build a `ListItem` component unless a key of
     * `divider` or `subheader` is set to true. It will then create the Divider or Subheader component
     * with any other remaining keys.
     */
    navItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.shape({
        divider: PropTypes.bool,
        subheader: PropTypes.bool,
        primaryText: PropTypes.string,
      }),
    ])),

    /**
     * The drawer type to use for mobile devices.
     */
    mobileDrawerType: PropTypes.oneOf([
      DrawerTypes.TEMPORARY,
      DrawerTypes.TEMPORARY_MINI,
    ]).isRequired,

    /**
     * The drawer tye to use for tablets.
     */
    tabletDrawerType: PropTypes.oneOf([
      DrawerTypes.FULL_HEIGHT,
      DrawerTypes.CLIPPED,
      DrawerTypes.FLOATING,
      DrawerTypes.PERSISTENT,
      DrawerTypes.PERSISTENT_MINI,
      DrawerTypes.TEMPORARY,
      DrawerTypes.TEMPORARY_MINI,
    ]).isRequired,

    /**
     * The drawer type to use for desktop displays.
     */
    desktopDrawerType: PropTypes.oneOf([
      DrawerTypes.FULL_HEIGHT,
      DrawerTypes.CLIPPED,
      DrawerTypes.FLOATING,
      DrawerTypes.PERSISTENT,
      DrawerTypes.PERSISTENT_MINI,
      DrawerTypes.TEMPORARY,
      DrawerTypes.TEMPORARY_MINI,
    ]).isRequired,

    /**
     * An optional drawer type to enforce on all screen sizes. If the drawer type is not
     * `temporary`, you are required to define the `onMediaTypeChange` prop to handle switching
     * to temporary when the media matches a mobile device.
     * ```
     */
    drawerType: PropTypes.oneOf([
      DrawerTypes.FULL_HEIGHT,
      DrawerTypes.CLIPPED,
      DrawerTypes.FLOATING,
      DrawerTypes.PERSISTENT,
      DrawerTypes.PERSISTENT_MINI,
      DrawerTypes.TEMPORARY,
      DrawerTypes.TEMPORARY_MINI,
    ]),

    /**
     * The default media match for the drawer. This will be what is displayed on first render.
     * The component will adjust itself to the current media after it has mounted, but this
     * is mostly used for server side rendering.
     */
    defaultMedia: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),

    /**
     * The min width to use for a mobile media query. This prop should match the `md-mobile-min-width`
     * variable.
     *
     * The media query for a mobile device will be:
     *
     * ```js
     * window.matchMedia(
     *   `screen and (min-width: ${mobileMinWidth}px) and (max-width: ${tabletMinWidth - 1}px`
     * ).matches;
     * ```
     */
    mobileMinWidth: PropTypes.number.isRequired,

    /**
     * The min width to use for a tablet media query. This prop should match the `md-tablet-min-width`
     * variable.
     *
     * The media query for a tablet device will be:
     *
     * ```js
     * window.matchMedia(
     *   `screen and (min-width: ${tabletMinWidth}px) and (max-width: ${desktopWidth - 1}px`
     * ).matches;
     * ```
     */
    tabletMinWidth: PropTypes.number.isRequired,

    /**
     * The min width to use for a desktop media query. This prop should match the `md-desktop-min-width`
     * variable.
     *
     * The media query for a tablet device will be:
     *
     * ```js
     * window.matchMedia(`screen and (min-width: ${tabletMinWidth}px)`).matches;
     * ```
     */
    desktopMinWidth: PropTypes.number.isRequired,

    /**
     * An optional function to call when the type of the drawer changes because of the
     * new media queries. The callback will include the newly selected drawer type
     * and an object containing the media matches of `mobile`, `tablet`, and `desktop`.
     *
     * ```js
     * this.props.onMediaTypeChange(NavigationDrawer.DrawerTypes.TEMPORARY, {
     *   mobile: true,
     *   tablet: false,
     *   desktop: false,
     * });
     * ```
     */
    onMediaTypeChange: PropTypes.func,

    /**
     * Boolean if the temporary or persistent drawers are visible by default.
     */
    defaultVisible: PropTypes.bool,

    /**
     * Boolean if the temporary or persistent drawers are visible. If this is defined,
     * it will make the component controlled and require the `onVisibilityToggle` prop
     * to be defined.
     */
    visible: controlled(PropTypes.bool, 'onVisibilityToggle', 'defaultVisible'),

    /**
     * An optional function to call when the visibility of the drawer changes. The callback
     * will include the new visibility.
     *
     * ```js
     * this.props.onVisibilityToggle(false);
     * ```
     */
    onVisibilityToggle: PropTypes.func,

    /**
     * A boolean if the mini drawer's list should be generated from the `navItems` prop. When building
     * the list, it will extract the `leftIcon` or `leftAvatar` from the `navItem` and then create a
     * mini `ListItem` containing only that icon or image. Any other event listeners will also be applied.
     *
     *
     * @see miniDrawerHeader
     * @see miniDrawerChildren
     */
    extractMini: PropTypes.bool,

    /**
     * An optional header to display in the mini drawer. This will be displayed above the optional
     * mini nav list that get generated if the `extractMini` prop is `true` and the `miniDrawerChildren`.
     *
     * @see extractMini
     */
    miniDrawerHeader: PropTypes.node,

    /**
     * Any additional children to display in the mini drawer. This will be displayed after the `miniDrawerHeader`
     * and the optional mini nav list that gets generated if the `extractMini` prop is `true`.
     *
     * @see extractMini
     */
    miniDrawerChildren: PropTypes.node,

    /**
     * Boolean if the drawer should automatically close after a nav item has been clicked for `temporary` drawers.
     */
    autoclose: PropTypes.bool,

    /**
     * An optional title to display in the main toolbar. Either the `toolbarTitle` or the `toolbarTitleMenu`
     * may be defined, not both.
     */
    toolbarTitle: invalidIf(PropTypes.node, 'toolbarTitleMenu'),

    /**
     * An optional select field menu to display in the main toolbar. Either the `toolbarTitle` or the `toolbarTitleMenu`
     * may be defined, not both.
     */
    toolbarTitleMenu: PropTypes.element,

    /**
     * The theme style for the main toolbar.
     *
     * @see [toolbars](/components/toolbars#prop-types-toolbar)
     */
    toolbarThemeType: PropTypes.oneOf(['default', 'colored', 'themed']).isRequired,

    /**
     * Boolean if the toolbar's nav, actions, and title should share the same color.
     */
    toolbarSingleColor: PropTypes.bool,

    /**
     * A boolean if the toolbar should be prominent.
     */
    toolbarProminent: PropTypes.bool,

    /**
     * A boolean if the toolbar's title should be prominent.
     */
    toolbarProminentTitle: PropTypes.bool,

    /**
     * A list of elements or a single element to display to the right of the
     * toolbar's nav, title, and children.
     *
     * @see [toolbars](/components/toolbars#prop-types-toolbar)
     */
    toolbarActions: Toolbar.propTypes.actions,

    /**
     * Any children to display in the toolbar. This will be displayed between the optional title and
     * actions.
     */
    toolbarChildren: Toolbar.propTypes.children,

    /**
     * The component to render the content in.
     */
    contentComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * An optional footer display after the main content.
     */
    footer: PropTypes.node,

    /**
     * Any children used to render a button that will toggle the visibility of the
     * navigation drawer for `temporary` and `persistent` drawers. This is normally a
     * hamburger menu.
     */
    temporaryIconChildren: PropTypes.node,

    /**
     * The icon className used to render a button that will toggle the visibility of the
     * navigation drawer for `temporary` and `persistent` drawers. This is normally a
     * hamburger menu.
     */
    temporaryIconClassName: PropTypes.string,

    /**
     * Any children used to render a button that appears on a persistent drawer's open
     * header. This is used to create the `CloseButton` for drawers. When a persistent
     * drawer is closed, the `temporaryIconChildren` and `temporaryIconClassName` props
     * will be used to create a button to open the drawer.
     *
     * If the `drawerHeader` prop is defined, you will have to either include the `CloseButton`
     * in your header manually, or create your own controlled button to close the drawer.
     */
    persistentIconChildren: PropTypes.node,

    /**
     * The icon classNameused to render a button that appears on a persistent drawer's open
     * header. This is used to create the `CloseButton` for drawers. When a persistent
     * drawer is closed, the `temporaryIconChildren` and `temporaryIconClassName` props
     * will be used to create a button to open the drawer.
     *
     * If the `drawerHeader` prop is defined, you will have to either include the `CloseButton`
     * in your header manually, or create your own controlled button to close the drawer.
     */
    persistentIconClassName: PropTypes.string,

    /**
     * The transition name to use when the page's content changes. If you want to disable
     * transitions, set both the `transitionEnterTimeout` and `transitionLeaveTimeout` props
     * to a false-ish value. (`null`, `undefined`, or `0`).
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The transition enter timeout when the page's content changes. If you want to disable
     * the enter transition, set this to a false-ish value (`null`, `undefined`, or `0`).
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * The transition leave timeout when the page's content changes. If you want to disable
     * the leave transition, set this to a false-ish value (`null`, `undefined`, or `0`).
     */
    transitionLeaveTimeout: PropTypes.number,

    /**
     * The transition duration for the drawer when sliding in and out of view.
     */
    drawerTransitionDuration: PropTypes.number.isRequired,

    /**
     * Any additional props to provide to the main content. This will be applied before any of the generated props,
     * so this should not include `style`, `className`, or `component`.
     */
    contentProps: PropTypes.object,

    /**
     * An id to give the main content. A hidden link is created in the main drawer's header that links to the main
     * content. This is used for keyboard only users to jump the navigation and jump straight to the content.
     *
     * If you provide your own `drawerHeader`, it is suggested to include the link yourself.
     */
    contentId: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * The label to use for a keyboard accessibility link that jumps all the navigation and allows a user to focus
     * the main content. This is created in the drawer's header.
     */
    jumpLabel: PropTypes.string.isRequired,

    /**
     * An optional DOM Node to render the drawer into. The default is to render as
     * the first child in the `body`.
     *
     * > This prop will not be used when the drawer is of the permanent type or `inline` is specified
     * since the `Portal` component will not be used.
     */
    renderNode: PropTypes.object,

    /**
     * Boolean if the drawer should be rendered as the last child instead of the first child
     * in the `renderNode` or `body`.
     *
     * > This prop will not be used when the drawer is of the permanent type or `inline` is specified
     * since the `Portal` component will not be used.
     */
    lastChild: PropTypes.bool,

    /**
     * Boolean if the `drawerType` should remain constant across all media. This is really only valid
     * if the `drawerType` is one of the temporary types.
     */
    constantDrawerType: PropTypes.bool,

    menuIconChildren: deprecated(PropTypes.node, 'Use `temporaryIconChildren` instead'),
    menuIconClassName: deprecated(PropTypes.string, 'Use `temporaryIconClassName` instead'),
    closeIconChildren: deprecated(PropTypes.node, 'Use `persistentIconChildren` instead'),
    closeIconClassName: deprecated(PropTypes.string, 'Use `persistentIconClassName` instead'),
    onDrawerChange: deprecated(PropTypes.func, 'Use `onVisibilityToggle` or `onMediaTypeChange` instead'),
    contentTransitionName: deprecated(PropTypes.string, 'Use `transitionName` instead'),
    contentTransitionEnterTimeout: deprecated(PropTypes.number, 'Use `transtionEnterTimeout` instead'),
    contentTransitionLeaveTimeout: deprecated(PropTypes.number, 'Use `transtionLeaveTimeout` instead'),
    initialDrawerType: deprecated(
      PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
      'Use `defaultMedia` instead'
    ),
  };

  static contextTypes = {
    renderNode: PropTypes.object,
  };

  static childContextTypes = {
    closeIconClassName: PropTypes.string,
    closeChildren: PropTypes.node,
    onCloseClick: PropTypes.func,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    label: PropTypes.string.isRequired,
    renderNode: PropTypes.object,
  }

  static defaultProps = {
    autoclose: Drawer.defaultProps.autoclose,
    contentId: 'main-content',
    // Defaults to false since it keeps the state of the drawerType in sync and makes the Drawer
    // controlled. On initial mount without any defaultMedia updates, it would always be considered
    // temporary
    constantDrawerType: false,
    jumpLabel: 'Jump to content',
    extractMini: true,
    position: Drawer.defaultProps.position,
    defaultMedia: Drawer.defaultProps.defaultMedia,
    mobileDrawerType: Drawer.defaultProps.mobileType,
    tabletDrawerType: Drawer.defaultProps.tabletType,
    desktopDrawerType: Drawer.defaultProps.desktopType,
    mobileMinWidth: Drawer.defaultProps.mobileMinWidth,
    tabletMinWidth: Drawer.defaultProps.tabletMinWidth,
    desktopMinWidth: Drawer.defaultProps.desktopMinWidth,
    includeDrawerHeader: true,
    contentComponent: 'main',
    temporaryIconChildren: 'menu',
    toolbarThemeType: 'colored',
    persistentIconChildren: 'arrow_back',
    transitionName: 'md-cross-fade',
    transitionEnterTimeout: 300,
    drawerTransitionDuration: Drawer.defaultProps.transitionDuration,
  };

  /**
   * Determines the current media and returns an object containing matches for `mobile`, `tablet`, `desktop`,
   * and the current drawer type. This expects a `props` object of the drawer.
   *
   * If this is used server side, it will default to only matching mobile.
   *
   * @param {Object=} props - The current drawer's prop shape to extract the mobile, tablet, and desktop type/min
   *    widths. This defaults to the drawer's default props.
   * @return {Object} an object containing the media matches and the current type to use for the drawer.
   */
  static getCurrentMedia(props = NavigationDrawer.defaultProps) {
    const {
      mobileDrawerType: mobileType,
      tabletDrawerType: tabletType,
      desktopDrawerType: desktopType,
      constantDrawerType: constantType,
      ...others
    } = props;

    return Drawer.getCurrentMedia({ mobileType, tabletType, desktopType, constantType, ...others });
  }

  constructor(props) {
    super(props);

    const { defaultMedia, defaultVisible, initialDrawerType } = props;

    this.state = {
      mobile: initialDrawerType || defaultMedia === 'mobile',
      tablet: initialDrawerType || defaultMedia === 'tablet',
      desktop: initialDrawerType || defaultMedia === 'desktop',
    };

    if (typeof props.drawerType === 'undefined') {
      this.state.drawerType = props[`${initialDrawerType || defaultMedia}DrawerType`];
    }

    const type = getField(props, this.state, 'drawerType');

    if (typeof props.visible === 'undefined') {
      this.state.visible = typeof defaultVisible !== 'undefined'
        ? defaultVisible
        : isPermanent(type);
    }

    this._handleTypeChange = this._handleTypeChange.bind(this);
    this._handleVisibility = this._handleVisibility.bind(this);
    this._toggleVisibility = this._toggleVisibility.bind(this);
  }

  getChildContext() {
    const {
      persistentIconChildren,
      persistentIconClassName,
      closeIconChildren,
      closeIconClassName,
      contentId: id,
      jumpLabel: label,
    } = this.props;

    return {
      id,
      label,
      closeChildren: closeIconChildren || persistentIconChildren,
      closeIconClassName: closeIconClassName || persistentIconClassName,
      onCloseClick: this._toggleVisibility,
      renderNode: this.context.renderNode,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const visible = getField(this.props, this.state, 'visible');
    const nVisible = getField(nextProps, nextState, 'visible');
    const drawerType = getField(nextProps, nextState, 'drawerType');

    if (!isTemporary(drawerType) && visible !== nVisible) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      this._timeout = setTimeout(() => {
        this.setState({ contentActive: false });
      }, nextProps.drawerTransitionDuration);

      this.setState({ contentActive: true });
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _toggleVisibility(e) {
    const { onVisibilityToggle, onDrawerChange } = this.props;
    const visible = !getField(this.props, this.state, 'visible');
    if (onVisibilityToggle || onDrawerChange) {
      (onDrawerChange || onVisibilityToggle)(visible, e);
    }

    if (typeof this.props.visible === 'undefined') {
      this.setState({ visible });
    }
  }

  _handleVisibility(visible) {
    if (this.props.onVisibilityToggle) {
      this.props.onVisibilityToggle(visible);
    }

    if (typeof this.props.visible === 'undefined') {
      this.setState({ visible });
    }
  }

  _handleTypeChange(drawerType, mediaState) {
    const { onMediaTypeChange } = this.props;
    let state = mediaState;
    if (onMediaTypeChange) {
      onMediaTypeChange(drawerType, mediaState);
    }

    if (typeof this.props.drawerType === 'undefined') {
      state = { ...mediaState, drawerType };
    }

    this.setState(state);
  }

  render() {
    const {
      style,
      className,
      toolbarStyle,
      toolbarClassName,
      drawerStyle,
      drawerClassName,
      contentStyle,
      contentClassName,
      contentComponent: Content,
      navItems,
      children,
      drawerTitle,
      drawerChildren,
      drawerHeaderChildren,
      drawerTransitionDuration,
      toolbarTitle,
      toolbarTitleMenu,
      toolbarTitleStyle,
      toolbarTitleClassName,
      toolbarActions,
      toolbarProminent,
      toolbarProminentTitle,
      toolbarThemeType,
      toolbarSingleColor,
      toolbarChildren,
      mobileDrawerType: mobileType,
      tabletDrawerType: tabletType,
      desktopDrawerType: desktopType,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      extractMini,
      miniDrawerHeader,
      miniDrawerChildren,
      temporaryIconChildren,
      temporaryIconClassName,
      menuIconChildren,
      menuIconClassName,
      footer,
      includeDrawerHeader,
      contentId,
      contentProps,
      constantDrawerType,
      ...props
    } = this.props;
    delete props.drawerType;
    delete props.drawerHeader;
    delete props.persistentIconChildren;
    delete props.persistentIconClassName;
    delete props.jumpLabel;
    delete props.renderNode;

    // Deprecated deletes
    delete props.onDrawerChange;
    delete props.closeIconChildren;
    delete props.closeIconClassName;

    let { drawerHeader } = this.props;
    const { desktop, tablet, contentActive } = this.state;

    const drawerType = getField(this.props, this.state, 'drawerType');
    const visible = getField(this.props, this.state, 'visible');
    const renderNode = getField(this.props, this.context, 'renderNode');
    const mini = isMini(drawerType);
    const temporary = isTemporary(drawerType);
    const persistent = isPersistent(drawerType);
    const clipped = drawerType === DrawerTypes.CLIPPED;
    const floating = drawerType === DrawerTypes.FLOATING;

    const offset = (desktop || tablet ? !temporary && visible : visible);
    const toolbarRelative = cn({
      'md-toolbar-relative': !toolbarProminent && !toolbarProminentTitle,
      'md-toolbar-relative--prominent': toolbarProminent || toolbarProminentTitle,
    });

    let nav;
    if (temporary || persistent) {
      nav = (
        <Button
          key="nav"
          onClick={this._toggleVisibility}
          disabled={persistent && visible}
          icon
          iconClassName={menuIconClassName || temporaryIconClassName}
        >
          {menuIconChildren || temporaryIconChildren}
        </Button>
      );
    }

    let closeButton;
    if (persistent) {
      closeButton = <CloseButton />;
    }

    if (!drawerHeader && includeDrawerHeader) {
      drawerHeader = (
        <Toolbar
          key="drawer-header"
          title={drawerTitle}
          actions={visible && nav ? closeButton : null}
          className={cn('md-divider-border md-divider-border--bottom', {
            [toolbarRelative]: clipped || floating,
          })}
        >
          {drawerHeaderChildren}
          <JumpToContentLink />
        </Toolbar>
      );
    }
    let miniDrawer;
    if (mini) {
      let miniList;
      if (extractMini) {
        miniList = navItems.map(toMiniListItem);
        miniList = <List key="mini-nav-items" className={toolbarRelative}>{miniList}</List>;
      }

      miniDrawer = (
        <Drawer key="mini-drawer" type={drawerType} renderNode={renderNode} aria-hidden={visible}>
          {miniDrawerHeader}
          {miniList}
          {miniDrawerChildren}
        </Drawer>
      );
    }

    const desktopOffset = !clipped && !floating && offset;

    return (
      <div style={style} className={className}>
        <Toolbar
          colored={toolbarThemeType === 'colored'}
          themed={toolbarThemeType === 'themed'}
          singleColor={toolbarSingleColor}
          style={toolbarStyle}
          className={cn({
            'md-toolbar--over-drawer': clipped || floating || (mini && !visible),
          }, toolbarClassName)}
          title={toolbarTitle}
          titleMenu={toolbarTitleMenu}
          prominent={toolbarProminent}
          prominentTitle={toolbarProminentTitle}
          titleStyle={toolbarTitleStyle}
          titleClassName={cn({
            'md-title--drawer-active': contentActive,
            'md-transition--decceleration': offset && visible,
            'md-transition--acceleration': offset && !visible,
            'md-title--permanent-offset': desktopOffset && isPermanent(drawerType),
            'md-title--persistent-offset': desktopOffset && persistent,
          }, toolbarTitleClassName)}
          nav={nav}
          actions={toolbarActions}
          fixed
        >
          {toolbarChildren}
        </Toolbar>
        {miniDrawer}
        <Drawer
          {...props}
          constantType={constantDrawerType}
          transitionDuration={drawerTransitionDuration}
          header={drawerHeader}
          style={drawerStyle}
          className={drawerClassName}
          navItems={navItems}
          renderNode={renderNode}
          mobileType={mobileType}
          tabletType={tabletType}
          desktopType={desktopType}
          type={getNonMiniType(drawerType)}
          visible={visible}
          onVisibilityToggle={this._handleVisibility}
          onMediaTypeChange={this._handleTypeChange}
        >
          {drawerChildren}
        </Drawer>
        <CSSTransitionGroup
          {...contentProps}
          id={contentId}
          component={Content}
          transitionName={transitionName}
          transitionEnter={!!transitionEnterTimeout}
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeave={!!transitionLeaveTimeout}
          transitionLeaveTimeout={transitionLeaveTimeout}
          tabIndex={-1}
          style={contentStyle}
          className={cn('md-navigation-drawer-content', {
            'md-navigation-drawer-content--active': contentActive,
            'md-navigation-drawer-content--inactive': !visible,
            'md-navigation-drawer-content--prominent-offset': toolbarProminent || toolbarProminentTitle,
            'md-transition--decceleration': visible,
            'md-transition--acceleration': !visible,
            'md-drawer-relative': offset,
            'md-drawer-relative--mini': mini && (!visible || temporary),
          }, toolbarRelative, contentClassName)}
        >
          {children}
        </CSSTransitionGroup>
        {footer}
      </div>
    );
  }
}
