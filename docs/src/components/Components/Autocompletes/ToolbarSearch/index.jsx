/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Toolbar from 'react-md/lib/Toolbars';

import ShowOnMedia from 'components/ShowOnMedia';
import PhoneEmulator from 'components/PhoneEmulator';
import CloseEmulator from 'components/PhoneEmulator/CloseEmulator';
import { randomInt } from 'utils/random';

import './_styles.scss';
import Nav from './Nav';
import Action from './Action';
import Search from './Search';
import FakeResult from './FakeResult';

export default class ToolbarSearch extends PureComponent {
  state = { searching: false, search: '', results: null };
  startSearching = () => {
    this.setState({ searching: true });
  };

  stopSearching = () => {
    this.setState({ searching: false });
  };

  clearSearch = () => {
    this.setState({ search: '' });
  };

  handleChange = (value) => {
    this.setState({ search: value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.search(this.state.search);
    }
  };

  handleAutocomplete = (value) => {
    if (this.state.search === value) {
      return;
    }

    this.search(value);
  };

  search = (value) => {
    const now = Date.now();
    const results = [...new Array(randomInt({ min: 2, max: 5 }))].map((_, i) => <FakeResult index={i} value={value} key={`${now}-${i}`} />);

    this.setState({ search: value, results });
  };

  render() {
    const { searching, search, results } = this.state;

    return (
      <PhoneEmulator toolbar={null}>
        <Toolbar
          fixed
          inset
          nav={<Nav searching={searching} onClick={this.stopSearching} />}
          actions={<Action searching={searching} onClick={this.clearSearch} />}
          title={
            <Search
              value={search}
              onFocus={this.startSearching}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onAutocomplete={this.handleAutocomplete}
            />
          }
          className="phone-emulator__toolbar md-background--card"
          zDepth={1}
        />
        <ShowOnMedia mobile>
          <CloseEmulator floating fixed secondary>
            arrow_back
          </CloseEmulator>
        </ShowOnMedia>
        <CSSTransitionGroup
          className="md-toolbar-relative md-grid toolbar-search__results"
          component="section"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          {results}
        </CSSTransitionGroup>
      </PhoneEmulator>
    );
  }
}
