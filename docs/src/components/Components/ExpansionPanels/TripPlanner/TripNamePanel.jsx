import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import TextField from 'react-md/lib/TextFields';

export default class TripNamePanel extends PureComponent {
  static propTypes = {
    // Notice these three props. They are injected via the `ExpansionList` component
    // and are required to get correct styling and keyboard accessibility.
    focused: PropTypes.bool,
    overflown: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
  };

  state = { name: 'Caribbean Cruise', tempName: 'Caribbean Cruise' };

  handleChange = (value) => {
    this.setState({ tempName: value });
  };

  save = () => {
    this.setState({ name: this.state.tempName });
  };

  cancel = () => {
    this.setState({ tempName: this.state.name });
  };

  render() {
    const { name, tempName } = this.state;
    return (
      <ExpansionPanel
        {...this.props}
        label="Trip name"
        secondaryLabel={name}
        onSave={this.save}
        onCancel={this.cancel}
      >
        <TextField
          id="trip-name"
          label="Trip name"
          value={tempName}
          onChange={this.handleChange}
          maxLength={80}
          required
          className="md-cell"
        />
      </ExpansionPanel>
    );
  }
}
