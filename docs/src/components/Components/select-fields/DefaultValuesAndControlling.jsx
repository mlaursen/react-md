import React, { PureComponent } from 'react';
import SelectField from 'react-md/lib/SelectFields';
import states from 'constants/sampleData/states';

const statesWithEmpty = ['', ...states];

export default class DefaultValuesAndControlling extends PureComponent {
  state = { value: '' };

  /**
   * The `onChange` callback provides the next selected value or label,
   * the index of the item in your `menuItems` list, the event that
   * triggered the change, and an additional object with the id, name, and
   * value of the `SelectField`.
   *
   * @param {String|number} value - The next value (or label if not using objects).
   * @param {number} index - The selected item's index
   * @param {Event} event - the event that triggered the change.
   * @param {Object} details - Additional details about the SelectField.
   * @param {String} details.id - The id for the select field.
   * @param {String=} details.name - The name for the select field (if one was provided).
   * @param {String|number} details.value - The current value for the select field.
   */
  handleChange = (value, index, event, details) => { // eslint-disable-line no-unused-vars
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="md-grid">
        <SelectField
          id="select-field-default-value"
          label="Default Valued"
          defaultValue={states[3].abbreviation}
          menuItems={states}
          itemLabel="name"
          itemValue="abbreviation"
          className="md-cell"
        />
        <SelectField
          id="select-field-controlled"
          label="Controlled"
          required
          value={value}
          onChange={this.handleChange}
          menuItems={statesWithEmpty}
          itemLabel="name"
          itemValue="abbreviation"
          className="md-cell md-cell--4-tablet md-cell--6"
          helpText="Try selecting a value and then selecting the first item in the list."
          errorText={<span>A <em>real</em> value is required for this field</span>}
        />
      </div>
    );
  }
}
