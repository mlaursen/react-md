import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

export default class SwipeableView extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onSwipeMove: PropTypes.func,
    onChange: PropTypes.func,
    onSwipeStart: PropTypes.func,
    threshold: PropTypes.number.isRequired,
    initialIndex: PropTypes.number.isRequired,
    activeIndex: PropTypes.number,
    transitionName: PropTypes.string,
  };

  static defaultProps = {
    initialIndex: 0,
    threshold: 0.15,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.initialIndex,
      swiping: false,
      swipeItemStyle: {},
      swipeStart: 0,
      swipeDistance: 0,
    };

    this._handleSwipeEnd = this._handleSwipeEnd.bind(this);
    this._handleSwipeMove = this._handleSwipeMove.bind(this);
    this._handleSwipeStart = this._handleSwipeStart.bind(this);
    this._getSwipeItemStyle = this._getSwipeItemStyle.bind(this);
    this._calcSwipeDistance = this._calcSwipeDistance.bind(this);
  }

  componentDidMount() {
    this._setInitialSwipeDistance();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeIndex !== nextProps.activeIndex) {
      const distance = -findDOMNode(this.refs.container).offsetWidth * nextProps.activeIndex;
      this.setState({
        swipeItemStyle: this._getSwipeItemStyle(distance),
        swipeDistance: distance,
      });
    }
  }

  _getSwipeItemStyle(distance) {
    const transform = `translateX(${distance}px)`;
    return {
      WebkitTransform: transform,
      MozTransform: transform,
      transform,
    };
  }

  _getActiveIndex(props, state) {
    return typeof props.activeIndex === 'number' ? props.activeIndex : state.activeIndex;
  }

  _handleSwipeStart(e) {
    if (this.props.onSwipeStart) {
      this.props.onSwipeStart(e);
    }

    this.setState({
      swiping: true,
      swipeStart: e.changedTouches[0].pageX,
    });
  }

  _handleSwipeMove(e) {
    const distance = this._calcSwipeDistance(e.changedTouches[0].pageX, 24);

    if (this.props.onSwipeMove) {
      this.props.onSwipeMove(distance, e);
    }

    this.setState({
      swipeItemStyle: this._getSwipeItemStyle(distance),
    });
  }

  _handleSwipeEnd(e) {
    const x = e.changedTouches[0].pageX;
    let activeIndex = this._getActiveIndex(this.props, this.state);
    const { offsetWidth } = findDOMNode(this.refs.container);
    const deltaX = offsetWidth * this.props.threshold;
    const swipeDistance = this.state.swipeStart - x;

    let distance = this._calcSwipeDistance(x, 0);
    if (swipeDistance > deltaX && activeIndex + 1 < this.props.children.length) {
      activeIndex++;
    } else if (swipeDistance < -deltaX && activeIndex - 1 >= 0) {
      activeIndex--;
    }

    distance = -offsetWidth * activeIndex;

    if (this.props.onChange) {
      this.props.onChange(activeIndex, swipeDistance, e);
    }

    this.setState({
      swipeItemStyle: this.props.transitionName ? {} : this._getSwipeItemStyle(distance),
      swiping: false,
      swipeDistance: distance,
      activeIndex,
    });
  }

  _setInitialSwipeDistance() {
    const { offsetWidth } = findDOMNode(this.refs.container);
    const index = this._getActiveIndex(this.props, this.state);
    const distance = -offsetWidth * index;

    this.setState({
      swipeItemStyle: this.props.transitionName ? {} : this._getSwipeItemStyle(distance),
      swipeDistance: distance,
    });
  }

  _calcSwipeDistance(x, threshold) {
    const { scrollWidth, offsetWidth } = findDOMNode(this.refs.container);
    const distance = this.state.swipeDistance + (x - this.state.swipeStart);
    return Math.max(Math.min(distance, threshold), -scrollWidth - threshold + offsetWidth);
  }

  render() {
    const { className, children, ...props } = this.props;
    delete props.activeIndex;
    delete props.initialIndex;
    delete props.threshold;

    const { swipeItemStyle, swiping } = this.state;

    const content = React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          key: child.key || `swipe-item-${i}`,
          className: 'md-swipeable-item',
          style: Object.assign({}, child.props.style, swipeItemStyle),
        })
    );

    if (props.transitionName) {
      props.component = 'section';
    }

    return React.createElement(props.transitionName ? CSSTransitionGroup : 'section', {
      ...props,
      ref: 'container',
      className: cn('md-swipeable-view', className, { swiping }),
      onTouchStart: this._handleSwipeStart,
      onTouchMove: this._handleSwipeMove,
      onTouchEnd: this._handleSwipeEnd,
      children: content,
    });
  }
}
