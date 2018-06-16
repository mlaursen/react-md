import React from 'react';
import PropTypes from 'prop-types';

// There is a prop-type warning about controlled components since the checked prop is provided,
// but the change is automatically handled by the SelectionControlGroup component. Just going
// to hide the error by applying a no-op for onChange.
const handleChange = () => {};

const CustomControl = ({
  style,
  className,
  id,
  type,
  name,
  value,
  checked,
  label,
}) => (
  <div style={style} className={className}>
    <input id={id} type={type} name={name} value={value} checked={checked} onChange={handleChange} />
    <label htmlFor={id} style={{ marginLeft: '1em' }}>{label}: {checked ? 'Checked!' : 'Unchecked :('}</label>
  </div>
);

CustomControl.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  tabIndex: PropTypes.number,
};

export default CustomControl;
