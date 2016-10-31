import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import injectInk from '../Inks';
import TextField from '../TextFields/TextField'; // Don't know why. Errors if the /TextField is removed

class SelectFieldInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.focus = this.focus.bind(this);
    this._setField = this._setField.bind(this);
  }

  focus() {
    this._field.focus();
  }

  _setField(field) {
    if (field !== null) {
      this._field = field;
    }
  }

  render() {
    const {
      inputClassName,
      ...props,
    } = this.props;
    return (
      <TextField
        {...props}
        ref={this._setField}
        inputClassName={cn('md-select-field', inputClassName)}
        readOnly
      />
    );
  }
}

export default injectInk(SelectFieldInput);
