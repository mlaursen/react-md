import type { ReactElement } from "react";
import { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import {
  FavoriteSVGIcon,
  HelpSVGIcon,
  TimerSVGIcon,
} from "@react-md/material-icons";
import { Typography } from "@react-md/typography";

import { TabsManager } from "../TabsManager";
import { Tabs } from "../Tabs";
import { TabPanels } from "../TabPanels";
import { TabPanel } from "../TabPanel";
import type { TabConfig } from "../types";

describe("TabsManager", () => {
  it("should work with a real world example", () => {
    const tabs = ["Tab 1", "Tab 2", "Tab 3"];

    function Test(): ReactElement {
      return (
        <TabsManager tabs={tabs} tabsId="basic-usage-tabs">
          <Tabs />
          <TabPanels>
            <TabPanel>
              <Typography type="headline-4">Panel 1</Typography>
            </TabPanel>
            <TabPanel>
              <Typography type="headline-4">Panel 2</Typography>
            </TabPanel>
            <TabPanel>
              <Typography type="headline-4">Panel 3</Typography>
            </TabPanel>
          </TabPanels>
        </TabsManager>
      );
    }
    const { container, getByRole } = render(<Test />);
    expect(container).toMatchSnapshot();
    const tab1 = getByRole("tab", { name: "Tab 1" });
    const tab2 = getByRole("tab", { name: "Tab 2" });
    const tab3 = getByRole("tab", { name: "Tab 3" });

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");

    fireEvent.click(tab2);
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab3).toHaveAttribute("aria-selected", "false");
  });

  it("should work with object tab configuration and automatic keyboard movement", () => {
    const onActiveIndexChange = jest.fn();
    const tabs: TabConfig[] = [
      { icon: <TimerSVGIcon />, children: "Recent" },
      { icon: <FavoriteSVGIcon />, children: "Favorites" },
    ];

    function Test(): ReactElement {
      return (
        <TabsManager
          stacked
          tabs={tabs}
          tabsId="tabs-id"
          onActiveIndexChange={onActiveIndexChange}
        >
          <Tabs automatic />
          <TabPanels>
            <TabPanel>
              <Typography type="headline-4">Panel 1</Typography>
            </TabPanel>
            <TabPanel>
              <Typography type="headline-4">Panel 2</Typography>
            </TabPanel>
          </TabPanels>
        </TabsManager>
      );
    }

    const { container, getByRole } = render(<Test />);
    const tab1 = getByRole("tab", { name: "Recent" });
    const tab2 = getByRole("tab", { name: "Favorites" });

    expect(onActiveIndexChange).not.toBeCalled();
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(container).toMatchSnapshot();

    fireEvent.focus(tab1);
    fireEvent.keyDown(tab1, { key: "ArrowRight" });
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(onActiveIndexChange).toBeCalledWith(1);
  });

  it("should work with disabled tabs", () => {
    const tabs: TabConfig[] = [
      { icon: <TimerSVGIcon />, children: "Recent" },
      { icon: <FavoriteSVGIcon />, children: "Favorites" },
      { icon: <HelpSVGIcon />, disabled: true, children: "Other" },
    ];

    function Test(): ReactElement {
      return (
        <TabsManager stacked tabs={tabs} tabsId="tabs-id">
          <Tabs automatic />
          <TabPanels>
            <TabPanel>
              <Typography type="headline-4">Panel 1</Typography>
            </TabPanel>
            <TabPanel>
              <Typography type="headline-4">Panel 2</Typography>
            </TabPanel>
            <TabPanel>
              <Typography type="headline-4">Panel 3</Typography>
            </TabPanel>
          </TabPanels>
        </TabsManager>
      );
    }

    const { container, getByRole } = render(<Test />);
    const tab1 = getByRole("tab", { name: "Recent" });
    const tab2 = getByRole("tab", { name: "Favorites" });
    const tab3 = getByRole("tab", { name: "Other" });

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(container).toMatchSnapshot();

    fireEvent.click(tab3);
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");
  });

  it("should be controllable", () => {
    const tabs = ["Tab 1", "Tab 2"] as const;
    function Test(): ReactElement {
      const [activeIndex, setActiveIndex] = useState(1);

      return (
        <TabsManager
          tabs={tabs}
          tabsId="tabs-id"
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
        >
          <Tabs />
          <TabPanels>
            <TabPanel>
              <Typography type="headline-4">Panel 1</Typography>
            </TabPanel>
            <TabPanel>
              <Typography type="headline-4">Panel 2</Typography>
            </TabPanel>
          </TabPanels>
        </TabsManager>
      );
    }

    const { getByRole } = render(<Test />);
    const tab1 = getByRole("tab", { name: "Tab 1" });
    const tab2 = getByRole("tab", { name: "Tab 2" });
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "true");

    fireEvent.click(tab1);
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
  });
});
