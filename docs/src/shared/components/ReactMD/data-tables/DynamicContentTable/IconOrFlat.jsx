import React, { PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';

const IconOrFlat = ({ mobile, children, ...props }) => (
  <Button
    icon={mobile}
    flat={!mobile}
    primary
    tooltipLabel={mobile ? children : null}
    {...props}
  >
    {mobile ? null : children}
  </Button>
);

IconOrFlat.propTypes = {
  mobile: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default IconOrFlat;
