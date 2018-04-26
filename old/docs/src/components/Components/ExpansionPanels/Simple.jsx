import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { ExpansionList, ExpansionPanel, Slider } from 'react-md';
import loremIpsum from 'lorem-ipsum';

import PhoneEmulator from 'components/PhoneEmulator';

const Simple = ({ mobile }) => (
  <PhoneEmulator mobileOnly contentClassName={cn({ 'md-grid': mobile })}>
    <ExpansionList className={cn({ 'md-cell md-cell--12': mobile })}>
      <ExpansionPanel label="Main label" secondaryLabel="Secondary label" defaultExpanded>
        <p>Any content can go in here. This will be visible when it has been expanded.</p>
        <Slider id="expansion-slider" />
      </ExpansionPanel>
      <ExpansionPanel label="Another label">
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
      </ExpansionPanel>
      <ExpansionPanel label="Once More!" secondaryLabel="Okie dokie. If you insist">
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
      </ExpansionPanel>
    </ExpansionList>
  </PhoneEmulator>
);

Simple.propTypes = {
  mobile: PropTypes.bool,
};

export default connect(({ media: { mobile } }) => ({ mobile }))(Simple);
