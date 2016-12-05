import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { ENTER, TAB, ESC } from '../constants/keyCodes';
import TICK from '../constants/CSSTransitionGroupTick';
import getField from '../utils/getField';
import invalidIf from '../utils/PropTypes/invalidIf';
import DialogFooter from '../Dialogs/DialogFooter';
import TableColumn from './TableColumn';
import TextField from '../TextFields/TextField';
import FontIcon from '../FontIcons/FontIcon';

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
     * An optional function to call when the input is clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the keyup event is triggered.
     */
    onKeyUp: PropTypes.func,

    /**
     * An optional function to call when the keydown event is triggered.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional function to call when the mouseover event is triggered.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when the mouseleave event is triggered.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional function to call when the touchstart event is triggered.
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional function to call when the touchend event is triggered.
     */
    onTouchEnd: PropTypes.func,

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

    /**
     * Boolean if an inline edit text field should not include an icon.
     */
    noIcon: invalidIf(PropTypes.bool, 'title', 'large'),

    /**
     * This is injected by the `TableRow` component.
     */
    header: PropTypes.bool,
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
    };

    this._setColumn = this._setColumn.bind(this);
    this._setField = this._setField.bind(this);
    this._setOkButton = this._setOkButton.bind(this);
    this._save = this._save.bind(this);
    this._overrideTab = this._overrideTab.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.active === nextState.active) {
      return;
    }

    if (nextState.active) {
      // Wait for a re-render cycle before adding the window click event.
      // This will be called immediately after being clicked open and close
      // the dialog immediately on open.
      this._clickTimeout = setTimeout(() => {
        this._clickTimeout = null;
        window.addEventListener('click', this._handleClickOutside);
      }, TICK);
    } else {
      if (this._clickTimeout) {
        clearTimeout(this._clickTimeout);
        this._clickTimeout = null;
      }
      window.removeEventListener('click', this._handleClickOutside);
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
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
    window.removeEventListener('click', this._handleClickOutside);

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    if (this._clickTimeout) {
      clearTimeout(this._clickTimeout);
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

  _handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (this.props.inline || this.state.active) {
      return;
    }

    this.setState({ active: true, cancelValue: getField(this.props, this.state, 'value') });
  }


  _handleKeyUp(e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    // Make sure this is really a _focus_ event from keyboard
    if ((e.which || e.keyCode) !== TAB || this.state.active || this.props.inline) {
      return;
    }

    // To get a smooth transition with keybaord, need to _emulate_ how the mouse interaction works.
    // Basically position the edit field absolutely, wait for a re-render, then activate the dialog.
    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ active: true, cancelValue: getField(this.props, this.state, 'value') });
    }, TICK);

    this.setState({ absolute: true });
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this.setState({ absolute: true });
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    if (this.state.active || this.props.inline) {
      return;
    }

    this.setState({ active: true, cancelValue: getField(this.props, this.state, 'value') });
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
      if (getField(this.props, this.state, 'value')) {
        e.preventDefault();
      } else {
        this.setState({ active: false });
      }
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

    this.setState({ active: false, absolute: false });
  }

  _handleCancelClick(e) {
    if (this.props.onCancelClick) {
      this.props.onCancelClick(this.state.cancelValue, e);
    }

    this.setState({ absolute: false, active: false, value: this.state.cancelValue });
  }

  _handleChange(value, e) {
    if (this.props.onChange) {
      this.props.onChange(value, e);
    }

    if (typeof this.props.value === 'undefined') {
      this.setState({ value });
    }
  }

  _handleMouseOver(e) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (this.props.inline) {
      return;
    }

    this.setState({ absolute: true });
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (this.props.inline) {
      return;
    }

    this.setState({ absolute: false });
  }

  render() {
    const { rowId } = this.context;
    const { active, absolute, animating } = this.state;
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
      noIcon,
      header,
      ...props
    } = this.props;

    delete props.onMouseOver;
    delete props.onMouseLeave;
    delete props.onTouchStart;
    delete props.onTouchEnd;
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
    if (inline && !noIcon) {
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
        className={cn('prevent-grow md-edit-dialog-column', {
          'md-edit-dialog-column--animating': !inline && (absolute || active || animating),
          'md-edit-dialog-column--active': active,
        }, className)}
        header={header}
        ref={this._setColumn}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
        onClick={this._handleClick}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}
      >
        <div
          style={dialogStyle}
          className={cn('md-edit-dialog', {
            'md-edit-dialog--active': active,
            'md-edit-dialog--inline': inline,
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
            onKeyUp={this._handleKeyUp}
            onKeyDown={this._handleKeyDown}
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
