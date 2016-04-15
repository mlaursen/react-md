'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keyCodes = require('../constants/keyCodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DESKTOP_FONT_SIZE = 10;
var MOBILE_FONT_SIZE = 14;
var DESKTOP_MARGIN = 14;
var MOBILE_MARGIN = 24;

exports.default = function (ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(Tooltip, _Component);

    function Tooltip(props) {
      _classCallCheck(this, Tooltip);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).call(this, props));

      _this.hackChromeMinimumFontSize = function () {
        var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        var fontSize = parseInt(window.getComputedStyle(_this.refs.tooltipText).getPropertyValue('font-size'));

        var mobile = fontSize === MOBILE_FONT_SIZE;
        var state = { mobile: mobile };
        if (isChrome && !mobile) {
          var transform = 'scale(' + DESKTOP_FONT_SIZE / fontSize + ')';
          state.textStyle = {
            WebkitTransform: transform,
            transform: transform,
            transformOrigin: '51% 50%' };
        }

        // hack for non blurred text
        _this.setState(state);
      };

      _this.calcPositioningStyle = function () {
        var tooltipPosition = _this.props.tooltipPosition;

        var margin = _this.state.mobile ? MOBILE_MARGIN : DESKTOP_MARGIN;
        var control = _reactDom2.default.findDOMNode(_this);
        var controlHeight = control.offsetHeight;
        var controlWidth = control.offsetWidth;
        var tooltip = _this.refs.tooltip;

        var tooltipWidth = tooltip.offsetWidth;
        var tooltipHeight = tooltip.offsetHeight;

        var top = undefined,
            right = undefined,
            bottom = undefined,
            left = undefined;
        if (tooltipPosition === 'top' || tooltipPosition === 'bottom') {
          left = controlWidth / 2 - tooltipWidth / 2;
        } else {
          // LEFT || RIGHT
          top = controlHeight / 2 - tooltipHeight / 2;
        }

        switch (tooltipPosition) {
          case 'top':
            top = -(tooltipHeight + margin);
            break;
          case 'right':
            left = controlWidth + margin;
            break;
          case 'bottom':
            top = margin + controlHeight;
            break;
          default:
            left = -(tooltipWidth + margin);
        }

        return {
          top: top,
          right: right,
          bottom: bottom,
          left: left
        };
      };

      _this.setActive = function (key) {
        if (!_this.props.tooltipLabel || _this.state.timeout) {
          return;
        }

        var timeout = setTimeout(function () {
          var _this$setState;

          _this.setState((_this$setState = {}, _defineProperty(_this$setState, key, true), _defineProperty(_this$setState, 'style', _this.calcPositioningStyle()), _defineProperty(_this$setState, 'timeout', null), _this$setState));
        }, _this.props.tooltipDelay);

        _this.setState({ timeout: timeout });
      };

      _this.setInactive = function (key) {
        var _this$setState2;

        if (!_this.props.tooltipLabel) {
          return;
        }

        if (_this.state.timeout) {
          clearTimeout(_this.state.timeout);
        }

        _this.setState((_this$setState2 = {}, _defineProperty(_this$setState2, key, false), _defineProperty(_this$setState2, 'timeout', null), _this$setState2));
      };

      _this.handleMouseOver = function (e) {
        _this.props.onMouseOver && _this.props.onMouseOver(e);

        _this.setActive('active');
      };

      _this.handleMouseLeave = function (e) {
        _this.props.onMouseLeave && _this.props.onMouseLeave(e);

        _this.setInactive('active');
      };

      _this.handleKeyUp = function (e) {
        _this.props.onKeyUp && _this.props.onKeyUp(e);
        if ((e.which || e.keyCode) !== _keyCodes.TAB) {
          return;
        }

        _this.setActive('tabActive');
      };

      _this.handleBlur = function (e) {
        _this.props.onBlur && _this.props.onBlur(e);

        _this.setInactive('tabActive');
      };

      _this.handleTouchStart = function (e) {
        _this.props.onTouchStart && _this.props.onTouchStart(e);
      };

      _this.handleTouchEnd = function (e) {
        _this.props.onTouchEnd && _this.props.onTouchEnd(e);
      };

      _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
      _this.state = {
        style: null,
        textStyle: null,
        active: false,
        tabActive: false,
        mobile: false,
        timeout: null
      };
      return _this;
    }

    _createClass(Tooltip, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.tooltipLabel) {
          this.hackChromeMinimumFontSize();
          window.addEventListener('resize', this.hackChromeMinimumFontSize);
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var tooltipLabel = this.props.tooltipLabel;

        if (tooltipLabel === prevProps.tooltipLabel) {
          return;
        }

        if (tooltipLabel) {
          window.addEventListener('resize', this.hackChromeMinimumFontSize);
        } else {
          window.removeEventListener('resize', this.hackChromeMinimumFontSize);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.props.tooltipLabel) {
          window.removeEventListener('resize', this.hackChromeMinimumFontSize);
        }
      }

      /**
       * Chrome doesn't allow a font-size below 12px.
       * You used to be able to use -webkit-text-size-adjust: none
       * but they have dropped support for that.
       *
       * So now the solution is to scale the text if chrome only..
       */

    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var tooltipLabel = _props.tooltipLabel;
        var tooltipPosition = _props.tooltipPosition;
        var tooltipDelay = _props.tooltipDelay;

        var props = _objectWithoutProperties(_props, ['tooltipLabel', 'tooltipPosition', 'tooltipDelay']);

        var _state = this.state;
        var style = _state.style;
        var active = _state.active;
        var tabActive = _state.tabActive;
        var textStyle = _state.textStyle;

        var tooltip = tooltipLabel && _react2.default.createElement(
          'div',
          {
            key: 'tooltip',
            ref: 'tooltip',
            className: (0, _classnames2.default)('md-tooltip md-tooltip-' + tooltipPosition, { 'active': active || tabActive }),
            'aria-hidden': !active && !tabActive,
            style: style
          },
          _react2.default.createElement(
            'span',
            { ref: 'tooltipText', className: 'md-tooltip-text', style: textStyle },
            tooltipLabel
          )
        );

        return _react2.default.createElement(ComposedComponent, _extends({}, props, {
          tooltip: tooltip,
          onMouseOver: this.handleMouseOver,
          onMouseLeave: this.handleMouseLeave,
          onKeyUp: this.handleKeyUp,
          onBlur: this.handleBlur,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        }));
      }
    }]);

    return Tooltip;
  }(_react.Component), _class.propTypes = {
    className: _react.PropTypes.string,
    tooltipLabel: _react.PropTypes.string,
    tooltipPosition: _react.PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    tooltipDelay: _react.PropTypes.number.isRequired,
    onKeyUp: _react.PropTypes.func,
    onBlur: _react.PropTypes.func,
    onMouseOver: _react.PropTypes.func,
    onMouseLeave: _react.PropTypes.func,
    onTouchStart: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func
  }, _class.defaultProps = {
    tooltipPosition: 'bottom',
    tooltipDelay: 0
  }, _temp;
};

module.exports = exports['default'];