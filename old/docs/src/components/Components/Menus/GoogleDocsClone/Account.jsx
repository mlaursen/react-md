import React from 'react';
import { FontIcon, AccessibleFakeButton, IconSeparator } from 'react-md';

const Account = () => (
  <AccessibleFakeButton
    id="google-docs-account"
    component={IconSeparator}
    label="some.email@gmail.com"
    className="menus__google-docs__account md-cell--right md-toolbar--action-right"
    tabbedClassName="md-btn--hover"
  >
    <FontIcon>arrow_drop_down</FontIcon>
  </AccessibleFakeButton>
);

export default Account;
