import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';

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
