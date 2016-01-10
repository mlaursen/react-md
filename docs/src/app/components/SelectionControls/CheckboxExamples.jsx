import React, { Component } from 'react';
import { Checkbox } from 'react-md/SelectionControls';
import FontIcon from 'react-md/FontIcon';

export default class CheckboxExamples extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: false, value: 'favorite' };
  }

  render() {
    return (
      <div>
        <h4>todos</h4>
        <Checkbox defaultChecked={true} label="open checkbox documentation page" />
        <Checkbox label="read material design specs" />
        <Checkbox disabled label="manage perfect cross-browser compatibility for all versions" />
        <Checkbox
          label="Favorite this!"
          className="favorite-checkbox"
          value={this.state.value}
          checked={this.state.checked}
          onChange={(checked, value, e) => this.setState({ checked, value })}
          checkedIcon={<FontIcon>favorite</FontIcon>}
          uncheckedIcon={<FontIcon>favorite_border</FontIcon>}
        />
      </div>
    );
  }
}
