import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import invariant from 'invariant';

const hrefables = ['a', 'area'].map(tag => `${tag}[href],`).join('');
const disableables = ['button', 'input', 'textarea', 'select'].map(tag => `${tag}:not([disabled]),`).join('');
const FOCUSABLE_QUERY = `${hrefables}${disableables}*[tabIndex]`;
import isValidFocusKeypress from '../utils/EventUtils/isValidFocusKeypress';

/**
 * This component is used for keeping the focus within some container. When the container
 * is mounted and the `focusOnMount` prop is `true`, it will attempt to focus either:
 * - an element that matches `document.getElementById(this.props.initialFocus)`
 * - an element that matches `this._container.querySelector(this.props.initialFocus)`
 * - the first focusable element in it's children (if `this.props.initialFocus` is omitted)
 */
export default class FocusContainer extends PureComponent {
  static propTypes = {
    /**
     * The component to render as. This can be a React DOM element or
     * a react Component.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * The children to display.
     */
    children: PropTypes.node,

    /**
     * An optional id string or a query selector string to use for the initial focus.
     * This will only be triggered if the `focusOnMount` prop is `true`. If this is
     * omitted and the `focusOnMount` prop is `true`, the first focusable element in the
     * container will be focused.
     *
     * Examples:
     *
     * ```js
     * initialFocus="#someAmazingId"
     * // or
     * initialFocus=".md-btn,.md-list-tile"
     * ```
     */
    initialFocus: PropTypes.string,

    /**
     * Boolean if an element in the container should be focused when mounted.
     */
    focusOnMount: PropTypes.bool,

    /**
     * An optional list of additional key codes to use for focus events.
     */
    additionalFocusKeys: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    component: 'div',
  };

  constructor(props) {
    super(props);

    this.state = {};
    this._containFocus = this._containFocus.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentWillUnmount() {
    if (this._container) {
      window.removeEventListener('focus', this._handleFocus, true);
      window.removeEventListener('keydown', this._handleKeyDown, true);
    }
  }

  /**
   * Manages the event listeners to contain the focus within some container.  When the container
   * ref is not null, the container has mounted and then attempts to focus an element inside
   * if the `focusOnMount` prop is `true`.
   */
  _containFocus(containerRef) {
    if (containerRef === null) {
      this._container = null;
      window.removeEventListener('focus', this._handleFocus, true);
      window.removeEventListener('keydown', this._handleKeyDown, true);
      return;
    }

    const { initialFocus, focusOnMount } = this.props;
    this._container = findDOMNode(containerRef);
    this._focusables = Array.prototype.slice.call(this._container.querySelectorAll(FOCUSABLE_QUERY))
      .filter(el => el.tabIndex !== -1);

    if (focusOnMount) {
      const toFocus = initialFocus
        ? document.getElementById(initialFocus) || this._container.querySelector(initialFocus)
        : this._focusables[0];

      let debugError;
      if (!toFocus && initialFocus) {
        debugError = ' The `initialFocus` did not match a document\'s `id` or was an invalid ';
        debugError += `\`querySelector\` for the container. \`initialFocus\`: \`${initialFocus}\`. `;
        debugError += 'If this was supposed to be an `id`, make sure to prefix with the `#` symbol.';
      }

      invariant(
        toFocus,
        'You specified that the `FocusContainer` should focus an element on mount, ' +
        'but a focusable element was not found in the children. This could be because ' +
        'the `initialFocus` prop is an invalid id or query selector, or the children ' +
        `do not contain a valid focusable element.${debugError}`
      );

      if (toFocus) {
        toFocus.focus();
      }
    }
    window.addEventListener('focus', this._handleFocus, true);
    window.addEventListener('keydown', this._handleKeyDown, true);
  }

  _handleFocus(e) {
    if (this._shifted && this._container && !this._container.contains(e.target)) {
      // Prevent the default focus action and focus the last focusable item
      e.stopPropagation();
      this._focusables[this._focusables.length - 1].focus();
    }
  }

  _handleKeyDown(e) {
    this._shifted = e.shiftKey;
    if (!isValidFocusKeypress(e, this.props.additionalFocusKeys)) {
      return;
    }

    const { target, shiftKey } = e;
    const [first, ...focusables] = this._focusables;
    const last = focusables[focusables.length - 1];

    if (shiftKey && target === first) {
      e.preventDefault();
      last.focus();
    } else if (!shiftKey && target === last) {
      e.preventDefault();
      first.focus();
    }
  }

  render() {
    const { component: Component, ...props } = this.props;
    delete props.initialFocus;
    delete props.focusOnMount;
    delete props.additionalFocusKeys;

    return (
      <Component {...props} ref={this._containFocus} />
    );
  }
}
