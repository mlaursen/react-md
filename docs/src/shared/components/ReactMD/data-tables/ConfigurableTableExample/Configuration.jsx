import React, { PropTypes } from 'react';
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

const Configuration = ({
  sorted,
  onSortChange,
  dialogChecked,
  onDialogChange,
  inlineChecked,
  onInlineChange,
  saveChecked,
  onSaveChange,
}) => (
  <CardText>
    <SelectionControlGroup
      id="configuration-sort-table-by"
      name="sort-table-by"
      type="radio"
      label="Table Props"
      value={sorted}
      onChange={onSortChange}
      controls={controls}
    />
    <SelectionControl
      type="switch"
      id="configuration-use-edit-dialog"
      label="Use large Edit Dialog"
      name="edit-dialog"
      checked={dialogChecked}
      onChange={onDialogChange}
    />
    <SelectionControl
      type="switch"
      id="configuration-use-inline-edit"
      label="Edit inline"
      name="edit-inline"
      checked={inlineChecked}
      onChange={onInlineChange}
    />
    <SelectionControl
      type="switch"
      id="configuration-save-on-outside"
      label="Save comment on outside click"
      name="save-on-outside"
      checked={saveChecked}
      onChange={onSaveChange}
    />
  </CardText>
);

Configuration.propTypes = {
  sorted: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  dialogChecked: PropTypes.bool.isRequired,
  onDialogChange: PropTypes.func.isRequired,
  inlineChecked: PropTypes.bool.isRequired,
  onInlineChange: PropTypes.func.isRequired,
  saveChecked: PropTypes.bool.isRequired,
  onSaveChange: PropTypes.func.isRequired,
};

export default Configuration;
