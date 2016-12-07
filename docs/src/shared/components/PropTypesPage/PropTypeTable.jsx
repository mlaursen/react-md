import React, { PureComponent, PropTypes } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableRow from 'react-md/lib/DataTables/TableRow';

import propsShape from './propsShape';
import PropTypeRow from './PropTypeRow';

export default class PropTypeTable extends PureComponent {
  static propTypes = {
    ascending: PropTypes.bool.isRequired,
    sortProps: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    props: PropTypes.arrayOf(propsShape).isRequired,
  };

  render() {
    const { sortProps, ascending, props } = this.props;

    const rows = props.map(prop => <PropTypeRow key={prop.propName} prop={prop} />);
    return (
      <DataTable plain>
        <TableHeader>
          <TableRow autoAdjust={false}>
            <TableColumn className="md-table-column--adjusted" onClick={sortProps} sorted={ascending}>Prop name</TableColumn>
            <TableColumn className="md-table-column--adjusted">Prop type</TableColumn>
            <TableColumn className="md-table-column--grow">Description</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>{rows}</TableBody>
      </DataTable>
    );
  }
}
