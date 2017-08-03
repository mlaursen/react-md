import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

const Reset = ({ onClick, onRef }) => (
  <Button
    secondary
    type="reset"
    raised
    onClick={onClick}
    ref={onRef}
    className="badges__notifications__reset"
    aria-controls="notification-badge"
  >
    Reset
  </Button>
);

Reset.propTypes = {
  onClick: PropTypes.func,
  onRef: PropTypes.func,
};

export default Reset;
