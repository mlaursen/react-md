'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwipeableView = function (_Component) {
  _inherits(SwipeableView, _Component);

  function SwipeableView(props) {
    _classCallCheck(this, SwipeableView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeableView).call(this, props));

    _this.handleSwipeStart = function (e) {
      if (_this.props.onSwipeStart) {
        _this.props.onSwipeStart(e);
      }

      _this.setState({
        swiping: true,
        swipeStart: e.changedTouches[0].pageX
      });
    };

    _this.handleSwipeMove = function (e) {
      var distance = _this.calcSwipeDistance(e.changedTouches[0].pageX, 24);

      if (_this.props.onSwipeMove) {
        _this.props.onSwipeMove(distance, e);
      }

      _this.setState({
        swipeItemStyle: _this.getSwipeItemStyle(distance)
      });
    };

    _this.handleSwipeEnd = function (e) {
      var x = e.changedTouches[0].pageX;
      var activeIndex = _this.getActiveIndex();

      var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(_this.refs.container);

      var offsetWidth = _ReactDOM$findDOMNode.offsetWidth;

      var deltaX = offsetWidth * _this.props.threshold;
      var swipeDistance = _this.state.swipeStart - x;

      var distance = _this.calcSwipeDistance(x, 0);
      if (swipeDistance > deltaX && activeIndex + 1 < _this.props.children.length) {
        activeIndex++;
      } else if (swipeDistance < -deltaX && activeIndex - 1 >= 0) {
        activeIndex--;
      }

      distance = -offsetWidth * activeIndex;

      if (_this.props.onChange) {
        _this.props.onChange(activeIndex, swipeDistance, e);
      }

      _this.setState({
        swipeItemStyle: _this.props.transitionName ? {} : _this.getSwipeItemStyle(distance),
        swiping: false,
        swipeDistance: distance,
        activeIndex: activeIndex
      });
    };

    _this.setInitialSwipeDistance = function () {
      var _ReactDOM$findDOMNode2 = _reactDom2.default.findDOMNode(_this.refs.container);

      var offsetWidth = _ReactDOM$findDOMNode2.offsetWidth;

      var index = _this.getActiveIndex();
      var distance = -offsetWidth * index;

      _this.setState({
        swipeItemStyle: _this.props.transitionName ? {} : _this.getSwipeItemStyle(distance),
        swipeDistance: distance
      });
    };

    _this.calcSwipeDistance = function (x, threshold) {
      var _ReactDOM$findDOMNode3 = _reactDom2.default.findDOMNode(_this.refs.container);

      var scrollWidth = _ReactDOM$findDOMNode3.scrollWidth;
      var offsetWidth = _ReactDOM$findDOMNode3.offsetWidth;

      var distance = _this.state.swipeDistance + (x - _this.state.swipeStart);
      return Math.max(Math.min(distance, threshold), -scrollWidth - threshold + offsetWidth);
    };

    _this.getSwipeItemStyle = function (distance) {
      var transform = 'translateX(' + distance + 'px)';
      return {
        WebkitTransform: transform,
        MozTransform: transform,
        transform: transform
      };
    };

    _this.getActiveIndex = function () {
      return typeof _this.props.activeIndex === 'number' ? _this.props.activeIndex : _this.state.activeIndex;
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      activeIndex: props.initialIndex,
      swiping: false,
      swipeItemStyle: {},
      swipeStart: 0,
      swipeDistance: 0
    };
    return _this;
  }

  _createClass(SwipeableView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.activeIndex !== nextProps.activeIndex) {
        var distance = -_reactDom2.default.findDOMNode(this.refs.container).offsetWidth * nextProps.activeIndex;
        this.setState({
          swipeItemStyle: this.getSwipeItemStyle(distance),
          swipeDistance: distance
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setInitialSwipeDistance();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['className', 'children']);

      var _state = this.state;
      var swipeItemStyle = _state.swipeItemStyle;
      var swiping = _state.swiping;


      var content = _react2.default.Children.map(children, function (child, i) {
        return _react2.default.cloneElement(child, {
          key: child.key || 'swipe-item-' + i,
          className: 'md-swipeable-item',
          style: Object.assign({}, child.props.style, swipeItemStyle)
        });
      });

      return _react2.default.createElement(props.transitionName ? _reactAddonsCssTransitionGroup2.default : 'section', _extends({}, props, {
        ref: 'container',
        component: 'section',
        className: (0, _classnames2.default)('md-swipeable-view', className, { swiping: swiping }),
        onTouchStart: this.handleSwipeStart,
        onTouchMove: this.handleSwipeMove,
        onTouchEnd: this.handleSwipeEnd,
        children: content
      }));
    }
  }]);

  return SwipeableView;
}(_react.Component);

SwipeableView.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  onSwipeMove: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  onSwipeStart: _react.PropTypes.func,
  threshold: _react.PropTypes.number.isRequired,
  initialIndex: _react.PropTypes.number.isRequired,
  activeIndex: _react.PropTypes.number,
  transitionName: _react.PropTypes.string
};
SwipeableView.defaultProps = {
  initialIndex: 0,
  threshold: .15
};
exports.default = SwipeableView;
module.exports = exports['default'];