# @react-md/tabs

Create an accessible tabs component that allows you to dynamically switch
between different views.

## Installation

```sh
npm install --save @react-md/tabs
```

It is also recommended to install the following packages as they work
hand-in-hand with this package:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/utils
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/tabs/demos) for live examples
and more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React, { Fragment } from "react";
import { render } from "react-dom";
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs";
import { Text } from "@react-md/typography";

const tabs = ["Tab 1", "Tab 2", "Tab 3"];

const App = () => (
  <TabsManager tabs={tabs} tabsId="tabs">
    <Tabs />
    <TabPanels>
      <TabPanel>
        <Text type="headline-4">Panel 1</Text>
      </TabPanel>
      <TabPanel>
        <Text type="headline-4">Panel 2</Text>
      </TabPanel>
      <TabPanel>
        <Text type="headline-4">Panel 3</Text>
      </TabPanel>
    </TabPanels>
);

render(<App />, document.getElementById("root"));
```
