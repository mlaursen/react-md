import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from 'react-md';

import states from 'constants/sampleData/states';

const data = states.map(({ name }) => name);

export default class Search extends PureComponent {
  static propTypes = {
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onAutocomplete: PropTypes.func,
    value: PropTypes.string,
  };

  state = { filteredData: [] };

  /**
   * This custom filter will take the current value and return all matches that start
   * with the value ignoring case and then bold the letters in the search results that
   * match.
   */
  filter = (value) => {
    const r = new RegExp(`^${value}`, 'i');
    const l = value.length;
    const filteredData = data.reduce((matches, state) => {
      if (r.test(state)) {
        matches.push({
          label: [
            <span key="bold" className="md-font-bold">{state.substring(0, l)}</span>,
            state.substring(l),
          ],
          value: state,
        });
      }

      return matches;
    }, []);

    this.setState({ filteredData });
  };

  handleChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.filter(value);
  };

  handleAutocomplete = (value) => {
    if (this.props.onAutocomplete) {
      this.props.onAutocomplete(value);
    }

    this.filter(value);
  };

  render() {
    const { filteredData } = this.state;
    return (
      <Autocomplete
        {...this.props}
        id="toolbar-search"
        className="toolbar-search"
        type="search"
        data={filteredData}
        placeholder="Search"
        customSize="search"
        filter={null}
        onChange={this.handleChange}
        onAutocomplete={this.handleAutocomplete}
        block
        dataLabel="label"
        dataValue="value"
        listClassName="toolbar-search__list"
      />
    );
  }
}
