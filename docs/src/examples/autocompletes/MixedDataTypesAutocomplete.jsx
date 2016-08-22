import React, { PureComponent } from 'react';
import { findIndex } from 'lodash/array';

import Autocomplete from 'react-md/lib/Autocompletes';
import Subheader from 'react-md/lib/Subheaders';

import programmingLanguages from 'constants/programmingLanguages';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default class MixedDataTypesAutocomplete extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  // Filters the programming languages and then injects Subheaders for each letter block.
  _filterAndInjectHeaders = (filterText = '') => {
    if (!filterText) { return []; }

    const filtered = Autocomplete.fuzzyFilter(programmingLanguages, filterText);
    LETTERS.forEach(l => {
      const i = findIndex(filtered, pl => typeof pl.charAt === 'function' && pl.charAt(0).toUpperCase() === l);
      if (i >= 0) {
        filtered.splice(i, 0, <Subheader key={`subheader-${l}`} primary primaryText={l} />);
      }
    });

    return filtered;
  };

  _handleChange = filterText => this.setState({ data: this._filterAndInjectHeaders(filterText) });

  render() {
    return (
      <Autocomplete
        label="Type a programming language"
        data={this.state.data}
        filter={null}
        onChange={this._handleChange}
        fullWidth
        onAutocomplete={this._handleChange}
      />
    );
  }
}
