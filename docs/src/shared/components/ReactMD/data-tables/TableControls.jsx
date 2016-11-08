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
    sorted: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
    dialogChecked: PropTypes.bool.isRequired,
    onDialogChange: PropTypes.func.isRequired,
    inlineChecked: PropTypes.bool.isRequired,
    onInlineChange: PropTypes.func.isRequired,
    saveChecked: PropTypes.bool.isRequired,
    onSaveChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      sorted,
      onSortChange,
      dialogChecked,
      onDialogChange,
      inlineChecked,
      onInlineChange,
      saveChecked,
      onSaveChange,
    } = this.props;
    return (
      <CardText className="table-controls">
        <SelectionControlGroup
          id="complexControl"
          name="complex-controls"
          type="radio"
          label="Table Props"
          value={sorted}
          onChange={onSortChange}
          controls={controls}
        />
        <SelectionControl
          type="switch"
          id="useEditDialog"
          label="Use large Edit Dialog"
          name="edit-dialog"
          checked={dialogChecked}
          onChange={onDialogChange}
        />
        <SelectionControl
          type="switch"
          id="useInlineEdit"
          label="Edit inline"
          name="edit-inline"
          checked={inlineChecked}
          onChange={onInlineChange}
        />
        <SelectionControl
          type="switch"
          id="saveOnOutside"
          label="Save comment on outside click"
          name="save-on-outside"
          checked={saveChecked}
          onChange={onSaveChange}
        />
      </CardText>
    );
  }
}
