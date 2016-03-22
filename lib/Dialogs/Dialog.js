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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Buttons = require('../Buttons');

var _Toolbars = require('../Toolbars');

var _Toolbars2 = _interopRequireDefault(_Toolbars);

var _Dividers = require('../Dividers');

var _Dividers2 = _interopRequireDefault(_Dividers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIALOG_PADDING = 8;

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { stacked: false };
    return _this;
  }

  _createClass(Dialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onlyChildren) {
        return;
      }
      var state = {};
      var _refs = this.refs;
      var dialog = _refs.dialog;
      var content = _refs.content;

      if (content.scrollHeight > content.clientHeight) {
        state.divided = true;
      }

      if (this.props.actions) {
        var maxButtonWidth = (dialog.offsetWidth - DIALOG_PADDING * 3) / 2;
        var actions = dialog.querySelectorAll('.md-btn');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = actions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var action = _step.value;

            if (action.offsetWidth > maxButtonWidth) {
              state.stacked = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      this.setState(state); //eslint-disable-line react/no-did-mount-set-state
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var title = _props.title;
      var children = _props.children;
      var className = _props.className;
      var contentClassName = _props.contentClassName;
      var actions = _props.actions;
      var actionLeft = _props.actionLeft;
      var actionRight = _props.actionRight;
      var style = _props.style;
      var transformOrigin = _props.transformOrigin;
      var isSimple = _props.isSimple;
      var isFullPage = _props.isFullPage;
      var onlyChildren = _props.onlyChildren;

      var props = _objectWithoutProperties(_props, ['title', 'children', 'className', 'contentClassName', 'actions', 'actionLeft', 'actionRight', 'style', 'transformOrigin', 'isSimple', 'isFullPage', 'onlyChildren']);

      var _state = this.state;
      var stacked = _state.stacked;
      var divided = _state.divided;

      var header = undefined,
          footer = undefined;
      if (!onlyChildren && !isFullPage && title) {
        header = _react2.default.createElement(
          'h1',
          { className: 'md-title' },
          title
        );
      } else if (isFullPage) {
        header = _react2.default.createElement(_Toolbars2.default, {
          primary: true,
          actionLeft: actionLeft,
          title: title,
          actionsRight: actionRight
        });
      }

      if (actions) {
        footer = _react2.default.createElement(
          'footer',
          { className: (0, _classnames2.default)('md-dialog-footer', { stacked: stacked }) },
          actions.map(function (action, key) {
            if (!_react2.default.isValidElement(action)) {
              return _react2.default.createElement(_Buttons.FlatButton, _extends({ key: key }, action));
            } else {
              return action;
            }
          })
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({
          ref: 'dialog',
          className: (0, _classnames2.default)('md-dialog', className, {
            'full-page': isFullPage,
            'dialog-centered': !isFullPage
          }),
          style: Object.assign({}, style, { transformOrigin: transformOrigin })
        }, props),
        header,
        header && divided && _react2.default.createElement(_Dividers2.default, null),
        onlyChildren && children,
        !onlyChildren && _react2.default.createElement(
          'section',
          {
            ref: 'content',
            className: (0, _classnames2.default)('md-dialog-content', contentClassName, {
              'simple': isSimple
            })
          },
          children
        ),
        footer && divided && _react2.default.createElement(_Dividers2.default, null),
        footer
      );
    }
  }]);

  return Dialog;
}(_react.Component);

Dialog.propTypes = {
  isSimple: _react.PropTypes.bool.isRequired,
  isFullPage: _react.PropTypes.bool.isRequired,
  transformOrigin: _react.PropTypes.string,
  title: _react.PropTypes.string,
  actions: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.arrayOf(_react.PropTypes.object), _react.PropTypes.node, _react.PropTypes.object]),
  actionLeft: _react.PropTypes.node,
  actionRight: _react.PropTypes.node,
  className: _react.PropTypes.string,
  contentClassName: _react.PropTypes.string,
  children: _react.PropTypes.node,
  style: _react.PropTypes.object,
  onlyChildren: _react.PropTypes.bool
};
exports.default = Dialog;
module.exports = exports['default'];