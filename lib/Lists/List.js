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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Subheaders = require('../Subheaders');

var _Subheaders2 = _interopRequireDefault(_Subheaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_Component) {
  _inherits(List, _Component);

  function List(props) {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(List, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var subheader = _props.subheader;
      var children = _props.children;
      var primarySubheader = _props.primarySubheader;
      var textOnly = _props.textOnly;
      var ordered = _props.ordered;

      var props = _objectWithoutProperties(_props, ['className', 'subheader', 'children', 'primarySubheader', 'textOnly', 'ordered']);

      var allChildren = children;
      if (subheader) {
        allChildren = [_react2.default.createElement(_Subheaders2.default, { key: 'subheader', primary: primarySubheader, primaryText: subheader })].concat(children);
      }

      return _react2.default.createElement(ordered ? 'ol' : 'ul', _extends({
        className: (0, _classnames2.default)('md-list', className, { 'md-text-list': textOnly })
      }, props), _react2.default.Children.map(allChildren, function (child, i) {
        if (i + 1 < children.length) {
          var nextChild = children[i + 1];
          if (nextChild.type && nextChild.type.name === 'Divider') {
            return _react2.default.cloneElement(child, { className: (0, _classnames2.default)(child.props.className, 'extra-mb') });
          }
        }
        return child;
      }));
    }
  }]);

  return List;
}(_react.Component);

List.propTypes = {
  ordered: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  subheader: _react.PropTypes.string,
  primarySubheader: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  textOnly: _react.PropTypes.bool
};
exports.default = List;
module.exports = exports['default'];