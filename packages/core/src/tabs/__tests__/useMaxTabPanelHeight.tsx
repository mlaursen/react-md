import { describe, expect, it, jest } from "@jest/globals";
import { type CSSProperties, type ReactElement } from "react";

import {
  act,
  rmdRender,
  screen,
  setupResizeObserverMock,
} from "../../test-utils/index.js";
import { cleanupResizeObserverAfterEach } from "../../test-utils/jest-globals/resize-observer.js";
import { Slide } from "../../transition/Slide.js";
import { SlideContainer } from "../../transition/SlideContainer.js";
import { Tab } from "../Tab.js";
import { TabList } from "../TabList.js";
import {
  type MaxTabPanelHeightOptions,
  useMaxTabPanelHeight,
} from "../useMaxTabPanelHeight.js";
import { useTabs } from "../useTabs.js";

interface TestProps
  extends Pick<
    MaxTabPanelHeightOptions<HTMLDivElement>,
    "defaultHeight" | "style"
  > {
  extraStyle?: CSSProperties;
}

function Test(props: TestProps): ReactElement {
  const { style, defaultHeight, extraStyle } = props;
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();
  const { getMaxTabPanelHeightProps } = useMaxTabPanelHeight({
    style,
    defaultHeight,
    getTabPanelsProps,
  });

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Tab 1</Tab>
        <Tab {...getTabProps(1)}>Tab 2</Tab>
        <Tab {...getTabProps(2)}>Tab 3</Tab>
      </TabList>
      <SlideContainer
        {...getMaxTabPanelHeightProps(extraStyle)}
        data-testid="panels"
      >
        <Slide {...getTabPanelProps(0)}>Tab 1 Content</Slide>
        <Slide {...getTabPanelProps(1)}>Tab 2 Content</Slide>
        <Slide {...getTabPanelProps(2)}>Tab 3 Content</Slide>
      </SlideContainer>
    </>
  );
}

cleanupResizeObserverAfterEach();

describe("useMaxTabPanelHeight", () => {
  it("should find the max tab panel height with a resize observer", () => {
    const observer = setupResizeObserverMock();
    rmdRender(<Test />);
    const panels = screen.getByTestId("panels");
    const [panel1, panel2, panel3] = screen.getAllByRole("tabpanel");

    expect(panels).toHaveStyle({ height: "" });

    const getHeight = jest.spyOn(panels.style, "height", "get");
    const setHeight = jest.spyOn(panels.style, "height", "set");
    const panel1ScrollHeight = jest
      .spyOn(panel1, "scrollHeight", "get")
      .mockReturnValue(200);
    const panel1ClassList = jest.spyOn(panel1.classList, "toggle");
    const panel2ScrollHeight = jest
      .spyOn(panel2, "scrollHeight", "get")
      .mockReturnValue(350);
    const panel2ClassList = jest.spyOn(panel2.classList, "toggle");
    const panel3ScrollHeight = jest
      .spyOn(panel3, "scrollHeight", "get")
      .mockReturnValue(100);
    const panel3ClassList = jest.spyOn(panel3.classList, "toggle");

    act(() => {
      observer.resizeElement(panels, { height: 200, width: 1000 });
    });
    expect(panels).toHaveStyle({ height: "350px" });
    expect(getHeight).toHaveBeenCalledTimes(1);
    expect(setHeight).toHaveBeenCalledWith("");

    expect(panel1ScrollHeight).toHaveBeenCalledTimes(1);
    // 2 because there is one before checking the DISPLAY_NONE_CLASS, and another after toggling it
    expect(panel2ScrollHeight).toHaveBeenCalledTimes(2);
    expect(panel3ScrollHeight).toHaveBeenCalledTimes(2);

    // doesn't have the DISPLAY_NONE_CLASS, so no changes, while the other two
    // should toggle it on and off to recalc
    expect(panel1ClassList).not.toHaveBeenCalled();
    expect(panel2ClassList).toHaveBeenCalledTimes(2);
    expect(panel3ClassList).toHaveBeenCalledTimes(2);

    // it should recalc correctly even if the height has already been set since
    // it could change if when the width changes
    act(() => {
      observer.resizeElement(panels, { height: 350, width: 800 });
    });

    expect(panels).toHaveStyle({ height: "350px" });
    expect(getHeight).toHaveBeenCalledTimes(2);
    expect(setHeight).toHaveBeenCalledWith("350px");
  });

  it("should allow for a default height", () => {
    rmdRender(<Test defaultHeight={() => "30rem"} />);
    const panels = screen.getByTestId("panels");
    expect(panels).toHaveStyle({ height: "30rem" });
  });

  it("should be able to merge style through the option and the callback", () => {
    const { rerender } = rmdRender(
      <Test
        style={{ color: "red" }}
        extraStyle={{ background: "blue" }}
        defaultHeight="10rem"
      />
    );

    const panels = screen.getByTestId("panels");
    expect(panels).toHaveStyle({
      height: "10rem",
      color: "red",
      background: "blue",
    });

    // extra style overrides the others
    rerender(
      <Test
        style={{ color: "red" }}
        extraStyle={{ color: "blue" }}
        defaultHeight="10rem"
      />
    );
    expect(panels).toHaveStyle({
      height: "10rem",
      color: "blue",
    });

    // style can override the height if you really want..
    rerender(
      <Test style={{ color: "red", height: "12rem" }} defaultHeight="10rem" />
    );
    expect(panels).toHaveStyle({
      height: "12rem",
      color: "red",
    });
  });
});
