import React, { Component, PropTypes } from 'react';
import SelectionControl from '../SelectionControls/SelectionControl';

import checkboxContextTypes from './checkboxContextTypes';
import findTable from './findTable';

export default class TableCheckbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
  };

  static contextTypes = checkboxContextTypes;

  constructor(props, context) {
    super(props, context);

    this._td = null;
    this._header = false;
    this._handleMount = this._handleMount.bind(this);
  }

  _handleMount(td) {
    if (td) {
      const header = findTable(td).querySelector('thead');
      const index = td.parentNode.rowIndex - (header ? 1 : 0);

      if (td.parentNode.parentNode.tagName === 'TBODY') {
        this.context.createCheckbox(index);
      }
      this._td = td;
      this._header = header;
    } else if (this._td) {
      const index = this._td.parentNode.rowIndex;
      this.context.removeCheckbox(index - (this._header ? 1 : 0));
      this._td = null;
      this._header = false;
    }
  }

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
      <td className="md-table-checkbox" ref={this._handleMount}>
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
