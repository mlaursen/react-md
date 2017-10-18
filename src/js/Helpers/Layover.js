import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import cn from 'classnames';

import handleWindowClickListeners from '../utils/EventUtils/handleWindowClickListeners';
import getSelectedTextPosition from '../utils/Positioning/getSelectedTextPosition';
import getScroll from '../utils/Positioning/getScroll';
import viewport from '../utils/Positioning/viewport';
import isOutOfBounds from '../utils/Positioning/isOutOfBounds';
import anchorShape from './anchorShape';
import fixedToShape from './fixedToShape';
import positionShape from './positionShape';
import HorizontalAnchors from './HorizontalAnchors';
import VerticalAnchors from './VerticalAnchors';
import Positions from './Positions';
import ResizeObserver from './ResizeObserver';

/**
 * The Layover component is used to keep a component fixed to another component
 * while the page is scrolling or a container is scrolling. When the fixed component
 * is considered out of view, it will be closed.
 *
 * > NOTE: Don't look at source code. Plz.
 */
export default class Layover extends PureComponent {
  static HorizontalAnchors = HorizontalAnchors;
  static VerticalAnchors = VerticalAnchors;
  static Positions = Positions;

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
    fixedTo: fixedToShape.isRequired,

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
     * The minimum value the `left` style can be for the child component. This is really just used
     * to make sure it doesn't scroll off the left of the page. It can also be used to make
     * full screen layovers on devices when when the `fillViewportWidth` prop is enabled.
     *
     * This can either be a number of pixels or a string for percentages. If this value is a string
     * **it will always be used over the calculated values** so it is preferred to use a number.
     *
     * @see {@link #minRight}
     * @see {@link #fillViewportWidth}
     */
    minLeft: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    /**
     * The minimum value the `right` style can be for the child component. This is really just used
     * to make sure it doesn't scroll off the right of the page when the `fillViewportWidth` prop is
     * enabled.
     *
     * This can either be a number of pixels or a string for percentages. If this value is a string
     * **it will always be used over the calculated values** so it is preferred to use a number.
     *
     * @see {@link #minLeft}
     * @see {@link #fillViewportWidth}
     */
    minRight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    /**
     * The minimum value that can be used for the `bottom` prop when the `fillViewportHeight` prop is enabled.
     * It is generally recommended to keep this value at `0` to keep it stretched to the bottom of the viewport
     * or setting it to a small positive number to add some padding.
     *
     * This can either be a number of pixels or a string for percentages. If this value is a string
     * **it will always be used over the calculated values** so it is preferred to use a number.
     *
     * @see {@link #fillViewportHeight}
     */
    minBottom: PropTypes.number.isRequired,

    /**
     * Boolean if the layover should make the child fill the entire viewport's width. This will just
     * style the child element with:
     *
     * ```js
     * childStyle = {
     *   left: this.props.minLeft,
     *   right: this.props.minRight,
     * };
     * ```
     *
     * If you add any additional constraints such as `width` or `max-width`, it will not span the entire viewport's
     * width. This prop should generally really only be used on mobile devices. Using this prop along with
     * `fillViewportHeight` for Autocompletes can create great Android mobile searches. See the `fillViewportHeight`
     * for more information about why it is *only Android*.
     *
     * @see {@link #minLeft}
     * @see {@link #minRight}
     * @see {@link #fillViewportHeight}
     */
    fillViewportWidth: PropTypes.bool,

    /**
     * Boolean if the layover should fill the height of the viewport from the current calculated `top`. This will just
     * style the child element with:
     *
     * ```js
     * childStyle = {
     *   top: currentCalculatedTop,
     *   bottom: this.props.minBottom,
     *   maxHeight: 'none',
     * };
     * ```
     *
     * This is *super* nice on Android devices since it will allow you to create nice toolbar search autocompletes
     * in your app and the list of items will grow until it reaches the soft keyboard. It isn't as nice on iOS since
     * iOS does not subtract the soft keyboard from the viewport's size so the list will still extend to the bottom
     * of the page.
     *
     * @see {@link #minBottom}
     * @see {@link #fillViewportWidth}
     */
    fillViewportHeight: PropTypes.bool,

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
     * @see {@link #VerticalAnchors}
     * @see {@link #HorizontalAnchors}
     */
    anchor: anchorShape.isRequired,

    /**
     * This is how the children get "anchored" when the `animationPositions` is set to `Layover.Positions.BELOW`.
     * Set this to `null` to continue using the base `anchor` prop instead of switching to this anchor.
     *
     * @see {@link #anchor}
     */
    belowAnchor: anchorShape,

    /**
     * This is the position that the children should animate from. It directly ties into
     * the `$md-layover-child-positions` Sass variable.
     */
    animationPosition: positionShape.isRequired,

    /**
     * If you would like the layover to interact as a context menu, provide this prop. It will
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

    /**
     * Boolean if the layover should attempt to automatically adjust the position of the element to
     * keep it within the viewport. If this value is set to `false`, the `onClose` prop will be called
     * instead.
     */
    repositionOnScroll: PropTypes.bool,

    /**
     * Boolean if the layover should attempt to automatically adjust the position of the element to
     * keep it within the viewport. If this value is set to `false`, the `onClose` prop will be called
     * instead.
     */
    repositionOnResize: PropTypes.bool,

    /**
     * Boolean if the layover should become "simplified". This basically disables all the logic for
     * keeping the child within the viewport and allows you to manage all the positioning via CSS.
     *
     * When this is enabled, it updates the `Layover` to have `position: relative` while the child will
     * have `position: absolute` which will allow for simple `top`, `right`, `bottom`, and/or `left` CSS
     * to position as wanted.
     *
     * This is really only helpful in cases where the layover can't calculate things correctly due to
     * being in fixed containers somewhere in the page or some other weird stuff. Hopefully this won't
     * really need to be used much.
     */
    simplified: PropTypes.bool,
  };

  static defaultProps = {
    anchor: {
      x: Layover.HorizontalAnchors.INNER_LEFT,
      y: Layover.VerticalAnchors.OVERLAP,
    },
    belowAnchor: {
      x: Layover.HorizontalAnchors.CENTER,
      y: Layover.VerticalAnchors.BOTTOM,
    },
    animationPosition: Layover.Positions.BELOW,
    repositionOnScroll: true,
    repositionOnResize: false,
    component: 'div',
    fixedTo: typeof window !== 'undefined' ? window : {},
    toggleQuery: '.md-text-field-container,button,*[role="button"],*[role="listbox"]',
    transitionName: 'md-layover',
    transitionEnterTimeout: 200,
    transitionLeaveTimeout: 200,
    yThreshold: 0.38,
    xThreshold: 0.38,
    closeOnOutsideClick: true,
    preventContextMenu: true,
    simplified: false,
    minLeft: 0,
    minRight: 0,
    minBottom: 0,
    fillViewportWidth: false,
    fillViewportHeight: false,
  };

  constructor(props) {
    super();

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
    this._child = null;
    this._toggle = null;
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('load', () => {
        this._setContainer(this._container);
      });
    }

    const { visible, fixedTo, sameWidth, centered, simplified } = this.props;
    const anchor = this._getAnchor(this.props);
    if (visible) {
      handleWindowClickListeners(this._handleOutsideClick, true);

      // Don't worry about any of the other logic for a "simple" layover
      if (simplified) {
        return;
      }

      const rect = this._contextRect || this._toggle.getBoundingClientRect();
      if (this._dialog) {
        this._manageFixedToListener(this._dialog, true);
      } else if (!this._inFixed) {
        this._manageFixedToListener(fixedTo, true);
      }

      this._init(fixedTo, anchor, sameWidth, centered, rect);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fixedTo, visible, children, sameWidth, centered, simplified } = nextProps;
    if (simplified) {
      if (this.props.simplified !== simplified) {
        this._reset();
      }
      return;
    }

    const anchor = this._getAnchor(nextProps);
    const visibileDiff = visible !== this.props.visible;
    const childStyle = React.Children.only(children).props.style;

    if (visibileDiff) {
      if (!visible) {
        this._reset();
      } else {
        // Initialize the layover logic
        const rect = this._contextRect || this._toggle.getBoundingClientRect();
        if (this._dialog) {
          this._manageFixedToListener(this._dialog, true);
        } else if (!this._inFixed) {
          this._manageFixedToListener(fixedTo, true);
        }

        this._init(fixedTo, anchor, sameWidth, centered, rect);
      }
    } else if (fixedTo !== this.props.fixedTo && visible) {
      // swap the fixedTo listeners
      this._manageFixedToListener(this.props.fixedTo, false);
      this._manageFixedToListener(fixedTo, true);
    } else if (childStyle !== React.Children.only(this.props.children).props.style) {
      // Re-merge styles... This is only required if all the others fail since all the other
      // logic always merges styles with the children styles
      this.setState({ styles: { ...this.state.styles, ...childStyle } });
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, closeOnOutsideClick } = this.props;
    const enabled = visible && closeOnOutsideClick;
    const prevEnabled = prevProps.visible && prevProps.closeOnOutsideClick;
    if (enabled !== prevEnabled) {
      if (this._clickTimeout) {
        clearTimeout(this._clickTimeout);
        this._clickTimeout = null;
      }

      // This is really an arbitrary timeout time, but firefox needs to have a timeout
      // so the context menu doesn't close automatically due to an "outside click" being
      // triggered
      this._clickTimeout = setTimeout(() => {
        this._clickTimeout = null;
        handleWindowClickListeners(this._handleOutsideClick, enabled);
      }, enabled ? 300 : 0);
    }
  }

  componentWillUnmount() {
    if (this._clickTimeout) {
      clearTimeout(this._clickTimeout);
      this._clickTimeout = null;
    }
    handleWindowClickListeners(this._handleOutsideClick, false);

    if (!this.props.simplified) {
      this._manageFixedToListener(this.props.fixedTo, false);
      this._manageWindowResizeListener(false);
    }
  }

  _getAnchor({ anchor, belowAnchor, animationPosition }) {
    return animationPosition === Layover.Positions.BELOW && belowAnchor || anchor;
  }

  _isCenteredDialog = () => this._dialog && this._dialog.classList.contains('md-dialog--centered');

  _createStyles = (anchor, centered, child, rect) => {
    const { x, y } = anchor;
    const { offsetWidth, offsetHeight } = child;

    let left;
    let top;
    if (x === HorizontalAnchors.CENTER) {
      left = rect.left + (rect.width / 2) - (offsetWidth / 2);
    } else if (x === HorizontalAnchors.INNER_RIGHT) {
      left = rect.right - offsetWidth;
    } else if (x === HorizontalAnchors.LEFT) {
      left = rect.left - offsetWidth;
    } else if (x === HorizontalAnchors.RIGHT) {
      left = rect.right;
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

    if (this._isCenteredDialog()) {
      const dialogRect = this._dialog.getBoundingClientRect();
      left -= dialogRect.left;
      top -= dialogRect.top;
    }

    const style = {};
    if (top) {
      style.top = top;
    }

    if (left) {
      style.left = left;
    }

    return style;
  };

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
  _manageFixedToListener = (fixedTo, add) => {
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
  };

  _manageWindowResizeListener = (enabled) => {
    if (this._windowResizeTimeout) {
      clearTimeout(this._windowResizeTimeout);
      this._windowResizeTimeout = null;
    }

    if (enabled) {
      // add a 2 second delay before watching resize events since Android soft keyboards trigger a resize event.
      this._windowResizeTimeout = setTimeout(() => {
        this._windowResizeTimeout = null;
        window.addEventListener('resize', this._handleWindowResize);
      }, 2000);
    } else {
      window.removeEventListener('resize', this._handleWindowResize);
    }
  };

  /**
   * This is just a simple utility function to merge the existing state styles,
   * any new styles, and the children's styles (with most precedence).
   */
  _mergeStyles = (style) => {
    const {
      minLeft,
      minRight,
      minBottom,
      fillViewportWidth,
      fillViewportHeight,
    } = this.props;
    if (fillViewportWidth) {
      style.left = minLeft;
      style.right = minRight;
    } else {
      if (style.left) {
        style.left = Math.max(minLeft, style.left);
      }

      if (style.right) {
        style.right = Math.max(minRight, style.right);
      }
    }

    if (fillViewportHeight) {
      style.bottom = minBottom;
      style.maxHeight = 'none';
    } else {
      // These styles are only created when filling the viewport height, so clear
      // them out again
      style.bottom = null;
      style.maxHeight = null;
    }

    return {
      ...this.state.styles,
      ...style,
      ...React.Children.only(this.props.children).props.style,
    };
  };

  /**
   * This initializes the popover with the default styles, and the initial bookkeeping
   * variables to update while it is open.
   */
  _init = (fixedTo, anchor, sameWidth, centered, rect) => {
    if (this._child) {
      // The init function can be called again if the user quickly toggles the layover. If that
      // is the case, we want the styles that were set after the _positionChild _attemptFix.
      return;
    }

    const { height, width } = rect;
    let { top, left, right } = rect;
    let x;
    let y;
    if (this._dialog) {
      const scroll = getScroll(this._dialog);
      x = scroll.x;
      y = scroll.y;

      if (this._isCenteredDialog()) {
        const dialogRect = this._dialog.getBoundingClientRect();
        left -= dialogRect.left;
        top -= dialogRect.top;
        right -= dialogRect.right;
      }
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
  };

  _reset = ({ fixedTo } = this.props) => {
    // Reset all the bookkeeping variables for a fresh start on re-visible
    this._lastXFix = null;
    this._lastYFix = null;
    this._initialX = null;
    this._initialY = null;
    this._initialTop = null;
    this._initialLeft = null;

    if (!this._inFixed) {
      if (this._dialog) {
        this._manageFixedToListener(this._dialog, false);
      }

      this._manageFixedToListener(fixedTo, false);
    }
  };

  _setContainer = (container) => {
    this._container = findDOMNode(container);
    this._toggle = null;
    if (!this._container) {
      return;
    }

    const { toggleQuery, onContextMenu } = this.props;
    if (typeof toggleQuery === 'function') {
      this._toggle = toggleQuery();
    } else if (typeof toggleQuery === 'string') {
      this._toggle = this._container.querySelector(toggleQuery);
    } else {
      this._toggle = toggleQuery;
    }

    if (!this._toggle && !onContextMenu && process.env.NODE_ENV !== 'production') {
      const error = new Error(
        'Unable to find a toggle component with the provided `toggleQuery` and `toggle` element. \n' +
        `\`toggleQuery\`: \`${toggleQuery}\``
      );
      error.toggleQuery = toggleQuery;
      error.toggle = this.props.toggle;

      throw error;
    }

    let node = this._container;
    while (node) {
      const fixed = window.getComputedStyle(node).position === 'fixed';
      if (fixed && node.className.match(/md-dialog--(full-page|centered)/)) {
        this._dialog = node;
        return;
      } else if (fixed && !node.classList.contains('md-layover-child')) {
        this._inFixed = true;
        return;
      }

      node = node.offsetParent;
    }
  };

  /**
   * Attempts to fix the child by setting it's location ONLY for the entire
   * page viewport. I didn't bother attempting to fix it for additional fixedTo
   * stuff.
   */
  _initialFix = () => {
    // Need to make a clone that disables any transitions to calculate positioning stuff
    const clone = this._child.cloneNode(true);
    clone.style.webkitTransform = 'none';
    clone.style.transfrom = 'none';
    clone.style.webkitTransition = 'none';
    clone.style.transition = 'none';

    this._child.parentNode.appendChild(clone);
    const vp = viewport(clone);
    const { offsetHeight: childHeight, offsetWidth: childWidth } = clone;
    this._child.parentNode.removeChild(clone);

    if (vp === true || !this._toggle || !this._child) {
      return;
    }

    const { x, y } = this._getAnchor(this.props);
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

    // Android devices will never get this far because they consider the keyboard as part
    // of the viewport, iOS will and cause it to be a giant negative number. *sigh*
    // Prevent any additional vertical positioning for iOS
    if (!this.props.fillViewportHeight && (!vp.top || !vp.bottom)) {
      const multiplier = vp.top ? -1 : 1;
      if (!vp.bottom && y === VerticalAnchors.OVERLAP) {
        addToTop += toggleHeight;
      } else if (y === VerticalAnchors.TOP || y === VerticalAnchors.BOTTOM) {
        addToTop += (multiplier * toggleHeight);
      }

      addToTop += (multiplier * childHeight);

      this._lastYFix = vp.top ? 'bottom' : 'top';
    }

    if (!this.props.fillViewportWidth && x !== HorizontalAnchors.CENTER && (!vp.left || !vp.right)) {
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
  };

  /**
   * When the child is initially mounted, it will update the styles for centering
   * the element (if enabled) and then attempt to fix any viewport issues.
   */
  _fixateChild = (child) => {
    this._child = findDOMNode(child);

    if (this._child !== null) {
      this._childComponent = React.Children.only(this.props.children);

      // If child also has a ref callback, simulate the same thing
      if (typeof this._childComponent.ref === 'function') {
        this._childComponent.ref(child);
      }

      if (this.props.simplified || !this._child || (!this._toggle && !this._contextRect)) {
        return;
      }

      if (this._dialog && this._dialog.classList.contains('md-dialog--centered')) {
        return;
      }

      this._manageWindowResizeListener(true);
      this._positionChild();
    } else if (this._childComponent && typeof this._childComponent.ref === 'function') {
      this._childComponent.ref(child);
    }
  };

  _positionChild = () => {
    const { centered } = this.props;
    const anchor = this._getAnchor(this.props);
    const rect = this._contextRect || this._toggle.getBoundingClientRect();
    this._height = rect.height;
    this._width = rect.width;
    const styles = this._createStyles(anchor, centered, this._child, rect);
    if (styles.top || styles.left) {
      this._initialLeft = styles.left || this._initialLeft;
      this._initialTop = styles.top || this._initialTop;
      this.setState({ styles: this._mergeStyles(styles) }, this._initialFix);
    } else {
      this._initialFix();
    }
  };

  _handleResize = () => {
    if (this.props.visible) {
      this._positionChild();
    }
  };

  _handleScroll = (e) => {
    if (!this.props.repositionOnScroll) {
      this._manageFixedToListener(this.props.fixedTo, false);
      this.props.onClose(e);
    }

    if (!this._ticking) {
      requestAnimationFrame(() => this._handleTick(e));
    }

    this._ticking = true;
  };

  /**
   * This is the meat of the stuff. Do lots of viewport / container checks to make sure
   * the element should still be visible. If it is still visible, it will update its
   * x and y position for the new scroll position.
   */
  _handleTick = (e) => {
    const { fixedTo, xThreshold, yThreshold } = this.props;
    const vp = viewport(this._child);
    if (vp !== true && vp.left && vp.right) {
      const fixed = !this._contextRect && this._attemptFix(vp);
      if (!fixed) {
        this.props.onClose(e);
        this._ticking = false;
      }

      return;
    } else if (
      isOutOfBounds(fixedTo, this._child, this._toggle, yThreshold, xThreshold)
    ) {
      this.props.onClose(e);
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
  };

  _handleOutsideClick = (e) => {
    if (
      (this._contextRect && this._child && !this._child.contains(e.target)) ||
      (this._container && !this._container.contains(e.target))
    ) {
      this.props.onClose(e);
    }
  };

  _handleWindowResize = (e) => {
    const { onClose, repositionOnResize } = this.props;
    if (repositionOnResize) {
      this._handleResize();
    } else {
      onClose(e);
      this._manageWindowResizeListener(false);
    }
  };

  /**
   * Attempts to fix a viewport problem by swapping the positioning. This only does
   * vertical switching right now.
   *
   * @param {Object} vp - The result of the viewport function
   * @return {boolean} true if the fix was able to be done and successful.
   */
  _attemptFix = (vp) => {
    const { x, y } = this._getAnchor(this.props);
    const centered = x === HorizontalAnchors.CENTER && y === VerticalAnchors.CENTER && this.props.centered;
    if (centered || (this._lastYFix === 'top' && !vp.top) || (this._lastYFix === 'bottom' && !vp.bottom)) {
      return false;
    }

    const toggleTop = this._toggle.getBoundingClientRect().top;
    const { offsetHeight: toggleHeight } = this._toggle;
    const { offsetHeight: childHeight } = this._child;

    // Can;t fix if the child can't fit on the page based on the toggle's position
    if (toggleTop + toggleHeight + childHeight > window.innerHeight) {
      return false;
    }

    const { top } = this._child.getBoundingClientRect();
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
  };

  _handleContextMenu = (e) => {
    const anchor = this._getAnchor(this.props);
    const { onContextMenu, preventContextMenu, fixedTo, sameWidth, centered, visible } = this.props;
    if (!onContextMenu) {
      return;
    }

    this._contextRect = getSelectedTextPosition(e);
    if (preventContextMenu && (!this._child || !this._child.contains(e.target))) {
      e.preventDefault();
    }

    onContextMenu(e);
    if (visible) {
      this._init(fixedTo, anchor, sameWidth, centered, this._contextRect);
    }
  };

  render() {
    const {
      className,
      block,
      toggle,
      visible,
      children,
      fullWidth,
      animationPosition,
      simplified,
      fillViewportWidth,
      fillViewportHeight,
      /* eslint-disable no-unused-vars */
      anchor,
      belowAnchor,
      onClose,
      repositionOnScroll,
      repositionOnResize,
      sameWidth,
      centered,
      fixedTo,
      toggleQuery,
      yThreshold,
      xThreshold,
      onContextMenu,
      preventContextMenu,
      closeOnOutsideClick,
      minLeft,
      minRight,
      minBottom,
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
        style: simplified ? child.props.style : this.state.styles,
        className: cn(`md-layover-child md-layover-child--${animationPosition}`, {
          'md-layover-child--simplified': simplified,
        }, child.props.className),
      });
    }

    let observer = null;
    if (!simplified && (!fillViewportWidth && !fillViewportHeight)) {
      observer = (
        <ResizeObserver
          watchWidth={!fillViewportWidth}
          watchHeight={!fillViewportHeight}
          target={this._child}
          onResize={this._handleResize}
        />
      );
    }

    return (
      <CSSTransitionGroup
        {...props}
        className={cn('md-layover', {
          'md-layover--simplified': simplified,
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
        {observer}
        {toggle}
        {child}
      </CSSTransitionGroup>
    );
  }
}
