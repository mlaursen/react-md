import React, { PureComponent } from 'react';
import Autocomplete from 'react-md/lib/Autocompletes';
// import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import states from 'constants/states';
import randomAvatars from 'utils/RandomUtils/randomAvatars';
import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import CloseButton from 'components/PhoneSizeDemo/ClosePhoneSizeDemoButton';
import ItemList from './ItemList';


const avatars = randomAvatars(states.length);
const data = states.map(({ name }, i) => ({ name, rightAvatar: avatars[i] }));

export default class InToolbarExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { value: '' };
    this._reset = this._reset.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(value) {
    this.setState({ value });
  }

  _reset() {
    this.setState({ value: '' });
  }

  render() {
    return (
      <PhoneSizeDemo toolbar={false}>
        <Toolbar
          colored
          fixed
          nav={<CloseButton icon />}
          actions={<Button icon onClick={this._reset}>close</Button>}
        >
          <Autocomplete
            id="searchPeople"
            placeholder="Search"
            data={data}
            dataLabel="name"
            value={this.state.value}
            onChange={this._handleChange}
            onAutocomplete={this._handleChange}
            block
            className="md-title--toolbar"
            inputClassName="md-text-field--toolbar"
          />
        </Toolbar>
        <ItemList />
      </PhoneSizeDemo>
    );
  }
}
