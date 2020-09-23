import React from "react";
import { render } from "@testing-library/react";

import { TabPanel } from "../TabPanel";
import { TabPanels } from "../TabPanels";
import { TabsManager } from "../TabsManager";

describe("TabPanels", () => {
  it("should render without crashing if not wrapped in the tabs manager (even though it _should_ be wrapped in one)", () => {
    const { container } = render(
      <TabPanels>
        <TabPanel>Panel 1</TabPanel>
      </TabPanels>
    );

    expect(container).toMatchSnapshot();
  });

  it("should automatically inject a11y attributes when wrapped in the TabsMananger and only render the active tab", () => {
    const tabs = ["Tab 1", "Tab 2", "Tab 3"];
    const { container } = render(
      <TabsManager tabs={tabs} tabsId="tabs">
        <TabPanels>
          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
          <TabPanel>Panel 3</TabPanel>
        </TabPanels>
      </TabsManager>
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll(".rmd-tab-panel").length).toBe(1);
  });

  it("should render all the tabs when the persistent prop is enabled", () => {
    const tabs = ["Tab 1", "Tab 2", "Tab 3"];
    const { container } = render(
      <TabsManager tabs={tabs} tabsId="tabs">
        <TabPanels persistent>
          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
          <TabPanel>Panel 3</TabPanel>
        </TabPanels>
      </TabsManager>
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll(".rmd-tab-panel").length).toBe(3);
  });
});
