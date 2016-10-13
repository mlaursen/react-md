import React, { PureComponent, PropTypes, isValidElement } from 'react';
import cn from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import deprecated from 'react-prop-types/lib/deprecated';

import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import Drawer from '../Drawers';
import List from '../Lists/List';
import Toolbar from '../Toolbars';

const { DrawerTypes } = Drawer;
import { isTemporary, isPersistent, isPermanent, isMini } from '../Drawers/isType';
import DrawerNav from './DrawerNav';
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

  const { divider, subheader, key, ...props } = item;
  if (divider || subheader) {
    return null;
  }

  /* eslint-disable react/prop-types */
  delete props.primaryText;
  delete props.secondaryText;
  delete props.rightIcon;
  delete props.rightAvatar;
  delete props.threeLines;
  delete props.nestedItems;
  delete props.expanderIconChildren;
  delete props.expanderIconClassName;
  delete props.children;
  /* eslint-enable react/prop-types */

  return <MiniListItem key={key || index} {...props} />;
}

/**
 * The `NavDrawer` is used when you want a full layout configuration. It is a combination
 * of the `Toolbar` component and the `Drawer` component.
 */
export default class NavDrawer extends PureComponent {
  /**
   * Will be removed in next release.
   */
  static DrawerType = DrawerTypes;
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

    drawerTitle: PropTypes.node,
    drawerHeader: PropTypes.node,
    drawerHeaderChildren: PropTypes.node,
    drawerChildren: PropTypes.node,
    position: PropTypes.oneOf(['left', 'right']).isRequired,
    navItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.shape({
        divider: PropTypes.bool,
        subheader: PropTypes.bool,
        primaryText: PropTypes.string,
      }),
    ])),

    mobileDrawerType: PropTypes.oneOf([
      DrawerTypes.TEMPORARY,
      DrawerTypes.TEMPORARY_MINI,
    ]).isRequired,

    tabletDrawerType: PropTypes.oneOf([
      DrawerTypes.FULL_HEIGHT,
      DrawerTypes.CLIPPED,
      DrawerTypes.FLOATING,
      DrawerTypes.PERSISTENT,
      DrawerTypes.PERSISTENT_MINI,
      DrawerTypes.TEMPORARY,
      DrawerTypes.TEMPORARY_MINI,
    ]).isRequired,
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
     * An optional drawer type to enforce on all screen sizes. If the drawer type is not available
     * for a sceen size, a similar type will be used for that size.
     *
     * Example:
     * ```js
     * drawerType = NavDrawer.DrawerTypes.CLIPPED;
     * // mobile - NavDrawer.DrawerTypes.TEMPORARY;
     * // tablet - NavDrawer.DrawerTypes.CLIPPED;
     * // desktop - NavDrawer.DrawerTypes.CLIPPED;
     *
     * drawerType = NavDraer.DrawerTypes.PERSISTENT_MINI;
     * // mobile - NavDrawer.DrawerTypes.TEMPORARY_MINI;
     * // tablet - NavDrawer.DrawerTypes.PERSISTENT_MINI;
     * // desktop - NavDrawer.DrawerTypes.PERSISTENT_MINI;
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

    defaultMedia: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),

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
     * An optional DOM Node to render the portal into. The default is to render as
     * the last child in the `body`.
     */
    renderNode: PropTypes.object,

    /**
     * An optional function to call when the type of the drawer changes because of the
     * new media queries. The callback will include the newly selected drawer type
     * and an object containing the media matches of `mobile`, `tablet`, and `desktop`.
     *
     * ```js
     * this.props.onMediaTypeChange(NavDrawer.DrawerTypes.TEMPORARY, { mobile: true, tablet: false, desktop: true });
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
     * will include the new visibility and the event that triggered the change.
     *
     * ```js
     * this.props.onVisibilityToggle(false, event);
     * ```
     */
    onVisibilityToggle: PropTypes.func,
    extractMiniFromNavItems: PropTypes.bool,
    miniDrawerHeader: PropTypes.node,
    miniDrawerChildren: PropTypes.node,

    toolbarTitle: PropTypes.node,
    toolbarTitleMenu: Toolbar.propTypes.titleMenu,
    toolbarThemeType: PropTypes.oneOf(['default', 'colored', 'themed']).isRequired,
    toolbarSingleColor: PropTypes.bool,
    toolbarProminent: PropTypes.bool,
    toolbarProminentTitle: PropTypes.bool,
    toolbarActions: Toolbar.propTypes.actions,
    contentComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    temporaryIconChildren: PropTypes.node,
    temporaryIconClassName: PropTypes.string,
    persistentIconChildren: PropTypes.node,
    persistentIconClassName: PropTypes.string,
    transitionName: PropTypes.string,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,

    initialDrawerType: deprecated(
      PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
      'Use `defaultMedia` instead'
    ),
  };

  static childContextTypes = {
    navIconClassName: PropTypes.string,
    navChildren: PropTypes.node,
    navDisabled: PropTypes.bool,
    onNavClick: PropTypes.func,
    closeIconClassName: PropTypes.string,
    closeChildren: PropTypes.node,
    onCloseClick: PropTypes.func,
  }

  static defaultProps = {
    extractMiniFromNavItems: true,
    position: Drawer.defaultProps.position,
    defaultMedia: Drawer.defaultProps.defaultMedia,
    mobileDrawerType: Drawer.defaultProps.mobileType,
    tabletDrawerType: Drawer.defaultProps.tabletType,
    desktopDrawerType: Drawer.defaultProps.desktopType,
    mobileMinWidth: Drawer.defaultProps.mobileMinWidth,
    tabletMinWidth: Drawer.defaultProps.tabletMinWidth,
    desktopMinWidth: Drawer.defaultProps.desktopMinWidth,
    contentComponent: 'main',
    temporaryIconChildren: 'menu',
    toolbarThemeType: 'colored',
    persistentIconChildren: 'arrow_back',
    transitionName: 'md-cross-fade',
    transitionEnterTimeout: 300,
  };

  constructor(props) {
    super(props);

    const { defaultMedia, defaultVisible } = props;

    this.state = {
      mobile: defaultMedia === 'mobile',
      tablet: defaultMedia === 'tablet',
      desktop: defaultMedia === 'desktop',
    };

    if (typeof props.drawerType === 'undefined') {
      this.state.drawerType = props[`${defaultMedia}DrawerType`];
    }

    const type = getField(props, this.state, 'drawerType');

    if (typeof props.visible === 'undefined') {
      this.state.visible = typeof defaultVisible !== 'undefined'
        ? defaultVisible
        : !isTemporary(type);
    }

    this._handleTypeChange = this._handleTypeChange.bind(this);
    this._handleVisibility = this._handleVisibility.bind(this);
    this._toggleVisibility = this._toggleVisibility.bind(this);
  }

  getChildContext() {
    const {
      temporaryIconChildren,
      temporaryIconClassName,
      persistentIconChildren,
      persistentIconClassName,
    } = this.props;
    const visible = getField(this.props, this.state, 'visible');
    const drawerType = getField(this.props, this.state, 'drawerType');
    const persistent = isPersistent(drawerType);

    return {
      navChildren: temporaryIconChildren,
      navIconClassName: temporaryIconClassName,
      navDisabled: persistent && visible,
      onNavClick: this._toggleVisibility,
      closeChildren: persistentIconChildren,
      closeIconClassName: persistentIconClassName,
      onCloseClick: this._toggleVisibility,
    };
  }

  _toggleVisibility(e) {
    const visible = !getField(this.props, this.state, 'visible');
    if (this.props.onVisibilityToggle) {
      this.props.onVisibilityToggle(visible, e);
    }

    if (typeof this.props.visible === 'undefined') {
      this.setState({ visible });
    }
  }

  _handleVisibility(visible, e) {
    if (this.props.onVisibilityToggle) {
      this.props.onVisibilityToggle(visible, e);
    }

    if (typeof this.props.visible === 'undefined') {
      this.setState({ visible });
    }
  }

  _handleTypeChange(drawerType, mediaState) {
    const { onMediaTypeChange } = this.props;
    if (onMediaTypeChange) {
      onMediaTypeChange(drawerType, mediaState);
    }

    if (typeof this.props.drawerType === 'undefined') {
      mediaState.drawerType = drawerType;
    }

    const { mobile, tablet, desktop } = this.state;
    if (typeof this.props.visible === 'undefined'
      && (mediaState.mobile !== mobile
        || mediaState.tablet !== tablet
        || mediaState.desktop !== desktop)
    ) {
      mediaState.visible = !isTemporary(drawerType);
    }

    this.setState(mediaState);
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
      renderNode,
      drawerTitle,
      drawerChildren,
      drawerHeaderChildren,
      toolbarTitle,
      toolbarTitleMenu,
      toolbarActions,
      toolbarProminent,
      toolbarProminentTitle,
      toolbarThemeType,
      toolbarSingleColor,
      mobileDrawerType: mobileType,
      tabletDrawerType: tabletType,
      desktopDrawerType: desktopType,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      extractMiniFromNavItems,
      miniDrawerHeader,
      miniDrawerChildren,
      ...props,
    } = this.props;
    delete props.drawerType;
    delete props.drawerHeader;
    delete props.temporaryIconChildren;
    delete props.temporaryIconClassName;
    delete props.persistentIconChildren;
    delete props.persistentIconClassName;

    let { drawerHeader } = this.props;
    const { mobile } = this.state;

    const drawerType = getField(this.props, this.state, 'drawerType');
    const visible = getField(this.props, this.state, 'visible');
    const mini = isMini(drawerType);
    const temporary = isTemporary(drawerType);
    const persistent = isPersistent(drawerType);


    let nav;
    let closeButton;
    if (temporary || persistent) {
      nav = <DrawerNav />;
    }

    if (persistent) {
      closeButton = <CloseButton />;
    }

    if (!drawerHeader) {
      drawerHeader = (
        <Toolbar
          key="drawer-header"
          title={drawerTitle}
          children={drawerHeaderChildren}
          actions={visible && nav ? closeButton : null}
          className="md-divider-border md-divider-border--bottom"
        />
      );
    }

    const offset = visible || drawerType === DrawerTypes.FULL_HEIGHT;
    const toolbarRelative = cn({
      'md-toolbar-relative': !toolbarProminent && !toolbarProminentTitle,
      'md-toolbar-relative--prominent': toolbarProminent || toolbarProminentTitle,
    });
    let miniDrawer;
    if (mini) {
      let miniList;
      if (extractMiniFromNavItems) {
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

    return (
      <div style={style} className={className}>
        <Toolbar
          colored={toolbarThemeType === 'colored'}
          themed={toolbarThemeType === 'themed'}
          singleColor={toolbarSingleColor}
          style={toolbarStyle}
          className={cn({
            'md-toolbar--over-drawer': drawerType === DrawerTypes.CLIPPED || (mini && !visible),
          }, toolbarClassName)}
          title={toolbarTitle}
          titleMenu={toolbarTitleMenu}
          prominent={toolbarProminent}
          prominentTitle={toolbarProminentTitle}
          titleClassName={cn('md-title--drawer', {
            'md-title--permanent-offset': offset && isPermanent(drawerType),
            'md-title--persistent-offset': offset && isPersistent(drawerType),
          })}
          nav={nav}
          actions={toolbarActions}
          fixed
        />
        {miniDrawer}
        <Drawer
          {...props}
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
          component={Content}
          transitionName={transitionName}
          transitionEnter={!!transitionEnterTimeout}
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeave={!!transitionLeaveTimeout}
          transitionLeaveTimeout={transitionLeaveTimeout}
          style={contentStyle}
          className={cn('md-navigation-drawer-content', {
            'md-navigation-drawer-content--inactive': !visible,
            'md-navigation-drawer-content--prominent-offset': toolbarProminent || toolbarProminentTitle,
            'md-drawer-relative': offset,
            'md-drawer-relative--mini': mini && (mobile || !visible),
          }, toolbarRelative, contentClassName)}
        >
          {children}
        </CSSTransitionGroup>
      </div>
    );
  }
}
