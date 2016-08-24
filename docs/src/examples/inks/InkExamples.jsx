import React from 'react';

import TerriblyInaccessibleFakeButton from './TerriblyInaccessibleFakeButton';

const InkExamples = () => (
  <div>
    <TerriblyInaccessibleFakeButton>Click me!</TerriblyInaccessibleFakeButton>
    <TerriblyInaccessibleFakeButton tabIndex={0}>Keyboard focus me!</TerriblyInaccessibleFakeButton>
    <TerriblyInaccessibleFakeButton disabled>Click me!</TerriblyInaccessibleFakeButton>
  </div>
);

export default InkExamples;
