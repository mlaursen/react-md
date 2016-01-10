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
  };

  componentWillUnmount() {
    const { timeouts } = this.state;
    Object.keys(timeouts).forEach(k => {
      clearTimeout(timeouts[k]);
    });
  }

  createInk = (pageX, pageY) => {
    const { container } = this.refs;
    const node = container.parentNode;
    const size = this.state.size || Math.max(node.offsetWidth, node.offsetHeight);
    const left = pageX - node.offsetLeft - size / 2;
    const top = pageY - node.offsetTop - size / 2;

    let ink = document.createElement('span');
    ink.classList.add('md-ink');
    ink.style.cssText = `left:${left}px;top:${top}px;width:${size}px;height:${size}px;`;
    container.insertBefore(ink, container.firstChild);

    setTimeout(() => ink.classList.add('active'), 1);
    this.setState({ size, ink, timestamp: Date.now() });
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
    if(this.props.disabled || (button !== LEFT_MOUSE && !changedTouches) || ctrlKey) { return; }
    const { ink, timestamp } = this.state;

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
        onTouchLeave: this.handleMouseUp,
      };
    } else {
      return {
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
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
