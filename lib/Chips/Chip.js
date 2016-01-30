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

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chip = function (_Component) {
  _inherits(Chip, _Component);

  function Chip(props) {
    _classCallCheck(this, Chip);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Chip).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { focus: false };
    return _this;
  }

  _createClass(Chip, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var label = _props.label;
      var children = _props.children;
      var remove = _props.remove;
      var removeIcon = _props.removeIcon;
      var onClick = _props.onClick;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('md-chip-container', className, { 'md-contact-chip': !!children, 'focus': this.state.focus }) },
        children,
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames2.default)('md-chip', {
              'with-remove': !!remove
            }),
            onClick: onClick,
            onFocus: function onFocus() {
              return _this2.setState({ focus: true });
            },
            onBlur: function onBlur() {
              return _this2.setState({ focus: false });
            }
          },
          label
        ),
        remove && _react2.default.createElement(
          'button',
          { type: 'button', className: 'md-chip-remove', onClick: remove },
          removeIcon
        )
      );
    }
  }]);

  return Chip;
}(_react.Component);

Chip.propTypes = {
  className: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  remove: _react.PropTypes.func,
  label: _react.PropTypes.string.isRequired,
  children: _react.PropTypes.node,
  removeIcon: _react.PropTypes.node.isRequired
};
Chip.defaultProps = {
  removeIcon: _react2.default.createElement(
    _FontIcons2.default,
    { style: { transform: 'rotate(45deg)' } },
    'add_circle'
  )
};
exports.default = Chip;
module.exports = exports['default'];