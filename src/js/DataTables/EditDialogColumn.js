import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { FlatButton } from '../Buttons';
import TableColumn from './TableColumn';
import TextField from '../TextFields';
import { ENTER, TAB, ESC } from '../constants/keyCodes';
import { onOutsideClick } from '../utils';

/**
 * A Text Edit dialog for tables. This can either be a small
 * version which only has the text field or a large version
 * that includes a title with a save and cancel action buttons.
 */
export default class EditDialogColumn extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: props.defaultValue,
      active: false,
      animating: false,
    };
  }

  static propTypes = {
    /**
     * The optional className to apply to the edit dialog.
     */
    className: PropTypes.string,

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
     * The title for the large edit dialog. The custom validation changes to required
     * when the `large` prop is set to true.
     */
    title: (props, propName, component) => {
      if(props.large) {
        return PropTypes.string.isRequired(props, propName, component);
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
  };

  static defaultProps = {
    transitionDuration: 150,
    okLabel: 'Save',
    cancelLabel: 'Cancel',
    onOkClick: () => {},
    onCancelClick: () => {},
  };

  componentWillUpdate(nextProps, nextState) {
    if(this.state.active === nextState.active) { return; }

    if(nextState.active) {
      window.addEventListener('click', this.handleClickOutside);
    } else {
      window.removeEventListener('click', this.handleClickOutside);
    }

    this.setState({
      animating: true,
      timeout: setTimeout(() => {
        if(!nextState.active) {
          ReactDOM.findDOMNode(this).querySelector('input').blur();
        }

        this.setState({ animating: false, timeout: null });
      }, nextProps.transitionDuration),
    });
  }

  componentWillUnmount() {
    this.state.timeout && clearTimeout(this.state.timeout);
  }

  handleClickOutside = e => onOutsideClick(e, ReactDOM.findDOMNode(this.refs.column), () => this.setState({ active: false }));

  handleFocus = (e) => {
    this.props.onFocus && this.props.onFocus(e);

    const state = { active: true };
    if(!this.state.active) {
      state.cancelValue = this.getValue() || '';
    }

    this.setState(state);
  };

  handleKeyDown = (e) => {
    const { onKeyDown } = this.props;
    onKeyDown && onKeyDown(e);

    const key = e.which || e.keyCode;
    if(key === ENTER) {
      this.save();
    } else if(key === TAB) {
      e.preventDefault();
    } else if(key === ESC) {
      this.handleCancelClick(e);
    }
  };

  save = (e) => {
    this.props.onOkClick && this.props.onOkClick(this.getValue(), e);

    this.setState({ active: false });
  };

  handleCancelClick = (e) => {
    this.props.onCancelClick(this.state.cancelValue, e);

    this.setState({ active: false, value: this.state.cancelValue });
  };

  getValue = () => {
    return typeof this.props.value === 'undefined' ? this.state.value : this.props.value;
  };

  handleChange = (value, e) => {
    this.props.onChange && this.props.onChange(value, e);
    if(typeof this.props.value === 'undefined') {
      this.setState({ value });
    }
  };

  render() {
    const { active, animating } = this.state;
    const {
      defaultValue,
      columnClassName,
      className,
      maxLength,
      title,
      onOkClick,
      okLabel,
      onCancelClick,
      cancelLabel,
      large,
      ...props,
    } = this.props;

    const value = this.getValue();
    let actions, largeTitle;
    if(large && active) {
      actions = (
        <footer className="md-dialog-footer">
          <FlatButton label={cancelLabel} onClick={this.handleCancelClick} primary={true} />
          <FlatButton label={okLabel} onClick={this.save} primary={true} />
        </footer>
      );

      largeTitle = (
        <h3 className="md-title">{title}</h3>
      );
    }

    return (
      <TableColumn className={classnames(columnClassName, 'prevent-grow md-edit-dialog-column')} ref="column">
        <div
          className={classnames('md-edit-dialog', className, {
            animating,
            active,
            large,
          })}
        >
          {largeTitle}
          <TextField
            {...props}
            floatingLabel={false}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            value={value}
            onChange={this.handleChange}
            maxLength={active ? maxLength : null}
          />
          {actions}
        </div>
      </TableColumn>
    );
  }
}
