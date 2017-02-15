import React, { Component, PropTypes } from 'react';
import SelectionControl from '../SelectionControls/SelectionControl';

export default class TableCheckbox extends Component {
  static propTypes = {
    index: PropTypes.number,
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
    checkboxHeaderLabel: PropTypes.string.isRequired,
    checkboxLabelTemplate: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
  };

  render() {
    const { checked, index, ...props } = this.props;
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
      checkboxHeaderLabel,
      checkboxLabelTemplate,
    } = this.context;

    const Cell = header ? 'th' : 'td';
    let label;
    if (header) {
      label = checkboxHeaderLabel;
    } else if (typeof checkboxLabelTemplate === 'function') {
      label = checkboxLabelTemplate(index);
    } else {
      label = checkboxLabelTemplate.replace(/{{row}}/g, index);
    }

    return (
      <Cell className="md-table-checkbox" scope={header ? 'col' : undefined}>
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
          aria-label={label}
        />
      </Cell>
    );
  }
}
