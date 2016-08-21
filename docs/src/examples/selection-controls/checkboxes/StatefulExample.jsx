import React, { PureComponent } from 'react';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import FontIcon from 'react-md/lib/FontIcons';
// or
// import { Checkbox } from 'react-md/lib/SelectionControls';

export default class StatefulExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const { checked } = this.state;

    return (
      <div className="text-container">
        <p>Wow, you have {checked ? '' : 'not '} checked the Checkbox!</p>
        <Checkbox
          label="Favorite this!"
          checked={checked}
          onChange={this._handleChange}
          checkedIcon={<FontIcon>favorite</FontIcon>}
          uncheckedIcon={<FontIcon>favorite_border</FontIcon>}
          value="favorite"
        />
      </div>
    );
  }
}
