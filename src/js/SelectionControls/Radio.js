import React from 'react';

import ControlButton from './ControlButton';
import FontIcon from '../FontIcon';

function Radio(props) {
  return <ControlButton {...props} type="radio" />;
}

Radio.defaultProps = {
  defaultChecked: false,
  checkedIcon: <FontIcon>radio_button_checked</FontIcon>,
  uncheckedIcon: <FontIcon>radio_button_unchecked</FontIcon>,
};

Radio.propTypes = ControlButton.propTypes;

export default Radio;
