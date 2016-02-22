import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { TAB } from '../constants/keyCodes';

const DESKTOP_FONT_SIZE = 10;
const MOBILE_FONT_SIZE = 14;
const DESKTOP_MARGIN = 14;
const MOBILE_MARGIN = 24;

export default class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      mobile: false,
      active: false,
      timeout: null,
    };
  }

  static TOP = 'top';
  static RIGHT = 'right';
  static BOTTOM = 'bottom';
  static LEFT = 'left';

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    position: PropTypes.oneOf([Tooltip.TOP, Tooltip.RIGHT, Tooltip.BOTTOM, Tooltip.LEFT]).isRequired,
    children: PropTypes.element.isRequired,
    delay: PropTypes.number.isRequired,
  };

  static defaultProps = {
    position: 'bottom',
    delay: 0,
  };

  componentDidMount() {
    this.hackChromeMinimumFontSize();
    window.addEventListener('resize', this.hackChromeMinimumFontSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.hackChromeMinimumFontSize);
  }

  calcPositioningStyle = () => {
    const { position } = this.props;
    const margin = this.state.mobile ? MOBILE_MARGIN : DESKTOP_MARGIN;
    const control = ReactDOM.findDOMNode(this.refs.control);
    const controlHeight = control.offsetHeight;
    const controlWidth = control.offsetWidth;
    const { tooltip } = this.refs;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let top, right, bottom, left;
    if(position === Tooltip.TOP || position === Tooltip.BOTTOM) {
      left = (controlWidth / 2) - (tooltipWidth / 2);
    } else { // LEFT || RIGHT
      top = (controlHeight / 2) - (tooltipHeight / 2);
    }

    switch(position) {
      case Tooltip.TOP:
        top = -(tooltipHeight + margin);
        break;
      case Tooltip.RIGHT:
        left = controlWidth + margin;
        break;
      case Tooltip.BOTTOM:
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

  setActive = (key = 'active') => {
    this.setState({
      timeout: setTimeout(() => {
        this.setState({
          [key]: true,
          style: this.calcPositioningStyle(),
          timeout: null,
        });
      }, this.props.delay),
    });
  };

  setInactive = (key = 'active') => {
    if(this.state.timeout) {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null });
    } else {
      this.setState({ [key]: false });
    }
  };

  handleMouseOver = () => {
    this.setActive();
  };

  handleMouseLeave = () => {
    this.setInactive();
  };

  handleKeyUp = (e) => {
    if((e.which || e.keyCode) !== TAB) { return; }
    this.setActive('tabActive');
  };

  handleBlur = () => {
    this.setInactive('tabActive');
  };

  /**
   * Chrome doesn't allow a font-size below 12px.
   * You used to be able to use -webkit-text-size-adjust: none
   * but they have dropped support for that.
   *
   * So now the solution is to scale the text if chrome only..
   */
  hackChromeMinimumFontSize = () => {
    const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const fontSize = parseInt(window.getComputedStyle(this.refs.text).getPropertyValue('font-size'));

    const mobile = fontSize === MOBILE_FONT_SIZE;
    const state = { mobile };
    if(isChrome && !mobile) {
      const transform = `scale(${DESKTOP_FONT_SIZE / fontSize})`;
      state.textStyle = {
        transform,
        WebkitTransform: transform,
        transformOrigin: '51% 50%', // hack for non blurred text
      };
    }

    this.setState(state);
  };

  render() {
    const { text, className, position, children, ...props } = this.props;
    const { active, tabActive, style, textStyle } = this.state;

    // classname doesn't join correctly for the button components..
    const tooltipControl = React.Children.map(children, child => React.cloneElement(child, {
      ref: 'control',
      className: classnames(child.props.className, 'md-tooltip-control'),
      onMouseOver: this.handleMouseOver,
      onMouseLeave: this.handleMouseLeave,
      onBlur: this.handleBlur,
      onKeyUp: this.handleKeyUp,
    }));
    return (
      <div className={classnames('md-tooltip-container', className)} {...props}>
        {tooltipControl}
        <div
          ref="tooltip"
          className={classnames('md-tooltip', `md-tooltip-${position}`, { 'active': active || tabActive })}
          style={style}
          aria-hidden={!active && !tabActive}
        >
          <span ref="text" className="md-tooltip-text" style={textStyle}>{text}</span>
        </div>
      </div>
    );
  }
}
