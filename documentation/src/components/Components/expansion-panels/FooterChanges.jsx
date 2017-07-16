import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import loremIpsum from 'lorem-ipsum';

import PhoneEmulator from 'components/PhoneEmulator';


const CustomFooter = () => (
  <footer style={{ padding: 24 }}>
    <p>This is some custom stuff I want in the footer.</p>
  </footer>
);

const FooterChanges = ({ mobile }) => (
  <PhoneEmulator mobileOnly contentClassName={cn({ 'md-grid': mobile })}>
    <ExpansionList className={cn({ 'md-cell md-cell--12': mobile })}>
      <ExpansionPanel label="This one has no footer" footer={null}>
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
      </ExpansionPanel>
      <ExpansionPanel label="This one has a custom footer" footer={<CustomFooter />}>
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
      </ExpansionPanel>
      <ExpansionPanel
        label="This one updated the button props"
        saveProps={{
          flat: false,
          raised: true,
          iconChildren: 'save',
        }}
        cancelProps={{
          flat: false,
          raised: true,
          iconChildren: 'cancel',
        }}
      >
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
      </ExpansionPanel>
    </ExpansionList>
  </PhoneEmulator>
);

FooterChanges.propTypes = {
  mobile: PropTypes.bool,
};

export default connect(({ media: { mobile } }) => ({ mobile }))(FooterChanges);
