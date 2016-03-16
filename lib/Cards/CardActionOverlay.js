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

var _CardTitle = require('./CardTitle');

var _CardTitle2 = _interopRequireDefault(_CardTitle);

var _CardActions = require('./CardActions');

var _CardActions2 = _interopRequireDefault(_CardActions);

var _Buttons = require('../Buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardActionOverlay = function (_Component) {
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
      var actions = _props.actions;

      var titleProps = _objectWithoutProperties(_props, ['actions']);

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_CardTitle2.default, titleProps),
        _react2.default.createElement(
          _CardActions2.default,
          null,
          actions.map(function (actionProps, i) {
            return _react2.default.createElement(_Buttons.FlatButton, _extends({ key: i }, actionProps));
          })
        )
      );
    }
  }]);

  return CardActionOverlay;
}(_react.Component);

CardActionOverlay.propTypes = {
  title: _react.PropTypes.string,
  subtitle: _react.PropTypes.string,
  actions: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string.isRequired
  })),
  children: _react.PropTypes.node
};
exports.default = CardActionOverlay;
module.exports = exports['default'];