import React, { PureComponent } from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import Autocomplete from 'react-md/lib/Autocompletes';

import pastries from 'constants/pastries';

export default class SearchToolbarExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      value: '',
    };

    this._showSearch = this._showSearch.bind(this);
    this._hideSearch = this._hideSearch.bind(this);
    this._resetSearch = this._resetSearch.bind(this);
    this._handleSearchChange = this._handleSearchChange.bind(this);
  }

  _showSearch() {
    this.setState({ searching: true });
  }

  _hideSearch() {
    this.setState({ searching: false });
  }

  _resetSearch() {
    this.setState({ value: '' });
  }

  _handleSearchChange(value) {
    this.setState({ value });
  }

  render() {
    const { searching } = this.state;

    let nav;
    let title;
    let actions;
    let children;
    if (searching) {
      nav = <Button onClick={this._hideSearch} icon>arrow_back</Button>;
      actions = <Button onClick={this._resetSearch} icon>close</Button>;
      children = (
        <Autocomplete
          id="searchExamle"
          placeholder="Search Pastries"
          block
          paddedBlock={false}
          fullWidth
          data={pastries}
          value={this.state.value}
          onAutocomplete={this._handleSearchChange}
          onChange={this._handleSearchChange}
          containerStyle={{ flexGrow: 1 }}
          className="md-title--toolbar"
        />
      );
    } else {
      nav = <Button icon>menu</Button>;
      title = 'Pastries';
      actions = <Button onClick={this._showSearch} icon>search</Button>;
    }


    return (
      <Toolbar
        colored
        nav={nav}
        actions={actions}
        title={title}
      >
        {children}
      </Toolbar>
    );
  }
}
