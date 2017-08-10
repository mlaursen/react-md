import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';
import TextArea from './TextArea';

/**
 * This component either renders a base `input` tag or the `TextArea` component.
 */
export default class InputField extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    label: PropTypes.node,
    fullWidth: PropTypes.bool,
    customSize: PropTypes.string,
    passwordVisible: PropTypes.bool,
    inlineIndicator: PropTypes.bool,
  };

  getField = () => { // eslint-disable-line arrow-body-style
    return typeof this.props.rows === 'undefined'
      ? this._field
      : this._field.getField();
  };

  getValue = () => {
    if (typeof this.props.rows === 'undefined') {
      return this._field.value;
    }

    return this._field.getValue();
  };

  focus = () => {
    this._field.focus();
  };

  blur = () => {
    this._field.blur();
  };

  _setField = (field) => {
    this._field = field;
  };

  render() {
    const {
      className,
      rows,
      label,
      customSize,
      fullWidth,
      type,
      passwordVisible,
      block,
      inlineIndicator,
      maxRows,
      ...props
    } = this.props;

    const multiline = typeof rows !== 'undefined';
    const Component = multiline ? TextArea : 'input';
    if (!multiline) {
      props.type = passwordVisible ? 'text' : type;
    } else {
      props.label = label;
      props.block = block;
      props.maxRows = maxRows;
    }

    return createElement(Component, {
      ...props,
      rows,
      ref: this._setField,
      className: cn('md-text-field', {
        'md-text-field--inline-indicator': inlineIndicator || (!multiline && type === 'password'),
        'md-text-field--multiline': multiline,
        'md-text-field--margin': !block && !multiline && !label,
        'md-text-field--floating-margin': !block && !multiline && label,
        [`md-text-field--${customSize}`]: customSize,
        'md-full-width': fullWidth,
      }, themeColors({ disabled: props.disabled, text: !props.disabled }, className)),
    });
  }
}
