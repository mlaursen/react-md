import React from 'react';
import FontIcon from 'react-md/FontIcon';
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
        <Tabs primary>
          <Tab
            icon={<FontIcon>phone</FontIcon>}
            label="Recents"
          />
          <Tab
            icon={<FontIcon>favorite</FontIcon>}
            label="Favorites"
          />
          <Tab
            icon={<FontIcon>person_pin</FontIcon>}
            label="Near by"
          />
        </Tabs>
      </FakePhone>
    </div>
  );
}
