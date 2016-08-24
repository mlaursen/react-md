/* eslint-disable no-param-reassign */
import { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import { animate } from '../utils';

export default class Height extends Component {
  static propTypes = {
    children: PropTypes.node,
    transitionEnterTimeout: PropTypes.number.isRequired,
    transitionLeaveTimeout: PropTypes.number.isRequired,
    increment: PropTypes.number.isRequired,
  };

  static defaultProps = {
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
    increment: 15,
  };

  constructor(props) {
    super(props);

    this._init = this._init.bind(this);
    this._animatePadding = this._animatePadding.bind(this);
  }

  componentWillEnter(done) {
    this._init(done, true);
  }

  componentDidEnter() {
    const el = findDOMNode(this);
    el.style.height = null;
    el.style.paddingTop = null;
    el.style.paddingBottom = null;
    el.style.overflow = null;
  }

  componentWillLeave(done) {
    this._init(done, false);
  }

  _linearIncrement(value, time) {
    return value / time;
  }

  _init(done, isEnter = true) {
    const el = findDOMNode(this);
    const fullHeight = el.offsetHeight;
    const elStyle = window.getComputedStyle(el);
    const paddingTop = parseInt(elStyle.paddingTop, 10);

    const { increment, transitionEnterTimeout, transitionLeaveTimeout } = this.props;
    const transitionTime = isEnter ? transitionEnterTimeout : transitionLeaveTimeout;
    const intervals = transitionTime / increment;

    const ptTime = Math.ceil(intervals * paddingTop / fullHeight) * increment;
    const hTime = transitionTime - ptTime;

    el.style.overflow = 'hidden';
    el.style.paddingBottom = 0;
    const animationIncrement = this._linearIncrement(paddingTop, ptTime / increment);
    if (isEnter) {
      el.style.paddingTop = 0;
      el.style.height = 0;

      this._animatePadding(el, 0, animationIncrement, 'paddingTop', 0, ptTime, increment, () => {
        animate(el, increment, ptTime, hTime, 'height', 0, paddingTop, fullHeight, done);
      });
    } else {
      el.style.paddingTop = `${paddingTop}px`;
      el.style.height = `${fullHeight}px`;
      animate(el, increment, 0, hTime, 'height', fullHeight - paddingTop, fullHeight, -fullHeight, () => {
        this._animatePadding(el, paddingTop, -animationIncrement, 'paddingTop', 0, ptTime, increment, done);
      });
    }
  }

  _animatePadding(el, padding, paddingIncrement, name, elapsedTime, transitionTime, increment, next) {
    elapsedTime += increment;
    padding += paddingIncrement;
    el.style[name] = `${padding}px`;
    if (elapsedTime < transitionTime) {
      setTimeout(() => {
        this._animatePadding(el, padding, paddingIncrement, name, elapsedTime, transitionTime, increment, next);
      }, increment);
    } else {
      el.style[name] = `${Math.floor(padding)}px`;
      next();
    }
  }

  render() {
    return this.props.children;
  }
}
