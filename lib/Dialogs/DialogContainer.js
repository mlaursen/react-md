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

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DialogContainer = function (_Component) {
  _inherits(DialogContainer, _Component);

  function DialogContainer(props) {
    _classCallCheck(this, DialogContainer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DialogContainer).call(this, props));

    _this.getTransformOrigin = function (pageX, pageY) {
      if (!pageX || !pageY) {
        return;
      }
      return pageX - window.scrollX + 'px ' + (pageY - window.scrollY) + 'px';
    };

    _this.delayIsOpen = function (time) {
      var timeout = setTimeout(function () {
        _this.setState({ openClassName: false, timeout: null });
      }, time);

      _this.setState({ timeout: timeout, openClassName: true });
    };

    _this.openFullPageDialog = function (_ref) {
      var pageX = _ref.pageX;
      var pageY = _ref.pageY;

      _this.setState({ transformOrigin: _this.getTransformOrigin(pageX, pageY) });
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { openClassName: props.isOpen };
    return _this;
  }

  _createClass(DialogContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.isOpen && nextProps.isOpen) {
        (0, _utils.setOverflow)(true);
        if (nextProps.pageX && nextProps.pageY) {
          this.openFullPageDialog(nextProps);
        }
      } else if (this.props.isOpen && !nextProps.isOpen) {
        (0, _utils.setOverflow)(false);
        this.delayIsOpen(nextProps.transitionLeaveTimeout);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _utils.setOverflow)(false);
      this.state.timeout && clearTimeout(this.state.timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var actions = _props.actions;
      var isOpen = _props.isOpen;
      var title = _props.title;
      var children = _props.children;
      var className = _props.className;
      var contentClassName = _props.contentClassName;
      var containerClassName = _props.containerClassName;
      var close = _props.close;
      var actionLeft = _props.actionLeft;
      var actionRight = _props.actionRight;
      var style = _props.style;
      var transitionName = _props.transitionName;
      var transitionEnter = _props.transitionEnter;
      var transitionEnterTimeout = _props.transitionEnterTimeout;
      var transitionLeave = _props.transitionLeave;
      var transitionLeaveTimeout = _props.transitionLeaveTimeout;

      var props = _objectWithoutProperties(_props, ['actions', 'isOpen', 'title', 'children', 'className', 'contentClassName', 'containerClassName', 'close', 'actionLeft', 'actionRight', 'style', 'transitionName', 'transitionEnter', 'transitionEnterTimeout', 'transitionLeave', 'transitionLeaveTimeout']);

      var isSimple = !actions;

      var isFullPage = !!actionLeft || !!actionRight;
      return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        {
          transitionName: transitionName,
          transitionEnter: transitionEnter,
          transitionEnterTimeout: transitionEnterTimeout,
          transisionLeave: transitionLeave,
          transitionLeaveTimeout: transitionLeaveTimeout,
          className: (0, _classnames2.default)('md-dialog-container', containerClassName, {
            'open': isOpen || this.state.openClassName,
            'simple': isSimple,
            'dialog-centered': !isFullPage
          })
        },
        isOpen && _react2.default.createElement(_Dialog2.default, _extends({
          key: 'dialog',
          title: title,
          children: children,
          className: className,
          contentClassName: contentClassName,
          actions: actions,
          actionLeft: actionLeft,
          actionRight: actionRight,
          style: style,
          transformOrigin: this.state.transformOrigin,
          isSimple: isSimple,
          isFullPage: isFullPage
        }, props)),
        _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            transitionName: 'md-overlay',
            transitionEnterTimeout: 150,
            transitionLeaveTimeout: transitionLeaveTimeout
          },
          isOpen && _react2.default.createElement('div', {
            key: 'overlay',
            className: 'md-overlay',
            onClick: (0, _utils.isPropEnabled)(props, 'modal') ? null : close
          })
        )
      );
    }
  }]);

  return DialogContainer;
}(_react.Component);

DialogContainer.propTypes = {
  isOpen: _react.PropTypes.bool.isRequired,
  close: _react.PropTypes.func.isRequired,
  children: _react.PropTypes.node,
  title: _react.PropTypes.string,
  actions: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  actionLeft: _react.PropTypes.node,
  actionRight: _react.PropTypes.node,
  className: _react.PropTypes.string,
  contentClassName: _react.PropTypes.string,
  containerClassName: _react.PropTypes.string,
  modal: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  pageX: _react.PropTypes.number,
  pageY: _react.PropTypes.number,
  transitionName: _react.PropTypes.string.isRequired,
  transitionEnter: _react.PropTypes.bool,
  transitionEnterTimeout: _react.PropTypes.number,
  transitionLeave: _react.PropTypes.bool,
  transitionLeaveTimeout: _react.PropTypes.number,
  onlyChildren: _react.PropTypes.bool
};
DialogContainer.defaultProps = {
  transitionName: 'md-dialog',
  transitionEnter: true,
  transitionEnterTimeout: 300,
  transitionLeave: true,
  transitionLeaveTimeout: 300
};
exports.default = DialogContainer;
module.exports = exports['default'];