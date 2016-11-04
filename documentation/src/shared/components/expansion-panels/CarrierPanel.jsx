import React, { PureComponent, PropTypes } from 'react';

import SelectField from 'react-md/lib/SelectFields';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';

const carriers = [
  'The best cruise line',
  'A mediocre cruise line',
  'Ol\' Nesse',
  'The Tunts',
];

export default class CarrierPanel extends PureComponent {
  static propTypes = {
    // These two props get injected from `ExpansionList`. You need to
    // inject them into the `ExpansionPanel` to get correct styling and
    // keyboard accessibility
    focused: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),

    mobile: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      carrier: carriers[0],
      tempCarrier: carriers[0],
    };
  }

  _setTempCarrier = (tempCarrier) => {
    this.setState({ tempCarrier });
  };

  _setCarrier = () => {
    this.setState({ carrier: this.state.tempCarrier });
  };

  _resetCarrier = () => {
    this.setState({ tempCarrier: this.state.carrier });
  };

  render() {
    const { carrier, tempCarrier } = this.state;
    const { focused, columnWidths, mobile } = this.props;
    return (
      <ExpansionPanel
        focused={focused}
        columnWidths={columnWidths}
        label="Carrier"
        secondaryLabel={!mobile ? carrier : null}
        onSave={this._setCarrier}
        onCancel={this._resetCarrier}
      >
        <SelectField
          id="carriers"
          menuItems={carriers}
          label="Select a carrier"
          className="md-cell"
          value={tempCarrier}
          onChange={this._setTempCarrier}
        />
      </ExpansionPanel>
    );
  }
}
