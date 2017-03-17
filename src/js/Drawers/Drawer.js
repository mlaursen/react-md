import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { MOBILE_MIN_WIDTH, TABLET_MIN_WIDTH, DESKTOP_MIN_WIDTH } from '../constants/media';
import getField from '../utils/getField';
import mapToListParts from '../utils/mapToListParts';
import controlled from '../utils/PropTypes/controlled';
import Paper from '../Papers/Paper';
import Portal from '../Helpers/Portal';
import List from '../Lists/List';

import { isTemporary, isPermanent, isMini } from './isType';
import DrawerTypes from './DrawerTypes';

const oneOfDrawerTypes = PropTypes.oneOf([
  DrawerTypes.FULL_HEIGHT,
  DrawerTypes.CLIPPED,
  DrawerTypes.FLOATING,
  DrawerTypes.PERSISTENT,
  DrawerTypes.PERSISTENT_MINI,
  DrawerTypes.TEMPORARY,
  DrawerTypes.TEMPORARY_MINI,
]);

/**
 * The `Drawer` component is used for having a sliding panel of content or navigation
 * that appears from the side of a screen.
 *
 * If the `Drawer` uses any of the `_MINI` drawer types, you will need to also create another
 * `Drawer` that is not `_MINI`. Transitioning the `width` on mobile devices is very sluggish,
 * and it isn't much more work to create another drawer.
 */
export default class Drawer extends PureComponent {
  static DrawerTypes = DrawerTypes;
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
     * An optional style to apply to the `List` surrounding the `navItems`.
     */
    navStyle: PropTypes.object,

    /**
     * An optional className to apply to the `List` surrounding the `navItems`.
     */
    navClassName: PropTypes.string,

    /**
     * An optional component to render the drawer in. When this prop is undefined, the drawer
     * will be rendered as a `nav` if the `navItems` prop is defined, otherwise an `aside`.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
    ]),

    /**
     * An optional list of navigation items to display in the drawer. This list can either contain
     * a valid child component for a `List` or an object used to create a `Divider`, `Subheader`,
     * or `ListItem`.
     *
     * - To create a divider in the list, set a `divider` key to `true`. Any other keys will be
     * passed to the `Divider` component.
     * - To create a subheader in the list, set the `subheader` key to `true`. Any other keys will
     * be passed to the `Subheader` component.
     * - To create a list item, just create an object with any normal `ListItem` props.
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
     * Boolean if a temporary drawer should close when a nav item is clicked.
     */
    autoclose: PropTypes.bool,

    /**
     * An optional header to display. This _should_ normally be a toolbar.
     */
    header: PropTypes.node,

    /**
     * Any additional children to display after the `header` and `navItems`.
     */
    children: PropTypes.node,

    /**
     * The drawer type to use when the current device matches the mobile
     * media query.
     */
    mobileType: PropTypes.oneOf([
      Drawer.DrawerTypes.TEMPORARY,
      Drawer.DrawerTypes.TEMPORARY_MINI,
    ]).isRequired,

    /**
     * The min-width to use for the mobile media query.
     */
    mobileMinWidth: PropTypes.number.isRequired,

    /**
     * The drawer type to use when the current device matches the tablet
     * media query.
     */
    tabletType: oneOfDrawerTypes.isRequired,

    /**
     * The min-width to use for the tablet media query.
     */
    tabletMinWidth: PropTypes.number.isRequired,

    /**
     * The drawer type to use when the current device matches the desktop media
     * query.
     */
    desktopType: oneOfDrawerTypes.isRequired,

    /**
     * The min-width for a desktop screen.
     */
    desktopMinWidth: PropTypes.number.isRequired,

    /**
     * An optional type to enforce across all media sizes. Since `mobile` devices are
     * included, you are required to manually specify when the `type` should be `temporary`.
     *
     * When the `type` is not one of the `temporary` types, the `onMediaTypeChange` prop
     * must be provided.
     */
    type: (props, propName, component, ...others) => {
      const type = props[propName];
      if (isTemporary(type)) {
        return oneOfDrawerTypes(props, propName, component, ...others);
      }

      let err = oneOfDrawerTypes(props, propName, component, ...others);
      if (!err && typeof type !== 'undefined' && !isMini(type) && typeof props.onMediaTypeChange === 'undefined') {
        err = new Error(
          `You provided a \`${propName}\` prop to the ${component} without the \`onMediaTypeChange\` ` +
          `handler. The \`onMediaTypeChange\` prop must be specified when the \`${propName}\` is not ` +
          'one of the `temporary` types.'
        );
      }

      return err;
    },

    /**
     * An optional function to call when the drawer's type changes when the screen resizes.
     * The callback will include the new `type` that should be used for the screen size,
     * and an object containing the media matches for `mobile`, `tablet`, and `desktop`.
     *
     * ```js
     * this.props.onMediaTypeChange(Drawer.DrawerTypes.TEMPORARY, {
     *   mobile: true,
     *   tablet: false,
     *   desktop: false,
     * });
     * ```
     */
    onMediaTypeChange: PropTypes.func,

    /**
     * The default drawer type to display on initial render. The drawer will automatically
     * adjust itself to the correct media once it has mounted. This prop is really only useful
     * for server side rendering.
     */
    defaultMedia: PropTypes.oneOf(['mobile', 'tablet', 'desktop']).isRequired,

    /**
     * Boolean if there should be a visible overlay when the drawer is visible. The default behavior
     * is to only include a visible overlay when the `type` is `TEMPORARY` or `TEMPORARY_MINI` and
     * the device is not a desktop.
     */
    overlay: PropTypes.bool,

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
     * Boolean if the drawer is visible by default. If this is omitted, the drawer will be visible
     * if the current drawer type is NOT `Drawer.DrawerTypes.TEMPORARY` or `Drawer.DrawerTypes.TEMPORARY_MINI`.
     *
     * This basically means that if you are using the default configuration, a mobile device's drawer
     * will be hidden while tablets and desktops will be visible.
     */
    defaultVisible: PropTypes.bool,

    /**
     * Boolean if the drawer is visible. This will force the component to define the `onVisibilityToggle`
     * prop as well as manually updating the drawer's visibility.
     */
    visible: controlled(PropTypes.bool, 'onVisibilityToggle', 'defaultVisible'),

    /**
     * An optional function to call when the visibility of the drawer is changed. The function will
     * be called with the new visibility state.
     *
     * ```js
     * onVisibilityToggle(!currentlyVisible);
     * ```
     */
    onVisibilityToggle: PropTypes.func,

    /**
     * The drawer's position on the page when it is not `inline`. When the drawer's position is `left`,
     * the width will be `calc(100vw - 56px)` on mobile devices and `$md-drawer-desktop-width` on desktops.
     *
     * When the position is `right`, the width will be `100vw` for mobile devices and scaling to the drawer's
     * children width on desktops.
     */
    position: PropTypes.oneOf(['left', 'right']).isRequired,

    /**
     * Boolean if the drawer should be displayed inline instead of fixed to the page. When this prop
     * is enabled, the `position` prop will not be used.
     */
    inline: PropTypes.bool,

    /**
     * The `$md-drawer-transition-time` value from sass.
     */
    transitionDuration: PropTypes.number.isRequired,

    /**
     * Boolean if the temporary drawer's overlay should be created on desktop screens. This is really used so that
     * the drawer will close when a user clicks anywhere on the page except in the drawer.
     */
    clickableDesktopOverlay: PropTypes.bool,

    /**
     * Boolean if the navigation drawer should automatically close when a nav item has been clicked.
     */
    closeOnNavItemClick: PropTypes.bool,

    /**
     * Boolean if the `type` prop should be constant across all media sizes. This is only valid if the `type` is
     * one of the temporary types.
     *
     * This will basically mean that when attempting to do a media adjustment, it will use the `type` prop instead of
     * `mobileType`, `tabletType`, and `desktopType` to determine the next drawer type.
     */
    constantType: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    defaultMedia: 'mobile',
    mobileType: Drawer.DrawerTypes.TEMPORARY,
    mobileMinWidth: MOBILE_MIN_WIDTH,
    tabletType: Drawer.DrawerTypes.PERSISTENT,
    tabletMinWidth: TABLET_MIN_WIDTH,
    desktopType: Drawer.DrawerTypes.FULL_HEIGHT,
    desktopMinWidth: DESKTOP_MIN_WIDTH,
    position: 'left',
    transitionDuration: 300,
    autoclose: true,
    clickableDesktopOverlay: true,
    closeOnNavItemClick: true,
    constantType: true,
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
  static getCurrentMedia(props = Drawer.defaultProps) {
    const {
      mobileMinWidth,
      tabletMinWidth,
      desktopMinWidth,
      mobileType,
      tabletType,
      desktopType,
      constantType,
    } = props;
    if (typeof window === 'undefined') {
      const type = constantType && props.type ? props.type : mobileType;
      return { mobile: true, tablet: false, desktop: false, type };
    }

    const mobile = Drawer.matchesMedia(mobileMinWidth, tabletMinWidth - 1);
    const tablet = Drawer.matchesMedia(tabletMinWidth, desktopMinWidth);
    const desktop = Drawer.matchesMedia(desktopMinWidth);

    let type;
    if (constantType && props.type && isTemporary(props.type)) {
      type = props.type;
    } else if (desktop) {
      type = desktopType;
    } else if (tablet) {
      type = tabletType;
    } else {
      type = mobileType;
    }

    return { type, mobile, tablet, desktop };
  }

  /**
   * Simply does a `window.matchMedia(query)` where the query gets defined as a min width
   * and optional max width.
   *
   * @param {Number} min - The min width for the media query.
   * @param {Number=} max - An optional max width to include for the media query.
   * @return true if the media matches.
   */
  static matchesMedia(min, max) {
    let media = `screen and (min-width: ${min}px)`;
    if (max) {
      media += ` and (max-width: ${max}px)`;
    }

    return window.matchMedia(media).matches;
  }

  static contextTypes = {
    renderNode: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { defaultVisible, defaultMedia, overlay } = props;

    this.state = {
      mobile: defaultMedia === 'mobile',
      tablet: defaultMedia === 'tablet',
      desktop: defaultMedia === 'desktop',
      animating: false,
      overlayActive: false,
      drawerActive: false,
    };

    if (typeof props.type === 'undefined') {
      this.state.type = props[`${defaultMedia}Type`];
    }

    const type = getField(props, this.state, 'type');
    this._initialFix = true;

    if (typeof props.visible === 'undefined') {
      this.state.visible = typeof defaultVisible !== 'undefined'
        ? defaultVisible
        : isPermanent(type);
    }

    const visible = getField(props, this.state, 'visible');

    this.state.overlayActive = (typeof overlay !== 'undefined' ? overlay : isTemporary(type) && !this.state.desktop)
      && visible;
    this.state.drawerActive = visible;

    this._animate = this._animate.bind(this);
    this._closeDrawer = this._closeDrawer.bind(this);
    this._setNavigation = this._setNavigation.bind(this);
    this._handleNavClick = this._handleNavClick.bind(this);
    this._updateType = this._updateType.bind(this);
    this._updateMedia = this._updateMedia.bind(this);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this._updateType(this.props);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._updateMedia);
  }

  componentWillReceiveProps(nextProps) {
    const {
      mobileMinWidth,
      mobileType,
      tabletMinWidth,
      tabletType,
      desktopMinWidth,
      desktopType,
    } = this.props;

    if (nextProps.mobileMinWidth !== mobileMinWidth || nextProps.mobileType !== mobileType
      || nextProps.tabletMinWidth !== tabletMinWidth || nextProps.tabletType !== tabletType
      || nextProps.desktopMinWidth !== desktopMinWidth || nextProps.desktopType !== desktopType) {
      this._updateType(nextProps);
    }

    const { visible, transitionDuration, overlay } = nextProps;
    if (this.props.visible === nextProps.visible) {
      return;
    }

    const type = getField(nextProps, this.state, 'type');
    this._animate(visible, type, transitionDuration, overlay, this.state.desktop);
  }

  componentWillUpdate(nextProps, nextState) {
    const { visible } = nextState;
    if (typeof nextProps.visible !== 'undefined' || this.state.visible === visible) {
      return;
    }
    const type = getField(nextProps, nextState, 'type');
    this._animate(visible, type, nextProps.transitionDuration, nextProps.overlay, nextState.desktop);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    if (this._closeTimeout) {
      clearTimeout(this._closeTimeout);
    }

    window.removeEventListener('resize', this._updateMedia);
  }

  _updateType(props) {
    const {
      onMediaTypeChange,
      onVisibilityToggle,
      overlay,
    } = props;

    const state = Drawer.getCurrentMedia(props);
    const diffType = getField(props, this.state, 'type') !== state.type;
    const diffMedia = state.mobile !== this.state.mobile
      || state.tablet !== this.state.tablet
      || state.desktop !== this.state.desktop;

    if (onMediaTypeChange && (diffType || diffMedia)) {
      onMediaTypeChange(state.type, { mobile: state.mobile, tablet: state.tablet, desktop: state.desktop });
    }

    if (diffType) {
      let visible = isPermanent(state.type);
      if (this._initialFix) {
        if (props.defaultVisible) {
          visible = props.defaultVisible;
        } else if (props.visible) {
          visible = props.visible;
        }
      }

      const prevVisible = getField(props, this.state, 'visible');
      if (onVisibilityToggle && (visible !== prevVisible)) {
        onVisibilityToggle(visible);
      }

      if (typeof props.visible === 'undefined') {
        state.visible = visible;
      }
    } else if (this._initialFix && diffMedia) {
      state.overlayActive = (typeof overlay !== 'undefined' ? overlay : isTemporary(state.type) && !state.desktop)
        && getField(props, this.state, 'visible');
    }

    if (typeof props.type !== 'undefined') {
      delete state.type;
    }

    this._initialFix = false;
    this.setState(state);
  }

  _updateMedia() {
    this._updateType(this.props);
  }

  _animate(visible, type, timeout, overlay, desktop) {
    if (visible) {
      this.timeout = setTimeout(() => {
        this.timeout = null;

        this.setState({
          overlayActive: overlay || (isTemporary(type) && !desktop),
          drawerActive: true,
          animating: true,
        });
      }, 17);
    } else {
      this._timeout = setTimeout(() => {
        this._timeout = null;

        this.setState({ animating: false });
      }, timeout);
      this.setState({ animating: true, overlayActive: false, drawerActive: false });
    }
  }

  _setNavigation(navigation) {
    this._navigation = findDOMNode(navigation);
  }

  _handleNavClick(e) {
    if (!this.props.closeOnNavItemClick || !isTemporary(getField(this.props, this.state, 'type'))) {
      return;
    }

    let { target } = e;
    while (target && this._navigation.contains(target)) {
      if (target.classList.contains('md-list-tile')) {
        // Clicked a nav item that has a nested list
        if (target.getAttribute('aria-expanded') !== null) {
          return;
        }

        this._closeTimeout = setTimeout(() => {
          this._closeTimeout = null;

          this._closeDrawer(e);
        }, 450);
        return;
      }

      target = target.parentNode;
    }
  }

  _closeDrawer() {
    if (this.props.onVisibilityToggle) {
      this.props.onVisibilityToggle(false);
    }

    if (typeof this.props.visible === 'undefined') {
      this.setState({ visible: false });
    }
  }

  render() {
    const { overlayActive, drawerActive, animating } = this.state;
    const {
      style,
      className,
      navStyle,
      navClassName,
      component,
      navItems,
      header,
      children,
      inline,
      position,
      overlay,
      autoclose,
      clickableDesktopOverlay,
      lastChild,
      ...props
    } = this.props;
    delete props.constantType;
    delete props.renderNode;
    delete props.visible;
    delete props.defaultVisible;
    delete props.type;
    delete props.defaultMedia;
    delete props.mobileType;
    delete props.mobileMinWidth;
    delete props.tabletType;
    delete props.tabletMinWidth;
    delete props.desktopType;
    delete props.desktopMinWidth;
    delete props.transitionDuration;
    delete props.onVisibilityToggle;
    delete props.onMediaTypeChange;
    delete props.closeOnNavItemClick;

    const { desktop } = this.state;
    const renderNode = getField(this.props, this.context, 'renderNode');
    const visible = getField(this.props, this.state, 'visible');
    const type = getField(this.props, this.state, 'type');
    const mini = isMini(type);
    const temporary = isTemporary(type);
    const floating = DrawerTypes.FLOATING === type;
    const permanent = isPermanent(type);

    let Component;
    if (component) {
      Component = component;
    } else if (navItems) {
      Component = 'nav';
    } else {
      Component = 'aside';
    }

    let navigation;
    if (navItems) {
      navigation = (
        <List
          ref={this._setNavigation}
          key="navigation"
          style={navStyle}
          className={cn('md-list--drawer', {
            'md-toolbar-relative': mini && !visible,
            'md-background': floating,
          }, navClassName)}
          onClick={autoclose ? this._handleNavClick : null}
        >
          {navItems.map(mapToListParts)}
        </List>
      );
    }
    let zDepth = 1;
    if (floating || inline) {
      zDepth = 0;
    } else if (temporary && visible) {
      zDepth = 5;
    }

    const overlayVisible = (!desktop || clickableDesktopOverlay)
      && (overlay || temporary)
      && (animating || visible);

    const drawer = (
      <Paper
        {...props}
        key="drawer"
        component={Component}
        zDepth={zDepth}
        raiseOnHover={false}
        style={style}
        className={cn('md-drawer', {
          [`md-drawer--${position}`]: !inline,
          'md-drawer--fixed': !inline,
          'md-drawer--inline': inline,
          'md-drawer--active': mini || drawerActive,
          'md-drawer--mini': mini,
          'md-transition--decceleration': visible,
          'md-transition--acceleration': !visible,
          'md-background': inline || floating,
          'md-background--card': !floating && !inline,
        }, className)}
      >
        {header}
        {navigation}
        {children}
        <Portal visible={overlayVisible} renderNode={renderNode}>
          <div
            className={cn('md-overlay md-overlay--drawer md-pointer--hover', {
              'md-overlay--active': overlayActive,
            })}
            onClick={this._closeDrawer}
          />
        </Portal>
      </Paper>
    );

    if (inline || permanent) {
      return drawer;
    }

    return (
      <Portal visible={mini || animating || visible} renderNode={renderNode} lastChild={lastChild}>
        {drawer}
      </Portal>
    );
  }
}
