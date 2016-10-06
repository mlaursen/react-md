/* eslint-disable react/jsx-no-bind,jsx-a11y/href-no-hash */
import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import FontIcon from 'react-md/lib/FontIcons';
import Chip from 'react-md/lib/Chips';
import Autocomplete from 'react-md/lib/Autocompletes';

import vacationSpots from 'constants/vacationSpots';

export default class DestinationsPanel extends PureComponent {
  static propTypes = {
    // These two props get injected from `ExpansionList`. You need to
    // inject them into the `ExpansionPanel` to get correct styling and
    // keyboard accessibility
    focused: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
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
    const { focused, columnWidths } = this.props;
    return (
      <ExpansionPanel
        focused={focused}
        columnWidths={columnWidths}
        label="Location"
        secondaryLabel={<span className="dot-overflow">{destinations.join(', ')}</span>}
        expandedSecondaryLabel={(
          <div className="icon-separator">
            <span className="text">Select trip destination</span>
            <FontIcon>info_outline</FontIcon>
          </div>
        )}
        onSave={this._setDestinations}
        onCancel={this._resetDestinations}
      >
        <div className="destination-content">
          <CSSTransitionGroup
            className="destinations"
            component="div"
            transitionName="upload"
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
          >
            {tempDestinations.map((destination, i) => (
              <Chip
                key={destination}
                label={destination}
                remove={this._remove.bind(this, i)}
              />
            ))}
            <Autocomplete
              id="destinations"
              label="Search for a destination"
              onAutocomplete={this._addDestination}
              clearOnAutocomplete
              data={filteredVacationSpots}
              containerClassName="align-end"
            />
          </CSSTransitionGroup>
          <div className="md-panel-secondary-label destination-info">
            Select your destination of choice.
            <a href="#" style={{ display: 'block' }}>Learn more</a>
          </div>
        </div>
      </ExpansionPanel>
    );
  }
}
