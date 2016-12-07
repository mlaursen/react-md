/* eslint-env jest*/
import React from 'react';

/* eslint-disable react/prop-types */

// Have to create a class so it can still get refs..
export default class TextField extends React.Component {
  getField() {
    return this._field;
  }

  _setField = (field) => {
    this._field = field;
  };

  _handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value, e);
    }
  };

  render() {
    const { ...props } = this.props;
    delete props.fullWidth;
    delete props.block;
    delete props.lineDirection;
    delete props.inputStyle;
    delete props.inputClassName;
    delete props.label;
    delete props.leftIcon;
    delete props.rightIcon;

    return <input ref={this._setField} type="input" {...props} onChange={this._handleChange} />;
  }
}
