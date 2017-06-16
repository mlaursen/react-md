import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash/string';
import CardText from 'react-md/lib/Cards/CardText';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableBody from 'react-md/lib/DataTables/TableBody';

import Markdown from 'components/Markdown';

const EnumsTable = ({ id, name, description, properties }) => (
  <section id={`${id}-enums-${kebabCase(name)}`} className="prop-types__enums">
    <CardText component={Markdown} markdown={`### ${name}\n${description}`} />
    <DataTable plain>
      <TableHeader>
        <TableRow>
          <TableColumn>Name</TableColumn>
          <TableColumn>Value</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map(({ name, value, description }) => (
          <TableRow key={name}>
            <TableColumn><code>{name}</code></TableColumn>
            <TableColumn><code>{`'${value}'`}</code></TableColumn>
            <TableColumn className="prop-types__normal-column">{description}</TableColumn>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  </section>
);

EnumsTable.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default EnumsTable;
