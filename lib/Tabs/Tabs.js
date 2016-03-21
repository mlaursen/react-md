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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

var _TabHeader = require('./TabHeader');

var _TabHeader2 = _interopRequireDefault(_TabHeader);

var _SwipeableViews = require('../SwipeableViews');

var _SwipeableViews2 = _interopRequireDefault(_SwipeableViews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      activeTabIndex: props.initialActiveTabIndex,
      headerStyle: {},
      indicatorStyle: {},
      tabMoveDistance: 0,
      tabScrolling: false
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateIndicator();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.activeTabIndex !== nextProps.activeTabIndex || this.state.activeTabIndex !== nextState.activeTabIndex) {
        var node = _reactDom2.default.findDOMNode(this);
        var tabContainer = node.querySelector('.md-tabs-scroll-container');
        var tabs = _reactDom2.default.findDOMNode(this).querySelectorAll('.md-tab');
        var active = tabs[this.getActiveTabIndex(nextProps, nextState)];
        var containerWidth = tabContainer.offsetWidth - parseInt(nextProps.style.marginLeft);
        var activePosition = active.offsetLeft + active.offsetWidth;
        var tabMoveDistance = nextState.tabMoveDistance;

        if (activePosition > containerWidth + Math.abs(tabMoveDistance)) {
          var newDistance = containerWidth - activePosition;
          this.setState({
            headerStyle: this.getHeaderStyle(newDistance),
            tabMoveDistance: newDistance
          });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.activeTabIndex !== this.props.activeTabIndex || this.state.activeTabIndex !== prevState.activeTabIndex) {
        this.updateIndicator();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var style = _props.style;

      var remainingProps = _objectWithoutProperties(_props, ['className', 'children', 'style']);

      var _state = this.state;
      var headerStyle = _state.headerStyle;
      var indicatorStyle = _state.indicatorStyle;
      var tabScrolling = _state.tabScrolling;

      var activeTabIndex = this.getActiveTabIndex(remainingProps, this.state);
      var fixedWidth = (0, _utils.isPropEnabled)(remainingProps, 'fixedWidth');
      var centered = (0, _utils.isPropEnabled)(remainingProps, 'centered');

      var tabsContent = [];
      var tabs = _react2.default.Children.map(children, function (tab, i) {
        tabsContent.push(_react2.default.createElement(
          'div',
          { className: 'md-tab-content', key: 'content-' + i },
          tab.props.children
        ));

        return _react2.default.cloneElement(tab, {
          key: tab.key || 'tab-' + i,
          checked: i === activeTabIndex,
          onChange: _this2.handleTabChange.bind(_this2, i, tab.props.onChange)
        });
      });

      return _react2.default.createElement(
        'div',
        _extends({
          className: (0, _classnames2.default)('md-tabs-container', className)
        }, remainingProps),
        _react2.default.createElement(
          _TabHeader2.default,
          {
            className: (0, _utils.mergeClassNames)(remainingProps, 'md-tabs-scroll-container'),
            fixedWidth: fixedWidth,
            centered: centered,
            scrolling: tabScrolling,
            onTouchStart: this.handleTabScrollStart,
            onTouchMove: this.handleTabScrollMove,
            onTouchEnd: this.handleTabScrollEnd,
            style: Object.assign({}, style, headerStyle),
            indicatorStyle: indicatorStyle
          },
          tabs
        ),
        _react2.default.createElement(
          _SwipeableViews2.default,
          {
            className: 'md-tab-content-container',
            activeIndex: activeTabIndex,
            onChange: this.handleSwipeChange
          },
          tabsContent
        )
      );
    }
  }]);

  return Tabs;
}(_react.Component);

Tabs.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node.isRequired,
  initialActiveTabIndex: _react.PropTypes.number,
  activeTabIndex: _react.PropTypes.number,
  containerStyle: _react.PropTypes.object,
  style: _react.PropTypes.object,
  onChange: _react.PropTypes.func
};
Tabs.defaultProps = {
  initialActiveTabIndex: 0,
  style: {}
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.updateIndicator = function () {
    var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(_this3).querySelector('.md-tab.active');

    var offsetWidth = _ReactDOM$findDOMNode.offsetWidth;
    var offsetLeft = _ReactDOM$findDOMNode.offsetLeft;

    _this3.setState({
      indicatorStyle: {
        left: offsetLeft + 'px',
        width: offsetWidth + 'px'
      }
    });
  };

  this.getActiveTabIndex = function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? _this3.props : arguments[0];
    var state = arguments.length <= 1 || arguments[1] === undefined ? _this3.state : arguments[1];

    return typeof props.activeTabIndex === 'undefined' ? state.activeTabIndex : props.activeTabIndex;
  };

  this.calcTabMoveDistance = function (_ref) {
    var pageX = _ref.pageX;
    var threshold = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    var distance = _this3.state.tabMoveDistance + (pageX - _this3.state.tabStartX);
    var node = _reactDom2.default.findDOMNode(_this3);
    var tabContainer = node.querySelector('.md-tabs-scroll-container');
    var tabs = Array.prototype.slice.call(node.querySelectorAll('.md-tab'));
    var maxWidth = tabs.reduce(function (prev, curr) {
      return prev + curr.offsetWidth;
    }, 0) + threshold;
    maxWidth -= tabContainer.offsetWidth - parseInt(_this3.props.style.marginLeft);

    if (distance > 0) {
      // moving content left
      distance = Math.min(distance, threshold);
    } else {
      // moving content right
      distance = Math.max(distance, -maxWidth);
    }

    return distance;
  };

  this.getHeaderStyle = function (tabMoveDistance) {
    var transform = 'translateX(' + tabMoveDistance + 'px)';
    return {
      WebkitTransform: transform,
      MozTransform: transform,
      transform: transform
    };
  };

  this.handleTabChange = function (tabIndex, tabOnChange, e) {
    var _props2 = _this3.props;
    var activeTabIndex = _props2.activeTabIndex;
    var onChange = _props2.onChange;

    if (tabOnChange) {
      tabOnChange(tabIndex, e);
    }

    if (onChange) {
      onChange(tabIndex, e);
    }

    if (typeof activeTabIndex === 'undefined') {
      _this3.setState({ activeTabIndex: tabIndex });
    }
  };

  this.handleTabScrollStart = function (_ref2) {
    var changedTouches = _ref2.changedTouches;

    _this3.setState({
      tabStartX: changedTouches[0].pageX,
      tabScrolling: true
    });
  };

  this.handleTabScrollMove = function (_ref3) {
    var changedTouches = _ref3.changedTouches;

    var tabMoveDistance = _this3.calcTabMoveDistance(changedTouches[0], 24);
    _this3.setState({ headerStyle: _this3.getHeaderStyle(tabMoveDistance) });
  };

  this.handleTabScrollEnd = function (_ref4) {
    var changedTouches = _ref4.changedTouches;

    var tabMoveDistance = _this3.calcTabMoveDistance(changedTouches[0], 0);
    _this3.setState({
      headerStyle: _this3.getHeaderStyle(tabMoveDistance),
      tabMoveDistance: tabMoveDistance,
      tabScrolling: false
    });
  };

  this.handleSwipeChange = function (index) {
    var _props3 = _this3.props;
    var activeTabIndex = _props3.activeTabIndex;
    var onChange = _props3.onChange;

    if (onChange) {
      onChange(index);
    }

    if (typeof activeTabIndex === 'undefined') {
      _this3.setState({ activeTabIndex: index });
    }
  };
};

exports.default = Tabs;
module.exports = exports['default'];