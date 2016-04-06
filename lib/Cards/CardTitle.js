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

var _CardExpander = require('./CardExpander');

var _CardExpander2 = _interopRequireDefault(_CardExpander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardTitle = function (_Component) {
  _inherits(CardTitle, _Component);

  function CardTitle(props) {
    _classCallCheck(this, CardTitle);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CardTitle).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(CardTitle, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var title = _props.title;
      var subtitle = _props.subtitle;
      var avatar = _props.avatar;
      var className = _props.className;
      var children = _props.children;
      var isExpander = _props.isExpander;

      var props = _objectWithoutProperties(_props, ['title', 'subtitle', 'avatar', 'className', 'children', 'isExpander']);

      return _react2.default.createElement(
        'div',
        _extends({}, props, { className: (0, _classnames2.default)('md-card-title', className, { 'title-large': !!avatar, 'card-expander': isExpander }) }),
        avatar,
        _react2.default.createElement(
          'div',
          { className: 'titles' },
          _react2.default.createElement(
            'h2',
            { className: 'md-headline' },
            title
          ),
          subtitle && _react2.default.createElement(
            'h3',
            { className: 'md-subheader' },
            subtitle
          )
        ),
        children,
        isExpander && _react2.default.createElement(_CardExpander2.default, null)
      );
    }
  }]);

  return CardTitle;
}(_react.Component);

CardTitle.propTypes = {
  title: _react.PropTypes.string.isRequired,
  subtitle: _react.PropTypes.string,
  className: _react.PropTypes.string,
  avatar: _react.PropTypes.node,
  children: _react.PropTypes.node,
  isExpander: _react.PropTypes.bool
};
CardTitle.defaultProps = {
  avatar: null
};
exports.default = CardTitle;
module.exports = exports['default'];