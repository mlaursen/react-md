'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppBar = (function (_Component) {
  _inherits(AppBar, _Component);

  function AppBar(props) {
    _classCallCheck(this, AppBar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppBar).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(AppBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var primary = _props.primary;
      var title = _props.title;
      var className = _props.className;
      var leftNode = _props.leftNode;
      var rightNode = _props.rightNode;

      return _react2.default.createElement(
        _index.Toolbar,
        { primary: primary, className: (0, _classnames2.default)('md-app-bar', className) },
        _react2.default.createElement(
          'div',
          { className: 'md-app-bar-left' },
          leftNode,
          _react2.default.createElement(
            'h4',
            { className: 'md-app-bar-title' },
            title
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'md-app-bar-right' },
          rightNode
        )
      );
    }
  }]);

  return AppBar;
})(_react.Component);

AppBar.propTypes = {
  className: _react.PropTypes.string,
  primary: _react.PropTypes.bool,
  title: _react.PropTypes.string,
  leftNode: _react.PropTypes.node,
  rightNode: _react.PropTypes.node
};
AppBar.defaultProps = {
  primary: true
};
exports.default = AppBar;
module.exports = exports['default'];
//# sourceMappingURL=AppBar.js.map