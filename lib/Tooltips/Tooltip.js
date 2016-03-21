'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).call(this, props));

    _this.addEventListeners = function () {
      var node = void 0;
      if (_this.props.selector) {
        // the selector is really just a className and we convert it to .classname.classname2
        node = _reactDom2.default.findDOMNode(_this).querySelector('.' + _this.props.selector.trim().replace(/ /g, '.'));
      } else {
        node = _reactDom2.default.findDOMNode(_this.refs.control);
      }

      node.addEventListener('mouseover', _this.handleMouseOver);
      node.addEventListener('mouseleave', _this.handleMouseLeave);
      node.addEventListener('keyup', _this.handleKeyUp);
      node.addEventListener('blur', _this.handleBlur);
    };

    _this.calcPositioningStyle = function () {
      var position = _this.props.position;

      var margin = _this.state.mobile ? MOBILE_MARGIN : DESKTOP_MARGIN;
      var control = _reactDom2.default.findDOMNode(_this.refs.control);
      var controlHeight = control.offsetHeight;
      var controlWidth = control.offsetWidth;
      var tooltip = _this.refs.tooltip;

      var tooltipWidth = tooltip.offsetWidth;
      var tooltipHeight = tooltip.offsetHeight;

      var top = void 0,
          right = void 0,
          bottom = void 0,
          left = void 0;
      if (position === Tooltip.TOP || position === Tooltip.BOTTOM) {
        left = controlWidth / 2 - tooltipWidth / 2;
      } else {
        // LEFT || RIGHT
        top = controlHeight / 2 - tooltipHeight / 2;
      }

      switch (position) {
        case Tooltip.TOP:
          top = -(tooltipHeight + margin);
          break;
        case Tooltip.RIGHT:
          left = controlWidth + margin;
          break;
        case Tooltip.BOTTOM:
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

    _this.setActive = function () {
      var key = arguments.length <= 0 || arguments[0] === undefined ? 'active' : arguments[0];

      _this.setState({
        timeout: setTimeout(function () {
          var _this$setState;

          _this.setState((_this$setState = {}, _defineProperty(_this$setState, key, true), _defineProperty(_this$setState, 'style', _this.calcPositioningStyle()), _defineProperty(_this$setState, 'timeout', null), _this$setState));
        }, _this.props.delay)
      });
    };

    _this.setInactive = function () {
      var key = arguments.length <= 0 || arguments[0] === undefined ? 'active' : arguments[0];

      if (_this.state.timeout) {
        clearTimeout(_this.state.timeout);
        _this.setState({ timeout: null });
      } else {
        _this.setState(_defineProperty({}, key, false));
      }
    };

    _this.handleMouseOver = function () {
      _this.setActive();
    };

    _this.handleMouseLeave = function () {
      _this.setInactive();
    };

    _this.handleKeyUp = function (e) {
      if ((e.which || e.keyCode) !== _keyCodes.TAB) {
        return;
      }
      _this.setActive('tabActive');
    };

    _this.handleBlur = function () {
      _this.setInactive('tabActive');
    };

    _this.hackChromeMinimumFontSize = function () {
      var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
      var fontSize = parseInt(window.getComputedStyle(_this.refs.text).getPropertyValue('font-size'));

      var mobile = fontSize === MOBILE_FONT_SIZE;
      var state = { mobile: mobile };
      if (isChrome && !mobile) {
        var transform = 'scale(' + DESKTOP_FONT_SIZE / fontSize + ')';
        state.textStyle = {
          transform: transform,
          WebkitTransform: transform,
          transformOrigin: '51% 50%' };
      }

      // hack for non blurred text
      _this.setState(state);
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      mobile: false,
      active: false,
      timeout: null
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.hackChromeMinimumFontSize();
      this.addEventListeners();
      window.addEventListener('resize', this.hackChromeMinimumFontSize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.hackChromeMinimumFontSize);
    }

    /**
     * These had been injected in the React.cloneElement before as props,
     * but there was merging issues if there was Ink involved as well.
     *
     * A _safer_ way of handling these events is to add multiple events with vanilla
     * so they aren't overridden.
     */


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
      var text = _props.text;
      var className = _props.className;
      var position = _props.position;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['text', 'className', 'position', 'children']);

      var _state = this.state;
      var active = _state.active;
      var tabActive = _state.tabActive;
      var style = _state.style;
      var textStyle = _state.textStyle;

      // classname doesn't join correctly for the button components..

      var child = _react2.default.Children.only(children);
      var tooltipControl = _react2.default.cloneElement(child, {
        ref: 'control',
        className: (0, _classnames2.default)(child.props.className, 'md-tooltip-control')
      });
      return _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames2.default)('md-tooltip-container', className) }, props),
        tooltipControl,
        _react2.default.createElement(
          'div',
          {
            ref: 'tooltip',
            className: (0, _classnames2.default)('md-tooltip', 'md-tooltip-' + position, { 'active': active || tabActive }),
            style: style,
            'aria-hidden': !active && !tabActive
          },
          _react2.default.createElement(
            'span',
            { ref: 'text', className: 'md-tooltip-text', style: textStyle },
            text
          )
        )
      );
    }
  }]);

  return Tooltip;
}(_react.Component);

Tooltip.TOP = 'top';
Tooltip.RIGHT = 'right';
Tooltip.BOTTOM = 'bottom';
Tooltip.LEFT = 'left';
Tooltip.propTypes = {
  selector: _react.PropTypes.string,
  className: _react.PropTypes.string,
  text: _react.PropTypes.string.isRequired,
  position: _react.PropTypes.oneOf([Tooltip.TOP, Tooltip.RIGHT, Tooltip.BOTTOM, Tooltip.LEFT]).isRequired,
  children: _react.PropTypes.element.isRequired,
  delay: _react.PropTypes.number.isRequired
};
Tooltip.defaultProps = {
  position: 'bottom',
  delay: 0
};
exports.default = Tooltip;
module.exports = exports['default'];