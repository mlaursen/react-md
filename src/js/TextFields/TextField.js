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
    this.state = { active: false };
    if(!props.valueLink) {
      this.state.value = props.initialValue;
    }
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
    singleLine: PropTypes.bool,
    type: PropTypes.string,
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    errorText: PropTypes.string,
    helpText: PropTypes.string,
    helpOnFocus: PropTypes.bool,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    initialValue: '',
    lineDirection: 'left',
    type: 'text',
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
    this.getValueLink().requestChange(e.target.value);
  }

  handleKeyDown = (e) => {
    if((e.which || e.keyCode) === ESC) {
      this.getValueLink().requestChange('');
    }
  }

  render() {
    const { className, label, lineDirection, maxLength, helpText, errorText, rows, placeholder, ...props } = this.props;
    const { active } = this.state;
    const isSingleLine = isPropEnabled(props, 'singleLine');
    const isError = !!errorText || (!!maxLength && this.getValue().length > maxLength);
    const isHelpOnFocus = isPropEnabled(props, 'helpOnFocus');
    const isInfoDisplayed = errorText || maxLength || (helpText && (!isHelpOnFocus || active));
    const isTextArea = typeof rows === 'number';
    return (
      <div
        className={classnames('md-text-field-container', className, {
          'single-line': isSingleLine,
        })}>
        <label className="md-text-field-label-container">
          {!isSingleLine && !isTextArea &&
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
              rows={rows}
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
              className={classnames('md-text-field', { 'active': active })}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              value={this.getValueLink().value}
              onChange={this.handleChange}
              placeholder={isSingleLine ? label : placeholder}
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
