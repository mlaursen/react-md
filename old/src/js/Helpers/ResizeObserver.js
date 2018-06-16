import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResizeObserverAPI from 'resize-observer-polyfill';

/**
 * The `ResizeObserver` component is a component hook for the
 * [ResizeObserver](http://rawgit.com/WICG/ResizeObserver/master/index.html)
 * using the [resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill)
 * for browsers that don't support it yet.
 *
 * This component displays an empty `span` with `aria-hidden` to allow access to the DOM. By
 * default it will attempt to watch changes on its parent component, but it can be configured
 * to watch any element by using the `target` prop.
 */
export default class ResizeObserver extends PureComponent {
  static propTypes = {
    /**
     * Boolean if the height should be watched for the resize target.
     */
    watchHeight: PropTypes.bool,

    /**
     * Boolean if the width should be watched for the resize target.
     */
    watchWidth: PropTypes.bool,

    /**
     * An optional target that should be used for detecting resize events. This can either
     * be a HTMLDOMNode or a string to use with `document.getElementById` or `document.querySelector`.
     *
     * If this prop is not provided and not null, it will default to the parent node of this component.
     * If the provided `target={null}`, the observer will not begin until the `target` is `undefined` or
     * it has been correctly passed a target string or object.
     */
    target: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),

    /**
     * The component to be rendered as. This should normally just be the default `span`, but there are cases
     * where the component should be switched to something else for valid html.
     */
    component: PropTypes.string,

    /**
     * A function to call when the height or width has been changed and that attribute is being watched.
     * The callback will include the current height, width, scrollHeight and scrollWidth of the target.
     *
     * ```js
     * onResize({
     *   height: nextHeight,
     *   width: nextWidth,
     *   scrollHeight: nextScrollHeight,
     *   scrollWidth: nextScrollWidth,
     *   el: resizeTarget,
     * });
     * ```
     */
    onResize: PropTypes.func.isRequired,

    /**
     * An optional ref callback that will include the `target` or the parent node of the resize observer. Just
     * like other refs, this will provide null when it unmounts.
     *
     * This is really only helpful if you'd like the DOM node for a parent Component without needing to use
     * `ReactDOM.findDOMNode(this)`.
     */
    elRef: PropTypes.func,
  };

  static defaultProps = {
    watchHeight: false,
    watchWidth: false,
    component: 'span',
  };

  componentWillReceiveProps(nextProps) {
    const { target } = this.props;
    const nextTarget = nextProps.target;
    if (target === nextTarget) {
      return;
    } else if (nextTarget) {
      if (this._target) {
        this._observer.unobserve(this._target);
      }
      this._target = this._getTarget(this._container, nextTarget);
      this._observer.observe(this._target);
    }
  }

  _container = null;
  _target = null;
  _observer = null;
  _height = null;
  _width = null;
  _scrollHeight = null;
  _scrollWidth = null;

  _getTarget(container, target) {
    if (target === null || (target && typeof target !== 'string')) {
      return target;
    }

    let t = null;
    if (target) {
      t = document.getElementById(target) || document.querySelector(target);
    } else {
      t = container.parentNode;
    }

    if (!t) {
      throw new Error(
        'An HTMLDOMNode is required as the `ResizeObserver`\'s watch target but none were provided/found. ' +
        `Please update the target prop to find a valid node since the provided target is invalid. \`${target}\`.`
      );
    }

    return t;
  }

  _measure = (entries) => {
    if (!this._observer || !this._target) {
      return;
    }

    for (const entry of entries) {
      if (!entry) {
        return;
      }

      const { height, width } = entry.contentRect;
      const { scrollHeight, scrollWidth } = entry.target;
      if (this._isHeightChange(height, scrollHeight) || this._isWidthChange(width, scrollWidth)) {
        this._height = height;
        this._width = width;
        this._scrollHeight = scrollHeight;
        this._scrollWidth = scrollWidth;
        this.props.onResize({ height, width, scrollHeight, scrollWidth, el: entry.target });
      }
    }
  };

  _isHeightChange = (height, scrollHeight) => this.props.watchHeight
    && (height !== this._height || scrollHeight !== this._scrollHeight);
  _isWidthChange = (width, scrollWidth) => this.props.watchWidth
    && (width !== this._width || scrollWidth !== this._scrollWidth);

  _handleRef = (container) => {
    if (container) {
      this._container = container;
      this._target = this._getTarget(container, this.props.target);
      this._observer = new ResizeObserverAPI(this._measure);

      if (this._target) {
        this._observer.observe(this._target);
      }
    } else {
      if (this._observer) {
        this._observer.disconnect();
      }

      this._container = null;
      this._target = null;
      this._observer = null;
      this._height = null;
      this._width = null;
      this._scrollHeight = null;
      this._scrollWidth = null;
    }

    if (this.props.elRef) {
      this.props.elRef(this._target);
    }
  };

  render() {
    const { component: Component } = this.props;
    return <Component ref={this._handleRef} aria-hidden />;
  }
}
