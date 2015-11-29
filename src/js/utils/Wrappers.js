import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/**
 * Creates a ripple effect for the given element
 *
 * @param el the html element to insert a ripple into
 * @param e the click event
 * @param {bool} isPositioned? boolean if the ripple has already been positioned correctly. Defaults to false
 * @param {number} timeout? the timeout for adding the active class to the ripple. Defaults to 1ms
 */
export function createRipple(el, e, isPositioned = false, timeout = 15) {
  // If right click, do nothing
  if(e.button === 2) {
    return null;
  }
  const size = Math.max(el.offsetWidth, el.offsetHeight) + 'px';

  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  if(!isPositioned) {
    ripple.style.height = size;
    ripple.style.width = size;
  }

  el.insertBefore(ripple, el.firstChild);
  const { pageX, pageY } = e;

  // Need a short delay after inserting into the page for some reason
  setTimeout(() => {
    if(!isPositioned) {
      ripple.style.left = `${pageX - el.offsetLeft - ripple.offsetWidth / 2}px`;
      ripple.style.top = `${pageY - el.offsetTop - ripple.offsetHeight / 2}px`;
    }
    ripple.classList.add('active');
  }, timeout);
  return ripple;
}


/**
 * Attempts to remove the first active ripple in the current element
 *
 * @param el the html element to remove a ripple from
 * @param {number} rippleAnimTime? the animation time of the ripple. Defaults to 300
 */
export function removeRipple(el, rippleAnimTime = 300) {
  const ripple = el.querySelector('.ripple.active');
  if(!ripple) {
    return;
  }

  ripple.classList.add('leave');
  setTimeout(() => {
    el.removeChild(ripple);
  }, rippleAnimTime);
}


/**
 * Wraps a component with a ripple component.
 *
 * @param {bool} isPositioned? if the ripple has css positioning instead of inline styling. Defaults to false
 * @param {number} rippleLimit? number of ripples allowed. Defaults to 0 (infinite)
 * @return a React Component wrapped with functionality to create a ripple
 */
export function rippleComponent(isPositioned = false, rippleLimit = 0) {
  return (Component) => {
    class Ripple extends Component {
      constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = { mouseDownTime: null, ripples: [] };
        this.timeout = null;
      }

      static propTypes = {
        rippleEnterTimeout: PropTypes.number.isRequired,
        rippleLeaveTimeout: PropTypes.number.isRequired,
        onClick: PropTypes.func,
        onMouseUp: PropTypes.func,
        onMouseDown: PropTypes.func,
      }

      static defaultProps = {
        rippleEnterTimeout: 300,
        rippleLeaveTimeout: 300,
      }

      handleMouseDown = (e) => {
        const { ripples } = this.state;
        if(rippleLimit && ripples.length >= rippleLimit) {
          return;
        }

        this.props.onMouseDown && this.props.onMouseDown(e);
        ripples.push(createRipple(ReactDOM.findDOMNode(this), e, isPositioned));
        this.setState({ mouseDownTime: new Date(), ripples: ripples });
      }

      handleMouseUp = (e) => {
        const { onMouseUp, rippleEnterTimeout, rippleLeaveTimeout, onClick } = this.props;
        const { mouseDownTime, ripples } = this.state;

        onMouseUp && onMouseUp(e);
        if(e.button === 2 || !ripples.length || this.timeout !== null) { // do nothing if right click
          return;
        }

        const ripple = ReactDOM.findDOMNode(this).querySelector('.ripple.active:not(.leave)');
        ripple && ripple.classList.add('leave');
        this.timeout = setTimeout(() => {
          onClick && onClick(e);
          removeRipple(ReactDOM.findDOMNode(this), rippleLeaveTimeout);
          this.timeout = null;
          this.setState({ ripples: ripples.slice(1, ripples.length), mouseDownTime: null });
        }, rippleEnterTimeout - (new Date() - mouseDownTime));
      }

      render() {
        return <Component {...this.props} onClick={null} onMouseUp={this.handleMouseUp} onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} />;
      }
    }

    return Ripple;
  };
}

