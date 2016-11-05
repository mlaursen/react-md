import React, { PureComponent } from 'react';
import cn from 'classnames';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import propsShape from './propsShape';
import Markdown from 'components/Markdown';

export default class PropTypeRow extends PureComponent {
  static propTypes = {
    prop: propsShape,
  };

  render() {
    const {
      prop: {
        propName,
        type,
        required,
        defaultValue,
      },
    } = this.props;

    let { description } = this.props.prop;
    if (defaultValue) {
      description = `default: \`${defaultValue} \n\n${description}`;
    }

    const deprecated = type.indexOf('deprecated') !== -1;

    return (
      <TableRow autoAdjust={false}>
        <TableColumn
          className={cn('prop-name', {
            'prop-name--deprecated md-text--secondary': deprecated,
            'md-color--disabled': deprecated,
          })}
        >
          {propName}
        </TableColumn>
        <TableColumn
          className="prop-type"
          tooltipLabel={required ? 'Required' : null}
          tooltipDelay={300}
          tooltipPosition="top"
        >
          <Markdown markdown={`\`\`\`js\n${type}${required ? ' *' : ''}\n\`\`\``} />
        </TableColumn>
        <TableColumn className="md-table-column--grow" style={{ whiteSpace: 'initial' }}>
          <Markdown markdown={description} />
        </TableColumn>
      </TableRow>
    );
  }
}
