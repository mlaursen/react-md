/* eslint-env jest*/
import React from 'react';

// Have to create a class so it can still get refs..
export default class TextField extends React.Component {
  render() {
    const { ...props } = this.props;
    delete props.fullWidth;
    delete props.block;
    delete props.adjustMinWidth;
    delete props.lineDirection;
    delete props.inputStyle;
    delete props.inputClassName;
    delete props.label;
    delete props.leftIcon;
    delete props.rightIcon;

    return <input type="input" {...props} />;
  }
}
