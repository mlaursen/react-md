import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import DataTable from 'react-md/lib/DataTables/DataTable';
import Card from 'react-md/lib/Cards/Card';

import nutritionFacts from 'constants/nutritionFacts';
import randomInt from 'utils/RandomUtils/randomInt';
import TableActions from './TableActions';
import Header from './Header';
import Body from './Body';
import AddRowDialog from './AddRowDialog';

import './_styles.scss';

const INITIAL_STATE = {
  facts: nutritionFacts,
  selectedRows: nutritionFacts.map(() => false),
  count: 0,
  dialogVisible: false,
};

@connect(({ ui: { drawer: { mobile } } }) => ({ mobile }))
export default class DynamicContentTable extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
  };

  state = INITIAL_STATE;

  reset = () => {
    this.setState(INITIAL_STATE);
  };

  removeSelected = () => {
    const nextState = this.state.facts.reduce((state, fact, i) => {
      if (!this.state.selectedRows[i]) {
        state.facts.push(fact);
        state.selectedRows.push(false);
      }

      return state;
    }, { facts: [], selectedRows: [], count: 0 });
    this.setState(nextState);
  };

  handleRowToggle = (row, toggled, count) => {
    let selectedRows = this.state.selectedRows.slice();
    if (row === -1) {
      selectedRows = selectedRows.map(() => toggled);
    } else {
      selectedRows[row] = toggled;
    }

    this.setState({ count, selectedRows });
  };

  openAddRowDialog = () => {
    this.setState({ dialogVisible: true });
  };

  closeDialog = () => {
    this.setState({ dialogVisible: false });
  };

  addRows = (e) => {
    e.preventDefault();
    const { elements } = e.target;
    const data = [].reduce.call(elements, (data, el) => {
      const { name: elName, type, value, checked } = el;
      if (!elName) { // buttons
        return data;
      }

      const i = elName.lastIndexOf('-');
      const name = elName.substring(0, i);
      const group = `group${elName.substring(i)}`;
      data[group] = data[group] || {};
      if (type === 'checkbox') {
        data[group].random = checked;
      } else {
        data[group][name] = type === 'number' ? Number(value) : value;
      }

      return data;
    }, {});

    const facts = this.state.facts.slice();
    const selectedRows = this.state.selectedRows.slice();

    Object.keys(data).forEach(key => {
      const { random, ...fact } = data[key];
      const insertAt = random ? randomInt({ min: 0, max: selectedRows.length }) : selectedRows.length;
      fact.id = `${Date.now()}-${key}`; // amazing guid creation, right?
      fact.isNew = true;
      facts.splice(insertAt, 0, fact);
      selectedRows.splice(insertAt, 0, false);
    });

    this.setState({ facts, selectedRows, dialogVisible: false });
  };

  render() {
    const { mobile } = this.props;
    const { facts, count, dialogVisible } = this.state;
    return (
      <Card tableCard>
        <TableActions
          mobile={mobile}
          count={count}
          reset={this.reset}
          removeSelected={this.removeSelected}
          openAddRowDialog={this.openAddRowDialog}
        />
        <DataTable baseId="nutrition" onRowToggle={this.handleRowToggle} className="nutrition-table">
          <Header />
          <Body facts={facts} mobile={mobile} />
        </DataTable>
        <AddRowDialog visible={dialogVisible} closeDialog={this.closeDialog} addRows={this.addRows} mobile={mobile} />
      </Card>
    );
  }
}
