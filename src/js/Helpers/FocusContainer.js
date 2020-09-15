import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import isValidFocusKeypress from '../utils/EventUtils/isValidFocusKeypress';
import setRef from '../utils/ref';

const BASE_FOCUSABLE_ELEMENTS = '[href],[tabindex]:not([tabindex="-1"]),input:not([disabled]):not([type="hidden"])';
const FOCUSABLE_QUERY = ['button', 'textarea', 'select']
  .reduce((queryString, element) => `${queryString},${element}:not([disabled])`, BASE_FOCUSABLE_ELEMENTS);

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
      PropTypes.object,
    ]).isRequired,

    /**
     * An optional ref to get reference to the rendered component.
     * Just like other refs, this will provide null when it unmounts.
     */
    componentRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),

    /**
     * An optional ref to get reference to the top-most element of the rendered container.
     * Just like other refs, this will provide null when it unmounts.
     *
     * This is helpful if you'd like access the DOM node for a parent Component without needing to use
     * `ReactDOM.findDOMNode`.
     */
    containerRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),

    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

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

    /**
     * Boolean if the focus container should start or stop containing the focus within the container.
     * This is useful for changing the focus requirements after mount.
     */
    containFocus: PropTypes.bool,
  };

  static defaultProps = {
    component: 'div',
    containFocus: true,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.containFocus === nextProps.containFocus) {
      return;
    }

    if (nextProps.containFocus) {
      this._enableFocusTrap();
      this._attemptInitialFocus();
    } else {
      this._disableFocusTrap();
    }
  }

  componentDidUpdate() {
    if (this.props.containFocus && this._container) {
      this._focusables = [].slice.call(this._container.querySelectorAll(FOCUSABLE_QUERY));
    }
  }

  componentWillUnmount() {
    if (this.props.containFocus) {
      this._disableFocusTrap();
    }
  }

  /**
   * Return reference to the top-most DOM node of the rendered container.
   *
   * @return {Element|null|undefined} Reference to the top-most DOM node of the rendered container.
   */
  getContainer() {
    return this._container;
  }

  _enableFocusTrap = () => {
    window.addEventListener('keydown', this._handleKeyDown, true);
  };

  _disableFocusTrap = () => {
    window.removeEventListener('keydown', this._handleKeyDown, true);
  };

  _attemptInitialFocus = () => {
    if (!this._container) {
      return;
    }

    const { initialFocus } = this.props;

    const toFocus = initialFocus
      ? document.getElementById(initialFocus) || this._container.querySelector(initialFocus)
      : this._focusables[0];

    let debugError;
    if (!toFocus && initialFocus) {
      debugError = ' The `initialFocus` did not match a document\'s `id` or was an invalid ';
      debugError += `\`querySelector\` for the container. \`initialFocus\`: \`${initialFocus}\`. `;
      debugError += 'If this was supposed to be an `id`, make sure to prefix with the `#` symbol.';
    }

    if (process.env.NODE_ENV !== 'production' && !toFocus) {
      throw new Error(
        'You specified that the `FocusContainer` should focus an element on mount, ' +
        'but a focusable element was not found in the children. This could be because ' +
        'the `initialFocus` prop is an invalid id or query selector, or the children ' +
        `do not contain a valid focusable element.${debugError}`
      );
    }

    if (toFocus) {
      toFocus.focus();
    }
  };

  /**
   * Manages the event listeners to contain the focus within some container.  When the container
   * ref is not null, the container has mounted and then attempts to focus an element inside
   * if the `focusOnMount` prop is `true`.
   */
  _containFocus = (containerRef) => {
    const { props } = this;
    setRef(props.componentRef, containerRef);
    if (containerRef === null) {
      this._container = null;
      this._disableFocusTrap();
      setRef(props.containerRef, null);
      return;
    }

    const { focusOnMount, containFocus } = props;
    this._container = findDOMNode(containerRef);
    setRef(props.containerRef, this._container);
    this._focusables = [].slice.call(this._container.querySelectorAll(FOCUSABLE_QUERY));

    if (focusOnMount) {
      this._attemptInitialFocus();
    }

    if (containFocus) {
      this._enableFocusTrap();
    }
  };

  _handleKeyDown = (e) => {
    this._shifted = e.shiftKey;
    if (!isValidFocusKeypress(e, this.props.additionalFocusKeys)) {
      return;
    } else if (this._focusables.length === 1) {
      e.preventDefault();
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
  };

  render() {
    const {
      component: Component,
      /* eslint-disable no-unused-vars */
      componentRef,
      containerRef,
      initialFocus,
      focusOnMount,
      containFocus,
      additionalFocusKeys,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    return <Component {...props} ref={this._containFocus} />;
  }
}
