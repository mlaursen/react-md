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

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _Inks = require('../Inks');

var _Inks2 = _interopRequireDefault(_Inks);

var _Tooltips = require('../Tooltips');

var _Tooltips2 = _interopRequireDefault(_Tooltips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `IconButton` component automatically includes ink and a tooltip.
 * The tooltip will only be included if the `tooltipLabel` prop is given.
 *
 * Any other props (such as style or event listeners) will also be
 * applied.
 */

var IconButton = function (_Component) {
  _inherits(IconButton, _Component);

  function IconButton(props) {
    _classCallCheck(this, IconButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IconButton).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(IconButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var iconClassName = _props.iconClassName;
      var children = _props.children;
      var className = _props.className;
      var href = _props.href;
      var type = _props.type;
      var tooltip = _props.tooltip;
      var disabled = _props.disabled;
      var ink = _props.ink;

      var props = _objectWithoutProperties(_props, ['iconClassName', 'children', 'className', 'href', 'type', 'tooltip', 'disabled', 'ink']);

      var btnProps = _extends({}, props, {
        disabled: disabled,
        className: (0, _classnames2.default)('md-btn md-icon-btn', className)
      });

      if (href) {
        btnProps.href = href;
      } else {
        btnProps.type = type;
      }

      var displayedChildren = children;
      if (!(children && children.type && children.type === _FontIcons2.default)) {
        displayedChildren = _react2.default.createElement(
          _FontIcons2.default,
          { key: 'icon', iconClassName: iconClassName },
          children
        );
      }

      return _react2.default.createElement(href ? 'a' : 'button', btnProps, [ink, displayedChildren, tooltip]);
    }
  }]);

  return IconButton;
}(_react.Component);

IconButton.propTypes = {
  /**
   * The className to use for rendering the `FontIcon`.
   */
  iconClassName: _react.PropTypes.string,

  /**
   * Any children to use to render the `FontIcon`.
   */
  children: _react.PropTypes.node,

  /**
   * An optional className to apply to the button.
   */
  className: _react.PropTypes.string,

  /**
   * The button type.
   */
  type: _react.PropTypes.string,

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
  onClick: _react.PropTypes.func,

  /**
   * An optional label to use if you would like a tooltip to display
   * on hover or touch hold.
   */
  tooltipLabel: _react.PropTypes.string,

  /**
   * The position that the tooltip should be displayed relative to
   * the button.
   */
  tooltipPosition: _react.PropTypes.oneOf(['left', 'right', 'bottom', 'left']),

  /**
   * An optional amount of delay before the tooltip appears.
   */
  tooltipDelay: _react.PropTypes.number,

  // Injected from injectInk
  ink: _react.PropTypes.node,

  // Inject from injectTooltip
  tooltip: _react.PropTypes.node
};
IconButton.defaultProps = {
  type: 'button'
};
exports.default = (0, _Tooltips2.default)((0, _Inks2.default)(IconButton));
module.exports = exports['default'];