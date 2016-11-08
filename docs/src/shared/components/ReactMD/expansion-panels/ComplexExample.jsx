import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList';

import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import TripNamePanel from './TripNamePanel';
import DestinationsPanel from './DestinationsPanel';
import TravelDatesPanel from './TravelDatesPanel';
import CarrierPanel from './CarrierPanel';
import MealPreferencesPanel from './MealPreferencesPanel';

import './_expansion-panels.scss';

const ComplexExample = ({ mobile }) => (
  <PhoneSizeDemo mobileOnly>
    <ExpansionList style={{ padding: 16 }}>
      <TripNamePanel mobile={mobile} />
      <DestinationsPanel mobile={mobile} />
      <TravelDatesPanel mobile={mobile} />
      <CarrierPanel mobile={mobile} />
      <MealPreferencesPanel mobile={mobile} />
    </ExpansionList>
  </PhoneSizeDemo>
);

ComplexExample.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

export default connect(({ ui: { drawer: { mobile } } }) => ({ mobile }))(ComplexExample);
