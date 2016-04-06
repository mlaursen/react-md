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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InkTransition = function (_Component) {
  _inherits(InkTransition, _Component);

  function InkTransition(props) {
    _classCallCheck(this, InkTransition);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InkTransition).call(this, props));

    _this.componentWillEnter = function (done) {
      var node = _reactDom2.default.findDOMNode(_this);
      var timeout = setTimeout(function () {
        node.classList.add('active');
        var timeout = setTimeout(function () {
          _this.setState({ timeout: null });
          done();
        }, _this.props.transitionEnterTimeout);
        _this.setState({ timeout: timeout });
      }, 25);

      _this.setState({ timeout: timeout });
    };

    _this.componentWillLeave = function (done) {
      var node = _reactDom2.default.findDOMNode(_this);
      node.classList.add('leaving');
      var timeout = setTimeout(function () {
        _this.setState({ timeout: null });
        done();
      }, _this.props.transitionLeaveTimeout);
      _this.setState({ timeout: timeout });
    };

    _this.state = { timeout: null };
    return _this;
  }

  _createClass(InkTransition, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', _extends({ className: 'md-ink' }, this.props));
    }
  }]);

  return InkTransition;
}(_react.Component);

InkTransition.propTypes = {
  style: _react.PropTypes.object.isRequired,
  transitionEnterTimeout: _react.PropTypes.number.isRequired,
  transitionLeaveTimeout: _react.PropTypes.number.isRequired
};
InkTransition.defaultProps = {
  transitionEnterTimeout: 150,
  transitionLeaveTimeout: 450
};
exports.default = InkTransition;
module.exports = exports['default'];