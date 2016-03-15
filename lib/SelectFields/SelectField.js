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

var _utils = require('../utils');

var _ = require('../');

var _SelectFieldButton = require('./SelectFieldButton');

var _SelectFieldButton2 = _interopRequireDefault(_SelectFieldButton);

var _Menus = require('../Menus');

var _Menus2 = _interopRequireDefault(_Menus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LIST_MARGIN = 8;

var SelectField = function (_Component) {
  _inherits(SelectField, _Component);

  function SelectField(props) {
    _classCallCheck(this, SelectField);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectField).call(this, props));

    _this.getSelected = function (key) {
      var value = _this.props.value;

      if (typeof value !== 'undefined') {
        return value;
      }

      var selected = _this.state.selected;

      if (typeof selected === 'undefined') {
        return '';
      } else if ((0, _utils.isObject)(selected)) {
        return selected[key];
      } else {
        return selected;
      }
    };

    _this.isActive = function (item, displayLabel) {
      if (typeof item === 'string' || typeof item === 'number') {
        return item === displayLabel;
      } else {
        return item[_this.props.itemLabel] === displayLabel;
      }
    };

    _this.handleFocus = function (e) {
      e.stopPropagation();
      e.preventDefault();
      _this.setState({ focused: true });
    };

    _this.handleBlur = function () {
      _this.setState({ focused: false });
    };

    _this.selectItem = function (item, index) {
      var _this$props = _this.props;
      var value = _this$props.value;
      var onChange = _this$props.onChange;

      onChange && onChange(item, index);

      var nextState = { isOpen: false };
      if (typeof value === 'undefined') {
        nextState.selected = item;
      }

      _this.setState(nextState);
    };

    _this.toggleMenu = function () {
      _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.handleClickOutside = function (e) {
      var node = _reactDom2.default.findDOMNode(_this);
      var target = e.target;
      while (target.parentNode) {
        if (target === node) {
          return;
        }
        target = target.parentNode;
      }

      _this.setState({ isOpen: false });
    };

    _this.handleKeyUp = function (item, i, e) {
      var key = e.which || e.keyCode;
      if (key === 13 || key === 32) {
        _this.selectItem(item, i);
        e.preventDefault();
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { isOpen: false, focused: false };
    if (typeof props.value === 'undefined') {
      _this.state.selected = props.defaultValue;
    }
    return _this;
  }

  _createClass(SelectField, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (typeof nextProps.value === 'undefined' && typeof this.state.selected === 'undefined' && nextProps.menuItems.length) {
        this.setState({ selected: nextProps.menuItems[0] });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.isOpen === prevState.isOpen) {
        return;
      }
      if (!this.state.isOpen) {
        document.removeEventListener('click', this.closeMenuListener);
        this.closeMenuListener = null;
      } else if (!this.closeMenuListener) {
        this.closeMenuListener = this.handleClickOutside;
        document.addEventListener('click', this.closeMenuListener);
      }

      if ((0, _utils.isPropEnabled)(this.props, 'below') || !this.state.isOpen) {
        return;
      }

      var menu = _reactDom2.default.findDOMNode(this).querySelector('.md-menu');
      var items = Array.prototype.slice.call(menu.querySelectorAll('.md-list-tile'));
      var maxScrollDistance = menu.scrollHeight - menu.offsetHeight;
      var index = 0;
      items.forEach(function (item, i) {
        if (item.classList.contains('active')) {
          index = i;
        }
      });

      var tileHeight = items[0].offsetHeight - LIST_MARGIN;
      var selected = items[index];
      var maxHeight = menu.offsetHeight - tileHeight - LIST_MARGIN;
      var itemsVisible = this.props.itemsVisible;

      var scrollTop = selected.offsetTop - tileHeight - LIST_MARGIN;
      var scrollDiff = scrollTop - maxScrollDistance;
      var x = (0, _utils.isPropEnabled)(this.props, 'expandRight') ? '0px' : '100%';

      var top = Math.min(selected.offsetTop - LIST_MARGIN + 12, maxHeight);
      if (items.length > 3 && index === items.length - 2) {
        top = maxHeight - tileHeight + LIST_MARGIN / 2;
      } else if (index > 0 && scrollDiff <= 0) {
        top = tileHeight + LIST_MARGIN + LIST_MARGIN / 2;
      } else if (index > 0 && items.length > itemsVisible && index < items.length - 2) {
        top = top - (items.length - 1 - index) * tileHeight + LIST_MARGIN / 2;
      }

      if (scrollTop > 0) {
        menu.scrollTop = scrollTop;
      }

      menu.style.top = '-' + top + 'px';
      // Expands/shrinks menu to center of button
      menu.style.transformOrigin = x + ' ' + (top + tileHeight / 2) + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var name = _props.name;
      var className = _props.className;
      var menuItems = _props.menuItems;
      var error = _props.error;
      var lineDirection = _props.lineDirection;
      var itemLabel = _props.itemLabel;
      var itemValue = _props.itemValue;
      var value = _props.value;
      var placeholder = _props.placeholder;

      var props = _objectWithoutProperties(_props, ['name', 'className', 'menuItems', 'error', 'lineDirection', 'itemLabel', 'itemValue', 'value', 'placeholder']);

      var _state = this.state;
      var focused = _state.focused;
      var isOpen = _state.isOpen;

      var isBelow = (0, _utils.isPropEnabled)(props, 'below');
      var displayLabel = this.getSelected(itemLabel);
      var displayValue = this.getSelected(itemValue);
      var fieldClassName = (0, _classnames2.default)('md-select-field', className, {
        'focus': focused || isOpen,
        'segmented': (0, _utils.isPropEnabled)(props, 'segmented'),
        'text-field-positioned': (0, _utils.isPropEnabled)(props, 'textFieldPositioned'),
        'placeholder': displayLabel === '' && placeholder
      });

      return _react2.default.createElement(
        _Menus2.default,
        _extends({
          listClassName: 'md-select-field-menu',
          isOpen: isOpen,
          close: this.close,
          toggle: _react2.default.createElement(_SelectFieldButton2.default, {
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            label: displayLabel || placeholder,
            value: displayValue,
            onClick: this.toggleMenu,
            className: fieldClassName,
            name: name,
            isOpen: isOpen,
            isBelow: isBelow
          })
        }, props),
        menuItems.map(function (item, i) {
          return _react2.default.createElement(_.ListItem, {
            primaryText: (0, _utils.isObject)(item) ? item[itemLabel] : item,
            key: item.key || i,
            onClick: _this2.selectItem.bind(_this2, item, i),
            onKeyUp: _this2.handleKeyUp.bind(_this2, item, i),
            className: (0, _classnames2.default)({ 'active': _this2.isActive(item, displayLabel) })
          });
        })
      );
    }
  }]);

  return SelectField;
}(_react.Component);

SelectField.propTypes = {
  name: _react.PropTypes.string,
  className: _react.PropTypes.string,
  menuItems: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string, _react.PropTypes.number])).isRequired,
  itemLabel: _react.PropTypes.string,
  itemValue: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  onChange: _react.PropTypes.func,
  expandRight: _react.PropTypes.bool,
  itemsVisible: _react.PropTypes.number,
  textFieldPositioned: _react.PropTypes.bool,
  defaultValue: _react.PropTypes.string,
  menuBelow: _react.PropTypes.bool,
  lineDirection: _react.PropTypes.oneOf(['left', 'center', 'right']),
  editable: _react.PropTypes.bool,
  segmented: _react.PropTypes.bool,
  error: _react.PropTypes.bool
};
SelectField.defaultProps = {
  itemLabel: 'label',
  itemValue: 'value',
  lineDirection: 'left',
  itemsVisible: 6,
  defaultValue: ''
};
exports.default = SelectField;
module.exports = exports['default'];