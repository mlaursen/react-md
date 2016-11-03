import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import getField from '../utils/getField';
import invalidIf from '../utils/PropTypes/invalidIf';
import DialogFooter from '../Dialogs/DialogFooter';
import TableColumn from './TableColumn';
import TextField from '../TextFields';
import FontIcon from '../FontIcons';
import { ENTER, TAB, ESC } from '../constants/keyCodes';

/**
 * A Text Edit dialog for tables. This can either be a small
 * version which only has the text field or a large version
 * that includes a title with a save and cancel action buttons.
 */
export default class EditDialogColumn extends PureComponent {
  static propTypes = {
    /**
     * The optional style to apply to the edit dialog's column.
     */
    style: PropTypes.object,

    /**
     * The optional className to apply to the edit dialog's column.
     */
    className: PropTypes.string,

    /**
     * The optional style to apply to the edit dialog.
     */
    dialogStyle: PropTypes.object,

    /**
     * The optional className to apply to the edit dialog.
     */
    dialogClassName: PropTypes.string,

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

    /**
     * An optional label for the text field.
     */
    label: PropTypes.node,

    /**
     * An optional placeholder for the text field.
     */
    placeholder: PropTypes.string,

    /**
     * Boolean if the text field should not appear in a dialog.
     */
    inline: invalidIf(PropTypes.bool, 'title', 'large'),

    /**
     * Any children used to display an inline edit dialog's edit icon.
     */
    inlineIconChildren: PropTypes.node,

    /**
     * The icon className used to display the inline edit dialog's edit icon.
     */
    inlineIconClassName: PropTypes.string,
  };

  static contextTypes = {
    rowId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  };

  static defaultProps = {
    defaultValue: '',
    transitionDuration: 300,
    okOnOutsideClick: true,
    okLabel: 'Save',
    cancelLabel: 'Cancel',
    inlineIconChildren: 'edit',
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.defaultValue,
      active: false,
      animating: false,
    };

    this._setColumn = this._setColumn.bind(this);
    this._setField = this._setField.bind(this);
    this._setOkButton = this._setOkButton.bind(this);
    this._save = this._save.bind(this);
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

    this._timeout = setTimeout(() => {
      if (!nextState.active && this._field) {
        this._field.blur();
      }

      this._timeout = null;
      this.setState({ animating: false });
    }, nextProps.transitionDuration);
    this.setState({ animating: true });
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _setColumn(column) {
    this._column = findDOMNode(column);
  }

  _setField(field) {
    if (field) {
      this._field = field.getField();
    }
  }

  _setOkButton(okButton) {
    this._okButton = findDOMNode(okButton);
  }

  _handleClickOutside(e) {
    if (this._column && !this._column.contains(e.target)) {
      if (this.props.onOutsideClick) {
        this.props.onOutsideClick(e);
      }

      if (this.props.okOnOutsideClick) {
        this._save(e);
      } else {
        this._handleCancelClick(e);
      }
    }
  }

  _handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    if (this.props.inline) {
      return;
    }

    const state = { active: true };
    if (!this.state.active) {
      state.cancelValue = getField(this.props, this.state, 'value');
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

  _overrideTab(e) {
    const { large, inline } = this.props;
    const key = e.which || e.keyCode;
    if (key !== TAB) {
      return;
    } else if (inline) {
      this._save(e);
      return;
    } else if (!large) {
      e.preventDefault();
      return;
    }

    const { shiftKey } = e;
    const { classList } = e.target;

    let nextFocus;
    if (classList.contains('md-text-field') && shiftKey) {
      nextFocus = this._okButton;
    } else if (classList.contains('md-btn') && !shiftKey) {
      nextFocus = this._field;
    }

    if (nextFocus) {
      e.preventDefault();
      nextFocus.focus();
    }
  }

  _save(e) {
    if (this.props.onOkClick) {
      this.props.onOkClick(getField(this.props, this.state, 'value'), e);
    }

    this.setState({ active: false });
  }

  _handleCancelClick(e) {
    if (this.props.onCancelClick) {
      this.props.onCancelClick(this.state.cancelValue, e);
    }

    this.setState({ active: false, value: this.state.cancelValue });
  }

  _handleChange(value, e) {
    if (this.props.onChange) {
      this.props.onChange(value, e);
    }

    if (typeof this.props.value === 'undefined') {
      this.setState({ value });
    }
  }

  render() {
    const { rowId } = this.context;
    const { active, animating } = this.state;
    const {
      style,
      className,
      dialogStyle,
      dialogClassName,
      maxLength,
      title,
      okLabel,
      cancelLabel,
      large,
      label,
      placeholder,
      inline,
      inlineIconChildren,
      inlineIconClassName,
      ...props
    } = this.props;

    delete props.value;
    delete props.defaultValue;
    delete props.onOkClick;
    delete props.onCancelClick;
    delete props.header;
    delete props.okOnOutsideClick;
    delete props.transitionDuration;

    const value = getField(this.props, this.state, 'value');

    let actions;
    let largeTitle;
    if (!inline && large && active) {
      actions = [{
        label: cancelLabel,
        onClick: this._handleCancelClick,
        primary: true,
      }, {
        label: okLabel,
        onClick: this._save,
        primary: true,
        ref: this._setOkButton,
        onKeyDown: this._overrideTab,
      }];

      actions = <DialogFooter actions={actions} />;

      largeTitle = (
        <h3 className="md-title">{title}</h3>
      );
    }

    const pointer = cn({ 'md-pointer--hover': !active });
    let inlineEditIcon;
    if (inline) {
      inlineEditIcon = (
        <FontIcon
          key="edit-icon"
          style={{ marginBottom: 0 }}
          iconClassName={inlineIconClassName}
        >
          {inlineIconChildren}
        </FontIcon>
      );
    }

    return (
      <TableColumn
        style={style}
        className={cn('prevent-grow md-edit-dialog-column', className)}
        ref={this._setColumn}
      >
        <div
          style={active || animating ? Object.assign({}, dialogStyle, { position: 'absolute' }) : dialogStyle}
          className={cn('md-edit-dialog', {
            'md-edit-dialog--inactive': !active,
            'md-edit-dialog--active': active,
            'md-background': active,
          }, dialogClassName)}
        >
          {largeTitle}
          <TextField
            id={`${rowId}-edit-dialog`}
            {...props}
            ref={this._setField}
            label={active ? label : null}
            active={active}
            floating={active}
            placeholder={active ? placeholder : placeholder || label}
            block={!active}
            paddedBlock={false}
            className={pointer}
            inputClassName={pointer}
            onKeyDown={this._handleKeyDown}
            onFocus={this._handleFocus}
            value={value}
            onChange={this._handleChange}
            maxLength={active ? maxLength : null}
            rightIcon={inlineEditIcon}
          />
          {actions}
        </div>
      </TableColumn>
    );
  }
}
