'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      indicatorStyle: {},
      touchDistance: 0
    };

    if (typeof props.value === 'undefined') {
      var _React$Children$toArr = _react2.default.Children.toArray(props.children)[0].props;

      var label = _React$Children$toArr.label;
      var value = _React$Children$toArr.value;

      _this.state.value = props.defaultValue || (typeof value !== 'undefined' ? value : label);
    }

    if ((0, _utils.isPropEnabled)(props, 'slide')) {
      _this.state.tabsContent = _this.getSlideTabContent(props);
    } else {
      _this.state.tabsContent = _this.getActiveTabContent(props, _this.state);
    }
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateIndicator();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextState) {
      if (this.props.children !== nextProps.children) {
        var newNextState = {};
        if ((0, _utils.isPropEnabled)(nextProps, 'slide')) {
          newNextState.tabsContent = this.getSlideTabContent(nextProps);
        } else {
          newNextState.tabsContent = this.getActiveTabContent(nextProps, nextState);
        }

        this.setState(newNextState);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (!(0, _utils.isPropEnabled)(nextProps, 'slide') && this.getValue() !== this.getValue(nextProps, nextState)) {
        nextState.tabsContent = this.getActiveTabContent(nextProps, nextState);
        this.setState(nextState);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var value = this.getValue();
      var prevValue = this.getValue(prevProps, prevState);
      if (value === prevValue) {
        return;
      }

      this.updateIndicator();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var indicatorStyle = _state.indicatorStyle;
      var tabsContent = _state.tabsContent;
      var tabTransform = _state.tabTransform;
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var tabsOffset = _props.tabsOffset;
      var scrollIconLeft = _props.scrollIconLeft;
      var scrollIconRight = _props.scrollIconRight;

      var props = _objectWithoutProperties(_props, ['className', 'children', 'tabsOffset', 'scrollIconLeft', 'scrollIconRight']);

      var _props2 = props;
      var transitionName = _props2.transitionName;
      var transitionEnter = _props2.transitionEnter;
      var transitionEnterTimeout = _props2.transitionEnterTimeout;
      var transitionLeave = _props2.transitionLeave;
      var transitionLeaveTimeout = _props2.transitionLeaveTimeout;

      var remainingProps = _objectWithoutProperties(_props2, ['transitionName', 'transitionEnter', 'transitionEnterTimeout', 'transitionLeave', 'transitionLeaveTimeout']);

      var isScrollable = (0, _utils.isPropEnabled)(remainingProps, 'scrollable');

      var tabs = _react2.default.Children.map(children, function (tab, i) {
        return _react2.default.cloneElement(tab, {
          key: tab.key || 'tab-' + i,
          checked: _this2.isTabChecked(tab.props),
          onChange: _this2.handleTabChange.bind(_this2, tab.props)
        });
      });

      return _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames2.default)('md-tabs-container', className) }, remainingProps),
        _react2.default.createElement(
          'header',
          {
            className: (0, _classnames2.default)('md-tabs-scroll-container', {
              'md-primary': (0, _utils.isPropEnabled)(remainingProps, 'primary'),
              'md-secondary': (0, _utils.isPropEnabled)(remainingProps, 'secondary')
            }),
            ref: 'scrollContainer'
          },
          _react2.default.createElement(
            'ul',
            {
              ref: 'tabs',
              className: (0, _classnames2.default)('md-tabs', {
                'fixed-width': (0, _utils.isPropEnabled)(remainingProps, 'fixedWidth'),
                'tabs-scrollable': isScrollable,
                'tabs-centered': !isScrollable && (0, _utils.isPropEnabled)(remainingProps, 'centered')
              }),
              onTouchStart: this.handleTouchStart,
              onTouchMove: this.handleTouchMove,
              onTouchEnd: this.handleTouchEnd,
              style: { marginLeft: tabsOffset, transform: tabTransform }
            },
            tabs,
            _react2.default.createElement('span', { className: 'md-tab-indicator', style: indicatorStyle })
          )
        ),
        _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            className: 'md-tab-content-container',
            transitionName: transitionName,
            transitionEnter: transitionEnter,
            transitionEnterTimeout: transitionEnterTimeout,
            transitionLeave: transitionLeave,
            transitionLeaveTimeout: transitionLeaveTimeout
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
  children: _react.PropTypes.node,
  primary: _react.PropTypes.bool,
  secondary: _react.PropTypes.bool,
  defaultValue: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.string,
  transitionName: _react.PropTypes.string,
  transitionEnter: _react.PropTypes.bool,
  transitionEnterTimeout: _react.PropTypes.number,
  transitionLeave: _react.PropTypes.bool,
  transitionLeaveTimeout: _react.PropTypes.number,
  fixedWidth: _react.PropTypes.bool,
  scrollable: _react.PropTypes.bool,
  centered: _react.PropTypes.bool,
  slide: _react.PropTypes.bool,
  tabsOffset: _react.PropTypes.string,
  scrollIconLeft: _react.PropTypes.node,
  scrollIconRight: _react.PropTypes.node
};
Tabs.defaultProps = {
  transitionName: 'opacity',
  transitionEnterTimeout: 150,
  transitionLeave: false,
  isMobile: _utils.isMobile,
  scrollIconLeft: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'chevron_left'
  ),
  scrollIconRight: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'chevron_right'
  )
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleTouchStart = function (_ref) {
    var changedTouches = _ref.changedTouches;

    _this3.setState({ touchStart: changedTouches[0].pageX });
  };

  this.handleTouchMove = function (_ref2) {
    var changedTouches = _ref2.changedTouches;

    var touchDistance = _this3.moveTabs(changedTouches[0], 20);
    _this3.setState({
      tabTransform: 'translate3d(' + touchDistance + 'px, 0, 0)'
    });
  };

  this.handleTouchEnd = function (_ref3) {
    var changedTouches = _ref3.changedTouches;

    var touchDistance = _this3.moveTabs(changedTouches[0]);
    _this3.setState({
      touchDistance: touchDistance,
      tabTransform: 'translate3d(' + touchDistance + 'px, 0, 0)'
    });
  };

  this.handleTabChange = function (_ref4) {
    var value = _ref4.value;
    var label = _ref4.label;
    var onChange = _ref4.onChange;

    var params = { label: label };
    if (typeof value !== 'undefined') {
      params.value = value;
    }

    if (onChange) {
      onChange.apply(undefined, _toConsumableArray(params));
    }

    if (_this3.props.onChange) {
      var _props3;

      (_props3 = _this3.props).onChange.apply(_props3, _toConsumableArray(params));
    }

    if (typeof _this3.props.value === 'undefined') {
      _this3.setState({ value: value || label });
    }
  };

  this.getValue = function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? _this3.props : arguments[0];
    var state = arguments.length <= 1 || arguments[1] === undefined ? _this3.state : arguments[1];

    return (typeof props.value !== 'undefined' ? props : state).value;
  };

  this.getSlideTabContent = function () {
    var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? _this3.props : arguments[0];

    var children = _ref5.children;

    return _react2.default.Children.map(children, function (tab, i) {
      return _react2.default.createElement(
        'div',
        {
          className: 'md-tab-content',
          key: 'tab-content-' + i
        },
        tab.props.children
      );
    });
  };

  this.getActiveTabContent = function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? _this3.props : arguments[0];
    var state = arguments.length <= 1 || arguments[1] === undefined ? _this3.state : arguments[1];

    var value = _this3.getValue(props, state);
    var content = undefined;
    _react2.default.Children.toArray(props.children).some(function (_ref6) {
      var props = _ref6.props;

      var isActive = value === (props.value || props.label);
      if (isActive) {
        content = props.children;
      }
      return isActive;
    });
    return content;
  };

  this.isTabChecked = function (_ref7) {
    var checked = _ref7.checked;
    var label = _ref7.label;
    var value = _ref7.value;

    if (typeof checked !== 'undefined') {
      return checked;
    }
    var stateValue = _this3.state.value;

    var tabValue = typeof value !== 'undefined' ? value : label;
    return stateValue === tabValue;
  };

  this.updateIndicator = function () {
    var _refs$tabs$querySelec = _this3.refs.tabs.querySelector('.md-tab.active');

    var offsetWidth = _refs$tabs$querySelec.offsetWidth;
    var offsetLeft = _refs$tabs$querySelec.offsetLeft;

    _this3.setState({
      indicatorStyle: {
        left: offsetLeft + 'px',
        width: offsetWidth + 'px'
      }
    });
  };

  this.moveTabs = function (_ref8) {
    var pageX = _ref8.pageX;
    var threshold = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    var distance = _this3.state.touchDistance + (pageX - _this3.state.touchStart);
    var tabs = Array.prototype.slice.call(_this3.refs.tabs.querySelectorAll('.md-tab'));
    var maxWidth = tabs.reduce(function (prev, curr) {
      return prev + curr.clientWidth;
    }, 0) + threshold - _this3.refs.tabs.clientWidth - parseInt(_this3.props.tabsOffset);

    if (distance > 0) {
      distance = Math.min(distance, threshold);
    } else {
      distance = Math.max(distance, -maxWidth);
    }

    return distance;
  };
};

exports.default = Tabs;
module.exports = exports['default'];