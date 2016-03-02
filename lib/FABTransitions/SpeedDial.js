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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Buttons = require('react-md/lib/Buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpeedDial = function (_Component) {
  _inherits(SpeedDial, _Component);

  function SpeedDial(props) {
    _classCallCheck(this, SpeedDial);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpeedDial).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(SpeedDial, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var fabs = _props.fabs;
      var isOpen = _props.isOpen;
      var passiveIconChildren = _props.passiveIconChildren;
      var passiveIconClassName = _props.passiveIconClassName;
      var activeIconChildren = _props.activeIconChildren;
      var activeIconClassName = _props.activeIconClassName;
      var transitionName = _props.transitionName;
      var transitionEnterTimeout = _props.transitionEnterTimeout;
      var speedDialTransitionName = _props.speedDialTransitionName;
      var speedDialTransitionEnterTimeout = _props.speedDialTransitionEnterTimeout;
      var speedDialTransitionLeaveTimeout = _props.speedDialTransitionLeaveTimeout;

      var props = _objectWithoutProperties(_props, ['fabs', 'isOpen', 'passiveIconChildren', 'passiveIconClassName', 'activeIconChildren', 'activeIconClassName', 'transitionName', 'transitionEnterTimeout', 'speedDialTransitionName', 'speedDialTransitionEnterTimeout', 'speedDialTransitionLeaveTimeout']);

      var speedDialFabs = undefined;
      if (isOpen) {
        speedDialFabs = fabs.map(function (fab, i) {
          var fn = undefined,
              el = undefined,
              props = undefined;
          if (_react2.default.isValidElement(fab)) {
            el = _react2.default.Children.only(fab);
            fn = _react2.default.cloneElement;
            props = fab.props;
          } else {
            el = _Buttons.FloatingButton;
            fn = _react2.default.createElement;
            props = fab;
          }

          return fn(el, _extends({}, props, {
            className: (0, _classnames2.default)('md-speed-dial-fab', props.className),
            key: el.key || i,
            mini: true
          }));
        });
      }

      props.iconClassName = isOpen ? activeIconClassName : passiveIconClassName;
      props.children = isOpen ? activeIconChildren : passiveIconChildren;
      return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        {
          component: 'div',
          className: 'md-speed-dial',
          transitionName: transitionName + '-' + (isOpen ? 'right' : 'left'),
          transitionEnterTimeout: transitionEnterTimeout,
          transitionLeave: false
        },
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
        _react2.default.createElement(_Buttons.FloatingButton, _extends({}, props, { key: (isOpen ? 'open' : 'closed') + '-fab' }))
      );
    }
  }]);

  return SpeedDial;
}(_react.Component);

SpeedDial.propTypes = {
  isOpen: _react.PropTypes.bool.isRequired,
  className: _react.PropTypes.string,
  transitionName: _react.PropTypes.string.isRequired,
  transitionEnterTimeout: _react.PropTypes.number.isRequired,
  speedDialTransitionName: _react.PropTypes.string.isRequired,
  speedDialTransitionEnterTimeout: _react.PropTypes.number.isRequired,
  speedDialTransitionLeaveTimeout: _react.PropTypes.number.isRequired,
  passiveIconChildren: _react.PropTypes.node.isRequired,
  passiveIconClassName: _react.PropTypes.node.isRequired,
  activeIconChildren: _react.PropTypes.node.isRequired,
  activeIconClassName: _react.PropTypes.string.isRequired,
  fabs: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.shape({
    onClick: _react.PropTypes.func,
    iconClassName: _react.PropTypes.string,
    children: _react.PropTypes.node
  })])).isRequired,
  fabsValidator: function fabsValidator(props) {
    var size = props.fabs.length;
    if (size >= 3 && size <= 5) {
      return;
    }
    var middle = size < 3 ? 'at least 3' : 'no more than 5';
    return new Error('A speed dial requires ' + middle + ' floating action buttons to fling. However, only ' + size + ' were given.');
  }
};
SpeedDial.defaultProps = {
  transitionName: 'md-fab-rotate',
  transitionEnterTimeout: 150,
  transitionLeaveTimeout: 150,
  speedDialTransitionName: 'md-speed-dial',
  speedDialTransitionEnterTimeout: 450,
  speedDialTransitionLeaveTimeout: 150,
  passiveIconClassName: 'material-icons',
  activeIconClassName: 'material-icons'
};
exports.default = SpeedDial;
module.exports = exports['default'];