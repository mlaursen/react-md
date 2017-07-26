import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import CloseEmulator from 'components/PhoneEmulator/CloseEmulator';

const AppToolbar = () => (
  <Toolbar
    title="Page Title"
    nav={<CloseEmulator icon>arrow_back</CloseEmulator>}
    actions={[
      <Button icon>search</Button>,
      <Button icon>more_vert</Button>,
    ]}
  />
);
export default AppToolbar;
