import { PureComponent, PropTypes, createElement } from 'react';
import cn from 'classnames';

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
    label: PropTypes.string,
    fullWidth: PropTypes.bool,
    customSize: PropTypes.string,
    passwordVisible: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.getValue = this.getValue.bind(this);
    this.focus = this.focus.bind(this);
  }

  getValue() {
    if (typeof this.props.rows === 'undefined') {
      return this._field.value;
    }

    return this._field.getValue();
  }

  focus() {
    this._field.focus();
  }

  render() {
    const { className, rows, label, customSize, fullWidth, type, passwordVisible, block, ...props } = this.props;

    const multiline = typeof rows !== 'undefined';
    const Component = multiline ? TextArea : 'input';
    if (!multiline) {
      props.type = passwordVisible ? 'text' : type;

      delete props.maxRows;
      delete props.onHeightChange;
    } else {
      props.label = label;
      props.block = block;
    }

    return createElement(Component, {
      ...props,
      rows,
      ref: field => { this._field = field; },
      className: cn('md-text-field', {
        'md-text-field--password': !multiline && type === 'password',
        'md-text-field--multiline': multiline,
        'md-text-field--full-width': fullWidth,
        'md-text-field--margin': !block && !multiline && !label,
        'md-text-field--floating-margin': !block && !multiline && label,
        [`md-text-field--${customSize}`]: customSize,
      }, className),
    });
  }
}
