import React from 'react';
import { Tabs, Tab } from 'react-md/lib/Tabs';
import LoremIpsum from 'components/LoremIpsum';

const SimpleExample = () => (
  <Tabs primary scrollable>
    <Tab label="Item 1">
      <LoremIpsum count={3} />
    </Tab>
    <Tab label="Item 2">
      <LoremIpsum count={4} />
    </Tab>
    <Tab label="Item 3">
      <LoremIpsum count={2} />
    </Tab>
    <Tab label="Item 4">
      <LoremIpsum count={8} />
    </Tab>
    <Tab label="Item 5">
      <LoremIpsum count={5} />
    </Tab>
    <Tab label="Item 6">
      <LoremIpsum count={6} />
    </Tab>
  </Tabs>
);

export default SimpleExample;
