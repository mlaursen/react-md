import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import SelectField from 'react-md/lib/SelectFields';

const carriers = [
  'The best cruise line',
  'A mediocre cruise line',
  'Ol\' Nesse',
  'The Tunts',
];

export default class CarrierPanel extends PureComponent {
  static propTypes = {
    // Notice these three props. They are injected via the `ExpansionList` component
    // and are required to get correct styling and keyboard accessibility.
    focused: PropTypes.bool,
    overflown: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
  };

  state = { carrier: carriers[0], tempCarrier: carriers[0] };

  setCarrier = (tempCarrier) => {
    this.setState({ tempCarrier });
  };

  save = () => {
    this.setState({ carrier: this.state.tempCarrier });
  };

  cancel = () => {
    this.setState({ tempCarrier: this.state.carrier });
  };

  render() {
    const { carrier, tempCarrier } = this.state;
    return (
      <ExpansionPanel
        {...this.props}
        label="Carrier"
        secondaryLabel={carrier}
        onSave={this.save}
        onCancel={this.cancel}
      >
        <SelectField
          id="trip-carriers"
          menuItems={carriers}
          label="Select a carrier"
          className="md-cell"
          value={tempCarrier}
          onChange={this.setCarrier}
        />
      </ExpansionPanel>
    );
  }
}
