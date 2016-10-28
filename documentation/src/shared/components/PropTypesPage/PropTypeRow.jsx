import React, { PureComponent } from 'react';
import cn from 'classnames';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import propsShape from './propsShape';

export default class PropTypeRow extends PureComponent {
  static propTypes = {
    prop: propsShape,
  };

  render() {
    const {
      prop: {
        propName,
      },
    } = this.props;
    const type = '';

    return (
      <TableRow autoAdjust={false}>
        <TableColumn
          className={cn('prop-name', {
            'prop-name--deprecated': type === 'deprecated',
            'md-color--disabled': type === 'deprecated',
          })}
        >
          {propName}
        </TableColumn>
      </TableRow>
    );
  }
}
