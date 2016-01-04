import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';
import TextFieldInfo from './TextFieldInfo';
import TextFieldLabel from './TextFieldLabel';
import TextFieldDivider from './TextFieldDivider';
import { ESC } from '../constants/keyCodes';

export default class TextField extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { active: false, currentRows: props.rows };
    if(!props.valueLink) {
      this.state.value = props.initialValue;
    }

    this.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    valueLink: PropTypes.shape({
      value: PropTypes.string.isRequired,
      requestChange: PropTypes.func.isRequired,
    }),
    initialValue: PropTypes.string,
    lineDirection: PropTypes.oneOf(['left', 'right', 'center']),
    type: PropTypes.string,
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    errorText: PropTypes.string,
    helpText: PropTypes.string,
    helpOnFocus: PropTypes.bool,
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    placeholder: PropTypes.string,
    floatingLabel: PropTypes.bool,
    icon: PropTypes.node,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    initialValue: '',
    lineDirection: 'left',
    type: 'text',
    floatingLabel: true,
  }

  componentDidMount() {
    if(this.props.rows) {
      this.lineHeight = this.refs.textarea.offsetHeight / this.props.rows;
    }
  }

  handleFocus = () => {
    this.setState({ active: true });
  }

  handleBlur = () => {
    this.setState({ active: false });
  }

  getValueLink = () => {
    return typeof this.props.valueLink !== 'undefined' ? this.props.valueLink : {
      value: this.state.value,
      requestChange: (value) => { this.setState({ value }); },
    };
  }

  getValue = () => {
    return this.getValueLink().value;
  }

  handleChange = (e) => {
    // Firefox calls handle change after escape while other browsers don't. Hacky fix
    if(this.state.isEscape) { return; }

    if(this.props.onChange) {
      this.props.onChange(e.target.value, e);
    }
    this.getValueLink().requestChange(e.target.value);

    const { rows, maxRows } = this.props;
    if(!rows || !maxRows) { return; }

    const { textarea } = this.refs;
    const { offsetHeight, scrollHeight } = textarea;
    let { currentRows, height } = this.state;
    if(scrollHeight <= (height || offsetHeight) || (maxRows !== -1 && currentRows >= maxRows)) { return; }

    currentRows++;
    this.setState({ currentRows, height: currentRows * this.lineHeight });
  }

  handleKeyDown = (e) => {
    if((e.which || e.keyCode) === ESC) {
      if(this.props.onChange) {
        this.props.onChange('', e);
      }
      this.getValueLink().requestChange('');
      this.setState({ isEscape: true });
    } else if(this.state.isEscape) {
      this.setState({ isEscape: false });
    }
  }

  render() {
    const { className, label, lineDirection, maxLength, floatingLabel, helpText, errorText, rows, maxRows, placeholder, icon, ...props } = this.props;
    const { active, currentRows, height } = this.state;
    const isError = !!errorText || (!!maxLength && this.getValue().length > maxLength);
    const isHelpOnFocus = isPropEnabled(props, 'helpOnFocus');
    const isInfoDisplayed = errorText || maxLength || (helpText && (!isHelpOnFocus || active));
    const isTextArea = typeof rows === 'number';

    let style = {};
    if(rows && maxRows) {
      if(currentRows < maxRows || maxRows === -1) {
        style.overflow = 'hidden';
      }

      if(height || this.lineHeight) {
        style.height = `${height || this.lineHeight * rows}px`;
      }
    }

    return (
      <div
        className={classnames('md-text-field-container', className, {
          'single-line': !isTextArea,
          'no-label': !floatingLabel,
          'multi-line': isTextArea,
        })}>
        <label className="md-text-field-label-container">
          {icon && React.cloneElement(icon, { className: classnames({ 'active': active, 'error': isError })})}
          {floatingLabel && label &&
          <TextFieldLabel
            label={label}
            active={active}
            isError={isError}
            value={this.getValue()}
            required={isPropEnabled(props, 'required')}
          />
          }
          {isTextArea ?
            <textarea
              {...props}
              ref="textarea"
              rows={rows}
              style={style}
              className={classnames('md-text-field', { 'active': active })}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              value={this.getValueLink().value}
              onChange={this.handleChange}
              placeholder={placeholder}
            /> :
            <input
              {...props}
              className={classnames('md-text-field', { 'active': active, 'chrome': this.isChrome })}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              value={this.getValueLink().value}
              onChange={this.handleChange}
              placeholder={!floatingLabel ? label : placeholder}
            />
          }
          <TextFieldDivider active={active} isError={isError} lineDirection={lineDirection} />
        </label>
        {isInfoDisplayed &&
          <TextFieldInfo
            value={this.getValue()}
            isError={isError}
            text={errorText || helpText}
            maxLength={maxLength}
            isHelpOnFocus={isHelpOnFocus}
            active={active}
          />
        }
      </div>
    );
  }
}
