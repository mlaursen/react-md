import { describe, expect, it } from "@jest/globals";
import { type ReactElement, type Ref, createRef } from "react";

import { rmdRender, screen, userEvent } from "../../test-utils/index.js";
import { DISPLAY_NONE_CLASS } from "../../utils/isElementVisible.js";
import { SimpleTabPanel } from "../SimpleTabPanel.js";
import {
  SimpleTabPanels,
  type SimpleTabPanelsProps,
} from "../SimpleTabPanels.js";
import { Tab } from "../Tab.js";
import { TabList } from "../TabList.js";
import { useTabs } from "../useTabs.js";

function Test(
  props: Partial<SimpleTabPanelsProps> & { nodeRef?: Ref<HTMLDivElement> }
): ReactElement {
  const { nodeRef, ...remaining } = props;
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Tab 1</Tab>
        <Tab {...getTabProps(1)}>Tab 2</Tab>
        <Tab {...getTabProps(2)}>Tab 3</Tab>
      </TabList>
      <SimpleTabPanels
        data-testid="tab-panels"
        {...getTabPanelsProps(nodeRef)}
        {...remaining}
      >
        <SimpleTabPanel {...getTabPanelProps(0)}>Tab 1 Content</SimpleTabPanel>
        <SimpleTabPanel {...getTabPanelProps(1)}>Tab 2 Content</SimpleTabPanel>
        <SimpleTabPanel {...getTabPanelProps(2)}>Tab 3 Content</SimpleTabPanel>
      </SimpleTabPanels>
    </>
  );
}

describe("SimpleTabPanels", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();

    const { rerender } = rmdRender(<Test nodeRef={ref} />);

    const tabPanels = screen.getByTestId("tab-panels");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(tabPanels);
    expect(tabPanels).toMatchSnapshot();

    rerender(
      <Test
        nodeRef={ref}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(tabPanels).toMatchSnapshot();
  });

  it("should be able to work just like the SlideContainer and Slide implementation", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });
    const panel1 = screen.getByRole("tabpanel", { name: "Tab 1" });
    const panel2 = screen.getByRole("tabpanel", { name: "Tab 2" });
    const panel3 = screen.getByRole("tabpanel", { name: "Tab 3" });

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(panel1).not.toHaveClass(DISPLAY_NONE_CLASS);
    expect(panel2).toHaveClass(DISPLAY_NONE_CLASS);
    expect(panel3).toHaveClass(DISPLAY_NONE_CLASS);

    await user.click(tab2);
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(panel1).toHaveClass(DISPLAY_NONE_CLASS);
    expect(panel2).not.toHaveClass(DISPLAY_NONE_CLASS);
    expect(panel3).toHaveClass(DISPLAY_NONE_CLASS);
  });
});
