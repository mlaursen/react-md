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

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _Inks = require('../Inks');

var _Inks2 = _interopRequireDefault(_Inks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectFieldButton = function (_Component) {
  _inherits(SelectFieldButton, _Component);

  function SelectFieldButton(props) {
    _classCallCheck(this, SelectFieldButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectFieldButton).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(SelectFieldButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var label = _props.label;
      var name = _props.name;
      var value = _props.value;
      var isOpen = _props.isOpen;
      var isBelow = _props.isBelow;

      var props = _objectWithoutProperties(_props, ['label', 'name', 'value', 'isOpen', 'isBelow']);

      return _react2.default.createElement(
        'button',
        _extends({
          type: 'button'
        }, props),
        _react2.default.createElement('input', {
          type: 'hidden',
          className: 'md-select-field-input',
          name: name,
          readOnly: true,
          value: value
        }),
        _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            component: 'div',
            transitionName: 'drop',
            transitionEnterTimeout: 450,
            transitionLeave: false,
            className: (0, _classnames2.default)('icon-separator', { 'menu-below': isBelow })
          },
          _react2.default.createElement(
            'span',
            { key: label, className: 'text' },
            label
          ),
          _react2.default.createElement(
            _FontIcons2.default,
            { className: isOpen ? 'flipped' : '' },
            'arrow_drop_down'
          )
        ),
        !isBelow && _react2.default.createElement('hr', { className: 'md-divider' }),
        _react2.default.createElement(_Inks2.default, { key: 'ink' })
      );
    }
  }]);

  return SelectFieldButton;
}(_react.Component);

SelectFieldButton.propTypes = {
  label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
  className: _react.PropTypes.string.isRequired,
  onClick: _react.PropTypes.func.isRequired,
  onFocus: _react.PropTypes.func.isRequired,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
  name: _react.PropTypes.string,
  isOpen: _react.PropTypes.bool.isRequired,
  isBelow: _react.PropTypes.bool.isRequired
};
exports.default = SelectFieldButton;
module.exports = exports['default'];