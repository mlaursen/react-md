import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import { TAB } from '../constants/keyCodes';
import getDisplayName from '../utils/StringUtils/getDisplayName';
import captureNextEvent from '../utils/EventUtils/captureNextEvent';

const CONTEXT_TIMEOUT = 687;

/**
 * Takes any component and injects a tooltip when the user hovers
 * over the component or touch holds it on a mobile device. It also
 * injects the event listeners and a `tooltip` prop to be added to
 * the `ComposedComponent`.
 *
 * If the `tooltipLabel` prop is omitted, the tooltip and event listeners will not
 * be included.
 *
 * ```js
 * @param {function} ComposedComponent the component to compose with the tooltip functionality.
 * @return {function} the ComposedComponent with a tooltip.
 * ```
 */
export default ComposedComponent => class TooltipedComponent extends PureComponent {
  static displayName = getDisplayName(ComposedComponent, 'Tooltiped');
  static propTypes = {
    /**
     * The tooltip to display.
     */
    tooltipLabel: PropTypes.string,

    /**
     * The position of the tooltip relative to the `ComposedComponent`.
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,

    /**
     * An optional delay before the tooltip appears on hover or keyboard focus. The
     * touch tooltip will always appear at `687ms` (~ time for context menu).
     */
    tooltipDelay: PropTypes.number,

    /**
     * An optional function to call when the composed component triggers the `blur` event.
     */
    onBlur: PropTypes.func,

    /**
     * An optional function to call when the composed component triggers the `keyup` event.
     */
    onKeyUp: PropTypes.func,

    /**
     * An optional function to call when the composed component triggers the `mouseover` event.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when the composed component triggers the `mouseleave` event.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional function to call when the composed component triggers the `touchstart` event.
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional function to call when the composed component triggers the `touchend` event.
     */
    onTouchEnd: PropTypes.func,
  };

  static defaultProps = {
    tooltipPosition: 'bottom',
  };

  constructor(props, context) {
    super(props, context);

    this.getComposedComponent = this.getComposedComponent.bind(this);
    this._setComposedComponent = this._setComposedComponent.bind(this);
    this._showTooltip = this._showTooltip.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleContextMenu = this._handleContextMenu.bind(this);
  }

  componentDidMount() {
    this._component = findDOMNode(this);
  }

  /**
   * Gets the composed component as a ref. This is usefull if you need to access the ref of the
   * composed component instead of the `injectInk` HOC to use some publically accessible methods.
   *
   * ```js
   * <SomeInkedComponent
   *   ref={inkHOC => {
   *     inkHOC.getComposedComponent().focus();
   *   }}
   * />
   * ```
   */
  getComposedComponent() {
    return this._composed;
  }

  _setComposedComponent(component) {
    this._composed = component;
  }

  /**
   * Takes a tooltip target container and attempts to find the tooltip container inside. It will only
   * check the direct children.
   *
   * @param {DOMNode} container the container node to check.
   * @return {DOMNode} the tooltip container node or null.
   */
  _getTooltipContainer(container) {
    return Array.prototype.slice.call(container.childNodes)
      .filter(node => node.className && node.className.indexOf('md-tooltip-container') !== -1)[0];
  }

  /**
   * Attempts to find a tooltip container inside the given container element. If it does not
   * exist, a new tooltip container will be created and inserted as the first child in
   * the main container.
   *
   * @param {DOMNode} container the container node to check.
   * @return {DOMNode} the existing or newly created tooltip container node.
   */
  _getOrCreateTooltipContainer(container) {
    let tooltipContainer = this._getTooltipContainer(container);

    if (!tooltipContainer) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.className = 'md-tooltip-container';

      container.insertBefore(tooltipContainer, container.firstChild);
    }

    return tooltipContainer;
  }

  _showTooltip() {
    if (this._shown) {
      return;
    }

    const { tooltipLabel, tooltipPosition } = this.props;
    const container = this._getOrCreateTooltipContainer(this._component);

    const tooltip = document.createElement('span');
    const horizontal = ['top', 'bottom'].indexOf(tooltipPosition) !== -1;
    const position = `md-tooltip--${horizontal ? 'horizontal' : 'vertical'} md-tooltip--${tooltipPosition}`;
    tooltip.className = `md-tooltip ${position} md-tooltip--enter`;
    tooltip.innerHTML = tooltipLabel;

    container.insertBefore(tooltip, null);

    this._timeout = setTimeout(() => {
      tooltip.classList.add('md-tooltip--active');
      tooltip.classList.add('md-tooltip--enter-active');
      tooltip.classList.add(`md-tooltip--${tooltipPosition}-active`);
      this._timeout = setTimeout(() => {
        this._timeout = null;

        tooltip.classList.remove('md-tooltip--active');
        tooltip.classList.remove('md-tooltip--enter');
        tooltip.classList.remove('md-tooltip--enter-active');
      }, 150);
    }, 10);

    this._shown = true;
  }

  _hideTooltip() {
    if (!this._shown) {
      return;
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    const container = this._getOrCreateTooltipContainer(this._component);
    const tooltip = container.childNodes[0];
    tooltip.classList.add('md-tooltip--active');
    tooltip.classList.add('md-tooltip--leave');
    this._timeout = setTimeout(() => {
      tooltip.classList.remove(`md-tooltip--${this.props.tooltipPosition}-active`);
      tooltip.classList.add('md-tooltip--leave-active');

      this._timeout = setTimeout(() => {
        this._timeout = null;
        this._shown = false;

        container.removeChild(tooltip);
      }, 150);
    }, 1);
  }

  _handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    this._hideTooltip();
  }

  _handleKeyUp(e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    if ((e.which || e.keyCode) === TAB) {
      this._showTooltip();
    }
  }

  _handleMouseOver(e) {
    const { onMouseOver, tooltipDelay } = this.props;
    if (onMouseOver) {
      onMouseOver(e);
    }

    if (this._touched) {
      return;
    }

    if (this._delayedTimeout) {
      clearTimeout(this._delayedTimeout);
    }

    if (tooltipDelay) {
      this._delayedTimeout = setTimeout(() => {
        this._delayedTimeout = null;
        this._showTooltip();
      }, tooltipDelay);
    } else {
      this._showTooltip();
    }
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (this._touched) {
      return;
    }

    if (this._delayedTimeout) {
      clearTimeout(this._delayedTimeout);
    }

    this._hideTooltip();
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this._timeout = null;
      captureNextEvent('click');
      this._showTooltip();
    }, CONTEXT_TIMEOUT);
    this._touched = true;
    window.addEventListener('contextmenu', this._handleContextMenu);
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    window.removeEventListener('contextmenu', this._handleContextMenu);

    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    } else {
      e.preventDefault();
    }

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this._touched = false;
      this._hideTooltip();
    }, 1500);
  }

  _handleContextMenu(e) {
    e.preventDefault();
  }

  render() {
    const { tooltipLabel, ...props } = this.props;
    delete props.tooltipPosition;
    delete props.tooltipDelay;
    props.ref = this._setComposedComponent;

    if (!tooltipLabel) {
      return <ComposedComponent {...props} />;
    }

    return (
      <ComposedComponent
        {...props}
        ref={this._setComposedComponent}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
        onKeyUp={this._handleKeyUp}
        onBlur={this._handleBlur}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}
      />
    );
  }
};
