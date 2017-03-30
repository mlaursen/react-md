import React, { PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import TableCardHeader from 'react-md/lib/DataTables/TableCardHeader';

import IconOrFlat from './IconOrFlat';

const TableActions = ({ mobile, count, reset, openAddRowDialog, removeSelected }) => (
  <TableCardHeader
    title="Nutrition"
    visible={count > 0}
    contextualTitle={`${count} item${count > 1 ? 's' : ''} selected`}
    actions={[
      <Button key="add" icon onClick={openAddRowDialog} tooltipLabel="Add more rows" tooltipDelay={300}>add</Button>,
      <Button key="delete" icon onClick={removeSelected} tooltipLabel="Remove selected rows" tooltipDelay={300} tooltipPosition="left">delete</Button>,
    ]}
  >
    <IconOrFlat mobile={mobile} label="Add" onClick={openAddRowDialog}>add</IconOrFlat>
    <IconOrFlat mobile={mobile} label="Reset" onClick={reset}>refresh</IconOrFlat>
  </TableCardHeader>
);

TableActions.propTypes = {
  mobile: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  openAddRowDialog: PropTypes.func.isRequired,
  removeSelected: PropTypes.func.isRequired,
};

export default TableActions;
