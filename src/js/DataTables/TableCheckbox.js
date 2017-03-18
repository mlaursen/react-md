import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import SelectionControl from '../SelectionControls/SelectionControl';

import checkboxContextTypes from './checkboxContextTypes';

export default class TableCheckbox extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    header: PropTypes.bool,
  };

  static contextTypes = checkboxContextTypes;

  render() {
    const { checked, header, ...props } = this.props;
    const {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
      rowId,
      baseName,
    } = this.context;

    const selectionControl = (
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
    );

    const _className = cn({ 'md-table-checkbox--header': header });

    let responsiveHelper;
    if (header) {
      responsiveHelper = (
        <div className="md-table-checkbox--responsive-header">
          <div className={_className}>
            {selectionControl}
          </div>
        </div>
      );
    }

    const Component = header ? 'th' : 'td';

    return (
      <Component className={cn('md-table-checkbox', _className)}>
        {selectionControl}
        {responsiveHelper}
      </Component>
    );
  }
}
