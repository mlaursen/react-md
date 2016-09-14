import React, { PureComponent } from 'react';
import Fuse from 'fuse.js';

import Autocomplete from 'react-md/lib/Autocompletes';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';

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
        <SelectionControlGroup
          id="filterType"
          name="filterType"
          type="radio"
          onChange={this._handleFilterChange}
          controls={[{
            label: 'Case Insensitive Filter',
            value: 'case',
          }, {
            label: 'Fuzzy Filter',
            value: 'fuzzy',
          }, {
            label: 'Fuse Filter (3rd party lib)',
            value: 'fuse',
          }]}
        />
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
