'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var offsetWidth = _this.refs.container.offsetWidth;

      var deltaX = offsetWidth * _this.props.threshold;
      var swipeDistance = _this.state.swipeStart - x;

      var distance = _this.calcSwipeDistance(x, 0);
      if (swipeDistance > deltaX && activeIndex + 1 < _this.props.children.length) {
        activeIndex++;
      } else if (swipeDistance < deltaX && activeIndex - 1 >= 0) {
        activeIndex--;
      }

      distance = -offsetWidth * activeIndex;

      if (_this.props.onChange) {
        _this.props.onChange(activeIndex, distance, e);
      }

      _this.setState({
        swipeItemStyle: _this.getSwipeItemStyle(distance),
        swiping: false,
        swipeDistance: distance,
        activeIndex: activeIndex
      });
    };

    _this.setInitialSwipeDistance = function () {
      var offsetWidth = _this.refs.container.offsetWidth;

      var index = _this.getActiveIndex();
      var distance = _this.calcSwipeDistance(offsetWidth * index, 0);

      _this.setState({
        swipeItemStyle: _this.getSwipeItemStyle(distance),
        swipeDistance: distance
      });
    };

    _this.calcSwipeDistance = function (x, threshold) {
      var _this$refs$container = _this.refs.container;
      var scrollWidth = _this$refs$container.scrollWidth;
      var offsetWidth = _this$refs$container.offsetWidth;

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
        var distance = -this.refs.container.offsetWidth * nextProps.activeIndex;
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

      return _react2.default.createElement(
        'section',
        {
          ref: 'container',
          className: (0, _classnames2.default)('md-swipeable-view', className, { swiping: swiping }),
          onTouchStart: this.handleSwipeStart,
          onTouchMove: this.handleSwipeMove,
          onTouchEnd: this.handleSwipeEnd
        },
        content
      );
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
  activeIndex: _react.PropTypes.number
};
SwipeableView.defaultProps = {
  initialIndex: 0,
  threshold: .4
};
exports.default = SwipeableView;
module.exports = exports['default'];