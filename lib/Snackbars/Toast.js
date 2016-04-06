'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Buttons = require('../Buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toast = function (_Component) {
  _inherits(Toast, _Component);

  function Toast(props) {
    _classCallCheck(this, Toast);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Toast).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Toast, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var toast = _props.toast;
      var dismiss = _props.dismiss;
      var multiline = _props.multiline;

      var props = _objectWithoutProperties(_props, ['className', 'toast', 'dismiss', 'multiline']);

      var text = toast.text;
      var action = toast.action;

      var btnProps = action;
      if (typeof action === 'string') {
        btnProps = {
          label: action,
          onClick: dismiss
        };
      }

      return _react2.default.createElement(
        'section',
        _extends({
          className: (0, _classnames2.default)('md-snackbar', className, {
            'multiline': multiline
          })
        }, props),
        _react2.default.createElement(
          'p',
          null,
          text
        ),
        action && _react2.default.createElement(_Buttons.FlatButton, btnProps)
      );
    }
  }]);

  return Toast;
}(_react.Component);

Toast.propTypes = {
  className: _react.PropTypes.string,
  toast: _react.PropTypes.shape({
    text: _react.PropTypes.string.isRequired,
    action: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
      onClick: _react.PropTypes.func.isRequired,
      label: _react.PropTypes.string.isRequired
    })])
  }).isRequired,
  dismiss: _react.PropTypes.func.isRequired,
  multiline: _react.PropTypes.bool
};
exports.default = Toast;
module.exports = exports['default'];