import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

import LayoverPositions from '../constants/LayoverPositions';
import captureNextEvent from '../utils/EventUtils/captureNextEvent';
import getSelectedTextPosition from '../utils/getSelectedTextPosition';
import getScroll from '../utils/getScroll';
import viewport from '../utils/viewport';
import isOutOfBounds from '../utils/isOutOfBounds';

const HorizontalAnchors = {
  LEFT: 'left',
  INNER_LEFT: 'inner left',
  CENTER: 'center',
  RIGHT: 'right',
  INNER_RIGHT: 'inner right',
};
const VerticalAnchors = {
  TOP: 'top',
  CENTER: 'center',
  OVERLAP: 'overlap',
  BOTTOM: 'bottom',
};

/**
 * The Layover component is used to keep a component fixed to another component
 * while the page is scrolling or a container is scrolling. When the fixed component
 * is considered out of view, it will be closed.
 *
 * > NOTE: Don't look at source code. Plz.
 */
export default class Layover extends PureComponent {
  /**
   * The animation positions for the layover child.
   */
  static Positions = LayoverPositions;

  /**
   * The horizontal anchor enum.
   */
  static HorizontalAnchors = HorizontalAnchors;

  /**
   * The vertical anchor enum.
   */
  static VerticalAnchors = VerticalAnchors;

  static propTypes = {
    /**
     * A id to give the layover itself. This is generally recommended for accessibility. If the
     * child does not have an id, the child will automatically be updated to be `${id}-layover`.
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the layover.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the layover.
     */
    className: PropTypes.string,

    /**
     * Boolean if the layover's child is currently visible.
     */
    visible: PropTypes.bool.isRequired,

    /**
     * This should either be a single element or two elements that the layover recalculates
     * its fixed position when scrolling for horizontal and vertical.
     *
     * When it is a single element, it will recalculate for both horizontal and vertical
     * scrolling. Otherwise, you can specify the element for horizontal scrolling and a
     * separate element for vertical scrolling. If one is omitted, it will default to `window`.
     *
     * If the component is no longer considered to be in view after scrolling, the `onClose`
     * prop will be called.
     */
    fixedTo: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.shape({
        x: PropTypes.object,
        y: PropTypes.object,
      }),
    ]).isRequired,

    /**
     * The renderable item that causes the Layover to become visible. This _should_
     * most likely be an `element` or `arrayOf(element)`, but anything is allowed.
     */
    toggle: PropTypes.node,

    /**
     * Since the `toggle` prop can be anything, I need a way to be able to find an
     * element to base all the calculations on. This can either be a string that
     * gets passed to `layover.querySelector`, a DOM Element, or a function that
     * returns a DOM Element.
     */
    toggleQuery: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,

    /**
     * A single child that should be fixed to the toggle element.
     */
    children: PropTypes.element.isRequired,

    /**
     * Boolean if the Layover should be displayed as a block instead of as an inline block.
     */
    block: PropTypes.bool,

    /**
     * Boolean if the `children` should be centered horizontally and vertically while keeping
     * its height in mind as well. This is *only* valid if both the x and y `anchor` targets
     * are `CENTER`.
     */
    centered: PropTypes.bool,

    /**
     * Boolean if the layover should gain the `md-full-width` class name.
     */
    fullWidth: PropTypes.bool,

    /**
     * Boolean if the width of the children should be updated automatically to be the width
     * of the toggle element.
     */
    sameWidth: PropTypes.bool,

    /**
     * A function used to hide the visibility of the children when the children are no longer
     * visible or an element outside of the layover is clicked.
     */
    onClose: PropTypes.func.isRequired,

    /**
     * The component to render the Layover as.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * The transition name to use for the children appearing/disappearing.
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The transition duration for the enter animation. The animation can be disabled by setting
     * this value to 0.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition duration for the leave animation. The animation can be disabled by setting
     * this value to 0.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * This is a threshold that is used to calculate if the `children` is still in
     * view by applying this multiplier to the `children`'s width.
     */
    xThreshold: PropTypes.number.isRequired,

    /**
     * This is a threshold that is used to calculate if the `children` is still in
     * view by applying this multiplier to the `toggle`'s height.
     */
    yThreshold: PropTypes.number.isRequired,

    /**
     * Boolean if the `children` should be hidden when an element outside
     * of the `Layout` component has been clicked.
     */
    closeOnOutsideClick: PropTypes.bool.isRequired,

    /**
     * This is how the children get "anchored" to the `toggle` element and how the
     * auto-fix attempts will be made. Right now, the auto fixes will only be handled
     * on viewport boundaries instead of `fixedTo` boundaries. It was too hard for
     * first attempt.
     *
     * The general behavior will be that an equal-opposite of an anchor will be chosen
     * when that direction is out of viewport. So for example, the children are out
     * of viewport for the right of the screen, and the `anchor.x` value is
     * `Layover.HorizontalPositions.RIGHT`, the children will be swapped to be the `LEFT`
     * of the `toggle` component now.
     *
     * So a full list:
     * - `LEFT` / `RIGHT`
     * - `INNER_LEFT` / `INNER_RIGHT`
     * - `TOP` / `BOTTOM`
     *
     * The `CENTER` and `OVERLAP` positions can not be automatically adjusted.
     *
     * > To be safe, you should use the enum values for the `x` and `y` values.
     *
     * ```
     * Layover.HorizontalAnchors.LEFT
     * Layover.HorizontalAnchors.INNER_LEFT
     * Layover.HorizontalAnchors.CENTER
     * Layover.HorizontalAnchors.RIGHT
     * Layover.HorizontalAnchors.INNER_RIGHT
     *
     * Layover.VerticalAnchors.TOP
     * Layover.VerticalAnchors.CENTER
     * Layover.VerticalAnchors.OVERLAP
     * Layover.VerticalAnchors.BOTTOM
     * ```
     */
    anchor: PropTypes.shape({
      x: PropTypes.oneOf([
        HorizontalAnchors.LEFT,
        HorizontalAnchors.INNER_LEFT,
        HorizontalAnchors.CENTER,
        HorizontalAnchors.RIGHT,
        HorizontalAnchors.INNER_RIGHT,
      ]).isRequired,
      y: PropTypes.oneOf([
        VerticalAnchors.TOP,
        VerticalAnchors.CENTER,
        VerticalAnchors.OVERLAP,
        VerticalAnchors.BOTTOM,
      ]).isRequired,
    }).isRequired,

    /**
     * This is the position that the children should animate from. It directly ties into
     * the `$md-layover-child-positions` Sass variable.
     */
    animationPosition: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([
        LayoverPositions.TOP_LEFT,
        LayoverPositions.TOP_RIGHT,
        LayoverPositions.BOTTOM_LEFT,
        LayoverPositions.BOTTOM_RIGHT,
        LayoverPositions.BELOW,
      ]),
    ]).isRequired,

    /**
     * If you  would the the layover to interact as a context menu, provide this prop. It will
     * make the children appear relative to the context menu origin automatically.
     *
     * @see {@link #preventContextMenu}
     */
    onContextMenu: PropTypes.func,

    /**
     * Boolean if the default behavior of the context menu should be prevented when using the
     * `onContextMenu` prop.
     *
     * @see {@link #onContextMenu}
     */
    preventContextMenu: PropTypes.bool,
  };

  static defaultProps = {
    anchor: {
      x: Layover.HorizontalAnchors.INNER_LEFT,
      y: Layover.VerticalAnchors.OVERLAP,
    },
    animationPosition: LayoverPositions.BELOW,
    component: 'div',
    fixedTo: window,
    toggleQuery: '.md-text-field-container,button,*[role="button"]',
    transitionName: 'md-layover',
    transitionEnterTimeout: 200,
    transitionLeaveTimeout: 200,
    yThreshold: 0.38,
    xThreshold: 0.38,
    closeOnOutsideClick: true,
    preventContextMenu: true,
  };

  constructor(props, context) {
    super(props, context);

    const child = React.Children.only(props.children);
    this.state = {
      below: false,
      right: false,
      styles: child.props.style,
    };

    this._lastXFix = null;
    this._lastYFix = null;
    this._initialX = null;
    this._initialY = null;
    this._initialTop = null;
    this._initialLeft = null;
    this._childLeft = null;
    this._childRight = null;

    this._init = this._init.bind(this);
    this._attemptFix = this._attemptFix.bind(this);
    this._handleTick = this._handleTick.bind(this);
    this._initialFix = this._initialFix.bind(this);
    this._fixateChild = this._fixateChild.bind(this);
    this._setContainer = this._setContainer.bind(this);
    this._mergeStyles = this._mergeStyles.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._handleContextMenu = this._handleContextMenu.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  componentWillReceiveProps({ fixedTo, visible, anchor, children, sameWidth, centered }) {
    const visibileDiff = visible !== this.props.visible;
    const childStyle = React.Children.only(children).props.style;

    if (!visibileDiff && fixedTo !== this.props.fixedTo && visible && !this._inFixed) {
      this._manageFixedToListener(this.props.fixedTo, false);
      this._manageFixedToListener(fixedTo, true);
    } else if (visibileDiff && visible) {
      const rect = this._contextRect || this._toggle.getBoundingClientRect();
      if (this._dialog) {
        this._manageFixedToListener(this._dialog, true);
      } else if (!this._inFixed) {
        this._manageFixedToListener(fixedTo, true);
      }

      this._init(fixedTo, anchor, sameWidth, centered, rect);
    } else if (visibileDiff && !visible && !this._inFixed) {
      if (this._dialog) {
        this._manageFixedToListener(this._dialog, false);
      }
      this._manageFixedToListener(fixedTo, false);
    } else if (childStyle !== React.Children.only(this.props.children).props.style) {
      // Re-merge styles...
      this.setState({ styles: { ...this.state.styles, ...childStyle } });
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, closeOnOutsideClick } = this.props;
    if (visible !== prevProps.visible && closeOnOutsideClick) {
      window[`${visible ? 'add' : 'remove'}EventListener`]('click', this._handleOutsideClick);
    } else if (closeOnOutsideClick !== prevProps.closeOnOutsideClick && visible) {
      window[`${closeOnOutsideClick ? 'add' : 'remove'}EventListener`]('click', this._handleOutsideClick);
    }
  }

  componentWillUnmount() {
    if (this.props.visible) {
      this._manageFixedToListener(this.props.fixedTo, false);
      window.removeEventListener('click', this._handleOutsideClick);
    }
  }

  _createStyles(anchor, centered, child, rect) {
    const { x, y } = anchor;
    const { offsetWidth, offsetHeight } = child;

    let left;
    let top;
    if (x === HorizontalAnchors.CENTER) {
      const { left: childLeft } = child.getBoundingClientRect();
      left = (childLeft + (rect.width / 2) - (offsetWidth / 2));
    } else if (x === HorizontalAnchors.INNER_RIGHT) {
      left = rect.right - offsetWidth;
    } else if (x === HorizontalAnchors.LEFT) {
      left = rect.left - offsetWidth;
    }

    if (centered && x === HorizontalAnchors.CENTER && y === VerticalAnchors.CENTER) {
      top = rect.top - (offsetHeight / 2) + (rect.height / 2);
    } else if (y === VerticalAnchors.TOP) {
      top = rect.top - offsetHeight;
    } else if (y === VerticalAnchors.CENTER) {
      top = rect.top + rect.height / 2;
    } else if (y === VerticalAnchors.BOTTOM) {
      top = rect.bottom;
    }

    const style = {};
    if (top) {
      style.top = top;
    }

    if (left) {
      style.left = left;
    }

    return style;
  }

  /**
   * Whew. Ok. So since the fixedTo prop can either be two elements or a single item,
   * this utility function is used to add/remove the scrolling event listeners for
   * this prop.
   *
   * When the fixedTo prop has a horizontal and/or vertical attribute, the `window`
   * will be the fallback option. If both the horizontal and vertical attributes are
   * defined, the `window` still needs to have a scroll listener to make sure it
   * doesn't go off screen.
   */
  _manageFixedToListener(fixedTo, add) {
    const listener = `${add ? 'add' : 'remove'}EventListener`;
    if (fixedTo !== window && (fixedTo.x || fixedTo.y)) {
      const { x, y } = fixedTo;
      if (x) {
        x[listener]('scroll', this._handleScroll);
      } else {
        window[listener]('scroll', this._handleScroll);
      }

      if (y) {
        y[listener]('scroll', this._handleScroll);
      } else if (!x) {
        // Only add the window event listener once
        window[listener]('scroll', this._handleScroll);
      }

      if (y && y !== window && x && x !== window) {
        window[listener]('scroll', this._handleScroll);
      }
    } else {
      fixedTo[listener]('scroll', this._handleScroll);

      if (fixedTo !== window) {
        window[listener]('scroll', this._handleScroll);
      }
    }
  }

  /**
   * This is just a simple utility function to merge the existing state styles,
   * any new styles, and the children's styles (with most precidence).
   */
  _mergeStyles(style) {
    return {
      ...this.state.styles,
      ...style,
      ...React.Children.only(this.props.children).props.style,
    };
  }

  /**
   * This initializes the popover with the default styles, and the intitial bookkeeping
   * variables to update while it is open.
   */
  _init(fixedTo, anchor, sameWidth, centered, rect) {
    const { top, left, right, height, width } = rect;
    let x;
    let y;
    if (this._dialog) {
      const scroll = getScroll(this._dialog);
      x = scroll.x;
      y = scroll.y;
    } else if (fixedTo !== window && (fixedTo.y || fixedTo.x)) {
      x = getScroll(fixedTo.x || window).x;
      y = getScroll(fixedTo.y || window).y;
    } else {
      const scroll = getScroll(fixedTo);
      x = scroll.x;
      y = scroll.y;
    }

    this._initialX = x;
    this._initialY = y;
    this._initialLeft = left;
    this._initialTop = top;

    if (anchor.x === HorizontalAnchors.INNER_RIGHT) {
      this._initialLeft = left + width;
    } else if (anchor.x === HorizontalAnchors.RIGHT) {
      this._initialLeft = right;
    }

    if (!centered) {
      this._lastYFix = anchor.y === VerticalAnchors.TOP ? 'bottom' : 'top';
    } else {
      // Centered is not fixable
      this._lastYFix = null;
    }
    if (anchor.x === HorizontalAnchors.LEFT || anchor.x === HorizontalAnchors.INNER_LEFT) {
      this._lastXFix = 'right';
    } else if (anchor.x === HorizontalAnchors.RIGHT || anchor.x === HorizontalAnchors.INNER_RIGHT) {
      this._lastXFix = 'left';
    } else {
      // Can't fix others
      this._lastXFix = null;
    }

    if (anchor.y === VerticalAnchors.BOTTOM) {
      this._initialTop = top + height;
    }

    if (fixedTo !== window && !fixedTo.y && !fixedTo.x) {
      const scroll = getScroll(window);
      this._initialWinX = scroll.x;
      this._initialWinY = scroll.y;
    }

    const styles = this._mergeStyles({
      left: this._initialLeft,
      top: this._initialTop,
      transformOrigin: undefined,
      width: sameWidth ? width : undefined,
    });

    this.setState({ styles });
  }

  _setContainer(container) {
    this._container = findDOMNode(container);
    this._toggle = null;
    if (this._container) {
      const { toggleQuery } = this.props;
      if (typeof toggleQuery === 'function') {
        this._toggle = toggleQuery();
      } else if (typeof toggleQuery === 'string') {
        this._toggle = this._container.querySelector(toggleQuery);
      } else {
        this._toggle = toggleQuery;
      }
    }

    if (this._container) {
      let node = this._container;
      while (node) {
        const fixed = window.getComputedStyle(node).position === 'fixed';
        if (fixed && node.classList.contains('md-dialog--full-page')) {
          this._dialog = node;
          return;
        } else if (fixed && !node.classList.contains('md-layover-child')) {
          this._inFixed = true;
          return;
        }

        node = node.offsetParent;
      }
    }
  }

  /**
   * Attempts to fix the child by setting it's location ONLY for the entire
   * page viewport. I didn't bother attempting to fix it for additional fixedTo
   * stuff.
   */
  _initialFix() {
    // Need to make a clone that disables any transitions to calculate positioning stuff
    const clone = this._child.cloneNode(true);
    clone.style.webkitTransform = 'none';
    clone.style.transfrom = 'none';
    clone.style.webkitTransition = 'none';
    clone.style.transition = 'none';

    this._child.parentNode.appendChild(clone);
    const vp = viewport(clone);
    this._child.parentNode.removeChild(clone);

    if (vp === true || !this._toggle || !this._child) {
      return;
    }

    const { x, y } = this.props.anchor;
    const { offsetHeight: childHeight, offsetWidth: childWidth } = this._child;
    let toggleHeight;
    let toggleWidth;
    if (this._contextRect) {
      toggleHeight = this._contextRect.height;
      toggleWidth = this._contextRect.width;
    } else {
      toggleHeight = this._toggle.offsetHeight;
      toggleWidth = this._toggle.offsetWidth;
    }

    let addToTop = 0;
    let addToLeft = 0;
    if (!vp.top || !vp.bottom) {
      const multiplier = vp.top ? -1 : 1;
      if (!vp.bottom && y === VerticalAnchors.OVERLAP) {
        addToTop += toggleHeight;
      } else if (y === VerticalAnchors.TOP || y === VerticalAnchors.BOTTOM) {
        addToTop += (multiplier * toggleHeight);
      }

      addToTop += (multiplier * childHeight);

      this._lastYFix = vp.top ? 'bottom' : 'top';
    }

    if (x !== HorizontalAnchors.CENTER && (!vp.left || !vp.right)) {
      if (!vp.left && x === HorizontalAnchors.LEFT) {
        addToLeft += toggleWidth + childWidth;
        this._lastXFix = 'left';
      } else if (!vp.left && x === HorizontalAnchors.INNER_LEFT) {
        addToLeft += toggleWidth;
        this._lastXFix = 'left';
      } else if (!vp.right && x === HorizontalAnchors.RIGHT) {
        addToLeft -= (toggleWidth + childWidth);
        this._lastXFix = 'right';
      } else if (!vp.right && x === HorizontalAnchors.INNER_RIGHT) {
        addToLeft -= toggleWidth;
        this._lastXFix = 'right';
      }
    }


    if (addToTop !== 0 || addToLeft !== 0) {
      this._initialTop += addToTop;
      this._initialLeft += addToLeft;

      this.setState({ styles: this._mergeStyles({ top: this._initialTop, left: this._initialLeft }) });
    }
  }

  /**
   * When the child is initially mounted, it will update the styles for centering
   * the element (if enabled) and then attempt to fix any viewport issues.
   */
  _fixateChild(child) {
    this._child = findDOMNode(child);

    if (this._child !== null) {
      const { children, anchor, centered } = this.props;
      this._childComponent = React.Children.only(children);

      // If child also has a ref callback, simulate the same thing
      if (typeof this._childComponent.ref === 'function') {
        this._childComponent.ref(child);
      }

      if (!this._child || (!this._toggle && !this._contextRect)) {
        return;
      }

      const rect = this._contextRect || this._toggle.getBoundingClientRect();
      const styles = this._createStyles(anchor, centered, this._child, rect);
      if (styles.top || styles.left) {
        this._initialLeft = styles.left || this._initialLeft;
        this._initialTop = styles.top || this._initialTop;
        this.setState({ styles: this._mergeStyles(styles) }, this._initialFix);
      } else {
        this._initialFix();
      }
    } else if (this._childComponent && typeof this._childComponent.ref === 'function') {
      this._childComponent.ref(child);
    }
  }

  _handleScroll() {
    if (!this._ticking) {
      requestAnimationFrame(this._handleTick);
    }

    this._ticking = true;
  }

  /**
   * This is the meat of the stuff. Do lots of viewport / container checks to make sure
   * the element should still be visible. If it is still visible, it will update its
   * x and y position for the new scroll position.
   */
  _handleTick() {
    const { fixedTo, centered, xThreshold, yThreshold } = this.props;
    const vp = viewport(this._child);
    if (vp !== true) {
      const fixed = !this._contextRect && this._attemptFix(vp);
      if (!fixed) {
        this.props.onClose();
        this._ticking = false;
      }

      return;
    } else if (
      isOutOfBounds(fixedTo, this._child, this._toggle, centered, yThreshold, xThreshold)
    ) {
      this.props.onClose();
      this._ticking = false;
      return;
    }

    let x;
    let y;
    if (this._dialog) {
      const scroll = getScroll(this._dialog);
      x = scroll.x;
      y = scroll.y;
    } else if (fixedTo !== window && (fixedTo.x || fixedTo.y)) {
      x = getScroll(fixedTo.x || window).x;
      y = getScroll(fixedTo.y || window).y;
    } else {
      const scroll = getScroll(fixedTo);
      x = scroll.x;
      y = scroll.y;
    }

    let winX;
    let winY;
    // When using the additional fixedTo stuff, need to also keep track of the entire
    // window's scrolling..
    if (fixedTo !== window && !fixedTo.x && !fixedTo.y) {
      const scroll = getScroll(window);
      winX = scroll.x;
      winY = scroll.y;
    }

    const { styles } = this.state;
    let { left, top } = styles;
    if (this._initialX !== x) {
      left = (this._initialX - x) + this._initialLeft;
    }

    if (winX && this._initialWinX !== winX) {
      left = (this._initialWinX - winX) + this._initialX;
    }

    if (this._initialY !== y) {
      top = (this._initialY - y) + this._initialTop;
    }

    if (winY && this._initialWinY !== winY) {
      top = (this._initialWinY - winY) + this._initialTop + (this._initialY - y);
    }

    if (styles.top !== top || styles.left !== left) {
      this.setState({ styles: this._mergeStyles({ left, top }) }, () => {
        this._ticking = false;
      });
    } else {
      this._ticking = false;
    }
  }

  _handleOutsideClick(e) {
    if (
      (this._contextRect && this._child && !this._child.contains(e.target)) ||
      (this._container && !this._container.contains(e.target))
    ) {
      this.props.onClose(e);
    }
  }

  /**
   * Attempts to fix a viewport problem by swapping the positioning. This only does
   * vertical switching right now.
   *
   * @param {Object} vp - The result of the viewport function
   * @return {boolean} true if the fix was able to be done and successful.
   */
  _attemptFix(vp) {
    const { x, y } = this.props.anchor;
    const centered = x === HorizontalAnchors.CENTER && y === VerticalAnchors.CENTER && this.props.centered;
    if (centered || (this._lastYFix === 'top' && !vp.top) || (this._lastYFix === 'bottom' && !vp.bottom)) {
      return false;
    }

    const { top } = this._child.getBoundingClientRect();
    const { offsetHeight: childHeight } = this._child;
    const { offsetHeight: toggleHeight } = this._toggle;
    let newTop = this._initialTop;
    let addToTop = childHeight * (vp.top ? -1 : 1);
    if (y === VerticalAnchors.OVERLAP) {
      addToTop += ((vp.top ? 1 : -1) * toggleHeight);
    } else if (y === VerticalAnchors.TOP || y === VerticalAnchors.BOTTOM) {
      addToTop += ((this._lastYFix === 'top' ? -1 : 1) * toggleHeight);
    }

    if (addToTop !== 0) {
      newTop = top + addToTop;
      this._lastYFix = vp.top ? 'bottom' : 'top';
    }

    if (newTop !== this._initialTop) {
      this._initialTop = newTop;
      const { fixedTo } = this.props;
      let scrollEl = fixedTo;
      if (fixedTo !== window && (fixedTo.y || fixedTo.x)) {
        scrollEl = fixedTo.y || window;
      }

      this._initialY = getScroll(scrollEl).y;

      this.setState({ styles: this._mergeStyles({ top: this._initialTop }) }, () => {
        this._ticking = false;
      });
      return true;
    }

    return false;
  }

  _handleContextMenu(e) {
    const { onContextMenu, preventContextMenu, fixedTo, anchor, sameWidth, centered, visible } = this.props;
    if (!onContextMenu) {
      return;
    }

    this._contextRect = getSelectedTextPosition(e);
    if (preventContextMenu && (!this._child || !this._child.contains(e.target))) {
      e.preventDefault();
    }

    // If this isn't done, firefox immediate closes the context menu. :/
    captureNextEvent('click');
    onContextMenu(e);
    if (visible) {
      this._init(fixedTo, anchor, sameWidth, centered, this._contextRect);
    }
  }

  render() {
    const {
      className,
      block,
      toggle,
      visible,
      children,
      fullWidth,
      animationPosition,
      /* eslint-disable no-unused-vars */
      anchor,
      onClose,
      sameWidth,
      centered,
      fixedTo,
      toggleQuery,
      yThreshold,
      xThreshold,
      onContextMenu,
      preventContextMenu,
      closeOnOutsideClick,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let child;
    let childId;
    if (visible) {
      child = React.Children.only(children);
      if (child.props.id) {
        childId = child.props.id;
      } else if (props.id) {
        childId = `${props.id}-layover`;
      }

      child = React.cloneElement(children, {
        ref: this._fixateChild,
        id: childId,
        style: this.state.styles,
        className: cn(`md-layover-child md-layover-child--${animationPosition}`, child.props.className),
      });
    }

    return (
      <CSSTransitionGroup
        {...props}
        className={cn('md-layover', {
          'md-inline-block': !block && !fullWidth,
          'md-full-width': fullWidth,
        }, className)}
        ref={this._setContainer}
        aria-haspopup
        aria-owns={childId}
        aria-expanded={visible}
        transitionEnter={props.transitionEnterTimeout !== 0}
        transitionLeave={props.transitionLeaveTimeout !== 0}
        onContextMenu={this._handleContextMenu}
      >
        {toggle}
        {child}
      </CSSTransitionGroup>
    );
  }
}
