import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import { TAB, LEFT_MOUSE, UP, DOWN } from '../constants/keyCodes';
import { getOffset } from '../utils';
import { calcHypotenuse } from '../utils/NumberUtils';

/**
 * Takes any component and injects an ink container along with event listeners for handling
 * those inks.
 *
 * ```js
 * @param ComposedComponent the component to compose with the ink functionality.
 * @return the ComposedComponent with inks.
 * ```
 */
export default ComposedComponent => class InkedComponent extends PureComponent {
  static propTypes = {
    /**
     * An optional function to call when the `mouseup` event occurs.
     */
    onMouseUp: PropTypes.func,

    /**
     * An optional function to call when the `mousedown` event occurs.
     */
    onMouseDown: PropTypes.func,

    /**
     * An optional function to call when the `touchstart` event occurs.
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional function to call when the `touchend` event occurs.
     */
    onTouchEnd: PropTypes.func,

    /**
     * An optional onClick function to call. If the `removedOnClick` boolean is set to true,
     * this function will be called after the ink completes its transition instead of the
     * default onClick event.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the `keyup` event occurs.
     */
    onKeyUp: PropTypes.func,

    /**
     * An optional function to call when the `keydown` event occurs.
     */
    onKeyDown: PropTypes.func,

    /**
     * Boolean if the composed component gets removed on click. This will wait for the
     * ink transitions to complete before triggering the `onClick` prop.
     */
    removedOnClick: PropTypes.bool,

    /**
     * Boolean if the ink or the composed component is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if only the ink is disabled.
     */
    inkDisabled: PropTypes.bool,

    /**
     * The transition enter timeout for the ink.
     */
    inkEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition leave timeout for the ink.
     */
    inkLeaveTimeout: PropTypes.number.isRequired,

    /**
     * If the component is a button or any element that uses the `html` `type` attribute,
     * the ink will be triggered when the user hits enter inside a form.
     */
    type: PropTypes.string,
  };

  static defaultProps = {
    inkEnterTimeout: 150,
    inkLeaveTimeout: 450,
  };

  constructor(props) {
    super(props);

    this._transitions = [];
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._createInk = this._createInk.bind(this);
    this._removeInk = this._removeInk.bind(this);
    this._removeAllInks = this._removeAllInks.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleContextMenu = this._handleContextMenu.bind(this);
  }

  componentDidMount() {
    if (this.props.type === 'submit') {
      window.addEventListener('submit', this._handleSubmit);
    }
  }

  componentWillUnmount() {
    if (this.props.type === 'submit') {
      window.removeEventListener('submit', this._handleSubmit);
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._transitions.forEach(({ timeout }) => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
  }

  /**
   * Takes an ink target container and attempts to find the ink container inside. It will only
   * check the direct children.
   *
   * @param {DOMNode} container the container node to check.
   * @return {DOMNode} the ink container node or null.
   */
  _getInkContainer(container) {
    return container && Array.prototype.slice.call(container.childNodes)
      .filter(node => node.className && node.className.indexOf('md-ink-container') !== -1)[0];
  }

  /**
   * Attempts to find an ink container inside the given container element. If it does not
   * exist, a new ink container will be created and inserted as the first child in
   * the main container.
   *
   * @param {DOMNode} container the container node to check.
   * @return {DOMNode} the existing or newly created ink container node.
   */
  _getOrCreateInkContainer(container) {
    let inkContainer = this._getInkContainer(container);

    if (!inkContainer) {
      inkContainer = document.createElement('div');
      inkContainer.className = 'md-ink-container';

      container.insertBefore(inkContainer, container.firstChild);
    }

    return inkContainer;
  }

  _isValidClick(e) {
    return !e.shiftKey && !e.ctrlKey && e.button === LEFT_MOUSE;
  }

  _isValidKey(e, component) {
    const key = e.which || e.keyCode;
    return key === TAB ||
      ([UP, DOWN].indexOf(key) !== -1 && document.activeElement === component);
  }

  _createInk(pageX, pageY, pulse) {
    const { offsetWidth, offsetHeight } = this._component;
    const inkContainer = this._getOrCreateInkContainer(this._component);

    let x;
    let y;
    if (typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
      const offset = getOffset(inkContainer);

      x = pageX - offset.left;
      y = pageY - offset.top;
    } else {
      x = offsetWidth / 2;
      y = offsetHeight / 2;
    }

    const r = Math.max(
      calcHypotenuse(x, y),
      calcHypotenuse(offsetWidth - x, y),
      calcHypotenuse(offsetWidth - x, offsetHeight - y),
      calcHypotenuse(x, offsetHeight - y)
    );
    const left = x - r;
    const top = y - r;
    const size = r * 2;

    const ink = document.createElement('span');
    ink.className = 'md-ink';
    ink.style = `left:${left}px;top:${top}px;width:${size}px;height:${size}px`;
    inkContainer.insertBefore(ink, null);

    const transition = {
      ink,
      key: Date.now(),
      timeout: setTimeout(() => {
        transition.key += 50;
        transition.ink.classList.add('md-ink--active');
        transition.ink.classList.add('md-ink--expanded');

        transition.timeout = null;
        if (pulse) {
          transition.ink.classList.add('md-ink--pulse-active');

          transition.timeout = setTimeout(() => {
            transition.ink.classList.add('md-ink--pulse');
            transition.ink.classList.remove('md-ink--expanded');
            transition.timeout = null;
          }, this.props.inkEnterTimeout + this.props.inkLeaveTimeout);
        }
      }, 50),
    };

    this._transitions.push(transition);
  }

  /**
   * Attempts to remove the next ink from a container node.
   *
   * @param {DOMNode} container the container node to use.
   */
  _removeInk() {
    const { inkEnterTimeout, inkLeaveTimeout, removedOnClick, onClick } = this.props;
    let transition;
    this._transitions.some(t => {
      if (!t.ink.classList.contains('md-ink--leaving') && !t.leaving) {
        transition = t;
      }

      return transition;
    });

    if (transition) {
      transition.leaving = true;
      transition.timeout = setTimeout(() => {
        transition.ink.classList.add('md-ink--leaving');

        transition.timeout = setTimeout(() => {
          const inkContainer = this._getInkContainer(this._component);

          try {
            inkContainer.removeChild(transition.ink);
            this._transitions.shift();
          } catch (e) {
            this._removeAllInks();
          }

          if (removedOnClick && onClick) {
            this._component.click();
          }
        }, inkLeaveTimeout);
      }, inkEnterTimeout);
    }
  }

  _removeAllInks() {
    this._transitions.forEach(({ ink, timeout }) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      ink.parentNode.removeChild(ink);
    });

    this._transitions = [];
  }

  _handleClick(e) {
    const { removedOnClick, onClick } = this.props;
    if (!removedOnClick && onClick) {
      onClick(e);
    }
  }

  _handleKeyUp(e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    if (this._isValidKey(e, this._component)) {
      this._createInk(e.pageX, e.pageY, true);
      window.addEventListener('click', this._removeInk);
    }
  }

  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if (this._isValidKey(e, this._component)) {
      this._removeInk();
      window.removeEventListener('click', this._removeInk);
    }
  }

  _handleMouseUp(e) {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }

    if (!this._isValidClick(e)) {
      return;
    }

    this._removeInk();
    this._component.removeEventListener('mouseleave', this._removeInk);
  }

  _handleMouseDown(e) {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }

    if (!this._isValidClick(e)) {
      return;
    }

    // Prevent parent inks to be triggered as well.
    e.stopPropagation();
    this._createInk(e.pageX, e.pageY);
    this._component.addEventListener('mouseleave', this._removeInk);
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    // Prevent parent inks to be triggered as well.
    e.stopPropagation();
    const { pageX, pageY } = e.changedTouches[0];
    this._createInk(pageX, pageY);
    window.addEventListener('touchmove', this._handleTouchMove);
    window.addEventListener('contextmenu', this._handleContextMenu);
  }

  _handleTouchMove() {
    const lastTransition = this._transitions[this._transitions.length - 1];
    if (!lastTransition) {
      return;
    }

    const { key, timeout, ink } = lastTransition;
    if (Date.now() < (key + 200)) {
      this._cancelled = true;

      if (timeout) {
        clearTimeout(timeout);
      }

      ink.parentNode.removeChild(ink);
      this._transitions.pop();
    }

    window.removeEventListener('touchmove', this._handleTouchMove);
    window.removeEventListener('contextmenu', this._handleContextMenu);
  }

  _handleTouchEnd(e) {
    const { onTouchEnd, onClick, removedOnClick } = this.props;
    if (onTouchEnd) {
      onTouchEnd(e);
    }

    if (this._cancelled) {
      this._cancelled = false;
      return;
    }

    // Prevent the click event if the tooltip was called beforehand.
    if (!removedOnClick && onClick && !e.defaultPrevented) {
      this._component.click();
    }

    // Stops the mousedown, mouseup, and click events from triggering
    e.preventDefault();


    this._removeInk();
    window.removeEventListener('touchmove', this._handleTouchMove);
    window.removeEventListener('contextmenu', this._handleContextMenu);
  }

  _handleContextMenu() {
    window.removeEventListener('contextmenu', this._handleContextMenu);
    this._removeInk();
  }

  _handleSubmit(e) {
    if (!e.target.contains(this._component) || document.activeElement === this._component) {
      return;
    }

    this._createInk();
    this._timeout = setTimeout(() => {
      this._timeout = null;
      this._removeInk();
    }, 300);
  }

  render() {
    const { inkDisabled, ...props } = this.props;
    delete props.inkEnterTimeout;
    delete props.inkLeaveTimeout;
    delete props.removedOnClick;

    if (props.disabled || inkDisabled) {
      return <ComposedComponent {...props} />;
    }

    props.onKeyDown = this._handleKeyDown;
    props.onKeyUp = this._handleKeyUp;
    props.onMouseUp = this._handleMouseUp;
    props.onMouseDown = this._handleMouseDown;
    props.onTouchStart = this._handleTouchStart;
    props.onTouchEnd = this._handleTouchEnd;
    props.onClick = this._handleClick;

    return <ComposedComponent {...props} ref={c => { this._component = findDOMNode(c); }} />;
  }
};
