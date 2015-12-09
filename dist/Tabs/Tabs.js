'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _PropUtils = require('../utils/PropUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = (function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      activeTabIndex: 0
    };
    _this.slide = null;
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.slide = _reactDom2.default.findDOMNode(this.refs.slide);
      var tabs = _reactDom2.default.findDOMNode(this).querySelectorAll('.md-tab');
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        if (tab.classList.contains('active')) {
          this.slide.style.width = tab.offsetWidth + 'px';
          return;
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var prevTabIndex = this.getActiveTabIndex({ props: prevProps, state: prevState });
      var activeTabIndex = this.getActiveTabIndex();
      if (prevTabIndex === activeTabIndex) {
        return;
      }
      var tab = this.getActiveTab();
      this.slide.style.width = tab.offsetWidth + 'px';
      this.slide.style.left = tab.offsetLeft + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['children', 'className']);

      var activeTabIndex = this.getActiveTabIndex();

      var tabContent = null;
      var tabs = _react2.default.Children.map(children, function (tab, i) {
        var isActive = i === activeTabIndex;
        if (isActive) {
          tabContent = _react2.default.createElement(
            'div',
            { className: 'md-tab-content', key: i },
            tab.props.children
          );
        }

        return _react2.default.cloneElement(tab, {
          key: i,
          valueLink: {
            checked: isActive,
            requestChange: _this2.handleTabChange.bind(_this2, i, tab)
          }
        });
      });

      var tabsClassName = (0, _classnames2.default)('md-tabs', {
        'md-tabs-primary': (0, _PropUtils.isPropEnabled)(this.props, 'primary'),
        'md-tabs-secondary': (0, _PropUtils.isPropEnabled)(this.props, 'secondary')
      });
      return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        _extends({}, props, { className: (0, _classnames2.default)('md-tabs-container', className) }),
        _react2.default.createElement(
          'ul',
          { className: tabsClassName },
          tabs,
          _react2.default.createElement('span', { className: 'slide', ref: 'slide' })
        ),
        tabContent
      );
    }
  }]);

  return Tabs;
})(_react.Component);

Tabs.propTypes = {
  children: _react.PropTypes.node,
  activeTabIndex: _react.PropTypes.number,
  className: _react.PropTypes.string,
  onTabChange: _react.PropTypes.func,
  component: _react.PropTypes.string,
  transitionEnterTimeout: _react.PropTypes.number,
  transitionLeaveTimeout: _react.PropTypes.number,
  transitionEnter: _react.PropTypes.bool,
  transitionLeave: _react.PropTypes.bool,
  transitionName: _react.PropTypes.string,
  primary: _react.PropTypes.bool,
  secondary: _react.PropTypes.bool
};
Tabs.defaultProps = {
  transitionEnterTimeout: 150,
  transitionLeaveTimeout: 0,
  transitionEnter: true,
  transitionLeave: false,
  transitionName: 'tab',
  component: 'div'
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getActiveTab = function () {
    return _reactDom2.default.findDOMNode(_this3).querySelector('.md-tab.active');
  };

  this.getActiveTabIndex = function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? _this3 : arguments[0];

    var props = _ref.props;
    var state = _ref.state;

    return typeof props.activeTabIndex === 'number' ? props.activeTabIndex : state.activeTabIndex;
  };

  this.handleTabChange = function (i, tab) {
    _this3.props.onTabChange && _this3.props.onTabChange(i, tab);
    if (!_this3.props.activeTabIndex) {
      _this3.setState({ activeTabIndex: i });
    }
  };
};

exports.default = Tabs;
module.exports = exports['default'];
//# sourceMappingURL=Tabs.js.map