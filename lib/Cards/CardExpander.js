'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Buttons = require('../Buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardExpander = function (_Component) {
  _inherits(CardExpander, _Component);

  function CardExpander(props, context) {
    _classCallCheck(this, CardExpander);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CardExpander).call(this, props, context));
  }

  _createClass(CardExpander, [{
    key: 'render',
    value: function render() {
      var _context = this.context;
      var isExpanded = _context.isExpanded;
      var onExpandClick = _context.onExpandClick;
      var iconClassName = _context.iconClassName;
      var iconChildren = _context.iconChildren;

      return _react2.default.createElement(_Buttons.IconButton, {
        className: (0, _classnames2.default)('md-card-expander', {
          'flipped': isExpanded
        }),
        onClick: onExpandClick,
        iconClassName: iconClassName,
        children: iconChildren
      });
    }
  }]);

  return CardExpander;
}(_react.Component);

CardExpander.contextTypes = {
  isExpanded: _react.PropTypes.bool.isRequired,
  onExpandClick: _react.PropTypes.func.isRequired,
  iconClassName: _react.PropTypes.string.isRequired,
  iconChildren: _react.PropTypes.string
};
exports.default = CardExpander;
module.exports = exports['default'];