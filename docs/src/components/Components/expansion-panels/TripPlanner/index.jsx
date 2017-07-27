import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { ExpansionList } from 'react-md/lib/ExpansionPanels';

import PhoneEmulator from 'components/PhoneEmulator';

import './_styles.scss';
import TripNamePanel from './TripNamePanel';
import DestinationsPanel from './DestinationsPanel';
import TravelDatesPanel from './TravelDatesPanel';
import CarrierPanel from './CarrierPanel';
import MealPreferencesPanel from './MealPreferencesPanel';

const TripPlanner = ({ mobile }) => (
  <PhoneEmulator mobileOnly contentClassName={cn({ 'md-grid': mobile })}>
    <ExpansionList className={cn({ 'md-cell md-cell--12': mobile })}>
      <TripNamePanel />
      <DestinationsPanel />
      <TravelDatesPanel />
      <CarrierPanel />
      <MealPreferencesPanel />
    </ExpansionList>
  </PhoneEmulator>
);

TripPlanner.propTypes = {
  mobile: PropTypes.bool,
};

export default connect(({ media: { mobile } }) => ({ mobile }))(TripPlanner);
