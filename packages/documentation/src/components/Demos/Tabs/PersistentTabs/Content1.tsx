import { ReactElement } from "react";
import { Text } from "@react-md/typography";
import { TabPanel, TabPanelProps } from "@react-md/tabs";

export default function Content1(props: TabPanelProps): ReactElement {
  return (
    <TabPanel {...props}>
      <Text type="headline-4">Tab 1 Content</Text>
    </TabPanel>
  );
}
