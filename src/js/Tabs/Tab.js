import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Tab = ({ className, icon, label, label2, checked, value, onChange, ...props }) => {
  return (
    <div
      className={classnames('md-tab', className, { 'active': checked })}
      {...props}
    >
      <label
        className={classnames('md-tab-label', {
          'multiline': !!label && !!label2,
          'with-icon': !!label && !!icon,
        })}
      >
        {icon}
        {label && <div>{label}</div>}
        {label2 && <div>{label2}</div>}
        <input
          type="radio"
          className="md-tab-control"
          checked={checked}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

Tab.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  label: PropTypes.string,
  label2: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default Tab;
