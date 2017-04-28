import React, { PureComponent } from 'react';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
// or
// import { Checkbox } from 'react-md/lib/SelectionControls';

export default class StatefulExample extends PureComponent {
  state = { checked: false };

  _handleChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    const { checked } = this.state;

    return (
      <div className="text-container">
        <p>Wow, you have {checked ? '' : 'not '} checked the Checkbox!</p>
        <Checkbox
          id="favorite"
          name="favorite"
          label="Favorite this!"
          checked={checked}
          onChange={this._handleChange}
          checkedIconChildren="favorite"
          uncheckedIconChildren="favorite_border"
          value="favorite"
        />
      </div>
    );
  }
}
