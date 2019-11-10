import React, { FC } from "react";
import { Text } from "@react-md/typography";
import { TabPanel, TabPanelProps } from "@react-md/tabs";

const Content1: FC<TabPanelProps> = props => (
  <TabPanel {...props}>
    <Text type="headline-4">Tab 1 Content</Text>
  </TabPanel>
);

export default Content1;
