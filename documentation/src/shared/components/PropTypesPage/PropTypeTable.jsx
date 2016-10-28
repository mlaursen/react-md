import React, { PureComponent, PropTypes } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableRow from 'react-md/lib/DataTables/TableRow';

import propsShape from './propsShape';

export default class PropTypeTable extends PureComponent {
  static propTypes = {
    ascending: PropTypes.bool.isRequired,
    sortProps: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    props: PropTypes.arrayOf(propsShape).isRequired,
  };

  render() {
    const { sortProps, ascending } = this.props;
    return (
      <DataTable plain>
        <TableHeader>
          <TableRow autoAdjust={false}>
            <TableColumn className="md-table-column--adjusted" onClick={sortProps} sorted={ascending}>Prop name</TableColumn>
            <TableColumn className="md-table-column--adjusted">Prop type</TableColumn>
            <TableColumn className="md-table-column--grow">Description</TableColumn>
          </TableRow>
        </TableHeader>
      </DataTable>
    );
  }
}
