import { describe, expect, it, jest } from "@jest/globals";
import { type ReactElement } from "react";
import {
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";

import { Slide } from "../../transition/Slide.js";
import { SlideContainer } from "../../transition/SlideContainer.js";
import { isElementVisible } from "../../utils/isElementVisible.js";
import { Tab } from "../Tab.js";
import { TabList, type TabListProps } from "../TabList.js";
import { useTabs, type TabsHookOptions } from "../useTabs.js";

type TestProps = Omit<TabsHookOptions, "activeTab" | "setActiveTab"> &
  Pick<TabListProps, "activationMode">;

function Test(props: TestProps): ReactElement {
  const { activationMode, ...options } = props;
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs(options);

  return (
    <>
      <TabList {...getTabListProps()} activationMode={activationMode}>
        <Tab {...getTabProps(0)}>Tab 1</Tab>
        <Tab {...getTabProps(1)}>Tab 2</Tab>
        <Tab {...getTabProps(2)}>Tab 3</Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()} data-testid="panels">
        <Slide {...getTabPanelProps(0)}>Tab 1 Content</Slide>
        <Slide {...getTabPanelProps(1)}>Tab 2 Content</Slide>
        <Slide {...getTabPanelProps(2)}>Tab 3 Content</Slide>
      </SlideContainer>
    </>
  );
}

describe("useTabs", () => {
  it("should scroll to the top of the tab panels element unless disableScrollFix is true", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test disableScrollFix />);

    const panels = screen.getByTestId("panels");
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    const scrollTop = jest.spyOn(panels, "scrollTop", "set");

    await user.click(tab2);
    expect(scrollTop).not.toHaveBeenCalled();

    rerender(<Test />);
    await user.click(tab1);
    expect(scrollTop).toHaveBeenCalledWith(0);
  });

  it("should move focus without selecting the next tab with keyboard movement when the activationMode is not automatic", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);
    const tabList = screen.getByRole("tablist");
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });
    const panel1 = screen.getByRole("tabpanel", { name: "Tab 1" });
    const panel2 = screen.getByRole("tabpanel", { name: "Tab 2" });
    const panel3 = screen.getByRole("tabpanel", { name: "Tab 3" });

    expect(isElementVisible(panel1)).toBe(true);
    expect(isElementVisible(panel2)).toBe(false);
    expect(isElementVisible(panel3)).toBe(false);

    expect(tabList).toHaveAttribute("tabIndex", "0");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    await user.tab();
    expect(tab1).toHaveFocus();
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("tabIndex", "0");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    await user.keyboard("[ArrowRight]");
    expect(tab2).toHaveFocus();
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "0");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    await user.keyboard("[Space]");
    await waitFor(() => {
      expect(isElementVisible(panel1)).toBe(false);
    });
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("tabIndex", "0");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    expect(isElementVisible(panel1)).toBe(false);
    expect(isElementVisible(panel2)).toBe(true);
    expect(isElementVisible(panel3)).toBe(false);

    await user.keyboard("[ArrowLeft]");
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "0");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");
    expect(isElementVisible(panel1)).toBe(false);
    expect(isElementVisible(panel2)).toBe(true);
    expect(isElementVisible(panel3)).toBe(false);

    await user.keyboard("[End][Enter]");
    await waitFor(() => {
      expect(isElementVisible(panel3)).toBe(true);
    });
    expect(isElementVisible(panel2)).toBe(false);
    expect(isElementVisible(panel1)).toBe(false);

    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "true");
    expect(tab3).toHaveAttribute("tabIndex", "0");

    expect(isElementVisible(panel1)).toBe(false);
    expect(isElementVisible(panel2)).toBe(false);
    expect(isElementVisible(panel3)).toBe(true);

    // supports text wrapping wrapping
    await user.keyboard("[ArrowRight]");
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "0");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "true");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    await user.keyboard("[ArrowLeft]");
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "true");
    expect(tab3).toHaveAttribute("tabIndex", "0");

    await user.keyboard("tt[Space]");
    await waitFor(() => {
      expect(isElementVisible(panel3)).toBe(false);
    });
    expect(isElementVisible(panel1)).toBe(false);
    expect(isElementVisible(panel2)).toBe(true);
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("tabIndex", "0");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");
  });

  it("should focus and select next tab when the activationMode is set to automatic", async () => {
    const user = userEvent.setup();
    rmdRender(<Test activationMode="automatic" />);
    const tabList = screen.getByRole("tablist");
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });

    await user.tab();
    expect(tab1).toHaveFocus();
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("tabIndex", "0");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    await user.keyboard("[ArrowRight]");
    expect(tab2).toHaveFocus();
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("tabIndex", "0");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");
  });
});
