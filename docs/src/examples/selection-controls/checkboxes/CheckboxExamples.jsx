import React, { PureComponent } from 'react';
import { Checkbox } from 'react-md/lib/SelectionControls';
import FontIcon from 'react-md/lib/FontIcons';

export default class CheckboxExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }

  handleChange = (checked, value, event) => { // eslint-disable-line no-unused-vars
    this.setState({ checked });
  };

  render() {
    return (
      <div className="text-container">
        <h4>Todos</h4>
        <Checkbox
          defaultChecked
          label="Open checkbox documentation page"
        />
        <Checkbox label="Read laterial design specs" />
        <Checkbox label="achieve 100% cross-browser compatibility" disabled />
        <Checkbox
          label="Favorite this!"
          checked={this.state.checked}
          onChange={this.handleChange}
          checkedIcon={<FontIcon>favorite</FontIcon>}
          uncheckedIcon={<FontIcon>favorite_border</FontIcon>}
          value="favorite"
        />
      </div>
    );
  }
}
