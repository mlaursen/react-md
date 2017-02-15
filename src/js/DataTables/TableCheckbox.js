import React, { Component, PropTypes } from 'react';
import SelectionControl from '../SelectionControls/SelectionControl';

export default class TableCheckbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
  };

  static contextTypes = {
    rowId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    baseName: PropTypes.string.isRequired,
    header: PropTypes.bool,
    indeterminate: PropTypes.bool,
    checkedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string,
    uncheckedIconChildren: PropTypes.node,
    uncheckedIconClassName: PropTypes.string,
    indeterminateIconChildren: PropTypes.node,
    indeterminateIconClassName: PropTypes.string,
  };

  render() {
    const { checked, ...props } = this.props;
    const {
      checkedIconChildren,
      checkedIconClassName,
      uncheckedIconChildren,
      uncheckedIconClassName,
      indeterminateIconChildren,
      indeterminateIconClassName,
      indeterminate,
      header,
      rowId,
      baseName,
    } = this.context;

    const Cell = header ? 'th' : 'td';
    return (
      <Cell className="md-table-checkbox">
        <SelectionControl
          {...props}
          id={rowId}
          name={`${baseName}-checkbox`}
          type="checkbox"
          checked={checked}
          uncheckedCheckboxIconChildren={header && indeterminate ? indeterminateIconChildren : uncheckedIconChildren}
          uncheckedCheckboxIconClassName={header && indeterminate ? indeterminateIconClassName : uncheckedIconClassName}
          checkedCheckboxIconChildren={checkedIconChildren}
          checkedCheckboxIconClassName={checkedIconClassName}
        />
      </Cell>
    );
  }
}
