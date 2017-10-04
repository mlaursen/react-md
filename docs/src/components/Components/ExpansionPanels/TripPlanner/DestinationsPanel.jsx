/* eslint-disable jsx-a11y/href-no-hash */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
  Autocomplete,
  Chip,
  ExpansionPanel,
  FontIcon,
  IconSeparator,
} from 'react-md';

import vacationSpots from 'constants/sampleData/vacationSpots';

export default class DestinationsPanel extends PureComponent {
  static propTypes = {
    // Notice these three props. They are injected via the `ExpansionList` component
    // and are required to get correct styling and keyboard accessibility.
    focused: PropTypes.bool,
    overflown: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
  };

  state = {
    destinations: ['Barbados'],
    tempDestinations: ['Barbados'],
    filteredVacationSpots: vacationSpots.filter(spot => spot !== 'Barbados'),
  };

  filter = toRemove => vacationSpots.filter(spot => toRemove.indexOf(spot) === -1);

  addDestination = (destination) => {
    const tempDestinations = [...this.state.tempDestinations, destination];
    const filteredVacationSpots = this.filter(tempDestinations);
    this.setState({ tempDestinations, filteredVacationSpots });
  };

  removeDestination = (i) => {
    const tempDestinations = this.state.tempDestinations.slice();
    tempDestinations.splice(i, 1);
    this.setState({ tempDestinations });
  };

  save = () => {
    this.setState({ destinations: this.state.tempDestinations });
  };

  cancel = () => {
    this.setState({ tempDestinations: this.state.destinations });
  };

  render() {
    const { destinations, tempDestinations, filteredVacationSpots } = this.state;

    return (
      <ExpansionPanel
        {...this.props}
        label="Location"
        secondaryLabel={destinations.join(', ')}
        expandedSecondaryLabel={(
          <IconSeparator label="Select trip destination">
            <FontIcon>info_outline</FontIcon>
          </IconSeparator>
        )}
        contentClassName="md-grid"
        onSave={this.save}
        onCancel={this.cancel}
      >
        <CSSTransitionGroup
          component="div"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          className="md-cell md-cell--7 md-cell--5-tablet"
        >
          {tempDestinations.map((destination, i) => (
            <Chip
              key={destination}
              label={destination}
              onClick={() => this.removeDestination(i)}
              removable
            />
          ))}
          <Autocomplete
            id="trip-destinations-search"
            label="Search for a destination"
            type="search"
            onAutocomplete={this.addDestination}
            clearOnAutocomplete
            data={filteredVacationSpots}
          />
        </CSSTransitionGroup>
        <div className="md-cell md-cell--5 md-cell--3-tablet md-panel-secondary-label">
          Select your destination of choice.
          <a href="#" className="link link--block">Learn more</a>
        </div>
      </ExpansionPanel>
    );
  }
}
