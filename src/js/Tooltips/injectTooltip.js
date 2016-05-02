import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { TAB } from '../constants/keyCodes';

const DESKTOP_FONT_SIZE = 10;
const MOBILE_FONT_SIZE = 14;
const DESKTOP_MARGIN = 14;
const MOBILE_MARGIN = 24;

export default ComposedComponent => class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      style: null,
      textStyle: null,
      active: false,
      tabActive: false,
      mobile: false,
      timeout: null,
    };
  }

  static propTypes = {
    className: PropTypes.string,
    tooltipLabel: PropTypes.string,
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    tooltipDelay: PropTypes.number.isRequired,
    onKeyUp: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
  };

  static defaultProps = {
    tooltipPosition: 'bottom',
    tooltipDelay: 0,
  };

  componentDidMount() {
    if(this.props.tooltipLabel) {
      this.hackChromeMinimumFontSize();
      window.addEventListener('resize', this.hackChromeMinimumFontSize);
    }
  }

  componentDidUpdate(prevProps) {
    const { tooltipLabel } = this.props;
    if(tooltipLabel === prevProps.tooltipLabel) { return; }

    if(tooltipLabel) {
      window.addEventListener('resize', this.hackChromeMinimumFontSize);
    } else {
      window.removeEventListener('resize', this.hackChromeMinimumFontSize);
    }
  }

  componentWillUnmount() {
    if(this.props.tooltipLabel) {
      window.removeEventListener('resize', this.hackChromeMinimumFontSize);
    }
  }

  /**
   * Chrome doesn't allow a font-size below 12px.
   * You used to be able to use -webkit-text-size-adjust: none
   * but they have dropped support for that.
   *
   * So now the solution is to scale the text if chrome only..
   */
  hackChromeMinimumFontSize = () => {
    const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const fontSize = parseInt(window.getComputedStyle(this.refs.tooltipText).getPropertyValue('font-size'));

    const mobile = fontSize === MOBILE_FONT_SIZE;
    const state = { mobile };
    if(isChrome && !mobile) {
      const transform = `scale(${DESKTOP_FONT_SIZE / fontSize})`;
      state.textStyle = {
        WebkitTransform: transform,
        transform,
        transformOrigin: '51% 50%', // hack for non blurred text
      };
    }

    this.setState(state);
  };

  calcPositioningStyle = () => {
    const { tooltipPosition } = this.props;
    const margin = this.state.mobile ? MOBILE_MARGIN : DESKTOP_MARGIN;
    const control = ReactDOM.findDOMNode(this);
    const controlHeight = control.offsetHeight;
    const controlWidth = control.offsetWidth;
    const { tooltip } = this.refs;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let top, right, bottom, left;
    if(tooltipPosition === 'top' || tooltipPosition === 'bottom') {
      left = (controlWidth / 2) - (tooltipWidth / 2);
    } else { // LEFT || RIGHT
      top = (controlHeight / 2) - (tooltipHeight / 2);
    }

    switch(tooltipPosition) {
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
  };

  setActive = (key) => {
    if(!this.props.tooltipLabel || this.state.timeout) { return; }

    const timeout = setTimeout(() => {
      this.setState({
        [key]: true,
        style: this.calcPositioningStyle(),
        timeout: null,
      });
    }, this.props.tooltipDelay);

    this.setState({ timeout });
  };

  setInactive = (key) => {
    if(!this.props.tooltipLabel) { return; }

    if(this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    this.setState({
      [key]: false,
      timeout: null,
    });
  };

  handleMouseOver = (e) => {
    this.props.onMouseOver && this.props.onMouseOver(e);

    this.setActive('active');
  };

  handleMouseLeave = (e) => {
    this.props.onMouseLeave && this.props.onMouseLeave(e);

    this.setInactive('active');
  };

  handleKeyUp = (e) => {
    this.props.onKeyUp && this.props.onKeyUp(e);
    if((e.which || e.keyCode) !== TAB) { return; }

    this.setActive('tabActive');
  };

  handleBlur = (e) => {
    this.props.onBlur && this.props.onBlur(e);

    this.setInactive('tabActive');
  };

  handleTouchStart = (e) => {
    this.props.onTouchStart && this.props.onTouchStart(e);
  };

  handleTouchEnd = (e) => {
    this.props.onTouchEnd && this.props.onTouchEnd(e);
  };

  render() {
    const { style, active, tabActive, textStyle } = this.state;
    const { tooltipLabel, tooltipPosition, ...props } = this.props;
    delete props.tooltipDelay;

    const tooltip = tooltipLabel && (
      <div
        key="tooltip"
        ref="tooltip"
        className={classnames(`md-tooltip md-tooltip-${tooltipPosition}`, { 'active': active || tabActive })}
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
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      />
    );
  }
};
