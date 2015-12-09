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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardMedia = (function (_Component) {
  _inherits(CardMedia, _Component);

  function CardMedia(props) {
    _classCallCheck(this, CardMedia);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CardMedia).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(CardMedia, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var overlay = _props.overlay;
      var children = _props.children;
      var forceAspect = _props.forceAspect;
      var aspectRatio = _props.aspectRatio;

      var props = _objectWithoutProperties(_props, ['className', 'overlay', 'children', 'forceAspect', 'aspectRatio']);

      return _react2.default.createElement(
        'section',
        _extends({}, props, { className: (0, _classnames3.default)('md-card-media', className, _defineProperty({}, 'md-media-' + aspectRatio.replace(':', '-'), forceAspect)) }),
        children,
        overlay && _react2.default.createElement(
          'div',
          { className: 'md-card-media-overlay' },
          overlay
        )
      );
    }
  }]);

  return CardMedia;
})(_react.Component);

CardMedia.propTypes = {
  className: _react.PropTypes.string,
  overlay: _react.PropTypes.node,
  children: _react.PropTypes.node,
  forceAspect: _react.PropTypes.bool,
  aspectRatio: function aspectRatio(props, propName) {
    if (!/[0-9]+:[0-9]+/.test(props[propName])) {
      return new Error('\'' + props[propName] + '\' is not a valid aspect ratio. It must be formatted as \'x:x\'.');
    }
  }
};
CardMedia.defaultProps = {
  forceAspect: true,
  aspectRatio: '16:9'
};
exports.default = CardMedia;
module.exports = exports['default'];
//# sourceMappingURL=CardMedia.js.map