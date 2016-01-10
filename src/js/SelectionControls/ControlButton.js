import React from 'react';
import classnames from 'classnames';

import { IconButton } from '../Buttons';

export default function ControlButton(props) {
  const {
    checked,
    onClick,
    checkedIconChild,
    checkedIconClassName,
    uncheckedIconChild,
    uncheckedIconClassName,
  } = props;

  return (
    <IconButton
      onClick={onClick}
      className={classnames({ 'active': checked })}
      iconClassName={checked ? checkedIconClassName : uncheckedIconClassName}
      >
      {checked ? checkedIconChild : uncheckedIconChild}
    </IconButton>
  );
}
