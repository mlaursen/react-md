import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { uniqBy } from 'lodash/array';

import Autocomplete from 'react-md/lib/Autocompletes';
import StateChip from './StateChip';

import STATES from 'constants/states';

export default class ChipsWithTextField extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { states: [], filteredStates: STATES };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.states !== nextState.states) {
      this.setState({
        filteredStates: STATES.filter(state => nextState.states.indexOf(state) === -1),
      });
    }
  }

  _addState = (state, stateIndex, states) => {
    const newStates = [...this.state.states, states[stateIndex]];

    this.setState({ states: uniqBy(newStates, s => s.name) });
  };

  _removeState = (state) => {
    const states = this.state.states.slice();
    states.splice(states.indexOf(state), 1);
    this.setState({ states });
  };

  render() {
    const chips = this.state.states.map(state => (
      <StateChip key={state.name} state={state} onClick={this._removeState} />
    ));
    return (
      <CSSTransitionGroup
        transitionName="opacity"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
        component="div"
        className="chip-list"
      >
        {chips}
        <Autocomplete
          id="states"
          label="Select some states"
          data={this.state.filteredStates}
          dataLabel="name"
          onAutocomplete={this._addState}
          clearOnAutocomplete
          fullWidth
          deleteKeys="abbreviation"
        />
      </CSSTransitionGroup>
    );
  }
}
