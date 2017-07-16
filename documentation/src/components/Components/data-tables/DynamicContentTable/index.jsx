import React, { PureComponent } from 'react';
import Card from 'react-md/lib/Cards/Card';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import guid from 'uuid/v1';

import dessertsData from 'constants/sampleData/desserts';
import { randomInt } from 'utils/random';

import './_styles.scss';
import TableActions from './TableActions';
import DessertRow from './DessertRow';
import AddDessertsDialog from './AddDessertsDialog';

const headers = [
  'Dessert (100g serving)',
  'Type',
  'Calories',
  'Fat (g)',
  'Carbs (g)',
  'Protein (g)',
  'Sodium (mg)',
  'Calcium (%)',
  'Iron (%)',
];

const INITIAL_STATE = {
  desserts: dessertsData.map(dessert => ({ id: guid(), ...dessert })),
  selectedRows: dessertsData.map(() => false),
  count: 0,
  dialogVisible: false,
};

export default class DynamicContentTable extends PureComponent {
  state = INITIAL_STATE;

  reset = () => {
    this.setState(INITIAL_STATE);
  };

  removeSelected = () => {
    const { selectedRows, desserts } = this.state;
    const nextState = desserts.reduce((nextState, dessert, i) => {
      if (!selectedRows[i]) {
        nextState.desserts.push(dessert);
        nextState.selectedRows.push(false);
      }

      return nextState;
    }, { desserts: [], selectedRows: [], count: 0 });

    this.setState(nextState);
  };

  handleRowToggle = (row, selected, count) => {
    let selectedRows = this.state.selectedRows.slice();
    if (row === 0) {
      selectedRows = selectedRows.map(() => selected);
    } else {
      selectedRows[row - 1] = selected;
    }

    this.setState({ selectedRows, count });
  };

  showAddRowDialog = () => {
    this.setState({ dialogVisible: true });
  };

  hideAddRowDialog = () => {
    this.setState({ dialogVisible: false });
  };

  addDesserts = (e) => {
    const desserts = this.state.desserts.slice();
    const selectedRows = this.state.selectedRows.slice();

    const newDesserts = this.parseNewDesserts(e);
    Object.keys(newDesserts).forEach((key) => {
      const { random, ...dessert } = newDesserts[key];
      const length = selectedRows.length;
      const insertAt = random ? randomInt({ min: 0, max: length }) : length;

      desserts.splice(insertAt, 0, dessert);
      selectedRows.splice(insertAt, 0, false);
    });

    this.setState({ desserts, selectedRows, dialogVisible: false });
  };

  /**
   * Loops over all the elements in the AddDessertsDialog form and creates an object
   * containing all the newly created desserts.
   *
   * Example shape:
   *
   * {
   *   'dessert-1': {
   *     id: 'some-guid,
   *     isNew: true,
   *     name: 'Dessert name',
   *     ...other parts...
   *   },
   *   'dessert-2': { ... },
   * };
   */
  parseNewDesserts = e => [].reduce.call(e.target.elements, (desserts, el) => {
    const { name, type, value, checked } = el;
    if (!name) { // buttons
      return desserts;
    }

    const separatorIndex = name.lastIndexOf('-');
    const dessertPartName = name.substring(0, separatorIndex);
    const dessertIndex = name.substring(separatorIndex + 1);
    const key = `dessert-${dessertIndex}`;
    const dessert = desserts[key] || { id: guid(), isNew: true };

    if (type === 'checkbox') {
      dessert.random = checked;
    } else {
      dessert[dessertPartName] = type === 'number' ? Number(value) : value;
    }

    desserts[key] = dessert;
    return desserts;
  }, {});

  render() {
    const { desserts, count, dialogVisible } = this.state;
    return (
      <Card tableCard>
        <TableActions
          count={count}
          onAddClick={this.showAddRowDialog}
          onRemoveClick={this.removeSelected}
          onResetClick={this.reset}
        />
        <DataTable baseId="dynamic-content-desserts" onRowToggle={this.handleRowToggle}>
          <TableHeader>
            <TableRow>
              {headers.map((header, i) => <TableColumn key={header} numeric={i > 1}>{header}</TableColumn>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {desserts.map(({ id, isNew, ...dessert }) => (
              <DessertRow key={id} isNew={isNew} dessert={dessert} />
            ))}
          </TableBody>
        </DataTable>
        <AddDessertsDialog
          addDesserts={this.addDesserts}
          onHide={this.hideAddRowDialog}
          visible={dialogVisible}
        />
      </Card>
    );
  }
}
