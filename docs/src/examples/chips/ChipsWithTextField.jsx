/* eslint-disable react/jsx-no-bind */
import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Autocomplete from 'react-md/lib/Autocompletes';
import Chip from 'react-md/lib/Chips';

import states from 'constants/states';

export default class ChipsWithTextField extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { states: [] };
  }

  _addState = (state) => {
    if (this.state.states.indexOf(state) === -1) {
      this.setState({
        states: [...this.state.states, state],
      });
    }
  };

  _removeState = (state) => {
    const states = this.state.states.slice();
    states.splice(states.indexOf(state), 1);
    this.setState({ states });
  };

  render() {
    const chips = this.state.states.map(state => (
      <Chip label={state} key={state} remove={this._removeState.bind(this, state)} />
    ));
    return (
      <CSSTransitionGroup
        transitionName="opacity"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
        component="div"
      >
        {chips}
        <Autocomplete
          label="Select some states"
          data={states}
          dataLabel="name"
          onAutocomplete={this._addState}
          clearOnAutocomplete
          fullWidth
        />
      </CSSTransitionGroup>
    );
  }
}
