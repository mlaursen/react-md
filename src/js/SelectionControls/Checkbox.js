import React from 'react';

import ControlButton from './ControlButton';
import FontIcon from '../FontIcon';

function Checkbox(props) {
  return <ControlButton {...props} type="checkbox" />;
}

Checkbox.defaultProps = {
  defaultChecked: false,
  checkedIcon: <FontIcon>check_box</FontIcon>,
  uncheckedIcon: <FontIcon>check_box_outline_blank</FontIcon>,
};

Checkbox.propTypes = ControlButton.propTypes;

export default Checkbox;
