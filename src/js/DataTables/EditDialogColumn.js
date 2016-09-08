import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import Button from '../Buttons';
import TableColumn from './TableColumn';
import TextField from '../TextFields';
import { ENTER, TAB, ESC } from '../constants/keyCodes';
import { onOutsideClick } from '../utils';

/**
 * A Text Edit dialog for tables. This can either be a small
 * version which only has the text field or a large version
 * that includes a title with a save and cancel action buttons.
 */
export default class EditDialogColumn extends PureComponent {
  static propTypes = {
    /**
     * The optional style to apply to the edit dialog.
     */
    style: PropTypes.object,

    /**
     * The optional className to apply to the edit dialog.
     */
    className: PropTypes.string,

    /**
     * The optional style to apply to the column.
     */
    columnStyle: PropTypes.object,

    /**
     * The optional className to apply to the column.
     */
    columnClassName: PropTypes.string,

    /**
     * The transition duration when the dialog is moving from
     * active to inactive.
     */
    transitionDuration: PropTypes.number.isRequired,

    /**
     * Boolean if the edit dialog is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * The optional max length for the edit dialog.
     */
    maxLength: PropTypes.number,

    /**
     * A value to use for the edit dialog text field. This
     * will make the component controlled so you will need
     * to provide an `onChange` function.
     */
    value: PropTypes.string,

    /**
     * An optional function to call when the text field's value
     * is changed. It is called with `(newValue, changeEvent)`.
     */
    onChange: PropTypes.func,

    /**
     * The default value for the column.
     */
    defaultValue: PropTypes.string,


    /**
     * An optional onFocus function to call.
     */
    onFocus: PropTypes.func,

    /**
     * An optional onBlur function to call.
     */
    onBlur: PropTypes.func,

    /**
     * An optional onKeyDown function to call.
     */
    onKeyDown: PropTypes.func,

    /**
     * Boolean if the edit dialog should be large.
     */
    large: PropTypes.bool,

    /**
     * An id for the text field in the edit dialog column.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),

    /**
     * The title for the large edit dialog. The custom validation changes to required
     * when the `large` prop is set to true.
     */
    title: (props, propName, component, ...others) => {
      if (props.large) {
        return PropTypes.string.isRequired(props, propName, component, ...others);
      } else {
        return PropTypes.string(props, propName, component, ...others);
      }
    },

    /**
     * An optional function to call when the OK button is clicked.
     * It is called with `(textFieldValue, clickEvent)`. This function
     * will also be called when a user pressed the enter key.
     */
    onOkClick: PropTypes.func,

    /**
     * The label to use for the OK button.
     */
    okLabel: PropTypes.string.isRequired,

    /**
     * An optional function to call when the Cancel button is clicked.
     * It is called with `(textFieldValueBeforeEdit, clickEvent)`. This
     * function will also be called when the user presses the escape key.
     */
    onCancelClick: PropTypes.func,

    /**
     * The label to use for the Cancel button.
     */
    cancelLabel: PropTypes.string.isRequired,

    /**
     * An optional function to call when the edit dialog is open and the user clicks
     * somewhere else on the page.
     */
    onOutsideClick: PropTypes.func,

    /**
     * A boolean if the action when the edit dialog is open and the user clicks somewhere
     * else on the page should be to confirm the current changes.
     *
     * If this is set to `true`, `onOkClick` will be called. Otherwise `onCancelClick` will
     * be called.
     */
    okOnOutsideClick: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    transitionDuration: 300,
    okOnOutsideClick: true,
    okLabel: 'Save',
    cancelLabel: 'Cancel',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
      active: false,
      animating: false,
    };

    this._save = this._save.bind(this);
    this._getValue = this._getValue.bind(this);
    this._overrideTab = this._overrideTab.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.active === nextState.active) { return; }

    if (nextState.active) {
      window.addEventListener('click', this._handleClickOutside);
    } else {
      window.removeEventListener('click', this._handleClickOutside);
    }

    this.setState({
      animating: true,
      timeout: setTimeout(() => {
        if (!nextState.active) {
          findDOMNode(this).querySelector('input').blur();
        }

        this.setState({ animating: false, timeout: null });
      }, nextProps.transitionDuration),
    });
  }

  componentWillUnmount() {
    if (this.statetimeout) {
      clearTimeout(this.state.timeout);
    }
  }

  _handleClickOutside(e) {
    onOutsideClick(e, findDOMNode(this.refs.column), () => {
      if (this.props.onOutsideClick) {
        this.props.onOutsideClick(e);
      }

      if (this.props.okOnOutsideClick) {
        this._save(e);
      } else {
        this._handleCancelClick(e);
      }
    });
  }

  _handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    const state = { active: true };
    if (!this.state.active) {
      state.cancelValue = this._getValue() || '';
    }

    this.setState(state);
  }

  _handleKeyDown(e) {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    if (key === ENTER) {
      this._save(e);
    } else if (key === TAB) {
      this._overrideTab(e);
    } else if (key === ESC) {
      this._handleCancelClick(e);
    }
  }

  _save(e) {
    if (this.props.onOkClick) {
      this.props.onOkClick(this._getValue(), e);
    }

    this.setState({ active: false });
  }

  _handleCancelClick(e) {
    if (this.props.onCancelClick) {
      this.props.onCancelClick(this.state.cancelValue, e);
    }

    this.setState({ active: false, value: this.state.cancelValue });
  }

  _getValue() {
    return typeof this.props.value === 'undefined' ? this.state.value : this.props.value;
  }

  _handleChange(value, e) {
    if (this.props.onChange) {
      this.props.onChange(value, e);
    }

    if (typeof this.props.value === 'undefined') {
      this.setState({ value });
    }
  }

  _overrideTab(e) {
    const { large } = this.props;
    const key = e.which || e.keyCode;
    if (key !== TAB) { return; }

    if (!large) {
      e.preventDefault();
      return;
    }

    const { shiftKey } = e;
    const { classList } = e.target;

    let nextFocus;
    if (classList.contains('md-text-field') && shiftKey) {
      nextFocus = findDOMNode(this.refs.okButton);
    } else if (classList.contains('md-btn') && !shiftKey) {
      nextFocus = findDOMNode(this.refs.textField).querySelector('.md-text-field');
    }

    if (nextFocus) {
      e.preventDefault();
      nextFocus.focus();
    }
  }

  render() {
    const { active, animating } = this.state;
    const {
      columnStyle,
      columnClassName,
      style,
      className,
      maxLength,
      title,
      okLabel,
      cancelLabel,
      large,
      ...props,
    } = this.props;

    delete props.defaultValue;
    delete props.onOkClick;
    delete props.onCancelClick;
    delete props.header;
    delete props.okOnOutsideClick;
    delete props.transitionDuration;

    const value = this._getValue();
    let actions;
    let largeTitle;
    if (large && active) {
      actions = (
        <footer className="md-dialog-footer">
          <Button flat label={cancelLabel} onClick={this._handleCancelClick} primary />
          <Button
            flat
            ref="okButton"
            label={okLabel}
            onClick={this._save}
            primary
            onKeyDown={this._overrideTab}
          />
        </footer>
      );

      largeTitle = (
        <h3 className="md-title">{title}</h3>
      );
    }

    return (
      <TableColumn
        className={cn('prevent-grow md-edit-dialog-column', columnClassName)}
        ref="column"
        style={columnStyle}
      >
        <div
          className={cn('md-edit-dialog', className, {
            animating,
            active,
            large,
          })}
          style={style}
        >
          {largeTitle}
          <TextField
            {...props}
            ref="textField"
            onKeyDown={this._handleKeyDown}
            onFocus={this._handleFocus}
            value={value}
            onChange={this._handleChange}
            maxLength={active ? maxLength : null}
          />
          {actions}
        </div>
      </TableColumn>
    );
  }
}
