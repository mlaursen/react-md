'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _Toast = require('./Toast');

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Snackbar = function (_Component) {
  _inherits(Snackbar, _Component);

  function Snackbar(props) {
    _classCallCheck(this, Snackbar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Snackbar).call(this, props));

    _this.getToastActionProps = function (_ref) {
      var action = _ref.action;

      return typeof action === 'string' ? { label: action, onClick: _this.props.dismiss } : action;
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Snackbar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var _this2 = this;

      var toasts = _ref2.toasts;
      var dismiss = _ref2.dismiss;
      var autohide = _ref2.autohide;
      var multiline = _ref2.multiline;
      var autohideTimeout = _ref2.autohideTimeout;
      var fabTimeout = _ref2.fabTimeout;

      if (this.props.toasts.length === toasts.length) {
        return;
      }

      var _toasts = _slicedToArray(toasts, 1);

      var toast = _toasts[0];

      toast && toast.onAppear && toast.onAppear();

      var fixedFAB = document.querySelector('.md-floating-btn.fixed');
      if (fixedFAB) {
        fixedFAB.classList.remove('snackbar-multiline-adjust');
        fixedFAB.classList.remove('snackbar-adjust');
        if (toast) {
          this.fabTimeout = setTimeout(function () {
            fixedFAB.classList.add('snackbar' + (multiline ? '-multiline' : '') + '-adjust');
          }, this.props.toasts.length > 1 ? fabTimeout : 0);
        }
      }

      if (!toast || !autohide || this.toastTimeout) {
        return;
      }

      this.toastTimeout = setTimeout(function () {
        _this2.toastTimeout = null;
        dismiss();
      }, autohideTimeout);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.toastTimeout && clearTimeout(this.toastTimeout);
      this.fabTimeout && clearTimeout(this.fabTimeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var toasts = _props.toasts;
      var dismiss = _props.dismiss;
      var multiline = _props.multiline;

      var props = _objectWithoutProperties(_props, ['className', 'toasts', 'dismiss', 'multiline']);

      var _toasts2 = _slicedToArray(toasts, 1);

      var toast = _toasts2[0];

      return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        {
          className: 'md-snackbar-container',
          transitionName: 'snackbar',
          transitionEnterTimeout: 1200,
          transitionLeaveTimeout: 450
        },
        toast && _react2.default.createElement(_Toast2.default, _extends({
          key: toast.key || Date.now(),
          className: className,
          toast: toast,
          dismiss: dismiss,
          multiline: multiline
        }, props))
      );
    }
  }]);

  return Snackbar;
}(_react.Component);

Snackbar.propTypes = {
  className: _react.PropTypes.string,
  toasts: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    text: _react.PropTypes.string.isRequired,
    key: _react.PropTypes.any,
    action: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
      onClick: _react.PropTypes.func,
      label: _react.PropTypes.string.isRequired
    })]),
    onAppear: _react.PropTypes.func
  })).isRequired,
  autohide: _react.PropTypes.bool,
  autohideTimeout: _react.PropTypes.number,
  dismiss: _react.PropTypes.func.isRequired,
  multiline: _react.PropTypes.bool,
  fabTimeout: _react.PropTypes.number
};
Snackbar.defaultProps = {
  autohide: true,
  autohideTimeout: 3000,
  fabTimeout: 450,
  toasts: []
};
exports.default = Snackbar;
module.exports = exports['default'];