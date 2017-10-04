import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Autocomplete,
  Button,
  List,
  ListItem,
  Toolbar,
} from 'react-md';

import pastries from 'constants/sampleData/pastries';
import PhoneEmulator from 'components/PhoneEmulator';
import CloseEmulator from 'components/PhoneEmulator/CloseEmulator';

const pastryData = pastries.map((pastry, i) => ({
  key: `pastry-${i}`,
  name: pastry,
}));

@connect(({ media: { mobile } }) => ({ mobile }))
export default class FixedToolbar extends PureComponent {
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

  handleAutocomplete = (id, index, matches) => {
    const toolbar = document.getElementById('fixed-toolbar-example');
    const item = document.getElementById(id);
    if (!item || !toolbar) {
      return;
    }

    let scrollTop = item.offsetTop - toolbar.offsetHeight;
    let scrollContainer = null;
    if (this.props.mobile) {
      scrollContainer = document.getElementById('phone-emulator-demo');
    } else {
      scrollContainer = toolbar.parentNode;
      scrollTop -= scrollContainer.parentNode.querySelector('header').offsetHeight;
    }

    scrollContainer.scrollTop = scrollTop;
    this.setState({ value: matches[index].name });
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
          dataValue="key"
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
          id="fixed-toolbar-example"
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
          {pastryData.map(({ name, key }) => <ListItem key={key} id={key} primaryText={name} />)}
        </List>
        {this.props.mobile && <CloseEmulator floating fixed>close</CloseEmulator>}
      </PhoneEmulator>
    );
  }
}
