import React, { PureComponent, PropTypes } from 'react';
import parameterShape from './parameterShape';
import { DataTable, TableHeader, TableRow, TableColumn, TableBody } from 'react-md/lib/DataTables';
import Markdown from 'components/Markdown';
import ScssMarkdown from './ScssMarkdown';

const VariableFormat = ({ children }) => (
  <pre className="lang-scss">
    <code className="hljs-variable">
      {children}
    </code>
  </pre>
);

VariableFormat.propTypes = {
  children: PropTypes.node.isRequired,
};

export default class Parameters extends PureComponent {
  static propTypes = {
    parameters: PropTypes.arrayOf(parameterShape),
  };

  render() {
    const { parameters } = this.props;
    if (!parameters || !parameters.length) {
      return <h5>None</h5>;
    }

    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn className="prevent-grow">Name</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Default value</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="stop-pre-margins">
          {parameters.map(param => (
            <TableRow key={param.name}>
              <TableColumn className="prevent-grow">
                <VariableFormat>{param.name.indexOf('$') === -1 ? `$${param.name}` : param.name}</VariableFormat>
              </TableColumn>
              <TableColumn style={{ whiteSpace: 'initial' }}><Markdown markdown={param.description} /></TableColumn>
              <TableColumn><VariableFormat>{param.type}</VariableFormat></TableColumn>
              <TableColumn><ScssMarkdown markdown={param.default || '\u2014'} /></TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    );
  }
}
