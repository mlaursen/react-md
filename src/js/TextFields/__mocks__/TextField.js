/* eslint-env jest*/
import React, { PropTypes } from 'react';

/* eslint-disable react/prop-types */

// Have to create a class so it can still get refs..
export default class TextField extends React.Component {
  static propTypes = {
    block: PropTypes.bool,
    paddedBlock: PropTypes.bool,
    leftIcon: PropTypes.element,
    leftIconStateful: PropTypes.bool,
    rightIcon: PropTypes.element,
    rightIconStateful: PropTypes.bool,
    inlineIndicator: PropTypes.element,
    active: PropTypes.bool,
    error: PropTypes.bool,
    floating: PropTypes.bool,
    customSize: PropTypes.string,
    helpText: PropTypes.string,
    helpOnFocus: PropTypes.bool,
    errorText: PropTypes.string,
  };
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
    delete props.paddedBlock;
    delete props.lineDirection;
    delete props.inputStyle;
    delete props.inputClassName;
    delete props.label;
    delete props.leftIcon;
    delete props.leftIconStateful;
    delete props.rightIcon;
    delete props.rightIconStateful;
    delete props.inlineIndicator;
    delete props.active;
    delete props.error;
    delete props.floating;
    delete props.helpText;
    delete props.helpOnFocus;
    delete props.errorText;
    delete props.customSize;

    return <input ref={this._setField} type="input" {...props} onChange={this._handleChange} />;
  }
}
