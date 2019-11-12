import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import addSuffix from '../utils/StringUtils/addSuffix';
import isValued from '../utils/isValued';
import FloatingLabel from '../TextFields/FloatingLabel';
import TextFieldMessage from '../TextFields/TextFieldMessage';

import SelectFieldInput from './SelectFieldInput';

export default class SelectFieldToggle extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    activeLabel: PropTypes.node,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    active: PropTypes.bool,
    error: PropTypes.bool,
    errorText: PropTypes.node,
    helpText: PropTypes.node,
    helpOnFocus: PropTypes.bool,
    below: PropTypes.bool,
    visible: PropTypes.bool,
  };

  render() {
    const {
      id,
      style,
      className,
      inputStyle,
      inputClassName,
      required,
      disabled,
      active,
      error,
      errorText,
      helpText,
      helpOnFocus,
      visible,
      activeLabel,
      /* eslint-disable no-unused-vars */
      label: propLabel,
      placeholder: propPlaceholder,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { label, placeholder } = this.props;
    if (required) {
      if (label) {
        label = addSuffix(label, '*');
      }

      if (placeholder && !label) {
        placeholder = addSuffix(placeholder, '*');
      }
    }

    return (
      <div style={style} className={cn('md-select-field__toggle', className)}>
        <FloatingLabel
          label={label}
          htmlFor={id}
          active={active || visible}
          error={error}
          floating={isValued(activeLabel) || active || visible}
          disabled={disabled}
        />
        <SelectFieldInput
          {...props}
          id={id}
          style={inputStyle}
          className={inputClassName}
          label={label}
          placeholder={placeholder}
          activeLabel={activeLabel}
          active={active}
          error={error}
          disabled={disabled}
        />
        <TextFieldMessage
          active={active || visible}
          error={error}
          errorText={errorText}
          helpText={helpText}
          helpOnFocus={helpOnFocus}
          leftIcon={false}
          rightIcon={false}
        />
      </div>
    );
  }
}
