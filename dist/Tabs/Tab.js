'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = (function (_Component) {
  _inherits(Tab, _Component);

  function Tab(props) {
    _classCallCheck(this, Tab);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { wrapped: props.label.length > 33 };
    return _this;
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var label = _props.label;
      var className = _props.className;
      var valueLink = _props.valueLink;

      var props = _objectWithoutProperties(_props, ['label', 'className', 'valueLink']);

      return _react2.default.createElement(
        'li',
        _extends({ className: (0, _classnames2.default)('md-tab', className, { 'active': valueLink.checked, 'wrapped': this.state.wrapped }) }, props),
        _react2.default.createElement(
          'label',
          { className: 'md-tab-label' },
          label,
          _react2.default.createElement('input', { type: 'radio', className: 'hidden', name: 'md-tabs', valueLink: valueLink })
        )
      );
    }
  }]);

  return Tab;
})(_react.Component);

Tab.propTypes = {
  label: _react.PropTypes.string.isRequired,
  valueLink: _react.PropTypes.shape({
    checked: _react.PropTypes.bool.isRequired,
    requestChange: _react.PropTypes.func.isRequired
  }),
  className: _react.PropTypes.string
};
exports.default = Tab;
module.exports = exports['default'];
//# sourceMappingURL=Tab.js.map