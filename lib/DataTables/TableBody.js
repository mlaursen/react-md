'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `TableBody` component is used for managing the state of all
 * `TableRow` inside of it.
 */

var TableBody = function (_Component) {
  _inherits(TableBody, _Component);

  function TableBody(props, context) {
    _classCallCheck(this, TableBody);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TableBody).call(this, props, context));
  }

  _createClass(TableBody, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['children']);

      var _context = this.context;
      var selectedRows = _context.selectedRows;
      var toggleSelectedRow = _context.toggleSelectedRow;


      var rows = _react2.default.Children.map(children, function (row, i) {
        var uncontrolled = typeof row.props.selected === 'undefined';

        // Update the row to inject the selected prop from context if it is uncontrolled.
        // Also update the onCheckbox click function to additionally toggle the row if uncontrolled.
        return _react2.default.cloneElement(row, _extends({}, row.props, {
          key: row.key || i,
          selected: uncontrolled ? selectedRows[i] : row.props.selected,
          onCheckboxClick: function onCheckboxClick(e) {
            row.props.onCheckboxClick && row.props.onCheckboxClick(i, e);

            if (uncontrolled) {
              toggleSelectedRow(i);
            }
          }
        }));
      });

      return _react2.default.createElement(
        'tbody',
        props,
        rows
      );
    }
  }]);

  return TableBody;
}(_react.Component);

TableBody.propTypes = {
  /**
   * A list or a single item of `TableRow` components to render.
   */
  children: _react.PropTypes.node.isRequired
};
TableBody.contextTypes = {
  allSelected: _react.PropTypes.bool.isRequired,
  selectedRows: _react.PropTypes.arrayOf(_react.PropTypes.bool).isRequired,
  toggleSelectedRow: _react.PropTypes.func.isRequired
};
exports.default = TableBody;
module.exports = exports['default'];