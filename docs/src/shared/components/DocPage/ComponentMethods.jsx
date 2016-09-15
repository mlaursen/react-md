import React, { PureComponent } from 'react';
import { DataTable, TableHeader, TableRow, TableColumn, TableBody } from 'react-md/lib/DataTables';

import docgenMethodsPropTypes from 'constants/docgenMethodsPropTypes';
import Markdown from 'components/Markdown';

export default class ComponentMethods extends PureComponent {
  static propTypes = {
    methods: docgenMethodsPropTypes,
  };

  render() {
    const { methods } = this.props;

    const rows = methods.map(({ description, name, params, returns, modifiers }) => {
      let definition = '';
      if (params.length) {
        definition += '\n\n```js\n';
        definition += params.map(({ name, description, type }) => `@param ${type ? `{${type.name}} ` : ''}${name} - ${description}`).join('\n');
      }

      if (returns) {
        definition += `\n\n@return ${returns.type ? `{${returns.type.name}} ` : ''}${returns.description}`;
      }

      definition += '\n```';

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
  }
}
