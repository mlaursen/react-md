import React from 'react';
import PropTypes from 'prop-types';
import CardText from 'react-md/lib/Cards/CardText';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import Markdown from 'components/Markdown';

const MethodsSection = ({ id, name, description, returns, params }) => {
  const fnParams = params.reduce((str, p) => `${str}${str.length ? ', ' : ''}${p.name}`, '');

  let markdown = description;
  if (returns) {
    markdown = `#### returns: ${returns.description}\n\n${description}`;
  }

  return (
    <section className="prop-types__methods" id={`${id}-${name}`}>
      <Markdown component="h3" markdown={`\`\`\`js\n${name}(${fnParams})${returns ? `: ${returns.type}` : ''}\n\`\`\``} />
      <Markdown markdown={markdown} component={CardText} />
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Name</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Description</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {params.map(({ name, type, description, required }) => (
            <TableRow key={name}>
              <TableColumn>
                <code className="language-js">{`${name}${required ? ' *' : ''}`}</code>
              </TableColumn>
              <TableColumn>
                <code className="language-js">{type}</code>
              </TableColumn>
              <TableColumn>
                <Markdown markdown={description} />
              </TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </section>
  );
};

MethodsSection.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  returns: PropTypes.shape({
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  params: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default MethodsSection;
