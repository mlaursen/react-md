import React, { PureComponent } from 'react';
import Autocomplete from 'react-md/lib/Autocompletes';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import Dialog from 'react-md/lib/Dialogs';

import states from 'constants/states';
import randomAvatars from 'utils/RandomUtils/randomAvatars';
import CloseButton from 'components/PhoneSizeDemo/ClosePhoneSizeDemoButton';
import ItemList from './ItemList';


const avatars = randomAvatars(states.length);
const data = states.map(({ name }, i) => ({ name, rightAvatar: avatars[i] }));

export default class InToolbarExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { value: '', visible: false };
  }

  _open = () => {
    this.setState({ visible: true });
  };

  _close = () => {
    this.setState({ visible: false });
  };

  _handleChange = (value) => {
    this.setState({ value });
  };

  _reset = () => {
    this.setState({ value: '' });
  };

  render() {
    const { visible, value } = this.state;

    return (
      <div className="md-text-container">
        <Button label="Open Toolbar Example" onClick={this._open} raised secondary />
        <Dialog
          id="autocomplete-toolbar-examples"
          aria-label="Autocomplete in a Toolbar Example"
          fullPage
          visible={visible}
          onHide={this._close}
        >
          <Toolbar
            colored
            fixed
            nav={<CloseButton icon onClick={this._close} />}
            actions={<Button icon onClick={this._reset}>close</Button>}
          >
            <Autocomplete
              id="searchPeople"
              placeholder="Search"
              data={data}
              dataLabel="name"
              value={value}
              onChange={this._handleChange}
              onAutocomplete={this._handleChange}
              block
              className="md-title--toolbar"
              inputClassName="md-text-field--toolbar"
            />
          </Toolbar>
          <ItemList />
        </Dialog>
      </div>
    );
  }
}
