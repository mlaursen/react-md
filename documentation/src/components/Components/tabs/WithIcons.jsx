import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import { TabsContainer, Tabs, Tab } from 'react-md/lib/Tabs';
import Toolbar from 'react-md/lib/Toolbars';

import PhoneEmulator from 'components/PhoneEmulator';
import CloseEmulator from 'components/PhoneEmulator/CloseEmulator';

const AppToolbar = () => (
  <Toolbar
    title="Page Title"
    nav={<CloseEmulator icon>arrow_back</CloseEmulator>}
    colored
    actions={[
      <Button icon>search</Button>,
      <Button icon>more_vert</Button>,
    ]}
  />
);

const WithIcons = () => (
  <PhoneEmulator toolbar={false}>
    <TabsContainer colored toolbar={<AppToolbar />}>
      <Tabs tabId="phone-stuffs">
        <Tab label="Recents" icon={<FontIcon>phone</FontIcon>}>
          <h3>This is the Recents tab.</h3>
        </Tab>
        <Tab label="Favorites" icon={<FontIcon forceSize>favorites</FontIcon>}>
          <h3>This is the Favorites tab.</h3>
        </Tab>
        <Tab label="Nearby" icon={<FontIcon>person</FontIcon>}>
          <h3>This is the Nearby tab.</h3>
        </Tab>
      </Tabs>
    </TabsContainer>
  </PhoneEmulator>
);
export default WithIcons;
