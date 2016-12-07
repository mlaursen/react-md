import React, { PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';

const More = props => (
  <Button
    {...props}
    label="More"
    raised
    className="md-cell--right"
    primary
    waitForInkTransition
  />
);
More.propTypes = {
  onClick: PropTypes.func,
};

export default More;
