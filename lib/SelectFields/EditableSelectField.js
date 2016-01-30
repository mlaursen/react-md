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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _js = require('../../../src/js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditableSelectField = function (_Component) {
  _inherits(EditableSelectField, _Component);

  function EditableSelectField(props) {
    _classCallCheck(this, EditableSelectField);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EditableSelectField).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(EditableSelectField, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var focused = _props.focused;
      var value = _props.value;

      var props = _objectWithoutProperties(_props, ['focused', 'value']);

      return _react2.default.createElement(
        'label',
        {
          className: (0, _classnames2.default)('md-select-field-container', {
            'focus': focused,
            'segmented': isPropEnabled(props, 'segmented')
          })
        },
        _react2.default.createElement('input', _extends({
          type: 'text',
          name: name,
          value: this.getLabel(),
          readOnly: !isPropEnabled(props, 'editable'),
          className: 'md-select-field',
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onClick: this.toggleMenu,
          handleKeyUp: this.handleInputKeyUp
        }, props)),
        _react2.default.createElement(
          _js.FontIcon,
          null,
          'arrow_drop_down'
        )
      );
    }
  }]);

  return EditableSelectField;
}(_react.Component);

EditableSelectField.propTypes = {
  focused: _react.PropTypes.bool.isRequired,
  value: _react.PropTypes.string.isRequired
};
exports.default = EditableSelectField;
module.exports = exports['default'];