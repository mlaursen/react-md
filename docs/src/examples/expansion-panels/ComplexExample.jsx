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

const ComplexExample = ({ tablet }) => (
  <PhoneSizeDemo mobileOnly>
    <ExpansionList style={{ padding: 16 }}>
      <TripNamePanel tablet={tablet} />
      <DestinationsPanel tablet={tablet} />
      <TravelDatesPanel tablet={tablet} />
      <CarrierPanel tablet={tablet} />
      <MealPreferencesPanel tablet={tablet} />
    </ExpansionList>
  </PhoneSizeDemo>
);

ComplexExample.propTypes = {
  tablet: PropTypes.bool.isRequired,
};

export default connect(({ ui: { media: { tablet } } }) => ({ tablet }))(ComplexExample);
