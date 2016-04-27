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

var _ListItemText = require('./ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A `ListItemControl` component has either a `primaryAction` or a `secondaryAction`.
 * The `primaryAction` can **only** be a `Checkbox`. A `secondaryAction` can either be
 * a `Checkbox`, `Switch`, or a `Reorder` icon.
 */

var ListItemControl = function (_Component) {
  _inherits(ListItemControl, _Component);

  function ListItemControl(props) {
    _classCallCheck(this, ListItemControl);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListItemControl).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(ListItemControl, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var primaryAction = _props.primaryAction;
      var secondaryAction = _props.secondaryAction;
      var primaryText = _props.primaryText;
      var secondaryText = _props.secondaryText;
      var threeLines = _props.threeLines;

      var props = _objectWithoutProperties(_props, ['primaryAction', 'secondaryAction', 'primaryText', 'secondaryText', 'threeLines']);

      var label = _react2.default.createElement(_ListItemText2.default, {
        primaryText: primaryText,
        secondaryText: secondaryText,
        leftIcon: !!primaryAction,
        rightIcon: !!secondaryAction
      });

      var control = _react2.default.cloneElement(primaryAction || secondaryAction, { label: label, labelBefore: !!secondaryAction });
      var className = (0, _classnames2.default)('md-list-item', props.className, {
        'primary-action': !!primaryAction,
        'secondary-action': !!secondaryAction,
        'two-lines': secondaryText && !threeLines,
        'three-lines': threeLines
      });

      return _react2.default.createElement(
        'li',
        _extends({}, props, { className: className }),
        control
      );
    }
  }]);

  return ListItemControl;
}(_react.Component);

ListItemControl.propTypes = {
  /**
   * An optional className to apply to the list item.
   */
  className: _react.PropTypes.string,

  /**
   * The primary text to display in the item.
   */
  primaryText: _react.PropTypes.string.isRequired,

  /**
   * An optional secondary text to display below the `primaryText`. This can
   * be an additional 1 or 2 lines. The text will automatically be ellipsed
   * if it spans more than one line. If the prop `threeLines` is set to true,
   * then the text will automatically be ellipsed if it spans more than two lines.
   */
  secondaryText: _react.PropTypes.node,

  /**
   * Boolean if the `ListItem` should allow three lines of text including
   * the `primaryText`.
   */
  threeLines: _react.PropTypes.bool,

  /**
   * The primary action element for the `ListItemControl`. This should be a `Checkbox`
   * component.
   *
   * The custom validation will warn you about missing both a `primaryAction` and
   * a `secondaryAction` or if you have both a `primaryAction` and a `secondaryAction`.
   */
  primaryAction: function primaryAction(props, propName, component) {
    var primaryAction = props[propName];
    var secondaryAction = props.secondaryAction;
    if (primaryAction && !secondaryAction) {
      return _react.PropTypes.element(props, propName, component);
    } else if (!primaryAction && !secondaryAction) {
      return new Error('Missing required prop \'primaryAction\' or \'secondaryAction\' for the component \'' + component + '\'.');
    } else if (primaryAction && secondaryAction) {
      return new Error('You can not have a \'primaryAction\' and a \'secondaryAction\' prop for the component \'' + component + '\'.');
    }
  },

  /**
   * A secondary action element. This should be either a `Checkbox`, `Switch`, or a
   * `Reorder` icon.
   */
  secondaryAction: _react.PropTypes.element
};
ListItemControl.defaultProps = {
  threeLines: false
};
exports.default = ListItemControl;
module.exports = exports['default'];