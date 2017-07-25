import React from 'react';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';

const Simple = () => (
  <TabsContainer panelClassName="md-grid" colored>
    <Tabs tabId="simple-tab">
      <Tab label="Tab one">
        <h3>Hello, World!</h3>
      </Tab>
      <Tab label="Tab two">
        <h3>Now look at me!</h3>
      </Tab>
    </Tabs>
  </TabsContainer>
);

export default Simple;
