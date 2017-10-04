import React from 'react';
import { Button, Toolbar } from 'react-md';

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
