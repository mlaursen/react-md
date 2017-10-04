import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';

import Markdown from 'components/Markdown';
import parameterShape from 'propTypes/parameterShape';

const ParameterTable = ({ parameters }) => {
  if (!parameters.length) {
    return <h5 className="sassdoc__section">None</h5>;
  }

  const rows = parameters.map(({ name, description, type, default: defaultValue }) => (
    <TableRow key={name}>
      <TableColumn>
        <pre>
          {name.indexOf('$') === -1 ? '$' : ''}{name}
        </pre>
      </TableColumn>
      <TableColumn><Markdown markdown={description} /></TableColumn>
      <TableColumn><pre>{type}</pre></TableColumn>
      <TableColumn><pre>{defaultValue || '\u2014'}</pre></TableColumn>
    </TableRow>
  ));

  return (
    <DataTable className="sassdoc__section sassdoc__parameter-table" plain>
      <TableHeader>
        <TableRow>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Default value</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>{rows}</TableBody>
    </DataTable>
  );
};

ParameterTable.propTypes = {
  parameters: PropTypes.arrayOf(parameterShape).isRequired,
};

export default ParameterTable;
