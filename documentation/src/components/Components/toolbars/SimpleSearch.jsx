import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Autocomplete from 'react-md/lib/Autocompletes';
import Button from 'react-md/lib/Buttons/Button';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Toolbar from 'react-md/lib/Toolbars';

import pastries from 'constants/sampleData/pastries';
import PhoneEmulator from 'components/PhoneEmulator';
import CloseEmulator from 'components/PhoneEmulator/CloseEmulator';

const pastryData = pastries.map((pastry, i) => ({
  id: `pastry-${i}`,
  name: pastry,
}));

@connect(({ media: { mobile } }) => ({ mobile }))
export default class SimpleSearch extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool,
  };

  state = { value: '', searching: false };

  handleNavClick = () => {
    this.setState({ searching: false });
  };

  handleActionClick = () => {
    if (this.state.searching) {
      this.setState({ value: '' });
    } else {
      this.setState({ searching: true });
    }
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  handleAutocomplete = (id) => {
    const item = document.getElementById(id);
    if (item) {
      console.log(item.parentNode.parentNode);
    }
    this.setState({ value: '' });
  };

  render() {
    const { searching, value } = this.state;

    let title = 'Pastries';
    if (searching) {
      title = (
        <Autocomplete
          id="search-pastries"
          block
          data={pastryData}
          dataLabel="name"
          dataValue="id"
          value={value}
          onChange={this.handleChange}
          placeholder="Search pastries"
          onAutocomplete={this.handleAutocomplete}
          toolbar
          autoFocus
        />
      );
    }

    return (
      <PhoneEmulator toolbar={false}>
        <Toolbar
          fixed
          colored
          nav={(
            <Button
              key="nav"
              icon
              onClick={searching ? this.handleNavClick : null}
            >
              {searching ? 'arrow_back' : 'menu'}
            </Button>
          )}
          actions={(
            <Button
              key="action"
              icon
              onClick={this.handleActionClick}
            >
              {searching ? 'close' : 'search'}
            </Button>
          )}
          title={title}
          titleId="search-pastries"
          className="phone-emulator__toolbar"
        />
        <List className="md-toolbar-relative">
          {pastryData.map(({ name, id }) => <ListItem key={id} primaryText={name} id={id} />)}
        </List>
        {this.props.mobile && <CloseEmulator floating fixed>close</CloseEmulator>}
      </PhoneEmulator>
    );
  }
}
