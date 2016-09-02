import React, { PureComponent } from 'react';
import Fuse from 'fuse.js';

import Autocomplete from 'react-md/lib/Autocompletes';
import { RadioGroup, Radio } from 'react-md/lib/SelectionControls';

import programmingLanguages from 'constants/programmingLanguages';

export default class MenuAutocomplete extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filterType: Autocomplete.caseInsensitiveFilter,
    };
  }

  _fuse = new Fuse(programmingLanguages.map(pl => ({ primaryText: pl })), {
    keys: [{ name: 'primaryText', weight: 1 }],
  });

  /**
   * A custom filter function to use if the default `caseInsensitiveFilter`
   * or `fuzzyFilter` are not precise enough. This example uses
   * [fuse.js](https://github.com/krisk/Fuse)
   *
   * @param {Array<Object|String|Number>} data - The unfiltered array of datum.
   * @param {String} filterText - The current value of the text to use for filtering.
   * @param {String} dataLabel - The object key to use to extract the label for filtering
   *      a datum object.
   * @return {Array} the filtered/sorted array of data.
   */
  _fuseJSFilter = (data, filterText, dataLabel) => { //eslint-disable-line
    return this._fuse.search(filterText);
  };

  _handleFilterChange = (value) => {
    let filterType;
    switch (value) { // eslint-disable-line default-case
      case 'case':
        filterType = Autocomplete.caseInsensitiveFilter;
        break;
      case 'fuzzy':
        filterType = Autocomplete.fuzzyFilter;
        break;
      case 'fuse':
        filterType = this._fuseJSFilter;
        break;
    }

    this.setState({ filterType });
  };

  render() {
    const { filterType } = this.state;
    return (
      <div>
        <RadioGroup name="filterType" onChange={this._handleFilterChange}>
          <Radio value="case" label="Case Insensitive Filter" />
          <Radio value="fuzzy" label="Fuzzy Filter" />
          <Radio value="fuse" label="Fuse Filter (3rd party lib)" />
        </RadioGroup>
        <Autocomplete
          id="programmingLanguages"
          label="Type a programming language"
          data={programmingLanguages}
          filter={filterType}
          fullWidth
        />
      </div>
    );
  }
}
