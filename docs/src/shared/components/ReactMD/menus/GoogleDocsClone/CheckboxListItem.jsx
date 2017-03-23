import React, { PropTypes } from 'react';
import ListItemControl from 'react-md/lib/Lists/ListItemControl';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

const CheckboxListItem = ({ label, rightIcon, ...props }) => (
  <ListItemControl
    primaryText={label}
    primaryAction={
      <Checkbox
        {...props}
        checkedIconChildren="check"
        uncheckedIconChildren={null}
        inkDisabled
      />
    }
    rightIcon={rightIcon}
  />
);

CheckboxListItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rightIcon: PropTypes.node,
};

export default CheckboxListItem;
