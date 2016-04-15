'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A `thead` component ot use in the `DataTable` component. This
 * will automatically update the header row to check if it is selected
 * and inject a function to toggle all rows selected if the row is
 * uncontrolled. It will also automatically attempt to set the `TableColumn`
 * components to be the header type.
 */

var TableHeader = function (_Component) {
  _inherits(TableHeader, _Component);

  function TableHeader(props, context) {
    _classCallCheck(this, TableHeader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableHeader).call(this, props, context));

    _initialiseProps.call(_this);

    return _this;
  }

  _createClass(TableHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['children']);

      var _context = this.context;
      var toggleAllRows = _context.toggleAllRows;
      var allSelected = _context.allSelected;

      var header = _react2.default.Children.only(children);
      var selected = typeof header.props.selected === 'undefined' ? allSelected : header.props.selected;

      var row = _react2.default.cloneElement(header, _extends({}, header.props, {
        selected: selected,
        onCheckboxClick: function onCheckboxClick(e) {
          header.props.onCheckboxClick && header.props.onCheckboxClick(e);

          if (typeof header.props.selected === 'undefined') {
            toggleAllRows();
          }
        }
      }));

      return _react2.default.createElement(
        'thead',
        props,
        row
      );
    }
  }]);

  return TableHeader;
}(_react.Component);

TableHeader.propTypes = {
  /**
   * An optional className to apply to the table header
   */
  className: _react.PropTypes.string,

  /**
   * This should be a single `TableRow` component. The `custom` validation will
   * warn you if there are more than one children given or none at all.
   */
  children: function children(props, propName, component) {
    try {
      _react2.default.Children.only(props.children);
    } catch (e) {
      return new Error('There must only be one child in a \'' + component + '\', but ' + (props.children ? props.children.length : 0) + ' were given.');
    }
  }
};
TableHeader.childContextTypes = {
  uncheckedIconClassName: _react.PropTypes.string.isRequired,
  uncheckedIconChildren: _react.PropTypes.node,
  checkedIconClassName: _react.PropTypes.string.isRequired,
  checkedIconChildren: _react.PropTypes.node,
  plain: _react.PropTypes.bool,
  allSelected: _react.PropTypes.bool.isRequired,
  selectedRows: _react.PropTypes.arrayOf(_react.PropTypes.bool).isRequired,
  toggleAllRows: _react.PropTypes.func.isRequired,
  toggleSelectedRow: _react.PropTypes.func.isRequired,
  header: _react.PropTypes.bool.isRequired
};
TableHeader.contextTypes = {
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

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getChildContext = function () {
    return _extends({}, _this2.context, {
      header: true
    });
  };
};

exports.default = TableHeader;
module.exports = exports['default'];