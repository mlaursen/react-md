import React, { PropTypes, PureComponent } from 'react';

import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel';
import TextField from 'react-md/lib/TextFields';

export default class TripNamePanel extends PureComponent {
  static propTypes = {
    // These two props get injected from `ExpansionList`. You need to
    // inject them into the `ExpansionPanel` to get correct styling and
    // keyboard accessibility
    focused: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),

    tablet: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    const name = 'Caribbean Cruise';
    this.state = {
      name,
      tempName: name,
    };
  }

  _saveName = () => {
    this.setState({ name: this.state.tempName });
  };

  _resetName = () => {
    this.setState({ tempName: this.state.name });
  };

  _handleChange = (tempName) => {
    this.setState({ tempName });
  };

  render() {
    const { name, tempName } = this.state;
    const { columnWidths, focused, tablet } = this.props;

    return (
      <ExpansionPanel
        focused={focused}
        columnWidths={columnWidths}
        label="Trip name"
        secondaryLabel={tablet ? name : null}
        onSave={this._saveName}
        onCancel={this._resetName}
      >
        <TextField
          id="tripName"
          label="Trip name"
          value={tempName}
          onChange={this._handleChange}
          maxLength={80}
        />
      </ExpansionPanel>
    );
  }
}
