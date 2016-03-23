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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Toolbar).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.refs.content) {
        return;
      }

      var tabs = _reactDom2.default.findDOMNode(this.refs.content);
      if (tabs.querySelector('.md-tabs.tabs-centered') || tabs.querySelector('.md-tabs.fixed-width')) {
        return;
      }

      var actionLeft = _reactDom2.default.findDOMNode(this).querySelector('.action-left');
      if (!actionLeft) {
        return;
      }
      var actionLeftMargin = parseInt(window.getComputedStyle(actionLeft, null).getPropertyValue('margin-left'));
      var offset = tabs.querySelector('.md-tab-label > div').offsetLeft;

      /*eslint-disable react/no-did-mount-set-state*/
      this.setState({
        tabsOffset: actionLeftMargin * 2 + actionLeft.offsetWidth - offset + 'px'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var actionLeft = _props.actionLeft;
      var title = _props.title;
      var actionsRight = _props.actionsRight;
      var children = _props.children;
      var fixed = _props.fixed;
      var primary = _props.primary;
      var className = _props.className;
      var containerClassName = _props.containerClassName;

      var props = _objectWithoutProperties(_props, ['actionLeft', 'title', 'actionsRight', 'children', 'fixed', 'primary', 'className', 'containerClassName']);

      var tabsOffset = this.state.tabsOffset;

      var childrenAsHeader = !!children && !actionLeft && !title && !actionsRight;

      var header = undefined;
      if (childrenAsHeader) {
        header = children;
      } else {
        header = [actionLeft && _react2.default.cloneElement(actionLeft, { key: 'action-left', className: 'action-left' }), title && _react2.default.createElement(
          'h3',
          { key: 'title', className: 'md-title' },
          title
        ), actionsRight && _react2.default.cloneElement(actionsRight, { key: 'actions-right' })];
      }

      var content = undefined;
      if (!childrenAsHeader && children) {
        content = _react2.default.cloneElement(children, {
          ref: 'content',
          style: Object.assign({}, children.props.style, { marginLeft: tabsOffset })
        });
      }
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('md-toolbar-container', containerClassName, { fixed: fixed }) },
        _react2.default.createElement(
          'header',
          _extends({}, props, {
            className: (0, _classnames2.default)('md-toolbar', className, { 'md-primary': primary })
          }),
          header
        ),
        content
      );
    }
  }]);

  return Toolbar;
}(_react.Component);

Toolbar.propTypes = {
  className: _react.PropTypes.string,
  containerClassName: _react.PropTypes.string,
  primary: _react.PropTypes.bool,
  actionLeft: _react.PropTypes.node,
  title: _react.PropTypes.string,
  children: _react.PropTypes.node,
  actionsRight: _react.PropTypes.node,
  fixed: _react.PropTypes.bool
};
Toolbar.defaultProps = {
  primary: true
};
exports.default = Toolbar;
module.exports = exports['default'];