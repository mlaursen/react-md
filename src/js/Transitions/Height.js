import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { animate } from '../utils';

export default class Height extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.node,
    transitionEnterTimeout: PropTypes.number.isRequired,
    transitionLeaveTimeout: PropTypes.number.isRequired,
    increment: PropTypes.number.isRequired,
  };

  static defaultProps = {
    transitionEnterTimeout: 450,
    transitionLeaveTimeout: 450,
    increment: 15,
  };

  init = (done, isEnter = true) => {
    const el = ReactDOM.findDOMNode(this);
    const fullHeight = el.offsetHeight;
    const elStyle = window.getComputedStyle(el);
    const paddingTop = parseInt(elStyle.paddingTop);

    const { increment, transitionEnterTimeout, transitionLeaveTimeout } = this.props;
    const transitionTime = isEnter ? transitionEnterTimeout : transitionLeaveTimeout;
    const intervals = transitionTime / increment;

    const ptTime = Math.ceil(intervals * paddingTop / fullHeight) * increment;
    const hTime = transitionTime - ptTime;

    el.style.overflow = 'hidden';
    el.style.paddingBottom = 0;
    if(isEnter) {
      el.style.paddingTop = 0;
      el.style.height = 0;

      this.animatePadding(el, 0, this.linearIncrement(paddingTop, ptTime / increment), 'paddingTop', 0, ptTime, increment, () => {
        animate(el, increment, ptTime, hTime, 'height', 0, paddingTop, fullHeight, done);
      });
    } else {
      el.style.paddingTop = `${paddingTop}px`;
      el.style.height = `${fullHeight}px`;
      animate(el, increment, 0, hTime, 'height', fullHeight - paddingTop, fullHeight, -fullHeight, () => {
        this.animatePadding(el, paddingTop, -this.linearIncrement(paddingTop, ptTime / increment), 'paddingTop', 0, ptTime, increment, done);
      });
    }
  };

  linearIncrement = (value, time) => {
    return value / time;
  };

  animatePadding = (el, padding, paddingIncrement, name, elapsedTime, transitionTime, increment, next) => {
    elapsedTime += increment;
    padding += paddingIncrement;
    el.style[name] = `${padding}px`;
    if(elapsedTime < transitionTime) {
      setTimeout(() => {
        this.animatePadding(el, padding, paddingIncrement, name, elapsedTime, transitionTime, increment, next);
      }, increment);
    } else {
      el.style[name] = Math.floor(padding) + 'px';
      next();
    }
  };

  componentWillEnter = (done) => {
    this.init(done, true);
  };

  componentDidEnter = () => {
    const el = ReactDOM.findDOMNode(this);
    el.style.height = null;
    el.style.paddingTop = null;
    el.style.paddingBottom = null;
    el.style.overflow = null;
  };

  componentWillLeave = (done) => {
    this.init(done, false);
  };

  render() {
    return this.props.children;
  }
}


