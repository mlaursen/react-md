import React, { PureComponent } from 'react';
import SelectField from 'react-md/lib/SelectFields';
import states from 'constants/states';

const stateItems = [''].concat(states);
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default class SelectFieldExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { value: 'VA' };
  }

  _handleChange = (value, index, event) => { // eslint-disable-line no-unused-vars
    this.setState({ value });
  };

  render() {
    return (
      <section className="md-grid">
        <SelectField
          id="states"
          label="State"
          placeholder="Select a State"
          menuItems={stateItems}
          itemLabel="name"
          itemValue="abbreviation"
          className="md-cell"
          helpOnFocus
          helpText="Select some state for me"
        />
        <SelectField
          id="statesControlled"
          label="State"
          placeholder="Some State"
          menuItems={stateItems}
          value={this.state.value}
          onChange={this._handleChange}
          required
          errorText="A state is required"
          className="md-cell"
          itemLabel="name"
          itemValue="abbreviation"
        />
        <SelectField
          id="numbers"
          label="Some Number"
          placeholder="0"
          defaultValue={0}
          menuItems={numbers}
          className="md-cell"
        />
        <SelectField
          id="disabledNumbers"
          label="Disabled"
          disabled
          defaultValue={1}
          menuItems={numbers}
          className="md-cell"
        />
      </section>
    );
  }
}
