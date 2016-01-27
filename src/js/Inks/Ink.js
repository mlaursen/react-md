import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { LEFT_MOUSE } from '../constants/keyCodes';
const INK_TRANSITION_TIME = 600;

export default class Ink extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { size: null, timeouts: {} };
  }

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    focused: PropTypes.bool,
  };

  componentWillReceiveProps(nextProps) {
    if(!this.props.focused && nextProps.focused) {
      this.createInk();
    } else if(!nextProps.focused && this.props.focused) {
      this.handleMouseUp({ button: LEFT_MOUSE });
    }
  }

  componentWillUnmount() {
    const { timeouts } = this.state;
    Object.keys(timeouts).forEach(k => {
      clearTimeout(timeouts[k]);
    });
  }

  calcR = (a, b) => {
    return Math.sqrt((a * a) + (b * b));
  };

  createInk = (pageX, pageY) => {
    const { container } = this.refs;

    let left = 0, top = 0;
    let size, x, y;
    if(typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
      const rect = container.getBoundingClientRect();
      const offset = {
        left: rect.left + document.body.scrollLeft,
        top: rect.top + document.body.scrollTop,
      };

      x = pageX - offset.left;
      y = pageY - offset.top;
    } else {
      const node = container.parentNode;
      x = node.offsetWidth / 2;
      y = node.offsetHeight / 2;
    }

    const { offsetWidth, offsetHeight } = container;
    const r = Math.max(
      this.calcR(x, y),
      this.calcR(offsetWidth - x, y),
      this.calcR(offsetWidth - x, offsetHeight - y),
      this.calcR(x, offsetHeight - y)
    );

    left = x - r;
    top = y - r;
    size = r * 2;

    let ink = document.createElement('span');
    ink.classList.add('md-ink');
    ink.style.cssText = `left:${left}px;top:${top}px;width:${size}px;height:${size}px;`;
    container.insertBefore(ink, container.firstChild);

    setTimeout(() => ink.classList.add('active'), 25);
    this.setState({ ink, timestamp: Date.now(), mouseLeave: false, mouseDown: true });
  };

  handleMouseDown = ({ pageX, pageY, button, ctrlKey, changedTouches }) => {
    if(this.props.disabled || (!changedTouches && (button !== LEFT_MOUSE || ctrlKey))) { return; }

    if(this.props.onClick) { this.props.onClick(); }
    if(changedTouches) {
      this.createInk(changedTouches[0].pageX, changedTouches[0].pageY);
    } else {
      this.createInk(pageX, pageY);
    }
  };

  handleMouseUp = ({ button, ctrlKey, changedTouches }) => {
    const invalidKey = (button !== LEFT_MOUSE && !changedTouches) || ctrlKey;
    if(this.props.disabled || invalidKey || this.state.mouseLeave) { return; }
    this.removeInk();
    this.setState({ mouseDown: false });
  };

  handleMouseLeave = () => {
    if(this.props.disabled || !this.state.mouseDown) { return; }
    this.removeInk();
  };

  removeInk = () => {
    const { ink, timestamp } = this.state;
    if(!ink) { return; }

    ink.classList.add('leaving');
    const timeout = setTimeout(() => {
      this.refs.container.removeChild(ink);

      let timeouts = Object.assign({}, this.state.timeouts);
      delete timeouts[timestamp];
      this.setState({ timeouts });
    }, INK_TRANSITION_TIME);

    const timeouts = Object.assign({}, this.state.timeouts);
    timeouts[timestamp] = timeout;
    this.setState({ timeouts });
  };

  getEvents = () => {
    if(typeof window !== 'undefined' && ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)) {
      return {
        onTouchStart: this.handleMouseDown,
        onTouchEnd: this.handleMouseUp,
        onTouchCancel: this.handleMouseUp,
        onTouchLeave: this.handleMouseLeave,
      };
    } else {
      return {
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
      };
    }
  };

  render() {
    const { className } = this.props;
    return (
      <div
        ref="container"
        className={classnames('md-ink-container', className)}
        {...this.getEvents()}
      />
    );
  }
}
