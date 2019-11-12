import React from 'react';
import {
  AccessibleFakeButton,
  AccessibleFakeInkedButton,
} from 'react-md';

import './_styles.scss';

const Simple = () => (
  <div>
    <AccessibleFakeButton className="fakey-fake md-btn md-btn--flat md-color--secondary" tabbedClassName="fakey-fake--outline">
      Something or Another
    </AccessibleFakeButton>
    <AccessibleFakeButton className="fakey-fake md-btn md-text--disabled" disabled>
      I am disabled
    </AccessibleFakeButton>
    <AccessibleFakeInkedButton className="fakey-fake md-btn md-btn--raised md-background--secondary">
      Wow!
    </AccessibleFakeInkedButton>
    <AccessibleFakeInkedButton className="fakey-fake md-text--disabled " disabled>
      No way!
    </AccessibleFakeInkedButton>
  </div>
);

export default Simple;
