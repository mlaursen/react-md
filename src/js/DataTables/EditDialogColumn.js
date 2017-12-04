import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import { ENTER, ESC, TAB } from '../constants/keyCodes';
import getField from '../utils/getField';
import themeColors from '../utils/themeColors';
import viewport from '../utils/Positioning/viewport';
import controlled from '../utils/PropTypes/controlled';
import anchorShape from '../Helpers/anchorShape';
import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';
import Layover from '../Helpers/Layover';
import FontIcon from '../FontIcons/FontIcon';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
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
     * @see {@link #inlineIcon}
     */
    inline: PropTypes.bool,

    /**
     * An optional icon to set for the inline edit dialog column. Setting this prop to null
     * will not render an icon.
     */
    inlineIcon: PropTypes.element,

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
    ]), 'onChange', 'defaultValue'),

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
     * An optional function to call when the "Ok" button has been clicked, the user presses enter
     * on * the text field or when the `okOnOutsideClick` prop has been enabled and the user clicks
     * somewhere on the page.
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
     * Any additional props to apply to the "Ok" button. This will override any of the other
     * button props.
     *
     * @see {@link #okLabel}
     * @see {@link #okPrimary}
     * @see {@link #okSecondary}
     */
    okProps: PropTypes.object,

    /**
     * An optional function to call when the "Cancel" button has been clicked in large edit dialogs.
     * The callback will include the text field's value before any edits occurred and the click event.
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
     * Any additional props to apply to the "Cancel" button. This will override any of the other
     * button props.
     *
     * @see {@link #cancelLabel}
     * @see {@link #cancelPrimary}
     * @see {@link #cancelSecondary}
     */
    cancelProps: PropTypes.object,

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
     * Boolean if the Edit Dialog should be visible by default. This only applies when the `inline` prop
     * is not enabled.
     */
    defaultVisible: PropTypes.bool,

    /**
     * Boolean if the edit dialog should automatically open when the text field is focused for non-inline
     * dialogs. This is enabled by default for backwards compatibility.
     */
    visibleOnFocus: PropTypes.bool,

    /**
     * The type for the text field in the edit dialog.
     *
     * @see {@link TextFields/TextField#type}
     */
    type: PropTypes.string,

    /**
     * This is how the dialog gets "anchored" to the table column.
     *
     * @see {@link Helpers/Layover#anchor}
     */
    anchor: anchorShape,

    /**
     * This is the anchor to use when the `position` is set to `Autocomplete.Positions.BELOW`.
     *
     * @see {@link Helpers/Layover#belowAnchor}
     */
    belowAnchor: anchorShape,

    /**
     * This is the animation position to use for the dialog.
     *
     * @see {@link Helpers/Layover#animationPosition}
     */
    animationPosition: positionShape,

    /**
     * This is how the dialog should be fixed within the table. When this is omitted, it will
     * automatically use the responsive table as the fixture so that the dialog will close/adjust itself
     * to the scrolling of the table.
     *
     * @see {@link Helpers/Layover#fixedTo}
     */
    fixedTo: fixedToShape,

    /**
     * @see {@link Helpers/Layover#xThreshold}
     */
    xThreshold: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#yThreshold}
     */
    yThreshold: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#centered}
     */
    centered: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#sameWidth}
     */
    sameWidth: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#transitionName}
     */
    transitionName: PropTypes.string,

    /**
     * @see {@link Helpers/Layover#transitionEnterTimeout}
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#transitionLeaveTimeout}
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
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the `fixedTo` element scrolls.
     *
     * @see {@link Helpers/Layover#repositionOnScroll}
     */
    repositionOnScroll: PropTypes.bool,

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the window resizes.
     *
     * @see {@link Helpers/Layover#repositionOnResize}
     */
    repositionOnResize: PropTypes.bool,

    /**
     * Boolean if the dialog logic should be simplified without any viewport logic and position
     * based on the relative position of the menu. This will most like require some additional
     * styles applied to the dialog.
     *
     * @see {@link Helpers/Layover#simplified}
     */
    simplifiedDialog: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#minLeft}
     */
    minLeft: Layover.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minRight}
     */
    minRight: Layover.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minBottom}
     */
    minBottom: Layover.propTypes.minBottom,

    /**
     * Boolean if the edit dialog should attempt to scroll into view if the full
     * dialog can not be displayed in the viewport when it was toggled open.
     *
     * @see {@link #scrollIntoViewPadding}
     */
    scrollIntoView: PropTypes.bool,

    /**
     * The amount of padding that should be applied when the cell is scrolled into view.
     * This will be applied to the left of the cell.
     */
    scrollIntoViewPadding: PropTypes.number,

    /**
     * An optional function to call when the `click` event is triggered in the column.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the `mousedown` event is triggered in the column.
     */
    onMouseDown: PropTypes.func,

    /**
     * An optional function to call when the `mouseup` event is triggered in the column.
     */
    onMouseUp: PropTypes.func,

    /**
     * An optional function to call when the `touchstart` event is triggered in the column.
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional function to call when the `touchend` event is triggered in the column.
     */
    onTouchEnd: PropTypes.func,

    /**
     * An optional function to call when the `mouseenter` event is triggered in the column.
     */
    onMouseEnter: PropTypes.func,

    /**
     * An optional function to call when the `mouseover` event is triggered in the column.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when the `mouseleave` event is triggered in the column.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional function to call when the `touchmove` event is triggered in the column.
     */
    onTouchMove: PropTypes.func,

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

    inlineIconChildren: deprecated(PropTypes.node, 'Use the `inlineIcon` prop instead'),
    inlineIconClassName: deprecated(PropTypes.string, 'Use the `inlineIcon` prop instead'),
    noIcon: deprecated(PropTypes.bool, 'Set the `inlineIcon` prop to `null` instead'),
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
    inlineIcon: <FontIcon>edit</FontIcon>,
    okLabel: 'Save',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
    animationPosition: EditDialogColumn.Positions.BELOW,
    dialogZDepth: 1,
    repositionOnScroll: true,
    repositionOnResize: false,
    scrollIntoView: true,
    scrollIntoViewPadding: 16,
    minLeft: 0,
    minRight: 0,
    minBottom: 0,
    visibleOnFocus: true,
    defaultVisible: false,
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
      visible: props.defaultVisible,
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
    const {
      okLabel,
      okPrimary,
      okSecondary,
      okProps,
      cancelLabel,
      cancelPrimary,
      cancelSecondary,
      cancelProps,
    } = this.props;

    if (okLabel !== nextProps.okLabel || okPrimary !== nextProps.okPrimary
      || okSecondary !== nextProps.okSecondary || cancelLabel !== nextProps.cancelLabel
      || cancelPrimary !== nextProps.cancelPrimary || cancelSecondary !== nextProps.cancelSecondary
      || okProps !== nextProps.okProps || cancelProps !== nextProps.cancelProps
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
      okProps,
      cancelLabel,
      cancelPrimary,
      cancelSecondary,
      cancelProps,
    } = props;

    return [{
      key: 'cancel',
      children: cancelLabel,
      primary: cancelPrimary && !cancelSecondary,
      secondary: cancelSecondary,
      ...cancelProps,
      onClick: this._handleCancel,
    }, {
      key: 'ok',
      children: okLabel,
      primary: okPrimary && !okSecondary,
      secondary: okSecondary,
      ...okProps,
      onClick: this._handleOk,
    }];
  };

  _handleOpen = (e) => {
    if (this._skipNextOpen) {
      this._skipNextOpen = false;
    } else if (this.props.visibleOnFocus || !e || e.type !== 'focus') {
      const { scrollIntoView, scrollIntoViewPadding } = this.props;
      if (scrollIntoView) {
        const vp = viewport(this._column);
        if (vp !== true && this._table && this._column && !this.props.inline) {
          this._table.scrollLeft = this._column.offsetLeft - scrollIntoViewPadding;
        }
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
      inlineIcon,
      maxLength,
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
      repositionOnScroll,
      repositionOnResize,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      tooltipLabel,
      tooltipDelay,
      tooltipPosition,
      onClick,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onMouseEnter,
      onMouseOver,
      onMouseLeave,
      onTouchMove,
      simplifiedDialog,
      minLeft,
      minRight,
      minBottom,

      // deprecated
      noIcon,
      inlineIconChildren,
      inlineIconClassName,
      /* eslint-disable no-unused-vars */
      id: propId,
      dialogId: propDialogId,
      cellIndex: propCellIndex,
      onOkClick,
      okLabel,
      okPrimary,
      okSecondary,
      okProps,
      onCancelClick,
      cancelLabel,
      cancelPrimary,
      cancelSecondary,
      cancelProps,
      okOnOutsideClick,
      defaultValue,
      adjusted,
      scrollIntoView,
      scrollIntoViewPadding,
      defaultVisible,
      visibleOnFocus,

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
      dialogId = `${id || `${rowId}-${cellIndex}`}-edit-dialog`;
    }

    if (!id) {
      id = `${dialogId}-field`;
    }

    let inlineEditIcon;
    if (inline && !noIcon) {
      const icon = getDeprecatedIcon(inlineIconClassName, inlineIconChildren, inlineIcon);
      if (icon) {
        inlineEditIcon = React.cloneElement(icon, { key: 'edit-icon' });
      }
    }

    const numeric = props.type === 'number';
    const field = (
      <TextField
        {...props}
        ref={this._setField}
        style={textFieldStyle}
        className={cn({ 'md-edit-dialog__blocked-field': inline }, textFieldClassName)}
        inputClassName={cn({
          'md-edit-dialog__header': header && inline,
          'md-text-right': numeric,
        }, themeColors({ hint: header && inline }), inputClassName)}
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
          simplified={simplifiedDialog}
          anchor={anchor}
          belowAnchor={belowAnchor}
          animationPosition={animationPosition}
          xThreshold={xThreshold}
          yThreshold={yThreshold}
          centered={centered}
          sameWidth={sameWidth}
          minLeft={minLeft}
          minRight={minRight}
          minBottom={minBottom}
          fixedTo={typeof fixedTo !== 'undefined' ? fixedTo : this._fixedTo}
          dialogZDepth={dialogZDepth}
          repositionOnScroll={repositionOnScroll}
          repositionOnResize={repositionOnResize}
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
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onMouseEnter={onMouseEnter}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </TableColumn>
    );
  }
}
