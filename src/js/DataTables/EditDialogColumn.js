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

import findTable from './findTable';

/**
 * A Text Edit dialog for tables. This can either be a small
 * version which only has the text field or a large version
 * that includes a title with a save and cancel action buttons.
 */
export default class EditDialogColumn extends PureComponent {
  static propTypes = {
    /**
     * An optional id to provide to the text field in the column. If this is omitted,
     * the id will be the current row id and `-edit-dialog`.
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

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
     * An optional style to apply to the text field.
     */
    textFieldStyle: PropTypes.object,

    /**
     * An optional class name to apply to the text field.
     */
    textFieldClassName: PropTypes.string,

    /**
     * An optional style to apply to the text field's input.
     */
    inputStyle: PropTypes.object,

    /**
     * An optional class name to apply to the text field's input.
     */
    inputClassName: PropTypes.string,

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
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional function to call when the text field's value
     * is changed. It is called with `(newValue, changeEvent)`.
     */
    onChange: PropTypes.func,

    /**
     * The default value for the column.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

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

    /**
     * The type for the text field.
     */
    type: TextField.propTypes.type,

    /**
     * Boolean if the min width of the dialog should be set to the `$md-edit-dialog-column-min-width` variable.
     * If this is undefined, the min width will be enforced when the `type` prop is `text`.
     */
    enforceMinWidth: PropTypes.bool,

    /**
     * When the dialog is open and a user scrolls the dialog offscreen, this is the amount
     * of the dialog that should be offscreen before hiding the dialog (inverse). The default
     * is to have 25% of the dialog offscreen.
     */
    scrollThreshold: PropTypes.number.isRequired,
  };

  static contextTypes = {
    rowId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  };

  static defaultProps = {
    type: 'text',
    defaultValue: '',
    transitionDuration: 300,
    okOnOutsideClick: true,
    okLabel: 'Save',
    cancelLabel: 'Cancel',
    inlineIconChildren: 'edit',
    scrollThreshold: 0.75,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.defaultValue,
      active: false,
      absolute: false,
      animating: false,
    };

    this._table = null;
    this._column = null;
    this._field = null;

    this._setColumn = this._setColumn.bind(this);
    this._setDialog = this._setDialog.bind(this);
    this._setField = this._setField.bind(this);
    this._setOkButton = this._setOkButton.bind(this);
    this._save = this._save.bind(this);
    this._overrideTab = this._overrideTab.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._positionCell = this._positionCell.bind(this);
    this._repositionCell = this._repositionCell.bind(this);
    this._activateDialog = this._activateDialog.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { active } = this.state;
    if (active === prevState.active) {
      return;
    } else if (this._table) {
      this._table[`${active ? 'add' : 'remove'}EventListener`]('scroll', this._repositionCell);
      this._left = active ? this.state.left : null;
      this._scrollLeft = active ? this._table.scrollLeft : null;
    }

    window[`${active ? 'add' : 'remove'}EventListener`]('click', this._handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._handleClickOutside);

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _getDialogPosition(dialog) {
    let left = null;
    let width = null;
    if (dialog) {
      left = dialog.getBoundingClientRect().left - 1;
      width = dialog.offsetWidth;
    }

    return { width, left };
  }

  _setColumn(column) {
    this._column = findDOMNode(column);
    this._table = findTable(this._column);
  }

  _setDialog(dialog) {
    this._dialog = dialog;
  }

  _setField(field) {
    if (field) {
      this._field = field.getField();
    }
  }

  _setOkButton(okButton) {
    this._okButton = findDOMNode(okButton);
  }

  /**
   * This function will absolutely position a cell either on mouse over, keyboard tab focus,
   * or touch start. This allows the table cell to expand outside of the table's scroll view.
   */
  _positionCell() {
    if (this.props.inline) {
      return;
    }

    let position;
    if (!this.state.absolute) {
      position = this._getDialogPosition(this._dialog, this._table);
    }

    this.setState({ absolute: true, ...position });
  }

  /**
   * When the dialog is open and the user scrolls the data table (for some reason), this will
   * keep the cell positioned correctly.
   */
  _repositionCell() {
    if (!this._ticking) {
      requestAnimationFrame(() => {
        this._ticking = false;

        let left = this._left;
        let scrolledOut = false;
        if (this._table) {
          const { scrollLeft, offsetWidth } = this._table;
          left -= (scrollLeft - this._scrollLeft);
          scrolledOut = left < 16 || offsetWidth - left < this.state.width * this.props.scrollThreshold;
        }

        let { absolute, active } = this.state;
        if (!this._timeout && scrolledOut) {
          this._timeout = setTimeout(() => {
            this._timeout = null;
            this.setState({ absolute: false, left: null, width: null });
          }, this.props.transitionDuration);
          active = false;
          absolute = true;
        }

        this.setState({ left, absolute, active });
      });
    }

    this._ticking = true;
  }

  /**
   * Activates the dialog after it has already been positioned absolutely. This
   * is triggered froma  click event, a touchend event, or the callback of the `this.setState`
   * when coming from a keyboard focus event.
   *
   * @param {Object=} e - The click or touchend event.
   */
  _activateDialog(e) {
    if (e) {
      let callback;
      if (e.type === 'click') {
        callback = 'onClick';
      } else if (e.type === 'touchend') {
        callback = 'onTouchEnd';
      }

      if (callback && this.props[callback]) {
        this.props[callback](e);
      }
    }

    if (this.props.inline || this.state.active) {
      return;
    }

    this.setState({ active: true, cancelValue: getField(this.props, this.state, 'value') });
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

  _handleMouseOver(e) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    this._positionCell();
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (this.props.inline) {
      return;
    }

    let position;
    if (!this.state.active) {
      position = { width: null, left: null };
    }

    this.setState({ absolute: false, ...position });
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
      this._activateDialog();
    }, TICK);
    this._positionCell();
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this._positionCell();
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
    const { large, inline, okOnOutsideClick } = this.props;
    const key = e.which || e.keyCode;
    if (key !== TAB) {
      return;
    } else if (inline) {
      this._save(e);
      return;
    } else if (!large) {
      if (okOnOutsideClick) {
        this._save(e);
      } else {
        this._handleCancelClick(e);
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

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ absolute: false, left: null, width: null });
    }, this.props.transitionDuration);
    this.setState({ active: false, absolute: true });
  }

  _handleCancelClick(e) {
    if (this.props.onCancelClick) {
      this.props.onCancelClick(this.state.cancelValue, e);
    }

    const state = { absolute: true, active: false };
    if (typeof this.props.value === 'undefined') {
      state.value = this.state.cancelValue;
    }

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ absolute: false, left: null, width: null });
    }, this.props.transitionDuration);

    this.setState(state);
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
    const { active, absolute, animating, left, width } = this.state;
    const {
      style,
      className,
      dialogStyle,
      dialogClassName,
      textFieldStyle,
      textFieldClassName,
      inputStyle,
      inputClassName,
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
      enforceMinWidth,
      ...props
    } = this.props;

    delete props.id;
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
    delete props.scrollThreshold;

    const value = getField(this.props, this.state, 'value');
    let { id } = this.props;
    if (!id) {
      id = `${rowId}-edit-dialog`;
    }

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
        <FontIcon key="edit-icon" iconClassName={inlineIconClassName}>
          {inlineIconChildren}
        </FontIcon>
      );
    }

    const ariaProps = {};
    if (!inline) {
      ariaProps.id = `${id}-container`;
      ariaProps['aria-haspopup'] = true;
      ariaProps['aria-expanded'] = active;
      ariaProps['aria-owns'] = id;
    }

    return (
      <TableColumn
        style={{ left, ...style }}
        className={cn('prevent-grow md-edit-dialog-column', {
          'md-table-column--fixed': !inline && (absolute || active || animating),
          'md-table-column--fixed-active': active,
        }, className)}
        header={header}
        ref={this._setColumn}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
        onClick={this._activateDialog}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._activateDialog}
        __fixedColumn
      >
        <div
          {...ariaProps}
          ref={this._setDialog}
          style={{ width, ...dialogStyle }}
          className={cn('md-edit-dialog', {
            'md-edit-dialog--active': active,
            'md-edit-dialog--inline': inline,
            'md-edit-dialog--min-width': typeof enforceMinWidth === 'undefined'
              ? props.type === 'text'
              : enforceMinWidth,
            'md-background': active,
          }, dialogClassName)}
        >
          {largeTitle}
          <TextField
            {...props}
            id={id}
            ref={this._setField}
            label={active ? label : null}
            active={active}
            floating={active}
            placeholder={active ? placeholder : placeholder || label}
            block={!active}
            paddedBlock={false}
            style={textFieldStyle}
            className={cn(pointer, textFieldClassName)}
            inputStyle={inputStyle}
            inputClassName={cn(pointer, {
              'md-text-right': props.type === 'number',
            }, inputClassName)}
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
