import React, { PureComponent } from 'react';
import Fuse from 'fuse.js';
import Autocomplete from 'react-md/lib/Autocompletes';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';

import { programmingLanguages as sampleData } from 'constants/sampleData';

const controls = [{
  label: 'Case Insensitive Filter',
  value: 'caseInsensitiveFilter',
}, {
  label: 'Fuzzy Filter',
  value: 'fuzzyFilter',
}, {
  label: 'Fuse Filter (3rd party lib)',
  value: 'fuze.js',
}];

export default class MenuAutocomplete extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filterType: Autocomplete.caseInsensitiveFilter,
    };

    this.indexer = new Fuse(sampleData.map(lang => ({ primaryText: lang })), {
      keys: [{ name: 'primaryText', weight: 1 }],
    });
  }

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
  filterWithFuseJS = (data, filterText, dataLabel) => { // eslint-disable-line no-unused-vars, arrow-body-style
    return this.indexer.search(filterText);
  };

  handleChange = (value) => {
    let { filterType } = this.state;
    switch (value) {
      case controls[0].value:
        filterType = Autocomplete.caseInsensitiveFilter;
        break;
      case controls[1].value:
        filterType = Autocomplete.fuzzyFilter;
        break;
      case controls[2].value:
        filterType = this.filterWithFuseJS;
        break;
      default:
        filterType = Autocomplete.caseInsensitiveFilter;
    }

    if (this.state.filterType !== filterType) {
      this.setState({ filterType });
    }
  };

  render() {
    const { filterType } = this.state;

    return (
      <div>
        <SelectionControlGroup
          id="filter-type"
          name="autocomplete-filter-type"
          type="radio"
          onChange={this.handleChange}
          controls={controls}
        />
        <Autocomplete
          id="programming-languages"
          label="Programming languages"
          placeholder="Javascript"
          data={sampleData}
          filter={filterType}
        />
      </div>
    );
  }
}
