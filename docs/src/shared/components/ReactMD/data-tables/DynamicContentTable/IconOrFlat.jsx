import React, { PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';

const IconOrFlat = ({ mobile, label, ...props }) => (
  <Button
    icon={mobile}
    flat={!mobile}
    label={mobile ? null : label}
    primary
    tooltipLabel={mobile ? label : null}
    {...props}
  />
);

IconOrFlat.propTypes = {
  mobile: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default IconOrFlat;
