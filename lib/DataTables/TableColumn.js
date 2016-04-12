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

var _Tooltips = require('../Tooltips');

var _Tooltips2 = _interopRequireDefault(_Tooltips);

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A column in a table. This is either the `th` or `td` component. This column
 * can be automatically configured to be adjusted with additional padding
 * or auto expand to fill the remaining table space if the `TableRow` component
 * has `autoAdjust` set to `true`. If you would like to prevent this column
 * for being a candidate for auto expanding to remaining space, add the className
 * `.prevent-grow`.
 */

var TableColumn = function (_Component) {
  _inherits(TableColumn, _Component);

  function TableColumn(props) {
    _classCallCheck(this, TableColumn);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableColumn).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(TableColumn, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var numeric = _props.numeric;
      var adjusted = _props.adjusted;
      var header = _props.header;
      var children = _props.children;
      var tooltip = _props.tooltip;
      var sorted = _props.sorted;
      var sortIconChildren = _props.sortIconChildren;
      var sortIconClassName = _props.sortIconClassName;

      var props = _objectWithoutProperties(_props, ['className', 'numeric', 'adjusted', 'header', 'children', 'tooltip', 'sorted', 'sortIconChildren', 'sortIconClassName']);

      var sortable = typeof sorted === 'boolean';

      var displayedChildren = [children, tooltip];
      if (sortable) {
        displayedChildren = [_react2.default.createElement(_FontIcons2.default, {
          key: 'sort-icon',
          className: !sorted ? 'flipped' : null,
          iconClassName: sortIconClassName,
          children: sortIconChildren
        }), _react2.default.createElement(
          'span',
          { key: 'children', className: 'inline-top' },
          children
        ), tooltip];
      }

      return _react2.default.createElement(header ? 'th' : 'td', _extends({}, props, {
        className: (0, _classnames2.default)('md-table-' + (header ? 'header' : 'data'), className, { numeric: numeric, adjusted: adjusted, sortable: sortable }),
        children: displayedChildren
      }));
    }
  }]);

  return TableColumn;
}(_react.Component);

TableColumn.propTypes = {
  /**
   * The optional className for the table column
   */
  className: _react.PropTypes.string,

  /**
   * The children to display in the column.
   */
  children: _react.PropTypes.node,

  /**
   * Boolean if the column is currently sorted. If this prop is not `undefined`,
   * it will add the sort icon unto this column. You will also need to use the
   * `onClick` function to toggle the `sorted` prop as well as handling the sorting
   * of data.
   *
   * This value should really only be set in the `TableHeader` component.
   */
  sorted: _react.PropTypes.bool,

  /**
   * The optional icon children to display in the sort icon.
   */
  sortIconChildren: _react.PropTypes.node,

  /**
   * The icon className for the sort icon.
   */
  sortIconClassName: _react.PropTypes.string.isRequired,

  /**
   * A boolean if the column has numeric data. It will right-align the data.
   */
  numeric: _react.PropTypes.bool,

  /**
   * Boolean if this column should be adjusted with additional padding. This *should*
   * be handled automatically by the `TableRow` component but can be set manually as well.
   */
  adjusted: _react.PropTypes.bool,

  /**
   * Boolean if this is a `th` component. This value **should** be set
   * automatically for you if it is in the `TableHeader` component.
   */
  header: _react.PropTypes.bool.isRequired,

  /**
   * The optional tooltip to render on hover.
   */
  tooltipLabel: _react.PropTypes.string,

  /**
   * The position of the tooltip.
   */
  tooltipPosition: _react.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The optionally injected tooltip from the `injectTooltip` higher order component.
   */
  tooltip: _react.PropTypes.node
};
TableColumn.defaultProps = {
  header: false,
  sortIconClassName: 'material-icons',
  sortIconChildren: 'arrow_upward'
};
exports.default = (0, _Tooltips2.default)(TableColumn);
module.exports = exports['default'];