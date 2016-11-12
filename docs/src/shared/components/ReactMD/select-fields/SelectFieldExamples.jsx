import React, { PureComponent } from 'react';
import SelectField from 'react-md/lib/SelectFields';
import states from 'constants/states';

const stateItems = [''].concat(states);
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default class SelectFieldExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  _handleChange = (value, index, event) => { // eslint-disable-line no-unused-vars
    this.setState({ value });
  };

  render() {
    return (
      <section className="md-grid">
        <SelectField
          id="states"
          placeholder="Select a State"
          menuItems={stateItems}
          itemLabel="name"
          itemValue="abbreviation"
          className="md-cell md-cell--bottom"
        />
        <SelectField
          id="statesControlled"
          label="State"
          menuItems={states}
          value={this.state.value}
          onChange={this._handleChange}
          itemLabel="name"
          itemValue="abbreviation"
          className="md-cell"
        />
        <SelectField
          id="numbers"
          defaultValue={1}
          menuItems={numbers}
          className="md-cell md-cell--bottom"
        />
        <SelectField
          id="disabledNumbers"
          label="Disabled"
          disabled
          defaultValue={1}
          menuItems={numbers}
          className="md-cell md-cell--bottom"
        />
      </section>
    );
  }
}
