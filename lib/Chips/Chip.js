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

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Any additional props such as event listeners will be applied
 * to the chip itself, not the chip container.
 */

var Chip = function (_Component) {
  _inherits(Chip, _Component);

  function Chip(props) {
    _classCallCheck(this, Chip);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Chip).call(this, props));

    _this.handleFocus = function (e) {
      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }
      _this.setState({ focus: true });
    };

    _this.handleBlur = function (e) {
      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }
      _this.setState({ focus: false });
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { focus: false };
    return _this;
  }

  _createClass(Chip, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var style = _props.style;
      var className = _props.className;
      var label = _props.label;
      var children = _props.children;
      var remove = _props.remove;
      var removeIconChildren = _props.removeIconChildren;
      var removeIconClassName = _props.removeIconClassName;
      var onClick = _props.onClick;

      var props = _objectWithoutProperties(_props, ['style', 'className', 'label', 'children', 'remove', 'removeIconChildren', 'removeIconClassName', 'onClick']);

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('md-chip-container', className, { 'md-contact-chip': !!children, 'focus': this.state.focus }), style: style },
        children,
        _react2.default.createElement(
          'button',
          _extends({
            type: 'button'
          }, props, {
            className: (0, _classnames2.default)('md-chip', {
              'with-remove': !!remove
            }),
            onClick: onClick,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur
          }),
          label
        ),
        remove && _react2.default.createElement(
          'button',
          { type: 'button', className: 'md-chip-remove', onClick: remove },
          _react2.default.createElement(_FontIcons2.default, { iconClassName: removeIconClassName, children: removeIconChildren })
        )
      );
    }
  }]);

  return Chip;
}(_react.Component);

Chip.propTypes = {
  /**
   * Any style that should be added to the chip container.
   */
  style: _react.PropTypes.object,

  /**
   * An optional className to add to the chip container.
   */
  className: _react.PropTypes.string,

  /**
   * The label to display in the chip.
   */
  label: _react.PropTypes.string.isRequired,

  /**
   * An optional function to call when the chip is clicked.
   */
  onClick: _react.PropTypes.func,

  /**
   * An optional function to call to convert the chip into a removable chip.
   * This will inject a remove icon button into the chip.
   */
  remove: _react.PropTypes.func,

  /**
   * The children to use to display the remove icon button.
   */
  removeIconChildren: _react.PropTypes.node,

  /**
   * The icon className to use to display the remove icon button.
   */
  removeIconClassName: _react.PropTypes.string,

  /**
   * An optional function to call when the chip is focused.
   */
  onFocus: _react.PropTypes.func,

  /**
   * An optional function to call when the chip is blurred.
   */
  onBlur: _react.PropTypes.func,

  /**
   * This should be an Avatar component that will be injected before the
   * label in the chip.
   */
  children: _react.PropTypes.node
};
Chip.defaultProps = {
  removeIconChildren: 'add_circle',
  removeIconClassName: 'material-icons rotate-45-deg'
};
exports.default = Chip;
module.exports = exports['default'];