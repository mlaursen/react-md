import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import TICK from '../constants/CSSTransitionGroupTick';
import getField from '../utils/getField';
import handleKeyboardAccessibility from '../utils/EventUtils/handleKeyboardAccessibility';
import anchorShape from '../Helpers/anchorShape';
import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';
import Layover from '../Helpers/Layover';
import List from '../Lists/List';

/**
 * The `Menu` controlled component is used to display a list of children in the `List`
 * component once the `visible` prop is true.
 */
export default class Menu extends PureComponent {
  static HorizontalAnchors = Layover.HorizontalAnchors;
  static VerticalAnchors = Layover.VerticalAnchors;
  static Positions = {
    // Can't do ...Layover.Positions since it triggers the get for CONTEXT
    TOP_LEFT: Layover.Positions.TOP_LEFT,
    TOP_RIGHT: Layover.Positions.TOP_RIGHT,
    BOTTOM_LEFT: Layover.Positions.BOTTOM_LEFT,
    BOTTOM_RIGHT: Layover.Positions.BOTTOM_RIGHT,
    BELOW: Layover.Positions.BELOW,
    _warned: false,
    get CONTEXT() {
      if (!this._warned) {
        /* eslint-disable no-console */
        console.error(
          'The `Menu.Positions.CONTEXT` position has been deprecated and will be removed ' +
          'in the next major release. To make the `Menu` behave as a context menu, provide ' +
          'the `onContextMenu` prop instead.'
        );
        /* eslint-enable no-console */
      }

      this._warned = true;
      return 'context';
    },
  };

  static propTypes = {
    /**
     * An id to provide to the menu's container. This is required for accessibility as it generates
     * the `aria-` attributes for dynamic content.
     *
     * @see {@link #listId}
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * An optional id to provide to the menu's list. If this prop is omitted, the list's id will be
     * `\`${id}-list\``
     */
    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the main container for the menu.
     */
    style: PropTypes.object,

    /**
     * An optional class name to apply to the main container for the menu.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the list once the menu has opened.
     */
    listStyle: PropTypes.object,

    /**
     * An optional class name to apply to the list once the menu has opened.
     */
    listClassName: PropTypes.string,

    /**
     * The component to render the main container as.
     *
     * @see {@link Helpers/Layover#component}
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),

    /**
     * This is how the menu's `List` gets anchored to the `toggle` element.
     *
     * @see {@link Helpers/Layover#anchor}
     */
    anchor: anchorShape,

    /**
     * This is the optional anchor to use when the `position` is set to `Menu.Positions.BELOW`.
     * Set this to `null` to use the default `anchor` prop.
     *
     * @see {@link Helpers/Layover#belowAnchor}
     */
    belowAnchor: anchorShape,

    /**
     * This is the animation position for the list that appears.
     *
     * @see {@link Helpers/Layover#animationPosition}
     */
    position: positionShape,

    /**
     * This is the component/element that should toggle the menu open.
     *
     * @see {@link Helpers/Layover#toggle}
     */
    toggle: PropTypes.node,

    /**
     * This is how the menu's list will be "fixed" to the `toggle` component.
     *
     * @see {@link Helpers/Layover#fixedTo}
     */
    fixedTo: fixedToShape,

    /**
     * Any additional props that should be applied to the list in the menu. This is really used
     * when additional `aria-` tags need to be applied.
     */
    listProps: PropTypes.object,

    /**
     * Boolean if the menu's list should appear horizontally instead of vertically.
     */
    listInline: PropTypes.bool,

    /**
     * The list's z-depth for applying box shadow. This should be a number from 0 to 5.
     */
    listZDepth: PropTypes.number.isRequired,

    /**
     * Boolean if the list should have its height restricted to the `$md-menu-mobile-max-height`/
     * `$md-menu-desktop-max-height` values.
     *
     * @see [md-menu-mobile-max-height](/components/menus?tab=2#variable-md-menu-mobile-max-height)
     * @see [md-menu-desktop-max-height](/components/menus?tab=2#variable-md-menu-desktop-max-height)
     */
    listHeightRestricted: PropTypes.bool,

    /**
     * Boolean if the menu's list is visible.
     */
    visible: PropTypes.bool.isRequired,

    /**
     * Any children to render in the menu's list. This _should_ normally be `ListItem`, or
     * `ListItemControl`.
     */
    children: PropTypes.node,

    /**
     * An optional function to call when en element in the menu has been clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when a key is pressed anywhere in the menu.
     */
    onKeyDown: PropTypes.func,

    /**
     * A function to call to close the menu. This is used for closing on outside clicks,
     * closing when a list item has been clicked, or the user presses escape.
     */
    onClose: PropTypes.func.isRequired,

    /**
     * Boolean if the menu should be cascading. This means that the menu will pop the additional
     * `nestedItems` on any `ListItem` to be appear either to the right or left of the visible list.
     */
    cascading: PropTypes.bool,

    /**
     * This is how the cascading lists get anchored to the list item.
     *
     * @see {@link Helpers/Layover#anchor}
     */
    cascadingAnchor: Layover.propTypes.anchor,

    /**
     * This is the z-depth the list should gain for a cascading menu. This only gets applied on
     * items that are more than 1 level deep.
     */
    cascadingZDepth: PropTypes.number.isRequired,

    /**
     * Boolean if the `md-full-width` class name should get applied to the menu's container.
     */
    fullWidth: PropTypes.bool,

    /**
     * Boolean if the menu should be displayed as a block instead of as an inline block.
     *
     * @see {@link #fullWidth}
     */
    block: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#centered}
     */
    centered: Layover.propTypes.centered,

    /**
     * @see {@link Helpers/Layover#sameWidth}
     */
    sameWidth: Layover.propTypes.sameWidth,

    /**
     * If you would like the menu to interact as a context menu, provide this prop.
     *
     * @see {@link Helpers/Layover#onContextMenu}
     */
    onContextMenu: Layover.propTypes.onContextMenu,

    /**
     * Boolean if the default behavior of the context menu should be prevented when using the
     * `onContextMenu` prop.
     *
     * @see {@link Helpers/Layover#preventContextMenu}
     */
    preventContextMenu: Layover.propTypes.preventContextMenu,

    /**
     * @see {@link Helpers/Layover#xThreshold}
     */
    xThreshold: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#yThreshold}
     */
    yThreshold: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#closeOnOutsideClick}
     */
    closeOnOutsideClick: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#toggleQuery}
     */
    toggleQuery: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.string,
    ]),

    /**
     * An optional transition name to use for the list appearing/disappearing.
     *
     * @see {@link Helpers/Layover#transitionName}
     */
    transitionName: PropTypes.string,

    /**
     * @see {@link Helpers/Layover#transitionEnterTimeout}
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#transitionLeaveTimeout}
     */
    transitionLeaveTimeout: PropTypes.number,

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the `fixedTo` element scrolls.
     *
     * @see {@link Helpers/Layover#repositionOnScroll}
     */
    repositionOnScroll: PropTypes.bool,

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the window resizes.
     *
     * @see {@link Helpers/Layover#repositionOnResize}
     */
    repositionOnResize: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#simplified}
     */
    simplified: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#minLeft}
     */
    minLeft: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * @see {@link Helpers/Layover#minRight}
     */
    minRight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * @see {@link Helpers/Layover#minBottom}
     */
    minBottom: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * @see {@link Helpers/Layover#fillViewportWidth}
     */
    fillViewportWidth: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#fillViewportHeight}
     */
    fillViewportHeight: PropTypes.bool,

    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
    close: deprecated(PropTypes.func, 'Use `onClose` instead'),
    autoclose: deprecated(PropTypes.bool, 'The menus will always autoclose as according to the specs'),
    contained: deprecated(PropTypes.bool, 'Use `sameWidth` instead'),
    limitHeight: deprecated(PropTypes.bool, 'The menus will always be limited in height as according to the specs'),
    expanderIconClassName: deprecated(
      PropTypes.node,
      'The expander for cascading menus will now just be a simple rotate of the existing `ListItem` ' +
      'expander icon'
    ),
    expanderIconChildren: deprecated(
      PropTypes.node,
      'The expander for cascading menus will now just be a simple rotate of the existing `ListItem` ' +
      'expander icon'
    ),
  };

  static defaultProps = {
    anchor: {
      x: Layover.HorizontalAnchors.INNER_RIGHT,
      y: Layover.VerticalAnchors.OVERLAP,
    },
    cascadingAnchor: {
      x: Layover.HorizontalAnchors.RIGHT,
      y: Layover.VerticalAnchors.OVERLAP,
    },
    position: Layover.Positions.TOP_RIGHT,
    fixedTo: typeof window !== 'undefined' ? window : {},
    listZDepth: 2,
    listHeightRestricted: true,
    cascadingZDepth: 3,
    repositionOnScroll: true,
    repositionOnResize: false,
    simplified: true,
  };

  static contextTypes = {
    listLevel: PropTypes.number,
    cascadingId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    cascadingMenu: PropTypes.bool,
    cascadingAnchor: anchorShape,
    cascadingZDepth: PropTypes.number,
  };

  static childContextTypes = {
    listLevel: PropTypes.number,
    cascadingId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    cascadingMenu: PropTypes.bool,
    cascadingFixedTo: fixedToShape,
    cascadingAnchor: anchorShape,
    cascadingZDepth: PropTypes.number,
  };

  getChildContext() {
    const { cascading, id, fixedTo, cascadingAnchor } = this.props;
    const listLevel = this.context.listLevel || 0;
    const cascadingMenu = typeof cascading !== 'undefined' ? cascading : this.context.cascadingMenu;
    const cascadingZDepth = getField(this.context, this.props, 'cascadingZDepth');
    const cascadingFixedTo = typeof fixedTo !== 'undefined' ? fixedTo : this.context.cascadingFixedTo;

    return {
      listLevel,
      cascadingId: `${id}-level-${listLevel + 1}`,
      cascadingMenu,
      cascadingAnchor,
      cascadingZDepth,
      cascadingFixedTo,
    };
  }

  componentDidMount() {
    this._container = findDOMNode(this);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _handleClose = (e) => {
    const { close, onClose } = this.props;
    if (close || onClose) {
      (close || onClose)(e);
    }
  };

  /**
   * Checks if a provided event target or HTML Element is considered a menu click target.
   * This normally is just a ListItem.
   */
  _isCloseTarget(target) {
    return target.classList.contains('md-list-item')
      && !target.classList.contains('md-list-item--nested-container');
  }

  /**
   * Checks if a provided event target or HTML Element is something that should shortcut/break
   * out of the click event loop because it **should not** close menus when clicked.
   */
  _isIgnoreTarget(target) {
    return target.getAttribute('disabled') !== null
      || target.classList.contains('md-list-control');
  }

  _handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    let node = e.target;
    while (this._container && this._container.contains(node)) {
      if (this._isIgnoreTarget(node)) {
        return;
      } else if (this._isCloseTarget(node)) {
        e.persist();
        // set a timeout so item click events still trigger, and then close
        this._timeout = setTimeout(() => {
          this._timeout = null;
          this._handleClose(e);
        }, TICK);

        return;
      }

      node = node.parentNode;
    }
  };

  _handleKeyDown = (e) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    handleKeyboardAccessibility(e, this._handleClick, true, true);
  };

  render() {
    const {
      id,
      className,
      listStyle,
      listClassName,
      visible,
      children,
      listProps,
      listZDepth,
      listInline,
      listHeightRestricted,
      cascading,
      sameWidth,
      simplified,
      contained, // deprecated
      isOpen, // deprecated
      /* eslint-disable no-unused-vars */
      fixedTo: propFixedTo,
      listId: propListId,
      cascadingAnchor,
      cascadingZDepth,
      onClose,
      position: propPosition,

      // deprecated
      close,
      autoclose,
      limitHeight,
      expanderIconChildren,
      expanderIconClassName,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { listId, position } = this.props;
    if (!listId) {
      listId = `${id}-list`;
    }

    // can't have a simplified menu for cascading and context menus
    const simple = !cascading && !props.onContextMenu && position !== 'context' && simplified;
    if (position === 'context') {
      position = Menu.Positions.BELOW;
    }

    const below = position === Menu.Positions.BELOW;
    const fixedTo = typeof propFixedTo !== 'undefined' ? propFixedTo : this.context.cascadingFixedTo;
    const listVisible = typeof isOpen !== 'undefined' ? isOpen : visible;
    return (
      <Layover
        {...props}
        id={id}
        className={cn('md-menu-container', {
          'md-menu-container--menu-below': simplified && below,
        }, className)}
        simplified={simple}
        sameWidth={contained || sameWidth}
        fixedTo={fixedTo}
        onClick={this._handleClick}
        onKeyDown={this._handleKeyDown}
        onClose={this._handleClose}
        animationPosition={position}
        visible={listVisible}
        aria-haspopup
        aria-expanded={listVisible}
        aria-owns={listId}
      >
        <List
          {...listProps}
          id={listId}
          key="menu-list"
          style={listStyle}
          className={cn('md-list--menu', {
            'md-list--menu-restricted': listHeightRestricted,
            'md-list--menu-contained': simplified && (sameWidth || contained),
            [`md-list--menu-${position}`]: simplified,
            [`md-paper md-paper--${listZDepth}`]: listZDepth,
          }, listClassName)}
          inline={listInline}
        >
          {children}
        </List>
      </Layover>
    );
  }
}
