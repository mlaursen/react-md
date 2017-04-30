import React, { PropTypes } from 'react';
import CardText from 'react-md/lib/Cards/CardText';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';
import TextField from 'react-md/lib/TextFields';

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
  fixedHeader,
  onFixedHeaderChange,
  fixedFooter,
  onFixedFooterChange,
  fixedHeight,
  onHeightChange,
  fixedWidth,
  onWidthChange,
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
      disabled={inlineChecked}
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
    <SelectionControl
      type="switch"
      id="configuration-fixed-header"
      label="Fixed Header"
      name="fixed-header"
      checked={fixedHeader}
      onChange={onFixedHeaderChange}
    />
    <SelectionControl
      type="switch"
      id="configuration-fixed-footer"
      label="Fixed Footer"
      name="fixed-footer"
      checked={fixedFooter}
      onChange={onFixedFooterChange}
    />
    <TextField
      id="configuration-fixed-height"
      label="Fixed Height"
      type="number"
      value={fixedHeight}
      onChange={onHeightChange}
      className="md-cell"
      disabled={!fixedHeader}
    />
    <TextField
      id="configuration-fixed-width"
      label="Fixed Width"
      type="number"
      value={fixedWidth}
      onChange={onWidthChange}
      className="md-cell"
      disabled={!fixedHeader && !fixedFooter}
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
  fixedHeader: PropTypes.bool.isRequired,
  onFixedHeaderChange: PropTypes.func.isRequired,
  fixedFooter: PropTypes.bool.isRequired,
  onFixedFooterChange: PropTypes.func.isRequired,
  fixedHeight: PropTypes.number.isRequired,
  onHeightChange: PropTypes.func.isRequired,
  fixedWidth: PropTypes.number.isRequired,
  onWidthChange: PropTypes.func.isRequired,
};

export default Configuration;
