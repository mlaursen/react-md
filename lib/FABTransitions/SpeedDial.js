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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Buttons = require('../Buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Any props such as style or event listeners will be applied to the
 * main floating action button. If you want props applied to the `SpeedDial`
 * itself, you will need to set them in the `containerProps` prop.
 */

var SpeedDial = function (_Component) {
  _inherits(SpeedDial, _Component);

  function SpeedDial(props) {
    _classCallCheck(this, SpeedDial);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpeedDial).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { isOpen: props.initiallyOpen };
    return _this;
  }

  _createClass(SpeedDial, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var fabs = _props.fabs;
      var passiveIconChildren = _props.passiveIconChildren;
      var passiveIconClassName = _props.passiveIconClassName;
      var activeIconChildren = _props.activeIconChildren;
      var activeIconClassName = _props.activeIconClassName;
      var transitionName = _props.transitionName;
      var transitionEnterTimeout = _props.transitionEnterTimeout;
      var speedDialTransitionName = _props.speedDialTransitionName;
      var speedDialTransitionEnterTimeout = _props.speedDialTransitionEnterTimeout;
      var speedDialTransitionLeaveTimeout = _props.speedDialTransitionLeaveTimeout;
      var containerProps = _props.containerProps;

      var props = _objectWithoutProperties(_props, ['fabs', 'passiveIconChildren', 'passiveIconClassName', 'activeIconChildren', 'activeIconClassName', 'transitionName', 'transitionEnterTimeout', 'speedDialTransitionName', 'speedDialTransitionEnterTimeout', 'speedDialTransitionLeaveTimeout', 'containerProps']);

      var isOpen = this.isOpen();

      var speedDialFabs = void 0;
      if (isOpen) {
        speedDialFabs = fabs.map(function (fab, i) {
          var fn = void 0,
              el = void 0,
              props = void 0;
          if (_react2.default.isValidElement(fab)) {
            el = _react2.default.Children.only(fab);
            fn = _react2.default.cloneElement;
            props = fab.props;
          } else {
            el = _Buttons.FloatingButton;
            fn = _react2.default.createElement;
            props = fab;
          }

          var created = fn(el, _extends({
            mini: true
          }, props));
          return _react2.default.createElement(
            'div',
            { key: i, className: 'md-speed-dial-fab' },
            created
          );
        });
      }

      props.iconClassName = isOpen ? activeIconClassName : passiveIconClassName;
      props.children = isOpen ? activeIconChildren : passiveIconChildren;
      return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        _extends({}, containerProps, {
          component: 'div',
          className: (0, _classnames2.default)('md-speed-dial', !!containerProps && containerProps.className),
          transitionName: transitionName + '-' + (isOpen ? 'right' : 'left'),
          transitionEnterTimeout: transitionEnterTimeout,
          transitionLeave: false,
          ref: 'container'
        }),
        _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            component: 'div',
            key: 'speed-dial-fabs',
            transitionName: speedDialTransitionName,
            transitionEnterTimeout: speedDialTransitionEnterTimeout,
            transitionLeaveTimeout: speedDialTransitionLeaveTimeout
          },
          speedDialFabs
        ),
        _react2.default.createElement(_Buttons.FloatingButton, _extends({}, props, { key: (isOpen ? 'open' : 'closed') + '-fab', onClick: this.handleClick }))
      );
    }
  }]);

  return SpeedDial;
}(_react.Component);

SpeedDial.propTypes = {
  /**
   * A boolean if the speed dial is currently open. This will make
   * the speed dial into a controlled component.
   */
  isOpen: _react.PropTypes.bool,

  /**
   * Boolean if the uncontrolled speed dial is initially open.
   */
  initiallyOpen: _react.PropTypes.bool,

  /**
   * An optional className to apply to the speed dial.
   */
  className: _react.PropTypes.string,

  /**
   * The speed dial's floating action button transition name when the button's
   * open state changes. If the button is open, `-right` is appened, otherwise
   * `-left`.
   */
  transitionName: _react.PropTypes.string.isRequired,

  /**
   * The timeout for the speed dial's floating action button transition.
   */
  transitionEnterTimeout: _react.PropTypes.number.isRequired,

  /**
   * The name for the flinging animation of the speed dial.
   */
  speedDialTransitionName: _react.PropTypes.string.isRequired,

  /**
   * The timeout for the flinging animation of the speed dial when opening.
   */
  speedDialTransitionEnterTimeout: _react.PropTypes.number.isRequired,

  /**
   * The timeout for the flinging animation when the speed dial is closing.
   */
  speedDialTransitionLeaveTimeout: _react.PropTypes.number.isRequired,

  /**
   * The optional children to display for unopened speed dial floating action button.
   */
  passiveIconChildren: _react.PropTypes.node,

  /**
   * The optional icon className to display for unopened speed dial floating action button.
   */
  passiveIconClassName: _react.PropTypes.node,

  /**
   * The optional children to display for opened speed dial floating action button.
   */
  activeIconChildren: _react.PropTypes.node,

  /**
   * The optional icon className to display for opened speed dial floating action button.
   */
  activeIconClassName: _react.PropTypes.string,

  /**
   * A list of `FloatingButton` or props to generate the `FloatinButton` when the
   * `SpeedDial` is open. The buttons will automatically be converted to the `mini`
   * version.
   */
  fabs: function fabs(props, propName, component) {
    var size = props.fabs.length;
    if (size >= 3 && size <= 5) {
      return _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.shape({
        onClick: _react.PropTypes.func,
        iconClassName: _react.PropTypes.string,
        children: _react.PropTypes.node
      })])).isRequired(props, propName, component);
    }

    var middle = size < 3 ? 'at least 3' : 'no more than 5';
    return new Error('A speed dial requires ' + middle + ' floating action buttons to fling. However, only ' + size + ' were given.');
  },

  /**
   * An optional function to call when the main floating action button is clicked.
   */
  onClick: _react.PropTypes.func,

  /**
   * An optional function to call when the main floating action button is clicked.
   */
  onPassiveClick: _react.PropTypes.func,

  /**
   * An optional function to call when the main floating action button is clicked.
   */
  onActiveClick: _react.PropTypes.func,

  /**
   * Any additional props to apply to the speed dial itself.
   */
  containerProps: _react.PropTypes.object
};
SpeedDial.defaultProps = {
  initiallyOpen: false,
  transitionName: 'md-fab-rotate',
  transitionEnterTimeout: 150,
  speedDialTransitionName: 'md-speed-dial',
  speedDialTransitionEnterTimeout: 450,
  speedDialTransitionLeaveTimeout: 150,
  passiveIconClassName: 'material-icons',
  activeIconClassName: 'material-icons'
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.isOpen = function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? _this2.props : arguments[0];
    var state = arguments.length <= 1 || arguments[1] === undefined ? _this2.state : arguments[1];

    return typeof props.isOpen === 'undefined' ? state.isOpen : props.isOpen;
  };

  this.handleClick = function (e) {
    var _props2 = _this2.props;
    var onClick = _props2.onClick;
    var onPassiveClick = _props2.onPassiveClick;
    var onActiveClick = _props2.onActiveClick;

    if (onClick) {
      onClick(e);
    }

    var isOpen = _this2.isOpen();
    if (isOpen && onActiveClick) {
      onActiveClick(e);
    } else if (!isOpen && onPassiveClick) {
      onPassiveClick(e);
    }

    if (typeof _this2.props.isOpen === 'undefined') {
      _this2.setState({ isOpen: !isOpen });
    }
  };
};

exports.default = SpeedDial;
module.exports = exports['default'];