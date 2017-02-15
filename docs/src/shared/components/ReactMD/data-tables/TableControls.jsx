import React, { PureComponent, PropTypes } from 'react';
import CardText from 'react-md/lib/Cards/CardText';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';

const controls = [{
  label: 'Sort by movie title',
  value: 'title',
}, {
  label: 'Sort by movie year',
  value: 'year',
}];

export default class TableControls extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      onChange,
    } = this.props;
    return (
      <CardText className="table-controls" component="form" onChange={onChange}>
        <SelectionControlGroup
          id="sort-table-by"
          name="sort-table-by"
          type="radio"
          label="Table Props"
          controls={controls}
        />
        <SelectionControl
          type="switch"
          id="edit-dialog"
          label="Use large Edit Dialog"
          name="edit-dialog"
        />
        <SelectionControl
          type="switch"
          id="edit-inline"
          label="Edit inline"
          name="edit-inline"
        />
        <SelectionControl
          type="switch"
          id="save-on-outside"
          label="Save comment on outside click"
          name="save-on-outside"
          defaultChecked
        />
        <SelectionControl
          type="switch"
          id="indeterminate-data-table"
          label="Indeterminate Checkboxes"
          name="indeterminate-data-table"
        />
      </CardText>
    );
  }
}
