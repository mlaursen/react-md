'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

var _Transitions = require('../Transitions');

var _Transitions2 = _interopRequireDefault(_Transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_Component) {
  _inherits(Card, _Component);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Card).call(this, props));

    _this.getChildContext = function () {
      var _this$props = _this.props;
      var iconClassName = _this$props.iconClassName;
      var iconChildren = _this$props.iconChildren;

      return {
        onExpandClick: _this.handleExpandClick,
        isExpanded: _this.state.expanded,
        iconClassName: iconClassName,
        iconChildren: iconChildren
      };
    };

    _this.handleExpandClick = function () {
      _this.setState({ expanded: !_this.state.expanded });
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { expanded: props.isInitialExpanded };
    return _this;
  }

  _createClass(Card, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var raise = _props.raise;

      var props = _objectWithoutProperties(_props, ['className', 'children', 'raise']);

      var expanderIndex = -1;
      return _react2.default.createElement(
        _reactAddonsTransitionGroup2.default,
        _extends({
          component: 'div'
        }, props, {
          className: (0, _classnames2.default)('md-card', className, {
            'raise': raise
          })
        }),
        _react2.default.Children.map(children, function (child, i) {
          if (!child) {
            return child;
          }
          if (expanderIndex < 0 && (0, _utils.isPropEnabled)(child.props, 'isExpander')) {
            expanderIndex = i;
          }

          if (!child.props.expandable) {
            return child;
          } else if (expanderIndex !== i && expanderIndex > -1 && !_this2.state.expanded) {
            return null;
          } else {
            return _react2.default.createElement(
              _Transitions2.default,
              null,
              child
            );
          }
        })
      );
    }
  }]);

  return Card;
}(_react.Component);

Card.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  iconClassName: _react.PropTypes.string,
  iconChildren: _react.PropTypes.string,
  isInitialExpanded: _react.PropTypes.bool,
  raise: _react.PropTypes.bool
};
Card.defaultProps = {
  raise: true,
  isInitialExpanded: false,
  iconClassName: 'material-icons',
  iconChildren: 'keyboard_arrow_down'
};
Card.childContextTypes = {
  onExpandClick: _react.PropTypes.func,
  isExpanded: _react.PropTypes.bool,
  iconClassName: _react.PropTypes.string,
  iconChildren: _react.PropTypes.string
};
exports.default = Card;
module.exports = exports['default'];