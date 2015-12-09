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

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardActionOverlay = (function (_Component) {
  _inherits(CardActionOverlay, _Component);

  function CardActionOverlay(props) {
    _classCallCheck(this, CardActionOverlay);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CardActionOverlay).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(CardActionOverlay, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var title = _props.title;
      var subtitle = _props.subtitle;
      var actions = _props.actions;

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_index.CardTitle, { title: title, subtitle: subtitle }),
        _react2.default.createElement(
          _index.CardActions,
          null,
          actions.map(function (actionProps, i) {
            var isDefault = !actionProps.primary && !actionProps.secondary;
            return _react2.default.createElement(_index.FlatButton, _extends({ 'default': isDefault, key: i }, actionProps));
          })
        )
      );
    }
  }]);

  return CardActionOverlay;
})(_react.Component);

CardActionOverlay.propTypes = {
  title: _react.PropTypes.string,
  subtitle: _react.PropTypes.string,
  actions: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    default: _react.PropTypes.bool,
    primary: _react.PropTypes.bool,
    secondary: _react.PropTypes.bool,
    children: _react.PropTypes.node.isRequired
  }))
};
exports.default = CardActionOverlay;
module.exports = exports['default'];
//# sourceMappingURL=CardActionOverlay.js.map