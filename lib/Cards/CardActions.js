'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CardExpander = require('./CardExpander');

var _CardExpander2 = _interopRequireDefault(_CardExpander);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardActions = function (_Component) {
  _inherits(CardActions, _Component);

  function CardActions(props, context) {
    _classCallCheck(this, CardActions);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CardActions).call(this, props, context));
  }

  _createClass(CardActions, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var isExpander = _props.isExpander;

      var props = _objectWithoutProperties(_props, ['className', 'children', 'isExpander']);

      return _react2.default.createElement(
        'section',
        _extends({}, props, { className: (0, _classnames2.default)('md-card-actions', className, { 'centered': (0, _utils.isPropEnabled)(props, 'centered') }) }),
        _react2.default.createElement(
          'div',
          { className: 'action-area' },
          children
        ),
        isExpander && _react2.default.createElement(_CardExpander2.default, null)
      );
    }
  }]);

  return CardActions;
}(_react.Component);

CardActions.contextTypes = {
  isExpanded: _react.PropTypes.bool.isRequired,
  onExpandClick: _react.PropTypes.func.isRequired,
  iconClassName: _react.PropTypes.string.isRequired,
  iconChildren: _react.PropTypes.string
};
CardActions.propTypes = {
  isExpander: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  centered: _react.PropTypes.bool
};
exports.default = CardActions;
module.exports = exports['default'];