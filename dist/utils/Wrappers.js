'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRipple = createRipple;
exports.removeRipple = removeRipple;
exports.rippleComponent = rippleComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a ripple effect for the given element
 *
 * @param el the html element to insert a ripple into
 * @param e the click event
 * @param {bool} isPositioned? boolean if the ripple has already been positioned correctly. Defaults to false
 * @param {number} timeout? the timeout for adding the active class to the ripple. Defaults to 1ms
 */
function createRipple(el, e) {
  var isPositioned = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var timeout = arguments.length <= 3 || arguments[3] === undefined ? 15 : arguments[3];

  // If right click, do nothing
  if (e.button === 2) {
    return null;
  }
  var size = Math.max(el.offsetWidth, el.offsetHeight) + 'px';

  var ripple = document.createElement('span');
  ripple.classList.add('ripple');
  if (!isPositioned) {
    ripple.style.height = size;
    ripple.style.width = size;
  } else {
    ripple.classList.add('positioned');
  }

  el.insertBefore(ripple, el.firstChild);
  var pageX = e.pageX;
  var pageY = e.pageY;

  // Need a short delay after inserting into the page for some reason

  setTimeout(function () {
    if (!isPositioned) {
      ripple.style.left = pageX - el.offsetLeft - ripple.offsetWidth / 2 + 'px';
      ripple.style.top = pageY - el.offsetTop - ripple.offsetHeight / 2 + 'px';
    }
    ripple.classList.add('active');
  }, timeout);
  return ripple;
}

/**
 * Attempts to remove the first active ripple in the current element
 *
 * @param el the html element to remove a ripple from
 * @param {number} rippleAnimTime? the animation time of the ripple. Defaults to 300
 */
function removeRipple(el) {
  var rippleAnimTime = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];

  var ripple = el.querySelector('.ripple.active');
  if (!ripple) {
    return;
  }

  ripple.classList.add('leave');
  setTimeout(function () {
    el.removeChild(ripple);
  }, rippleAnimTime);
}

/**
 * Wraps a component with a ripple component.
 *
 * @param {bool} isPositioned? if the ripple has css positioning instead of inline styling. Defaults to false
 * @param {number} rippleLimit? number of ripples allowed. Defaults to 0 (infinite)
 * @return a React Component wrapped with functionality to create a ripple
 */
function rippleComponent() {
  var isPositioned = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var rippleLimit = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  return function (Component) {
    var Ripple = (function (_Component) {
      _inherits(Ripple, _Component);

      function Ripple(props) {
        _classCallCheck(this, Ripple);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ripple).call(this, props));

        _this.handleMouseDown = function (e) {
          var ripples = _this.state.ripples;

          if (rippleLimit && ripples.length >= rippleLimit) {
            return;
          }

          _this.props.onMouseDown && _this.props.onMouseDown(e);
          ripples.push(createRipple(_reactDom2.default.findDOMNode(_this), e, isPositioned));
          _this.setState({ mouseDownTime: new Date(), ripples: ripples });
        };

        _this.handleMouseUp = function (e) {
          var _this$props = _this.props;
          var onMouseUp = _this$props.onMouseUp;
          var rippleEnterTimeout = _this$props.rippleEnterTimeout;
          var rippleLeaveTimeout = _this$props.rippleLeaveTimeout;
          var onClick = _this$props.onClick;
          var _this$state = _this.state;
          var mouseDownTime = _this$state.mouseDownTime;
          var ripples = _this$state.ripples;

          onMouseUp && onMouseUp(e);
          if (e.button === 2 || !ripples.length || _this.timeout !== null) {
            // do nothing if right click
            return;
          }

          var ripple = _reactDom2.default.findDOMNode(_this).querySelector('.ripple.active:not(.leave)');
          ripple && ripple.classList.add('leave');
          _this.timeout = setTimeout(function () {
            onClick && onClick(e);
            removeRipple(_reactDom2.default.findDOMNode(_this), rippleLeaveTimeout);
            _this.timeout = null;
            _this.setState({ ripples: ripples.slice(1, ripples.length), mouseDownTime: null });
          }, rippleEnterTimeout - (new Date() - mouseDownTime));
        };

        _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
        _this.state = { mouseDownTime: null, ripples: [] };
        _this.timeout = null;
        return _this;
      }

      _createClass(Ripple, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(Component, _extends({}, this.props, { onClick: null, onMouseUp: this.handleMouseUp, onMouseDown: this.handleMouseDown, onTouchStart: this.handleTouchStart, onTouchEnd: this.handleTouchEnd }));
        }
      }]);

      return Ripple;
    })(Component);

    Ripple.propTypes = {
      rippleEnterTimeout: _react.PropTypes.number.isRequired,
      rippleLeaveTimeout: _react.PropTypes.number.isRequired,
      onClick: _react.PropTypes.func,
      onMouseUp: _react.PropTypes.func,
      onMouseDown: _react.PropTypes.func
    };
    Ripple.defaultProps = {
      rippleEnterTimeout: 300,
      rippleLeaveTimeout: 300
    };
    Ripple.displayName = (Component.displayName || Component.name) + 'Ripple';

    return Ripple;
  };
}
//# sourceMappingURL=Wrappers.js.map