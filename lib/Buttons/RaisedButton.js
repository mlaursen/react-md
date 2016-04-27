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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Any other props such as style or event listeners will also
 * be applied to the button.
 */

var RaisedButton = function (_Component) {
  _inherits(RaisedButton, _Component);

  function RaisedButton(props) {
    _classCallCheck(this, RaisedButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RaisedButton).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(RaisedButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['className']);

      return _react2.default.createElement(_Button2.default, _extends({}, props, { className: (0, _classnames2.default)('md-raised-btn', className) }));
    }
  }]);

  return RaisedButton;
}(_react.Component);

RaisedButton.propTypes = {
  /**
   * The label to display in the button.
   */
  label: _react.PropTypes.string.isRequired,

  /**
   * An optional className to apply to the button.
   */
  className: _react.PropTypes.string,

  /**
   * Boolean if the icon should be displayed before the label.
   */
  iconBefore: _react.PropTypes.bool,

  /**
   * A `FontIcon` to display in the button. It can be placed before
   * or after the label.
   */
  children: _react.PropTypes.node,

  /**
   * The button type.
   */
  type: _react.PropTypes.string,

  /**
   * Boolean if the button should be styled with the primary color.
   */
  primary: _react.PropTypes.bool,

  /**
   * Boolean if the button should be styled with the secondary color.
   */
  secondary: _react.PropTypes.bool,

  /**
   * Boolean if the button is disabled.
   */
  disabled: _react.PropTypes.bool,

  /**
   * An optional href to convert the button into a link button.
   */
  href: _react.PropTypes.string,

  /**
   * An optional function to call when the button is clicked.
   */
  onClick: _react.PropTypes.func
};
RaisedButton.defaultProps = {
  type: 'button',
  iconBefore: true
};
exports.default = RaisedButton;
module.exports = exports['default'];