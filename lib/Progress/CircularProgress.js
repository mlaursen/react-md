'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ROATE_DISTANCE = 360 * 1.75;
var BASE_SIZE = 24; // font-icon font size

var CircularProgress = function (_Component) {
  _inherits(CircularProgress, _Component);

  function CircularProgress(props) {
    _classCallCheck(this, CircularProgress);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CircularProgress).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(CircularProgress, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var scale = _props.scale;
      var className = _props.className;
      var value = _props.value;
      var determinateDashoffset = _props.determinateDashoffset;
      var centered = _props.centered;

      var isDeterminate = typeof value === 'number';
      var circleStyle = void 0,
          svgStyle = void 0;
      if (isDeterminate) {
        var rotate = 'rotate(' + ROATE_DISTANCE / 100 * value + 'deg)';
        circleStyle = {
          strokeDashoffset: determinateDashoffset - determinateDashoffset / 100 * value
        };
        svgStyle = {
          WebkitTransform: rotate,
          MozTransform: rotate,
          transform: rotate
        };
      }
      return _react2.default.createElement(
        'svg',
        {
          className: (0, _classnames2.default)('md-circular-progress', className, {
            'determinate': isDeterminate,
            'indeterminate': !isDeterminate,
            'centered': centered
          }),
          width: scale * BASE_SIZE,
          height: scale * BASE_SIZE,
          viewBox: '0 0 66 66',
          xmlns: 'http://www.w3.org/2000/svg',
          style: svgStyle
        },
        _react2.default.createElement('circle', {
          className: 'md-circular-progress-path',
          strokeWidth: '6',
          strokeLinecap: 'round',
          style: circleStyle,
          cx: '33',
          cy: '33',
          r: '30'
        })
      );
    }
  }]);

  return CircularProgress;
}(_react.Component);

CircularProgress.propTypes = {
  className: _react.PropTypes.string,
  value: _react.PropTypes.number,
  scale: _react.PropTypes.number,
  determinateDashoffset: _react.PropTypes.number.isRequired,
  centered: _react.PropTypes.bool
};
CircularProgress.defaultProps = {
  scale: 1,
  determinateDashoffset: 187,
  centered: true
};
exports.default = CircularProgress;
module.exports = exports['default'];