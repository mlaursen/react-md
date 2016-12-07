import React, { PropTypes } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableBody from 'react-md/lib/DataTables/TableBody';

import Markdown from 'components/Markdown';
import methodShape from './methodShape';

const MethodsTable = ({ methods }) => {
  const rows = methods.map(({ description, name, params, returns, modifiers }) => {
    let definition = '';
    if (params.length) {
      definition += '\n\n```js\n';
      definition += params.map(({ name, description, type }) => `@param ${type ? `{${type.name}} ` : ''}${name} - ${description}`).join('\n');
    }

    if (returns) {
      definition += `\n\n@return ${returns.type ? `{${returns.type.name}} ` : ''}${returns.description}`;
    }

    if (definition) {
      definition += '\n```';
    }

    let prefix = modifiers.join(' ');
    if (prefix) {
      prefix += ' ';
    }

    return (
      <TableRow key={name}>
        <TableColumn>
          <Markdown markdown={`\`\`\`js\n${prefix}${name}\n\`\`\``} />
        </TableColumn>
        <TableColumn style={{ whiteSpace: 'initial' }}>
          <Markdown markdown={description + definition} />
        </TableColumn>
      </TableRow>
    );
  });

  return (
    <DataTable plain>
      <TableHeader>
        <TableRow>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows}
      </TableBody>
    </DataTable>
  );
};

MethodsTable.propTypes = {
  methods: PropTypes.arrayOf(methodShape),
};

export default MethodsTable;
