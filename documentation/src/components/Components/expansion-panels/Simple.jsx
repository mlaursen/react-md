import React from 'react';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import Slider from 'react-md/lib/Sliders';
import loremIpsum from 'lorem-ipsum';

import PhoneEmulator from 'components/PhoneEmulator';

const Simple = () => (
  <PhoneEmulator mobileOnly>
    <ExpansionList>
      <ExpansionPanel label="Main label" secondaryLabel="Secondary label" defaultExpanded>
        <p>Any content can go in here. This will be visible when it has been expanded.</p>
        <Slider id="expansion-slider" />
      </ExpansionPanel>
      <ExpansionPanel label="Another label">
        <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
      </ExpansionPanel>
    </ExpansionList>
  </PhoneEmulator>
);

export default Simple;
