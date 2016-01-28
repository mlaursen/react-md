import React from 'react';
import FontIcon from 'react-md/FontIcons';
import { Tabs, Tab } from 'react-md/Tabs';

import FakePhone from '../../FakePhone';

export default function PhoneExample() {
  return (
    <div className="fake-phone-container">
      <FakePhone
        primary
        title="Page title"
        rightIcon={<FontIcon>more_vert</FontIcon>}
        withTabs={true}
        >
        <Tabs primary fixedWidth>
          <Tab
            icon={<FontIcon>phone</FontIcon>}
            label="Recents"
          >
            <div style={{ minHeight: 360 }} />
          </Tab>
          <Tab
            icon={<FontIcon>favorite</FontIcon>}
            label="Favorites"
          >
            <div />
          </Tab>
          <Tab
            icon={<FontIcon>person_pin</FontIcon>}
            label="Near by"
          >
            <div />
          </Tab>
        </Tabs>
      </FakePhone>
    </div>
  );
}
