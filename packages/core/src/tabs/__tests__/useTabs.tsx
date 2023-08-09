import type { ReactElement } from "react";
import { rmdRender, userEvent, waitFor } from "../../test-utils";

import { Slide } from "../../transition/Slide";
import { SlideContainer } from "../../transition/SlideContainer";
import { Tab } from "../Tab";
import type { TabListProps } from "../TabList";
import { TabList } from "../TabList";
import type { TabsHookOptions } from "../useTabs";
import { useTabs } from "../useTabs";

type TestProps = TabsHookOptions & Pick<TabListProps, "activationMode">;

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
    const { getByRole, getByTestId, rerender } = rmdRender(
      <Test disableScrollFix />
    );

    const panels = getByTestId("panels");
    const tab1 = getByRole("tab", { name: "Tab 1" });
    const tab2 = getByRole("tab", { name: "Tab 2" });

    const scrollTop = jest.spyOn(panels, "scrollTop", "set");

    await user.click(tab2);
    expect(scrollTop).not.toHaveBeenCalled();

    rerender(<Test />);
    await user.click(tab1);
    expect(scrollTop).toHaveBeenCalledWith(0);
  });

  it("should move focus without selecting the next tab with keyboard movement when the activationMode is not automatic", async () => {
    const user = userEvent.setup();
    const { getByRole } = rmdRender(<Test />);
    const tabList = getByRole("tablist");
    const tab1 = getByRole("tab", { name: "Tab 1" });
    const tab2 = getByRole("tab", { name: "Tab 2" });
    const tab3 = getByRole("tab", { name: "Tab 3" });
    const panel1 = getByRole("tabpanel", { name: "Tab 1" });

    // unable to get panel2 and panel3 since they do not have labels while hidden
    expect(() => getByRole("tabpanel", { name: "Tab 2" })).toThrow();
    expect(() => getByRole("tabpanel", { name: "Tab 3" })).toThrow();

    expect(tabList).toHaveAttribute("tabIndex", "0");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    await user.tab();
    expect(document.activeElement).toBe(tab1);
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("tabIndex", "0");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    await user.keyboard("[ArrowRight]");
    expect(document.activeElement).toBe(tab2);
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "0");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    await user.keyboard("[Space]");
    await waitFor(() => {
      expect(panel1).toHaveAttribute("hidden");
    });
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("tabIndex", "0");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    const panel2 = getByRole("tabpanel", { name: "Tab 2" });
    expect(() => getByRole("tabpanel", { name: "Tab 3" })).toThrow();

    await user.keyboard("[ArrowLeft]");
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "0");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");
    expect(panel1).toHaveAttribute("hidden");
    expect(panel2).not.toHaveAttribute("hidden");

    await user.keyboard("[End][Enter]");
    await waitFor(() => {
      expect(panel1).toHaveAttribute("hidden");
      expect(panel2).toHaveAttribute("hidden");
    });

    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "true");
    expect(tab3).toHaveAttribute("tabIndex", "0");

    const panel3 = getByRole("tabpanel", { name: "Tab 3" });

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
      expect(panel1).toHaveAttribute("hidden");
      expect(panel2).not.toHaveAttribute("hidden");
      expect(panel3).toHaveAttribute("hidden");
    });
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
    const { getByRole } = rmdRender(<Test activationMode="automatic" />);
    const tabList = getByRole("tablist");
    const tab1 = getByRole("tab", { name: "Tab 1" });
    const tab2 = getByRole("tab", { name: "Tab 2" });
    const tab3 = getByRole("tab", { name: "Tab 3" });

    await user.tab();
    expect(document.activeElement).toBe(tab1);
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("tabIndex", "0");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabIndex", "-1");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");

    await user.keyboard("[ArrowRight]");
    expect(document.activeElement).toBe(tab2);
    expect(tabList).toHaveAttribute("tabIndex", "-1");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("tabIndex", "-1");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("tabIndex", "0");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("tabIndex", "-1");
  });
});
