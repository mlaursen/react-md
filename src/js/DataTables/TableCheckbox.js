import React, { Component, PropTypes } from 'react';
import SelectionControl from '../SelectionControls/SelectionControl';

import checkboxContextTypes from './checkboxContextTypes';

export default class TableCheckbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
  };

  static contextTypes = checkboxContextTypes;

  render() {
    const { checked, ...props } = this.props;
    const {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
      rowId,
      baseName,
    } = this.context;

    return (
      <td className="md-table-checkbox">
        <SelectionControl
          {...props}
          id={rowId}
          name={`${baseName}-checkbox`}
          type="checkbox"
          checked={checked}
          uncheckedCheckboxIconChildren={uncheckedIconChildren}
          uncheckedCheckboxIconClassName={uncheckedIconClassName}
          checkedCheckboxIconChildren={checkedIconChildren}
          checkedCheckboxIconClassName={checkedIconClassName}
        />
      </td>
    );
  }
}
