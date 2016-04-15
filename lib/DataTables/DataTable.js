'use strict';

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `DataTable` component is used to manage the state of all rows.
 * This can either be a __plain__ table or a __data__ table.
 *
 * A __data__ table will include checkboxes on each row while a __plain__ table
 * will not.
 */

var DataTable = function (_Component) {
  _inherits(DataTable, _Component);

  function DataTable(props) {
    _classCallCheck(this, DataTable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataTable).call(this, props));

    _this.getChildContext = function () {
      var _this$props = _this.props;
      var uncheckedIconChildren = _this$props.uncheckedIconChildren;
      var uncheckedIconClassName = _this$props.uncheckedIconClassName;
      var checkedIconChildren = _this$props.checkedIconChildren;
      var checkedIconClassName = _this$props.checkedIconClassName;
      var plain = _this$props.plain;

      return {
        uncheckedIconChildren: uncheckedIconChildren,
        uncheckedIconClassName: uncheckedIconClassName,
        checkedIconChildren: checkedIconChildren,
        checkedIconClassName: checkedIconClassName,
        plain: plain,
        allSelected: _this.state.allSelected,
        selectedRows: _this.state.selectedRows,
        toggleAllRows: _this.toggleAllRows,
        toggleSelectedRow: _this.toggleSelectedRow
      };
    };

    _this.toggleAllRows = function () {
      var allSelected = !_this.state.allSelected;
      _this.setState({
        allSelected: allSelected,
        selectedRows: _this.state.selectedRows.map(function () {
          return allSelected;
        })
      });
    };

    _this.toggleSelectedRow = function (row) {
      var selectedRows = _this.state.selectedRows.slice();
      selectedRows[row] = !selectedRows[row];

      _this.setState({
        selectedRows: selectedRows,
        allSelected: selectedRows.filter(function (selected) {
          return selected;
        }).length === selectedRows.length
      });
    };

    _this.initializeRows = function () {
      var rows = _reactDom2.default.findDOMNode(_this).querySelectorAll('.md-data-table tbody tr').length;

      var selectedRows = [];
      for (var i = 0; i < rows; i++) {
        selectedRows[i] = _this.state.selectedRows[i] || false;
      }

      _this.setState({
        selectedRows: selectedRows,
        allSelected: selectedRows.map(function (b) {
          return b;
        }).length === 0
      });
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      allSelected: props.defaultSelectedRows.filter(function (b) {
        return b;
      }).length === 0,
      selectedRows: props.defaultSelectedRows
    };
    return _this;
  }

  _createClass(DataTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initializeRows();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var plain = _props.plain;
      var style = _props.style;
      var responsive = _props.responsive;

      var table = _react2.default.createElement(
        'table',
        { className: (0, _classnames2.default)('md-data-table', className, { 'full-width': plain }), style: style },
        children
      );

      return responsive ? _react2.default.createElement(
        'div',
        { className: 'md-data-table-container' },
        table
      ) : table;
    }
  }]);

  return DataTable;
}(_react.Component);

DataTable.propTypes = {
  /**
   * An optional className to apply to the table.
   */
  className: _react.PropTypes.string,

  /**
   * Optional style to apply to the table.
   */
  style: _react.PropTypes.object,

  /**
   * The table contents to display. This *should* be a list of `TableHeader` and `TableBody`
   * components.
   */
  children: _react.PropTypes.node.isRequired,

  /**
   * An optional array of booleans denoting if a row is selected.
   * This is an associative array so the index must match the row
   * number in the `TableBody` component.
   */
  defaultSelectedRows: _react.PropTypes.arrayOf(_react.PropTypes.bool).isRequired,

  /**
   * Boolean if the table is responsive. This will wrap the table in a container
   * that allows scrolling to the right if overflow exists.
   */
  responsive: _react.PropTypes.bool.isRequired,

  /**
   * Boolean if this table should not include the checkboxes on each row.
   * This really means that the entire table is unselectable and you wish
   * to display as a normal table.
   */
  plain: _react.PropTypes.bool,

  /**
   * The icon className to use for the unchecked row icon. This value
   * will be passed down as `context`.
   */
  uncheckedIconClassName: _react.PropTypes.string.isRequired,

  /**
   * The icon children to use for the unchecked row icon. This value
   * will be passed down as `context`.
   */
  uncheckedIconChildren: _react.PropTypes.node,

  /**
   * The icon className to use for the checked row icon. This value
   * will be passed down as `context`.
   */
  checkedIconClassName: _react.PropTypes.string.isRequired,

  /**
   * The icon children to use for the checked row icon. This value
   * will be passed down as `context`.
   */
  checkedIconChildren: _react.PropTypes.node
};
DataTable.defaultProps = {
  uncheckedIconChildren: 'check_box_outline_blank',
  uncheckedIconClassName: 'material-icons',
  checkedIconChildren: 'check_box',
  checkedIconClassName: 'material-icons',
  defaultSelectedRows: [],
  responsive: true
};
DataTable.childContextTypes = {
  uncheckedIconClassName: _react.PropTypes.string.isRequired,
  uncheckedIconChildren: _react.PropTypes.node,
  checkedIconClassName: _react.PropTypes.string.isRequired,
  checkedIconChildren: _react.PropTypes.node,
  plain: _react.PropTypes.bool,
  allSelected: _react.PropTypes.bool.isRequired,
  selectedRows: _react.PropTypes.arrayOf(_react.PropTypes.bool).isRequired,
  toggleAllRows: _react.PropTypes.func.isRequired,
  toggleSelectedRow: _react.PropTypes.func.isRequired
};
exports.default = DataTable;
module.exports = exports['default'];