import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';
import { isTouchDevice } from '../utils';

const DESKTOP_FONT_SIZE = 10;
const DESKTOP_MARGIN = 14;
const MOBILE_MARGIN = 24;

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
 * @param ComposedComponent the component to compose with the tooltip functionality.
 * @return the ComposedComponent with a tooltip.
 * ```
 */
export default ComposedComponent => class Tooltip extends PureComponent {
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
     * The delay before the tooltip appears or disappears.
     */
    tooltipDelay: PropTypes.number.isRequired,

    /**
     * The timeout to use for displaying the tooltip when using a touch device.
     */
    tooltipTouchTimeout: PropTypes.number.isRequired,

    /**
     * An optional onKeyUp function to call along with the tooltip creation onKeyUp.
     */
    onKeyUp: PropTypes.func,

    /**
     * An optional onBlur function to call along with the tooltip creation onBlur.
     */
    onBlur: PropTypes.func,

    /**
     * An optional onMouseOver function to call along with the tooltip creation onMouseOver.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional onMouseLeave function to call along with the tooltip creation onMouseLeave.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional onTouchStart function to call along with the tooltip creation onTouchStart.
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional onTouchEnd function to call along with the tooltip creation onTouchEnd.
     */
    onTouchEnd: PropTypes.func,
  };

  static defaultProps = {
    tooltipPosition: 'bottom',
    tooltipDelay: 0,
    tooltipTouchTimeout: 500,
  };

  constructor(props) {
    super(props);

    this.state = {
      style: null,
      textStyle: null,
      active: false,
      tabActive: false,
      touch: false,
      timeout: null,
    };

    this._setActive = this._setActive.bind(this);
    this._setInactive = this._setInactive.bind(this);
    this._calcPositioningStyle = this._calcPositioningStyle.bind(this);
    this._hackChromeMinimumFontSize = this._hackChromeMinimumFontSize.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
  }

  componentDidMount() {
    if (this.props.tooltipLabel) {
      this._hackChromeMinimumFontSize();
      window.addEventListener('resize', this._hackChromeMinimumFontSize);
    }
  }

  componentDidUpdate(prevProps) {
    const { tooltipLabel } = this.props;
    if (tooltipLabel === prevProps.tooltipLabel) { return; }

    if (tooltipLabel) {
      window.addEventListener('resize', this._hackChromeMinimumFontSize);
    } else {
      window.removeEventListener('resize', this._hackChromeMinimumFontSize);
    }
  }

  componentWillUnmount() {
    if (this.props.tooltipLabel) {
      window.removeEventListener('resize', this._hackChromeMinimumFontSize);
    }

    if (this.state.touchTimeout) {
      clearTimeout(this.state.touchTimeout);
    }
  }

  /**
   * Prevent the context menu from appearing on touch hold.
   */
  _preventContext(e) {
    e.preventDefault();
  }

  /**
   * Chrome doesn't allow a font-size below 12px.
   * You used to be able to use -webkit-text-size-adjust: none
   * but they have dropped support for that.
   *
   * So now the solution is to scale the text if chrome only..
   */
  _hackChromeMinimumFontSize() {
    const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const fontSize = parseInt(window.getComputedStyle(this.refs.tooltipText).getPropertyValue('font-size'), 10);

    const touch = isTouchDevice();
    const state = { touch };
    if (isChrome && !touch) {
      const transform = `scale(${DESKTOP_FONT_SIZE / fontSize})`;
      state.textStyle = {
        WebkitTransform: transform,
        transform,
        transformOrigin: '51% 50%', // hack for non blurred text
      };
    }

    this.setState(state);
  }

  _calcPositioningStyle() {
    const { tooltipPosition } = this.props;
    const margin = this.state.touch ? MOBILE_MARGIN : DESKTOP_MARGIN;
    const control = findDOMNode(this);
    const controlHeight = control.offsetHeight;
    const controlWidth = control.offsetWidth;
    const { tooltip } = this.refs;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let top;
    let right;
    let bottom;
    let left;
    if (tooltipPosition === 'top' || tooltipPosition === 'bottom') {
      left = (controlWidth / 2) - (tooltipWidth / 2);
    } else { // LEFT || RIGHT
      top = (controlHeight / 2) - (tooltipHeight / 2);
    }

    switch (tooltipPosition) {
      case 'top':
        top = -(tooltipHeight + margin);
        break;
      case 'right':
        left = controlWidth + margin;
        break;
      case 'bottom':
        top = margin + controlHeight;
        break;
      default:
        left = -(tooltipWidth + margin);
    }

    return {
      top,
      right,
      bottom,
      left,
    };
  }

  _setActive(key) {
    if (!this.props.tooltipLabel || this.state.timeout) { return; }

    const timeout = setTimeout(() => {
      this.setState({
        [key]: true,
        style: this._calcPositioningStyle(),
        timeout: null,
      });
    }, this.props.tooltipDelay);

    this.setState({ timeout });
  }

  _setInactive(key) {
    if (!this.props.tooltipLabel) { return; }

    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    this.setState({
      [key]: false,
      timeout: null,
    });
  }

  _handleMouseOver(e) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
    if (this.state.touch) { return; }

    this._setActive('active');
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
    if (this.state.touch) { return; }

    this._setInactive('active');
  }

  _handleKeyUp(e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }
    if (this.state.touch || (e.which || e.keyCode) !== TAB) { return; }

    this._setActive('tabActive');
  }

  _handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    if (this.state.touch) { return; }

    this._setInactive('tabActive');
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }
    if (!this.props.tooltipLabel) { return; }

    window.addEventListener('contextmenu', this._preventContext);
    this.setState({
      touchTimeout: setTimeout(() => {
        this.setState({
          touchTimeout: null,
          style: this._calcPositioningStyle(),
          active: true,
        });
      }, this.props.tooltipTouchTimeout),
    });
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }
    if (!this.props.tooltipLabel) { return; }
    window.removeEventListener('contextmenu', this._preventContext);
    if (this.state.touchTimeout) {
      clearTimeout(this.state.touchTimeout);
    }

    this.setState({ touchTimeout: null, active: false });
  }

  render() {
    const { style, active, tabActive, textStyle } = this.state;
    const { tooltipLabel, tooltipPosition, ...props } = this.props;
    delete props.tooltipDelay;
    delete props.tooltipTouchTimeout;

    if (!tooltipLabel) {
      return <ComposedComponent {...props} />;
    }

    const tooltip = (
      <div
        key="tooltip"
        ref="tooltip"
        className={cn(`md-tooltip md-tooltip-${tooltipPosition}`, { 'active': active || tabActive })}
        aria-hidden={!active && !tabActive}
        style={style}
      >
        <span ref="tooltipText" className="md-tooltip-text" style={textStyle}>{tooltipLabel}</span>
      </div>
    );

    return (
      <ComposedComponent
        {...props}
        tooltip={tooltip}
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
