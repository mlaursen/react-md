import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

const Action = ({ searching, onClick, ...props }) => (
  <Button
    icon
    onClick={searching ? onClick : null}
    type={searching ? 'reset' : 'button'}
    {...props}
  >
    {searching ? 'close' : 'keyboard_voice'}
  </Button>
);

Action.propTypes = {
  searching: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Action;
