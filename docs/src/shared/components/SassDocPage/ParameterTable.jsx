import React, { PropTypes } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableBody from 'react-md/lib/DataTables/TableBody';

import Markdown from 'components/Markdown';
import VariableFormat from './VariableFormat';
import parameterShape from './parameterShape';
import ScssMarkdown from './ScssMarkdown';

const ParameterTable = ({ parameters }) => {
  if (!parameters.length) {
    return <h5 className="sassdoc-section-end">None</h5>;
  }

  const rows = parameters.map(({ name, description, type, default: defaultValue }) => (
    <TableRow key={name}>
      <TableColumn>
        <VariableFormat>
          {name.indexOf('$') === -1 ? '$' : ''}{name}
        </VariableFormat>
      </TableColumn>
      <TableColumn style={{ whiteSpace: 'initial' }}><Markdown markdown={description} /></TableColumn>
      <TableColumn><VariableFormat>{type}</VariableFormat></TableColumn>
      <TableColumn><ScssMarkdown markdown={defaultValue || '\u2014'} /></TableColumn>
    </TableRow>
  ));

  return (
    <DataTable className="sassdoc-section-end" plain>
      <TableHeader>
        <TableRow>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Default value</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody className="stop-pre-margins">{rows}</TableBody>
    </DataTable>
  );
};

ParameterTable.propTypes = {
  parameters: PropTypes.arrayOf(parameterShape).isRequired,
};

export default ParameterTable;
