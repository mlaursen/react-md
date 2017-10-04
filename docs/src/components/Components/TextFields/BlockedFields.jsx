import React, { PureComponent } from 'react';
import {
  Avatar,
  Autocomplete,
  Button,
  Chip,
  Divider,
  TextField,
} from 'react-md';
import guid from 'uuid/v1';

import { randomImage } from 'utils/random';
import PhoneEmulator from 'components/PhoneEmulator';

import './_blocked-styles.scss';

const sendMail = <Button icon>send</Button>;
const contacts = [
  'Albert Brady',
  'Barbara Butler',
  'Benny Warren',
  'Brad Briggs',
  'Brent Allen',
  'Carrie Tyler',
  'Christian Adams',
  'Darrel Mckenzie',
  'Edward Castro',
  'Elsa Mack',
  'Gregg Pearson',
  'Janet Goodwin',
  'Jeanne Hayes',
  'Juan Mccarthy',
  'Julia Robertson',
  'Lola Stephens',
  'Lori Jones',
  'Mable Santiago',
  'Marcia Mills',
  'Margaret Stevenson',
  'Maxine Wilkerson',
  'Randal Newton',
  'Roxanne Ryan',
  'Sergio Hansen',
  'Willie Dawson',
].map(contact => ({
  leftAvatar: <Avatar src={randomImage()} alt={`${contact}'s avatar`} />,
  primaryText: contact,
}));

const defaultBody = `Hi,
I just wanted to check in and see if you had any plans this upcoming weekend. ` +
  'We are thinking of heading up to Napa. Let us know if you\'d like to go and ' +
  'we\'ll make reservations.';

export default class BlockedFields extends PureComponent {
  state = {
    selected: [{
      key: 'initial-1',
      label: 'Freddy Kruger',
      avatar: <Avatar src={randomImage()} alt="Freddy Kruger's avatar" />,
    }, {
      key: 'initial-2',
      label: 'Bob Belcher',
      avatar: <Avatar src={randomImage()} alt="Bob Belcher's avatar" />,
    }],
  };

  selectContact = (name, i, matches) => {
    const contact = matches[i];
    const selected = this.state.selected.slice();
    selected.push({ label: name, avatar: contact.leftAvatar, key: guid() });
    this.setState({ selected });
  };

  removeContact = (i) => {
    const selected = this.state.selected.slice();
    selected.splice(i, 1);
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;
    let selectedContacts = null;
    if (selected.length) {
      selectedContacts = (
        <div className="text-fields__contacts">
          {selected.map((contact, i) => (
            <Chip
              {...contact}
              className="text-fields__contact-chip"
              removable
              onClick={() => this.removeContact(i)}
            />
          ))}
        </div>
      );
    }

    return (
      <PhoneEmulator transitionContent={false} toolbarActions={sendMail}>
        {selectedContacts}
        <Autocomplete
          id="email-to"
          type="email"
          data={contacts}
          placeholder="To"
          block
          paddedBlock
          onAutocomplete={this.selectContact}
          clearOnAutocomplete
        />
        <Divider />
        <TextField
          id="email-subject"
          placeholder="Subject"
          block
          paddedBlock
          maxLength={80}
          defaultValue="Plans for the weekend"
        />
        <Divider />
        <TextField
          id="email-body"
          placeholder="Body"
          block
          rows={4}
          paddedBlock
          maxLength={1000}
          defaultValue={defaultBody}
          errorText="Max 1000 characters."
        />
      </PhoneEmulator>
    );
  }
}
