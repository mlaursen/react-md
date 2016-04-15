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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TableCheckbox = require('./TableCheckbox');

var _TableCheckbox2 = _interopRequireDefault(_TableCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component for displaying a row in a `DataTable`. This will
 * automatically add a `Checkbox` component to the row if it is not
 * a `plain` table.
 *
 * This component will also automatically adjust the padding between
 * columns based on the longest column if the `autoAdjust` prop
 * is set to true.
 */

var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow(props, context) {
    _classCallCheck(this, TableRow);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableRow).call(this, props, context));

    _this.handleCheckboxClick = function (e) {
      e.stopPropagation();
      var onCheckboxClick = _this.props.onCheckboxClick;

      onCheckboxClick && onCheckboxClick(e);
    };

    _this.setLongestColumn = function () {
      var widths = [];
      var biggest = Array.prototype.slice.call(_reactDom2.default.findDOMNode(_this).querySelectorAll('.md-table-data:not(.prevent-grow),.md-table-header:not(.prevent-grow)')).reduce(function (prev, curr, i) {
        var width = curr.offsetWidth;
        widths.push(width);
        if (prev.width < width) {
          return { i: i, width: width };
        } else {
          return prev;
        }
      }, { width: 0, i: 0 });

      _this.setState({ biggest: biggest, widths: widths });
    };

    _this.state = {
      biggest: null,
      widths: []
    };
    return _this;
  }

  _createClass(TableRow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoAdjust) {
        this.setLongestColumn();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var onCheckboxClick = _props.onCheckboxClick;
      var selected = _props.selected;

      var props = _objectWithoutProperties(_props, ['className', 'children', 'onCheckboxClick', 'selected']);

      var _state = this.state;
      var biggest = _state.biggest;
      var widths = _state.widths;

      var checkbox = undefined;
      if (!this.context.plain) {
        checkbox = _react2.default.createElement(_TableCheckbox2.default, { key: 'checkbox', checked: selected, onClick: this.handleCheckboxClick });
      }

      var columns = _react2.default.Children.map(children, function (column, i) {
        return _react2.default.cloneElement(column, _extends({
          key: column.key || i
        }, column.props, {
          header: typeof column.props.header === 'undefined' ? _this2.context.header : column.props.header,
          className: (0, _classnames2.default)(column.props.className, {
            'grow': biggest && biggest.i === i,
            // Not last item and the biggest width is greater than this item
            'adjusted': children.length > i + 1 && biggest && biggest.width > widths[i]
          })
        }));
      });

      return _react2.default.createElement(
        'tr',
        _extends({}, props, { className: (0, _classnames2.default)('md-table-row', className, { 'active': selected }) }),
        checkbox,
        columns
      );
    }
  }]);

  return TableRow;
}(_react.Component);

TableRow.propTypes = {
  /**
   * Boolean if the row is currently selected. If this value will be
   * injected by the `TableHeader` or `TableBody` component.
   */
  selected: _react.PropTypes.bool,

  /**
   * An optional className to apply to the row.
   */
  className: _react.PropTypes.string,

  /**
   * A list of `TableColumn` to display in the table.
   *
   * > There should be at least 3 columns in a Data table (non plain)
   */
  children: _react.PropTypes.arrayOf(_react.PropTypes.node).isRequired,

  /**
   * An optional onClick function to call when a row is clicked.
   */
  onClick: _react.PropTypes.func,

  /**
   * A function to call when the checkbox is clicked. This
   * function will will be called with `(rowIndex, event)`. The
   * `TableBody` and `TableHeader` components will automatically
   * merge in a function to goggle the checkbox.
   */
  onCheckboxClick: _react.PropTypes.func,

  /**
   * A boolean if the row should automatically check all the `TableColumn`s in the row
   * and add the className `grow` to the one that is the biggest. You can also disable
   * individual columns by adding the className `.prevent-grow` to them.
   */
  autoAdjust: _react.PropTypes.bool.isRequired
};
TableRow.defaultProps = {
  autoAdjust: true
};
TableRow.contextTypes = {
  plain: _react.PropTypes.bool,
  header: _react.PropTypes.bool
};
exports.default = TableRow;
module.exports = exports['default'];