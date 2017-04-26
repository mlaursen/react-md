import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import { ENTER, ESC, TAB } from '../constants/keyCodes';
import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import anchorShape from '../Helpers/anchorShape';
import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';
import Layover from '../Helpers/Layover';
import FontIcon from '../FontIcons/FontIcon';
import TextField from '../TextFields/TextField';
import TableColumn from './TableColumn';
import EditDialog from './EditDialog';
import findTable from './findTable';
import findFixedTo from './findFixedTo';

/**
 * The `EditDialogColumn` is used when there should be used when a table column's value
 * can be changed. It can either be displayed as a dialog or inline.
 *
 * All props that are not documented but provided will be passed on to the `TextField`
 * component.
 */
export default class EditDialogColumn extends PureComponent {
  static VerticalAnchors = Layover.VerticalAnchors;
  static HorizontalAnchors = Layover.HorizontalAnchors;
  static Positions = Layover.Positions;

  static propTypes = {
    /**
     * An optional id to use for the text field in the column. If this is omitted,
     * the id will be `${dialogId}-field`.
     *
     * @see {@link #dialogId}
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to use for the dialog that appears in the column. If this is omitted,
     * the id will be `${rowId}-${cellIndex}-edit-dialog-field`.
     */
    dialogId: PropTypes.oneOfType([
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
     * An optional style to apply to the dialog's surrounding `Layover` component.
     */
    layoverStyle: PropTypes.object,

    /**
     * An optional className to the dialog's surrounding `Layover` component.
     */
    layoverClassName: PropTypes.string,

    /**
     * The optional style to apply to the edit dialog.
     */
    dialogStyle: PropTypes.object,

    /**
     * The optional className to apply to the edit dialog.
     */
    dialogClassName: PropTypes.string,

    /**
     * An optional style to apply to the dialog's content area. This is the area
     * that holds the text field.
     */
    dialogContentStyle: PropTypes.object,

    /**
     * An optional class name to apply to the dialog's content area. This is the area
     * that holds the text field.
     */
    dialogContentClassName: PropTypes.string,

    /**
     * The zDepth to apply to the dialog when not inline.
     *
     * @see {@link Papers/Paper#zDepth}
     */
    dialogZDepth: PropTypes.number.isRequired,

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
     * Boolean if the edit dialog is currently disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if the text field should be editable inline instead of in a dialog.
     *
     * @see {@link #noIcon}
     * @see {@link #inlineIconChildren}
     * @see {@link #inlineIconClassName}
     */
    inline: PropTypes.bool,

    /**
     * The default value to use for the text field.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    /**
     * A value to use for the edit dialog text field. This will make the component controlled
     * so you will need to provide an `onChange` function.
     */
    value: controlled(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * An optional function to call when the text field's value has changed. This is required
     * if the `value` prop has been defined.
     *
     * @see {@link TextFields/TextField#onChange}
     */
    onChange: PropTypes.func,

    /**
     * An optional function to call when the text field gains focus.
     */
    onFocus: PropTypes.func,

    /**
     * An optional function to call when the keydown event is triggered on the text field.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional label for the text field. When displaying an `inline` edit dialog column,
     * the `placeholder` prop should be used instead. This is because the text field changes
     * to the `block` type when `inline`.
     *
     * @see {@link #inline}
     * @see {@link #placeholder}
     * @see {@link TextFields/TextField#block}
     */
    label: PropTypes.node,

    /**
     * An optional placeholder for the text field.
     */
    placeholder: PropTypes.string,

    /**
     * Boolean if the edit dialog should become a large dialog. When the dialog is large,
     * the `title` prop is required.
     *
     * A large dialog has a Title followed by the text field, and then a cancel and ok action
     * buttons below.
     */
    large: PropTypes.bool,

    /**
     * The title to use for the large edit dialog. This prop is required if the `large` prop
     * is enabled.
     */
    title: PropTypes.node,

    /**
     * An optional `maxLength` to apply to the text field.
     *
     * @see {@link TextFields/TextField#maxLength}
     */
    maxLength: PropTypes.number,

    /**
     * Any children required to render the inline edit icon.
     */
    inlineIconChildren: PropTypes.node,

    /**
     * The icon class name used to render the inline edit icon.
     */
    inlineIconClassName: PropTypes.string,

    /**
     * Boolean if no inline edit icon should be used.
     */
    noIcon: PropTypes.bool,

    /**
     * An optional function to call when the "Ok" button has been clicked. This
     * is only valid if the edit dialog is `large`.
     *
     * The callback will include the current value and the click or keypress event.
     * ```js
     * onOkClick(value, event)
     * ```
     *
     * @see {@link #large}
     */
    onOkClick: PropTypes.func,

    /**
     * The label to use for the "Ok" button in large dialogs.
     *
     * @see {@link #large}
     */
    okLabel: PropTypes.node.isRequired,

    /**
     * Boolean if the "Ok" button in large dialogs should be styled with the primary color.
     * To get a `default` styled button, set both `okPrimary` and `okSecondary` (or omit `okSecondary`)
     * to `false`.
     *
     * @see {@link #large}
     * @see {@link #okSecondary}
     */
    okPrimary: PropTypes.bool,

    /**
     * Boolean if the "Ok" button in large dialogs should be styled with the secondary color.
     *
     * @see {@link #large}
     * @see {@link #okPrimary}
     */
    okSecondary: PropTypes.bool,

    /**
     * An optional function to call when the "Cancel" button has been clicked in large edit dialogs.
     * The callback will include the text field's value before any edits occured and the click event.
     *
     * ```js
     * onCancelClick(previousValue, event)
     * ```
     *
     * @see {@link #large}
     */
    onCancelClick: PropTypes.func,

    /**
     * The label to give to the "Cancel" button in large edit dialogs.
     *
     * @see {@link #large}
     */
    cancelLabel: PropTypes.node.isRequired,

    /**
     * Boolean if the "Cancel" button in large dialogs should be styled with the primary color.
     * To get a `default` styled button, set both `cancelPrimary` and `cancelSecondary` (or
     * omit `cancelSecondary`) to `false`.
     *
     * @see {@link #large}
     * @see {@link #cancelSecondary}
     */
    cancelPrimary: PropTypes.bool,

    /**
     * Boolean if the "Cancel" button in large dialogs should be styled with the secondary color.
     *
     * @see {@link #large}
     * @see {@link #cancelPrimary}
     */
    cancelSecondary: PropTypes.bool,

    /**
     * Boolean if the action for clicking somewhere on on the page while the dialog is open
     * saves the changes or cancels to the previous value before opening the dialog.
     *
     * @see {@link #onOkClick}
     * @see {@link #onCancelClick}
     */
    okOnOutsideClick: PropTypes.bool,

    /**
     * An optional function to call when a user clicks out of the text field.
     */
    onOutsideClick: PropTypes.func,

    /**
     * Boolean if the edit dialog should be closed if the user clicks somewhere else on the page
     * while the dialog is open.
     */
    closeOnOutsideClick: PropTypes.bool,

    /**
     * The type for the text field in the edit dialog.
     *
     * @see {@link TextFields/TextField#type}
     */
    type: PropTypes.string,

    /**
     * This is how the dialog gets "anchored" to the table column.
     *
     * @see {@link Helpers/Layovers#anchor}
     */
    anchor: anchorShape,

    /**
     * This is the anchor to use when the `position` is set to `Autocomplete.Positions.BELOW`.
     *
     * @see {@link Helpers/Layovers#belowAnchor}
     */
    belowAnchor: anchorShape,

    /**
     * This is the animation position to use for the dialog.
     *
     * @see {@link Helpers/Layovers#animationPosition}
     */
    animationPosition: positionShape,

    /**
     * This is how the dialog should be fixed within the table. When this is omitted, it will
     * automatically use the responsive table as the fixture so that the dialog will close/adjust itself
     * to the scrolling of the table.
     *
     * @see {@link Helpers/Layovers#fixedTo}
     */
    fixedTo: fixedToShape,

    /**
     * @see {@link Helpers/Layovers#xThreshold}
     */
    xThreshold: PropTypes.number,

    /**
     * @see {@link Helpers/Layovers#yThreshold}
     */
    yThreshold: PropTypes.number,

    /**
     * @see {@link Helpers/Layovers#centered}
     */
    centered: PropTypes.bool,

    /**
     * @see {@link Helpers/Layovers#sameWidth}
     */
    sameWidth: PropTypes.bool,

    /**
     * @see {@link Helpers/Layovers#transitionName}
     */
    transitionName: PropTypes.string,

    /**
     * @see {@link Helpers/Layovers#transitionEnterTimeout}
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * @see {@link Helpers/Layovers#transitionLeaveTimeout}
     */
    transitionLeaveTimeout: PropTypes.number,

    /**
     * The optional tooltip to render on hover.
     */
    tooltipLabel: PropTypes.node,

    /**
     * An optional delay to apply to the tooltip before it appears.
     */
    tooltipDelay: PropTypes.number,

    /**
     * The position of the tooltip.
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * This is injected by the `TableRow` component.
     * @access private
     */
    header: PropTypes.bool,

    /**
     * This is injected by the `TableRow` component and used to help generate the unique id for the text
     * field.
     *
     * @access private
     */
    cellIndex: PropTypes.number,

    /**
     * @access private
     */
    adjusted: PropTypes.bool,

    enforceMinWidth: deprecated(
      PropTypes.bool,
      'The min width will always be enforced based on the `$md-edit-dialog-min-width` Sass variable.'
    ),
    scrollThreshold: deprecated(
      PropTypes.number,
      'Use `xThreshold` and `yThreshold` instead'
    ),
    transitionDuration: deprecated(
      PropTypes.number,
      'use `transitionEnterTimeout` and `transitionLeaveTimeout` instead'
    ),
  };

  static defaultProps = {
    type: 'text',
    defaultValue: '',
    okOnOutsideClick: true,
    inlineIconChildren: 'edit',
    okLabel: 'Save',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
    animationPosition: EditDialogColumn.Positions.BELOW,
    dialogZDepth: 1,
  };

  static contextTypes = {
    rowId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      value: props.defaultValue,
      cancelValue: props.defaultValue,
      actions: this._makeActions(props),
      cellIndex: undefined,
    };
  }

  componentDidMount() {
    this._column = findDOMNode(this);
    this._table = findTable(this._column);
    this._fixedTo = findFixedTo(this._table);

    // If a developer creates their own component to wrap the EditDialogColumn, the cellIndex prop
    // might not be defined if they don't pass ...props
    const { cellIndex } = this.props;
    if (!cellIndex && cellIndex !== 0) {
      const columns = [].slice.call(this._column.parentNode.querySelectorAll('th,td'));
      this.setState({ cellIndex: columns.indexOf(this._column) }); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  componentWillReceiveProps(nextProps) {
    const { okLabel, okPrimary, okSecondary, cancelLabel, cancelPrimary, cancelSecondary } = this.props;
    if (okLabel !== nextProps.okLabel || okPrimary !== nextProps.okPrimary
      || okSecondary !== nextProps.okSecondary || cancelLabel !== nextProps.cancelLabel
      || cancelPrimary !== nextProps.cancelPrimary || cancelSecondary !== nextProps.cancelSecondary
    ) {
      this.setState({ actions: this._makeActions(nextProps) });
    }
  }

  _setField = (field) => {
    this._field = field;
  };

  _makeActions = (props) => {
    const {
      okLabel,
      okPrimary,
      okSecondary,
      cancelLabel,
      cancelPrimary,
      cancelSecondary,
    } = props;

    return [{
      key: 'cancel',
      label: cancelLabel,
      onClick: this._handleCancel,
      primary: cancelPrimary && !cancelSecondary,
      secondary: cancelSecondary,
    }, {
      key: 'ok',
      label: okLabel,
      onClick: this._handleOk,
      primary: okPrimary && !okSecondary,
      secondary: okSecondary,
    }];
  };

  _handleOpen = () => {
    if (this._skipNextOpen) {
      this._skipNextOpen = false;
    } else {
      if (this._table && this._column && !this.props.inline) {
        this._table.scrollLeft = this._column.offsetLeft;
      }

      this.setState({ visible: true, cancelValue: getField(this.props, this.state, 'value') });
    }
  };

  _handleClose = (e) => {
    const { onOutsideClick, okOnOutsideClick } = this.props;
    if (onOutsideClick) {
      onOutsideClick(e);
    }

    if (okOnOutsideClick) {
      this._handleOk(e);
    } else {
      this._handleCancel(e);
    }
  };

  _handleChange = (value, e) => {
    if (this.props.onChange) {
      this.props.onChange(value, e);
    }

    if (typeof this.props.value === 'undefined') {
      this.setState({ value });
    }
  };

  _handleFocus = (e) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    if (this.props.inline) {
      this.setState({ cancelValue: e.target.value });
    }
  };

  _handleKeyDown = (e) => {
    const { onKeyDown, okOnOutsideClick, large } = this.props;
    if (onKeyDown) {
      onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    if (key === ENTER) {
      this._handleOk(e);
    } else if (key === ESC) {
      this._handleCancel(e);
    } else if (key === TAB && !large) {
      // infinitely opens otherwise...
      this._skipNextOpen = e.shiftKey;

      if (okOnOutsideClick) {
        this._handleOk(e);
      } else {
        this._handleCancel(e);
      }
    }
  };

  _handleOk = (e) => {
    if (this.props.onOkClick) {
      this.props.onOkClick(getField(this.props, this.state, 'value'), e);
    }

    this.setState({ visible: false });
  };

  _handleCancel = (e) => {
    const value = this.state.cancelValue;
    if (this.props.onCancelClick) {
      this.props.onCancelClick(value, e);
    }

    const state = { visible: false };
    if (typeof this.props.value === 'undefined') {
      state.value = value;
    }

    this.setState(state);
  };

  render() {
    const { rowId } = this.context;
    const {
      style,
      className,
      layoverStyle,
      layoverClassName,
      dialogStyle,
      dialogClassName,
      dialogContentStyle,
      dialogContentClassName,
      dialogZDepth,
      textFieldStyle,
      textFieldClassName,
      inputClassName,
      large,
      title,
      inline,
      inlineIconChildren,
      inlineIconClassName,
      maxLength,
      noIcon,
      label,
      placeholder,
      header,
      anchor,
      belowAnchor,
      fixedTo,
      animationPosition,
      xThreshold,
      yThreshold,
      centered,
      sameWidth,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      tooltipLabel,
      tooltipDelay,
      tooltipPosition,
      /* eslint-disable no-unused-vars */
      id: propId,
      dialogId: propDialogId,
      cellIndex: propCellIndex,
      onOkClick,
      okLabel,
      okPrimary,
      okSecondary,
      onCancelClick,
      cancelLabel,
      cancelPrimary,
      cancelSecondary,
      okOnOutsideClick,
      defaultValue,
      adjusted,

      // deprecated
      scrollThreshold,
      enforceMinWidth,
      transitionDuration,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;
    const { visible, actions } = this.state;
    const value = getField(this.props, this.state, 'value');
    const cellIndex = getField(this.props, this.state, 'cellIndex');

    let { id, dialogId } = this.props;
    if (!dialogId) {
      dialogId = `${rowId}-${cellIndex}-edit-dialog`;
    }

    if (!id) {
      id = `${dialogId}-field`;
    }

    let inlineEditIcon;
    if (inline && !noIcon) {
      inlineEditIcon = (
        <FontIcon key="edit-icon" iconClassName={inlineIconClassName}>
          {inlineIconChildren}
        </FontIcon>
      );
    }

    const numeric = props.type === 'number';
    const field = (
      <TextField
        {...props}
        ref={this._setField}
        style={textFieldStyle}
        className={cn({ 'md-edit-dialog__blocked-field': inline }, textFieldClassName)}
        inputClassName={cn({
          'md-text--secondary md-edit-dialog__header': header && inline,
          'md-text-right': numeric,
        }, inputClassName)}
        id={id}
        label={label}
        placeholder={placeholder}
        value={value}
        onFocus={this._handleFocus}
        onChange={this._handleChange}
        onKeyDown={this._handleKeyDown}
        block={inline}
        maxLength={visible ? maxLength : null}
        rightIcon={inlineEditIcon}
      />
    );

    let children;
    if (inline) {
      children = field;
    } else {
      const dialogLabel = value || value === 0 ? value : placeholder || label;
      children = (
        <EditDialog
          style={layoverStyle}
          className={layoverClassName}
          dialogStyle={dialogStyle}
          dialogClassName={dialogClassName}
          dialogContentStyle={dialogContentStyle}
          dialogContentClassName={dialogContentClassName}
          id={dialogId}
          textFieldId={id}
          visible={visible}
          onOpen={this._handleOpen}
          onClose={this._handleClose}
          label={dialogLabel}
          actions={actions}
          large={large}
          title={title}
          header={header}
          placeholder={dialogLabel === placeholder || dialogLabel === label}
          anchor={anchor}
          belowAnchor={belowAnchor}
          animationPosition={animationPosition}
          xThreshold={xThreshold}
          yThreshold={yThreshold}
          centered={centered}
          sameWidth={sameWidth}
          fixedTo={typeof fixedTo !== 'undefined' ? fixedTo : this._fixedTo}
          dialogZDepth={dialogZDepth}
          transitionName={transitionName}
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeaveTimeout={transitionLeaveTimeout}
        >
          {field}
        </EditDialog>
      );
    }

    return (
      <TableColumn
        style={style}
        numeric={numeric}
        className={cn('md-edit-dialog-column', className)}
        header={header}
        adjusted={false}
        tooltipLabel={tooltipLabel}
        tooltipDelay={tooltipDelay}
        tooltipPosition={tooltipPosition}
      >
        {children}
      </TableColumn>
    );
  }
}
