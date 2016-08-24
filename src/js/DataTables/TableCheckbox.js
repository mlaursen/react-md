import React, { Component, PropTypes } from 'react';
import FontIcon from '../FontIcons';
import Checkbox from '../SelectionControls/Checkbox';

import contextTypes from './contextTypes';

export default class TableCheckbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
  };

  static contextTypes = contextTypes;

  render() {
    const { checked, ...props } = this.props;
    const {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
    } = this.context;

    const checkedIcon = (
      <FontIcon
        iconClassName={checkedIconClassName}
        children={checkedIconChildren}
      />
    );
    const uncheckedIcon = (
      <FontIcon
        iconClassName={uncheckedIconClassName}
        children={uncheckedIconChildren}
      />
    );

    return (
      <td className="md-table-checkbox">
        <Checkbox
          checked={checked}
          {...props}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
        />
      </td>
    );
  }
}
