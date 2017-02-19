import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

import getScroll from '../utils/getScroll';
import viewport from '../utils/viewport';
import LayoverPositions from '../constants/LayoverPositions';
import isOutOfBounds from '../utils/isOutOfBounds';

/**
 * The Layover component is used to keep a component fixed to another component
 * while the page is scrolling or a container is scrolling. When the fixed component
 * is considered out of view, it will be closed.
 *
 * > NOTE: Don't look at source code. Plz.
 */
export default class Layover extends PureComponent {
  static Positions = LayoverPositions;
  static propTypes = {
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
        horizontal: PropTypes.object,
        vertical: PropTypes.object,
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
     * The position that the children should be fixed to the `toggle` and the direction
     * that the children animate from.
     *
     * When the position comes from the top, the children will overlay the toggle element.
     * When the position comes from the bottom or below, the children will appear beneath
     * the toggle element.
     */
    position: PropTypes.oneOf([
      Layover.Positions.TOP_LEFT,
      Layover.Positions.TOP_RIGHT,
      Layover.Positions.BOTTOM_LEFT,
      Layover.Positions.BOTTOM_RIGHT,
      Layover.Positions.BELOW,
    ]),

    /**
     * Boolean if the Layover should be displayed as a block instead of as an inline block.
     */
    block: PropTypes.bool,

    /**
     * Boolean if the `children` should appear centered to the toggle element.
     */
    centered: PropTypes.bool,

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
     * view by applying this multiplier to the `toggle`'s height.
     */
    verticalThreshold: PropTypes.number.isRequired,

    /**
     * This is a threshold that is used to calculate if the `children` is still in
     * view by applying this multiplier to the `children`'s width.
     */
    horizontalThreshold: PropTypes.number.isRequired,

    /**
     * Boolean if the `children` should be hidden when an element outside
     * of the `Layout` component has been clicked.
     */
    closeOnOutsideClick: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    component: 'div',
    fixedTo: window,
    toggleQuery: '.md-text-field-container,button,*[role="button"]',
    position: Layover.Positions.TOP_RIGHT,
    transitionName: 'md-layover',
    transitionEnterTimeout: 200,
    transitionLeaveTimeout: 200,
    verticalThreshold: 0.38,
    horizontalThreshold: 0.38,
    closeOnOutsideClick: true,
  };

  constructor(props, context) {
    super(props, context);

    const child = React.Children.only(props.children);
    this.state = {
      below: false,
      right: false,
      styles: child.props.style,
    };

    this._lastFix = null;
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
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  componentWillReceiveProps({ fixedTo, visible, position, children, sameWidth }) {
    const visibileDiff = visible !== this.props.visible;
    const childStyle = React.Children.only(children).props.style;

    if (!visibileDiff && fixedTo !== this.props.fixedTo && visible && !this._inFixed) {
      this._manageFixedToListener(this.props.fixedTo, false);
      this._manageFixedToListener(fixedTo, true);
    } else if (visibileDiff && visible) {
      if (!this._inFixed) {
        this._manageFixedToListener(fixedTo, true);
      }

      this._init(fixedTo, position, sameWidth);
    } else if (visibileDiff && !visible && !this._inFixed) {
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
      window.addEventListener('click', this._handleOutsideClick);
    }
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
    if (fixedTo !== window && (fixedTo.horizontal || fixedTo.vertical)) {
      const { horizontal, vertical } = fixedTo;
      if (horizontal) {
        horizontal[listener]('scroll', this._handleScroll);
      } else {
        window[listener]('scroll', this._handleScroll);
      }

      if (vertical) {
        vertical[listener]('scroll', this._handleScroll);
      } else {
        window[listener]('scroll', this._handleScroll);
      }

      if (vertical && vertical !== window && horizontal && horizontal !== window) {
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
  _init(fixedTo, position, sameWidth) {
    const { offsetWidth, offsetHeight } = this._toggle;
    const { left, top } = this._toggle.getBoundingClientRect();
    let x;
    let y;
    if (fixedTo !== window && (fixedTo.vertical || fixedTo.horizontal)) {
      x = getScroll(fixedTo.horizontal || window).x;
      y = getScroll(fixedTo.vertical || window).y;
    } else {
      const scroll = getScroll(fixedTo);
      x = scroll.x;
      y = scroll.y;
    }

    const right = position === LayoverPositions.TOP_RIGHT || position === LayoverPositions.BOTTOM_RIGHT;
    const below = position === LayoverPositions.BELOW
      || position === LayoverPositions.BOTTOM_LEFT
      || position === LayoverPositions.BOTTOM_RIGHT;

    this._initialX = x;
    this._initialY = y;
    this._initialLeft = left + (right ? offsetWidth : 0);
    this._initialTop = top + (below ? offsetHeight : 0);

    if (fixedTo !== window && !fixedTo.vertical && !fixedTo.horizontal) {
      const scroll = getScroll(window);
      this._initialWinX = scroll.x;
      this._initialWinY = scroll.y;
    }

    const styles = this._mergeStyles({
      left: this._initialLeft,
      top: this._initialTop,
      transformOrigin: undefined,
      width: sameWidth ? offsetWidth : undefined,
    });

    this.setState({ styles, right, below });
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
        if (window.getComputedStyle(node).position === 'fixed' && !node.classList.contains('md-layover')) {
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
    const vp = viewport(this._child);
    if (typeof vp === 'boolean' || !this._toggle || !this._child) {
      return;
    } else if (!vp.top) {
      const { below } = this.state;
      const { offsetHeight: toggleHeight } = this._toggle;
      const { offsetHeight: childHeight } = this._child;
      this._initialTop = this._initialTop - childHeight - (below ? toggleHeight : 0);
      this._lastFix = 'bottom';
      this.setState({ styles: this._mergeStyles({ top: this._initialTop, transformOrigin: '0 100%' }) });
    } else if (!vp.right || !vp.left) {
      console.log('OFFSCREEN');
      console.log('vp.left:', vp.left);
      console.log('vp.right:', vp.right);
    }
  }

  /**
   * When the child is initially mounted, it will update the styles for centering
   * the element (if enabled) and then attempt to fix any viewport issues.
   */
  _fixateChild(child) {
    this._child = findDOMNode(child);

    if (this._child !== null) {
      this._childComponent = React.Children.only(this.props.children);

      // If child also has a ref callback, simulate the same thing
      if (typeof this._childComponent.ref === 'function') {
        this._childComponent.ref(child);
      }

      const { right } = this.state;
      if (this.props.centered) {
        const cWidth = this._child.offsetWidth / 2;
        const tWidth = this._toggle.offsetWidth / 2;
        const { left: childLeft } = this._child.getBoundingClientRect();
        const left = (childLeft + (tWidth * (right ? -1 : 1))) - cWidth;

        this._initialLeft = left;
        this.setState({ styles: this._mergeStyles({ left }) }, this._initialFix);
      } else if (right) {
        const left = this._initialLeft - this._child.offsetWidth;
        this.setState({ styles: this._mergeStyles({ left }) }, this._initialFix);
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
    const { fixedTo, centered, horizontalThreshold, verticalThreshold } = this.props;
    const vp = viewport(this._child);
    if (vp !== true) {
      const fixed = this._attemptFix(vp);
      if (!fixed) {
        this.props.onClose();
        this._ticking = false;
      }

      return;
    } else if (
      isOutOfBounds(fixedTo, this._child, this._toggle, centered, verticalThreshold, horizontalThreshold)
    ) {
      this.props.onClose();
      this._ticking = false;
      return;
    }

    let x;
    let y;
    if (fixedTo !== window && (fixedTo.horizontal || fixedTo.vertical)) {
      x = getScroll(fixedTo.horizontal || window).x;
      y = getScroll(fixedTo.vertical || window).y;
    } else {
      const scroll = getScroll(fixedTo);
      x = scroll.x;
      y = scroll.y;
    }

    let winX;
    let winY;
    // When using the additional fixedTo stuff, need to also keep track of the entire
    // window's scrolling..
    if (fixedTo !== window && !fixedTo.horizontal && !fixedTo.vertical) {
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
    if (this._container && !this._container.contains(e.target)) {
      this.props.onClose(e);
    }
  }

  /**
   * Attempts to fix a viewport problem by swapping the vertical positioning.
   */
  _attemptFix({ top, bottom }) {
    const fixable = (this._lastFix === 'top' && !bottom) || (this._lastFix === 'bottom' && !top);
    if (!fixable) {
      return false;
    }

    const { below } = this.state;
    const { fixedTo } = this.props;
    const { offsetHeight: childHeight } = this._child;
    const { offsetHeight: toggleHeight } = this._toggle;
    const rect = this._toggle.getBoundingClientRect();
    let scrollEl = fixedTo;
    if (fixedTo !== window && (fixedTo.vertical || fixedTo.horizontal)) {
      scrollEl = fixedTo.vertical || window;
    }

    this._initialY = getScroll(scrollEl).y;
    if (!bottom) {
      this._initialTop = rect.top - childHeight;
    } else {
      this._initialTop = rect.top + (below ? toggleHeight : 0);
    }

    const styles = this._mergeStyles({ top: this._initialTop });
    this.setState({ styles }, () => {
      this._ticking = false;
      this._lastFix = !bottom ? 'bottom' : 'top';
    });

    return true;
  }

  render() {
    const {
      className,
      block,
      toggle,
      visible,
      children,
      /* eslint-disable no-unused-vars */
      onClose,
      sameWidth,
      centered,
      position,
      fixedTo,
      toggleQuery,
      verticalThreshold,
      horizontalThreshold,
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
        className: cn(`md-layover-child md-layover-child--${position}`, child.props.className),
      });
    }

    return (
      <CSSTransitionGroup
        {...props}
        className={cn('md-layover', { 'md-inline-block': !block }, className)}
        ref={this._setContainer}
        transitionEnter={props.transitionEnterTimeout !== 0}
        transitionLeave={props.transitionLeaveTimeout !== 0}
        aria-haspopup
        aria-expanded={visible}
        aria-owns={childId}
      >
        {toggle}
        {child}
      </CSSTransitionGroup>
    );
  }
}
