/* eslint-disable react/jsx-no-bind,jsx-a11y/href-no-hash */
import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import FontIcon from 'react-md/lib/FontIcons';
import Chip from 'react-md/lib/Chips';
import Autocomplete from 'react-md/lib/Autocompletes';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';

import vacationSpots from 'constants/vacationSpots';

export default class DestinationsPanel extends PureComponent {
  static propTypes = {
    // These two props get injected from `ExpansionList`. You need to
    // inject them into the `ExpansionPanel` to get correct styling and
    // keyboard accessibility
    focused: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
    mobile: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    const destinations = ['Barbados'];
    this.state = {
      destinations,
      tempDestinations: destinations,
      filteredVacationSpots: vacationSpots.filter(spot => spot !== destinations[0]),
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.tempDestinations !== nextState.tempDestinations) {
      const filteredVacationSpots = nextState.tempDestinations.length
        ? vacationSpots.filter(spot => nextState.tempDestinations.indexOf(spot) === -1)
        : vacationSpots;

      this.setState({ filteredVacationSpots });
    }
  }

  _setDestinations = () => {
    this.setState({ destinations: this.state.tempDestinations });
  };

  _resetDestinations = () => {
    this.setState({ tempDestinations: this.state.destinations });
  };

  _addDestination = (destination) => {
    const tempDestinations = [...this.state.tempDestinations, destination];
    this.setState({ tempDestinations });
  };

  _remove = (i) => {
    const tempDestinations = this.state.tempDestinations.slice();
    tempDestinations.splice(i, 1);

    this.setState({ tempDestinations });
  };

  render() {
    const { destinations, tempDestinations, filteredVacationSpots } = this.state;
    const { focused, columnWidths, mobile } = this.props;

    let secondaryLabel;
    let expandedSecondaryLabel;
    if (!mobile) {
      secondaryLabel = <span className="dot-overflow">{destinations.join(', ')}</span>;
      expandedSecondaryLabel = (
        <IconSeparator label="Select trip destination">
          <FontIcon>info_outline</FontIcon>
        </IconSeparator>
      );
    }
    return (
      <ExpansionPanel
        focused={focused}
        columnWidths={columnWidths}
        label="Location"
        secondaryLabel={secondaryLabel}
        expandedSecondaryLabel={expandedSecondaryLabel}
        onSave={this._setDestinations}
        onCancel={this._resetDestinations}
        className="md-cell-md-cell--12"
        contentClassName="md-grid"
      >
        <CSSTransitionGroup
          className="md-cell md-cell--7 md-cell--5-tablet"
          component="div"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          {tempDestinations.map((destination, i) => (
            <Chip
              key={destination}
              label={destination}
              onClick={this._remove.bind(this, i)}
              removable
            />
          ))}
          <Autocomplete
            id="destinations"
            label="Search for a destination"
            onAutocomplete={this._addDestination}
            clearOnAutocomplete
            data={filteredVacationSpots}
          />
        </CSSTransitionGroup>
        <div className="md-cell md-cell--5 md-cell--3-tablet md-panel-secondary-label">
          Select your destination of choice.
          <a href="#" style={{ display: 'block' }}>Learn more</a>
        </div>
      </ExpansionPanel>
    );
  }
}
