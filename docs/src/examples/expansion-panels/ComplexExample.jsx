import React from 'react';
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList';

import TripNamePanel from './TripNamePanel';
import DestinationsPanel from './DestinationsPanel';
import TravelDatesPanel from './TravelDatesPanel';
import CarrierPanel from './CarrierPanel';
import MealPreferencesPanel from './MealPreferencesPanel';

import './_expansion-panels.scss';

const ComplexExample = () => (
  <ExpansionList>
    <TripNamePanel />
    <DestinationsPanel />
    <TravelDatesPanel />
    <CarrierPanel />
    <MealPreferencesPanel />
  </ExpansionList>
);

export default ComplexExample;
