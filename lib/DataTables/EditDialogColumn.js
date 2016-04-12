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

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Buttons = require('../Buttons');

var _TableColumn = require('./TableColumn');

var _TableColumn2 = _interopRequireDefault(_TableColumn);

var _TextFields = require('../TextFields');

var _TextFields2 = _interopRequireDefault(_TextFields);

var _keyCodes = require('../constants/keyCodes');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Text Edit dialog for tables. This can either be a small
 * version which only has the text field or a large version
 * that includes a title with a save and cancel action buttons.
 */

var EditDialogColumn = function (_Component) {
  _inherits(EditDialogColumn, _Component);

  function EditDialogColumn(props) {
    _classCallCheck(this, EditDialogColumn);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EditDialogColumn).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      value: props.defaultValue,
      active: false,
      animating: false
    };
    return _this;
  }

  _createClass(EditDialogColumn, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var _this2 = this;

      if (this.state.active === nextState.active) {
        return;
      }

      if (nextState.active) {
        window.addEventListener('click', this.handleClickOutside);
      } else {
        window.removeEventListener('click', this.handleClickOutside);
      }

      this.setState({
        animating: true,
        timeout: setTimeout(function () {
          if (!nextState.active) {
            _reactDom2.default.findDOMNode(_this2).querySelector('input').blur();
          }

          _this2.setState({ animating: false, timeout: null });
        }, nextProps.transitionDuration)
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.state.timeout && clearTimeout(this.state.timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var active = _state.active;
      var animating = _state.animating;
      var _props = this.props;
      var defaultValue = _props.defaultValue;
      var columnClassName = _props.columnClassName;
      var className = _props.className;
      var maxLength = _props.maxLength;
      var title = _props.title;
      var onOkClick = _props.onOkClick;
      var okLabel = _props.okLabel;
      var onCancelClick = _props.onCancelClick;
      var cancelLabel = _props.cancelLabel;
      var large = _props.large;

      var props = _objectWithoutProperties(_props, ['defaultValue', 'columnClassName', 'className', 'maxLength', 'title', 'onOkClick', 'okLabel', 'onCancelClick', 'cancelLabel', 'large']);

      var value = this.getValue();
      var actions = void 0,
          largeTitle = void 0;
      if (large && active) {
        actions = _react2.default.createElement(
          'footer',
          { className: 'md-dialog-footer' },
          _react2.default.createElement(_Buttons.FlatButton, { label: cancelLabel, onClick: this.handleCancelClick, primary: true }),
          _react2.default.createElement(_Buttons.FlatButton, { ref: 'okButton', label: okLabel, onClick: this.save, primary: true, onKeyDown: this.overrideTab })
        );

        largeTitle = _react2.default.createElement(
          'h3',
          { className: 'md-title' },
          title
        );
      }

      return _react2.default.createElement(
        _TableColumn2.default,
        { className: (0, _classnames2.default)(columnClassName, 'prevent-grow md-edit-dialog-column'), ref: 'column' },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('md-edit-dialog', className, {
              animating: animating,
              active: active,
              large: large
            })
          },
          largeTitle,
          _react2.default.createElement(_TextFields2.default, _extends({}, props, {
            ref: 'textField',
            floatingLabel: false,
            onKeyDown: this.handleKeyDown,
            onFocus: this.handleFocus,
            value: value,
            onChange: this.handleChange,
            maxLength: active ? maxLength : null
          })),
          actions
        )
      );
    }
  }]);

  return EditDialogColumn;
}(_react.Component);

EditDialogColumn.propTypes = {
  /**
   * The optional className to apply to the edit dialog.
   */
  className: _react.PropTypes.string,

  /**
   * The optional className to apply to the column.
   */
  columnClassName: _react.PropTypes.string,

  /**
   * The transition duration when the dialog is moving from
   * active to inactive.
   */
  transitionDuration: _react.PropTypes.number.isRequired,

  /**
   * Boolean if the edit dialog is disabled.
   */
  disabled: _react.PropTypes.bool,

  /**
   * The optional max length for the edit dialog.
   */
  maxLength: _react.PropTypes.number,

  /**
   * A value to use for the edit dialog text field. This
   * will make the component controlled so you will need
   * to provide an `onChange` function.
   */
  value: _react.PropTypes.string,

  /**
   * An optional function to call when the text field's value
   * is changed. It is called with `(newValue, changeEvent)`.
   */
  onChange: _react.PropTypes.func,

  /**
   * The default value for the column.
   */
  defaultValue: _react.PropTypes.string,

  /**
   * An optional onFocus function to call.
   */
  onFocus: _react.PropTypes.func,

  /**
   * An optional onBlur function to call.
   */
  onBlur: _react.PropTypes.func,

  /**
   * An optional onKeyDown function to call.
   */
  onKeyDown: _react.PropTypes.func,

  /**
   * Boolean if the edit dialog should be large.
   */
  large: _react.PropTypes.bool,

  /**
   * The title for the large edit dialog. The custom validation changes to required
   * when the `large` prop is set to true.
   */
  title: function title(props, propName, component) {
    if (props.large) {
      return _react.PropTypes.string.isRequired(props, propName, component);
    }
  },

  /**
   * An optional function to call when the OK button is clicked.
   * It is called with `(textFieldValue, clickEvent)`. This function
   * will also be called when a user pressed the enter key.
   */
  onOkClick: _react.PropTypes.func,

  /**
   * The label to use for the OK button.
   */
  okLabel: _react.PropTypes.string.isRequired,

  /**
   * An optional function to call when the Cancel button is clicked.
   * It is called with `(textFieldValueBeforeEdit, clickEvent)`. This
   * function will also be called when the user presses the escape key.
   */
  onCancelClick: _react.PropTypes.func,

  /**
   * The label to use for the Cancel button.
   */
  cancelLabel: _react.PropTypes.string.isRequired,

  /**
   * An optional function to call when the edit dialog is open and the user clicks
   * somewhere else on the page.
   */
  onOutsideClick: _react.PropTypes.func,

  /**
   * A boolean if the action when the edit dialog is open and the user clicks somewhere
   * else on the page should be to confirm the current changes.
   *
   * If this is set to `true`, `onOkClick` will be called. Otherwise `onCancelClick` will be called.
   */
  okOnOutsideClick: _react.PropTypes.bool.isRequired
};
EditDialogColumn.defaultProps = {
  transitionDuration: 300,
  okOnOutsideClick: true,
  okLabel: 'Save',
  cancelLabel: 'Cancel',
  onOkClick: function onOkClick() {},
  onCancelClick: function onCancelClick() {}
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleClickOutside = function (e) {
    (0, _utils.onOutsideClick)(e, _reactDom2.default.findDOMNode(_this3.refs.column), function () {
      var _props2 = _this3.props;
      var onOutsideClick = _props2.onOutsideClick;
      var okOnOutsideClick = _props2.okOnOutsideClick;

      onOutsideClick && onOutsideClick(e);

      if (okOnOutsideClick) {
        _this3.save(e);
      } else {
        _this3.handleCancelClick(e);
      }
    });
  };

  this.handleFocus = function (e) {
    _this3.props.onFocus && _this3.props.onFocus(e);

    var state = { active: true };
    if (!_this3.state.active) {
      state.cancelValue = _this3.getValue() || '';
    }

    _this3.setState(state);
  };

  this.handleKeyDown = function (e) {
    var onKeyDown = _this3.props.onKeyDown;

    onKeyDown && onKeyDown(e);

    var key = e.which || e.keyCode;
    if (key === _keyCodes.ENTER) {
      _this3.save();
    } else if (key === _keyCodes.TAB) {
      _this3.overrideTab(e);
    } else if (key === _keyCodes.ESC) {
      _this3.handleCancelClick(e);
    }
  };

  this.save = function (e) {
    _this3.props.onOkClick && _this3.props.onOkClick(_this3.getValue(), e);

    _this3.setState({ active: false });
  };

  this.handleCancelClick = function (e) {
    _this3.props.onCancelClick(_this3.state.cancelValue, e);

    _this3.setState({ active: false, value: _this3.state.cancelValue });
  };

  this.getValue = function () {
    return typeof _this3.props.value === 'undefined' ? _this3.state.value : _this3.props.value;
  };

  this.handleChange = function (value, e) {
    _this3.props.onChange && _this3.props.onChange(value, e);
    if (typeof _this3.props.value === 'undefined') {
      _this3.setState({ value: value });
    }
  };

  this.overrideTab = function (e) {
    var large = _this3.props.large;

    var key = e.which || e.keyCode;
    if (key !== _keyCodes.TAB) {
      return;
    }

    if (!large) {
      e.preventDefault();
      return;
    }

    var shiftKey = e.shiftKey;
    var classList = e.target.classList;


    var nextFocus = void 0;
    if (classList.contains('md-text-field') && shiftKey) {
      nextFocus = _reactDom2.default.findDOMNode(_this3.refs.okButton);
    } else if (classList.contains('md-btn') && !shiftKey) {
      nextFocus = _reactDom2.default.findDOMNode(_this3.refs.textField).querySelector('.md-text-field');
    }

    if (nextFocus) {
      e.preventDefault();
      nextFocus.focus();
    }
  };
};

exports.default = EditDialogColumn;
module.exports = exports['default'];