import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Autocomplete from 'react-md/lib/Autocompletes';
import { uniqBy } from 'lodash/array';

import { states } from 'constants/sampleData';
import StateChip from './StateChip';

export default class WithTextFields extends PureComponent {
  state = { selectedStates: [], filteredStates: states };

  componentWillUpdate(nextProps, nextState) {
    const { selectedStates } = nextState;
    if (this.state.selectedStates !== selectedStates) {
      // when a new state is removed or added, add or remove it from the autocomplete list
      this.setState({
        filteredStates: states.filter(state => selectedStates.indexOf(state) === -1),
      });
    }
  }

  addState = (abbreviation, index, matches) => {
    const state = matches[index];
    const selectedStates = uniqBy([...this.state.selectedStates, state], s => s.name);
    this.setState({ selectedStates });
  };

  removeState = (state) => {
    const selectedStates = this.state.selectedStates.slice();
    selectedStates.splice(selectedStates.indexOf(state), 1);
    this.setState({ selectedStates });
  };

  render() {
    const { selectedStates, filteredStates } = this.state;
    const chips = selectedStates.map(state => <StateChip key={state.abbreviation} state={state} onClick={this.removeState} />);
    return (
      <CSSTransitionGroup
        component="div"
        transitionName="opacity"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
      >
        {chips}
        <Autocomplete
          id="states-autocomplete"
          label="Select some states"
          data={filteredStates}
          dataLabel="name"
          dataValue="abbreviation"
          onAutocomplete={this.addState}
          clearOnAutocomplete
          deleteKeys="abbreviation"
        />
      </CSSTransitionGroup>
    );
  }
}
