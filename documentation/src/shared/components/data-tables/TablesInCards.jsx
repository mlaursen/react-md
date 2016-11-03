import React, { PureComponent, PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';
import TableCardHeader from 'react-md/lib/DataTables/TableCardHeader';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';

import KebabMenu from 'components/KebabMenu';
import DataTableExample from './DataTableExample';

export default class TablesInCards extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      title: true,
    };

    this._handleRowToggle = this._handleRowToggle.bind(this);
    this._toggleTitle = this._toggleTitle.bind(this);
  }

  _handleRowToggle(row, toggled, count) {
    this.setState({ count });
  }

  _toggleTitle(title) {
    this.setState({ title });
  }

  render() {
    const { count, title } = this.state;
    const kebab = <KebabMenu items={['Something', 'Something Else']} />;
    const contextualActions = [<Button icon>delete</Button>, kebab];
    const leftChildren = [
      <Button flat primary label="Add" key="add-row" style={{ marginLeft: 8 }} />,
      <Button flat primary label="Remove" key="remove-row" />,
    ];

    return (
      <Card tableCard>
        <TableCardHeader
          title={title ? 'Nutrition' : null}
          count={count}
          leftChildren={title ? null : leftChildren}
          actions={contextualActions}
        >
          <Button icon>filter_list</Button>
          {kebab}
        </TableCardHeader>
        <DataTableExample onRowToggle={this._handleRowToggle} />
        <CardText style={{ paddingLeft: 12 }}>
          <SelectionControl
            type="checkbox"
            checked={title}
            label="Display a Title instead of Actions"
            onChange={this._toggleTitle}
            id="toggle-title"
            name="toggle-title"
          />
        </CardText>
      </Card>
    );
  }
}
