import React, { PureComponent } from 'react';
import {
  Button,
  CardActions,
  SelectionControl,
  SelectionControlGroup,
  Snackbar,
  TextField,
} from 'react-md';

import PhoneEmulator from 'components/PhoneEmulator';

import './_form-styles.scss';

const controls = [{
  label: 'My amazing store',
  value: 'MAS',
}, {
  label: 'Amazon',
  value: 'AMZ',
}, {
  label: 'A pretty terrible store',
  value: 'PTS',
}, {
  label: 'EBay',
  value: 'EBY',
}, {
  label: 'Some other store',
  value: 'SOS',
}];

export default class FormExample extends PureComponent {
  state = { toasts: [] };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.toasts.length) {
      const toasts = this.state.toasts.slice();
      toasts.push({
        text: 'Submitted new application',
        action: 'Neat!',
      });
      this.setState({ toasts });
    }
  };

  handleDismiss = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };

  render() {
    const { toasts } = this.state;

    return (
      <PhoneEmulator toolbarTitle="Application">
        <form className="md-grid text-fields__application" onSubmit={this.handleSubmit}>
          <TextField
            id="application-title"
            label="Title"
            defaultValue="Vintage 50's Dress"
            customSize="title"
            className="md-cell md-cell--12"
            required
          />
          <TextField
            id="application-price"
            label="Price"
            type="number"
            defaultValue={10}
            step={0.01}
            min={0}
            pattern="^d+(\.|\,)\d{2}"
            className="text-fields__application__price md-cell md-cell--3 md-cell--1-phone"
            required
          />
          <TextField
            id="application-location"
            label="Location (optional)"
            defaultValue="Fremont Bridge"
            className="md-cell md-cell--9 md-cell--3-phone md-cell--5-tablet"
          />
          <TextField
            id="application-description"
            label="Description"
            rows={2}
            maxRows={6}
            defaultValue="Unique and rare dress from 1952. Made out of cotton with front pockets. Sleeveless with button closures."
            className="md-cell md-cell--12"
          />
          <SelectionControl
            id="application-publish"
            type="switch"
            label="Publish immediately?"
            name="publishing"
            inline
            className="md-cell md-cell--12"
          />
          <SelectionControlGroup
            label="Publish to:"
            id="publish-to"
            name="publish-places"
            controls={controls}
            type="checkbox"
            className="md-cell md-cell--12 text-fields__application__publishes"
            defaultValue="MAS,EBY"
          />
          <CardActions className="md-cell md-cell--12">
            <Button raised primary type="submit" className="md-cell--right">Submit</Button>
          </CardActions>
        </form>
        <Snackbar id="application-toasts" toasts={toasts} onDismiss={this.handleDismiss} />
      </PhoneEmulator>
    );
  }
}
