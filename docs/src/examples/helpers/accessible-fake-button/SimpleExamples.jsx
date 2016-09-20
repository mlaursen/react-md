import React from 'react';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';
import AccessibleFakeInkedButton from 'react-md/lib/Helpers/AccessibleFakeInkedButton';

import './_fake.scss';

const SimpleExamples = () => (
  <div>
    <AccessibleFakeButton className="fakey-fake md-btn md-btn--flat md-color--secondary">
      Something or Another
    </AccessibleFakeButton>
    <AccessibleFakeButton className="fakey-fake md-btn md-color--disabled" disabled>
      I am disabled
    </AccessibleFakeButton>
    <AccessibleFakeInkedButton className="fakey-fake md-btn md-btn--raised md-background--secondary">
      Wow!
    </AccessibleFakeInkedButton>
    <AccessibleFakeInkedButton className="fakey-fake md-color--disabled " disabled>
      No way!
    </AccessibleFakeInkedButton>
  </div>
);

export default SimpleExamples;
