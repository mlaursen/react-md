import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { type ReactElement } from "react";
import {
  act,
  fireEvent,
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";

import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
} from "../../media-queries/appSize.js";
import { Tooltip } from "../../tooltip/Tooltip.js";
import { useTooltip } from "../../tooltip/useTooltip.js";
import { WritingDirectionProvider } from "../../typography/WritingDirectionProvider.js";
import { Tab } from "../Tab.js";
import { TabList, type TabListProps } from "../TabList.js";
import { useTabs, type ProvidedTabListProps } from "../useTabs.js";
import { type GetTabListScrollToOptions } from "../utils.js";

// make it so the back button defaults to intersecting
const getIntersectionRatio = jest.fn((target: Element): number =>
  target.nextElementSibling ? 1 : 0
);

function Test(
  props: Omit<TabListProps, keyof ProvidedTabListProps>
): ReactElement {
  const { getTabProps, getTabListProps } = useTabs();

  return (
    <TabList {...props} {...getTabListProps()}>
      <Tab {...getTabProps(0)}>Tab 1</Tab>
      <Tab {...getTabProps(1)}>Tab 2</Tab>
      <Tab {...getTabProps(2)}>Tab 3</Tab>
    </TabList>
  );
}

class MockedObserver implements globalThis.IntersectionObserver {
  root: Document | Element | null;
  rootMargin: string;
  thresholds: readonly number[];

  elements: Set<Element>;

  constructor(
    public callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) {
    this.root = options.root || null;
    this.rootMargin = options.rootMargin || "";
    this.thresholds =
      typeof options.threshold === "number"
        ? [options.threshold]
        : (options.threshold ?? []);

    this.elements = new Set();
  }

  observe(target: Element): void {
    this.elements.add(target);

    this.trigger();
  }

  unobserve(target: Element): void {
    this.elements.delete(target);
  }

  takeRecords = (): IntersectionObserverEntry[] => {
    const rect = document.body.getBoundingClientRect();
    return [...this.elements].map<IntersectionObserverEntry>((target) => ({
      time: Date.now(),
      target,
      boundingClientRect: rect,
      intersectionRatio: getIntersectionRatio(target),
      intersectionRect: rect,
      isIntersecting: false,
      rootBounds: null,
    }));
  };

  disconnect(): void {
    this.elements.clear();
  }

  trigger = (): void => {
    this.callback(this.takeRecords(), this);
  };
}

type Observer = (IntersectionObserver & { trigger(): void }) | undefined;

describe("TabList", () => {
  beforeEach(() => {
    getIntersectionRatio.mockImplementation((element) =>
      element.nextElementSibling ? 1 : 0
    );
    jest
      .spyOn(window, "IntersectionObserver")
      .mockImplementation(
        (callback, options) => new MockedObserver(callback, options)
      );
  });

  it("should update the tab indicator styles based on the active index", async () => {
    const offsetLeft = jest
      .spyOn(HTMLButtonElement.prototype, "offsetLeft", "get")
      .mockReturnValue(0);
    const offsetWidth = jest
      .spyOn(HTMLButtonElement.prototype, "offsetWidth", "get")
      .mockReturnValue(120);

    const user = userEvent.setup();
    rmdRender(<Test />);
    const tablist = screen.getByRole("tablist");
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    // it should always start to 33.33% and then calculate the correct width
    // based on the number of tabs
    expect(tablist.style.getPropertyValue("--rmd-tab-size")).toBe(
      `${100 / 3}%`
    );
    expect(tablist.style.getPropertyValue("--rmd-tab-offset")).toBe("0px");

    // need to use waitFor since ResizeObserver uses requestAnimationFrame
    await waitFor(() => {
      expect(tablist.style.getPropertyValue("--rmd-tab-size")).toBe("120px");
    });
    await waitFor(() => {
      expect(tablist.style.getPropertyValue("--rmd-tab-offset")).toBe("0px");
    });

    expect(tablist).toMatchSnapshot();

    offsetLeft.mockReturnValue(120);
    offsetWidth.mockReturnValue(90);

    await user.click(tab2);
    await waitFor(() => {
      expect(tablist.style.getPropertyValue("--rmd-tab-size")).toBe("90px");
    });
    await waitFor(() => {
      expect(tablist.style.getPropertyValue("--rmd-tab-offset")).toBe("120px");
    });

    offsetLeft.mockReturnValue(0);
    offsetWidth.mockReturnValue(120);

    await user.click(tab1);
    await waitFor(() => {
      expect(tablist.style.getPropertyValue("--rmd-tab-size")).toBe("90px");
    });
    await waitFor(() => {
      expect(tablist.style.getPropertyValue("--rmd-tab-offset")).toBe("120px");
    });
  });

  it("should support rendering scroll buttons to scroll horizontally by setting the scrollButtons prop to true", async () => {
    let backObserver: Observer;
    let forwardObserver: Observer;
    jest
      .spyOn(window, "IntersectionObserver")
      .mockImplementation((callback, options) => {
        if (!backObserver) {
          backObserver = new MockedObserver(callback, options);
          return backObserver;
        }

        if (!forwardObserver) {
          forwardObserver = new MockedObserver(callback, options);
          return forwardObserver;
        }

        throw new Error();
      });

    const user = userEvent.setup();
    rmdRender(<Test scrollButtons />);
    const tablist = screen.getByRole("tablist");
    await waitFor(() => {
      expect(backObserver).toBeDefined();
    });
    await waitFor(() => {
      expect(forwardObserver).toBeDefined();
    });

    if (!backObserver || !forwardObserver) {
      throw new Error();
    }

    const scrollLeft = jest
      .spyOn(tablist, "scrollLeft", "get")
      .mockReturnValue(0);
    jest.spyOn(tablist, "scrollWidth", "get").mockReturnValue(100);

    const back = screen.getByRole("button", { name: "back" });
    const forward = screen.getByRole("button", { name: "forward" });

    expect(back).toBeDisabled();
    expect(forward).not.toBeDisabled();

    tablist.scrollTo ??= jest.fn();
    const scrollTo = jest.spyOn(tablist, "scrollTo").mockImplementation(() => {
      act(() => {
        backObserver?.trigger();
        forwardObserver?.trigger();
      });
    });
    getIntersectionRatio.mockImplementation(() => 0);

    await user.click(forward);

    expect(scrollTo).toHaveBeenCalledWith({
      left: 10,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).not.toBeDisabled();

    scrollLeft.mockReturnValue(10);
    await user.click(forward);
    expect(scrollTo).toHaveBeenCalledWith({
      left: 20,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).not.toBeDisabled();

    scrollLeft.mockReturnValue(20);
    getIntersectionRatio.mockImplementation((target) =>
      target.nextElementSibling ? 0 : 1
    );
    await user.click(forward);
    expect(scrollTo).toHaveBeenCalledWith({
      left: 30,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).toBeDisabled();

    scrollLeft.mockReturnValue(30);
    getIntersectionRatio.mockReturnValue(0);

    await user.click(back);
    expect(scrollTo).toHaveBeenCalledWith({
      left: 20,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).not.toBeDisabled();
  });

  it("should support rendering scroll buttons to scroll vertically by setting the scrollButtons prop to true", async () => {
    let backObserver: Observer;
    let forwardObserver: Observer;
    jest
      .spyOn(window, "IntersectionObserver")
      .mockImplementation((callback, options) => {
        if (!backObserver) {
          backObserver = new MockedObserver(callback, options);
          return backObserver;
        }

        if (!forwardObserver) {
          forwardObserver = new MockedObserver(callback, options);
          return forwardObserver;
        }

        throw new Error();
      });

    const user = userEvent.setup();
    rmdRender(<Test scrollButtons vertical />);
    const tablist = screen.getByRole("tablist");
    await waitFor(() => {
      expect(backObserver).toBeDefined();
    });
    await waitFor(() => {
      expect(forwardObserver).toBeDefined();
    });

    if (!backObserver || !forwardObserver) {
      throw new Error();
    }

    const scrollTop = jest
      .spyOn(tablist, "scrollTop", "get")
      .mockReturnValue(0);
    jest.spyOn(tablist, "scrollHeight", "get").mockReturnValue(100);
    jest.spyOn(tablist, "scrollWidth", "get").mockReturnValue(40);

    const back = screen.getByRole("button", { name: "back" });
    const forward = screen.getByRole("button", { name: "forward" });

    expect(back).toBeDisabled();
    expect(forward).not.toBeDisabled();

    tablist.scrollTo ??= jest.fn();
    const scrollTo = jest.spyOn(tablist, "scrollTo").mockImplementation(() => {
      act(() => {
        backObserver?.trigger();
        forwardObserver?.trigger();
      });
    });
    getIntersectionRatio.mockImplementation(() => 0);

    await user.click(forward);

    expect(scrollTo).toHaveBeenCalledWith({
      top: 10,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).not.toBeDisabled();

    scrollTop.mockReturnValue(10);
    await user.click(forward);
    expect(scrollTo).toHaveBeenCalledWith({
      top: 20,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).not.toBeDisabled();

    scrollTop.mockReturnValue(20);
    getIntersectionRatio.mockImplementation((target) =>
      target.nextElementSibling ? 0 : 1
    );
    await user.click(forward);
    expect(scrollTo).toHaveBeenCalledWith({
      top: 30,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).toBeDisabled();

    scrollTop.mockReturnValue(30);
    getIntersectionRatio.mockReturnValue(0);

    await user.click(back);
    expect(scrollTo).toHaveBeenCalledWith({
      top: 20,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).not.toBeDisabled();
  });

  it("should support custom labels for the scroll buttons", () => {
    rmdRender(
      <Test
        scrollButtons
        backwardScrollButtonProps={{
          "aria-label": "Scroll left",
        }}
        forwardScrollButtonProps={{
          "aria-label": "Scroll right",
        }}
      />
    );

    const back = screen.getByRole("button", { name: "Scroll left" });
    const forward = screen.getByRole("button", { name: "Scroll right" });

    expect(back).toBeInTheDocument();
    expect(forward).toBeInTheDocument();
  });

  it('should support rendering the scrollButtons on mobile by setting scrollButtons to "allow-phone"', () => {
    type Listener = (event: MediaQueryListEvent) => void;
    const noop = (): void => {
      // do nothing
    };
    const handlers = new Map<string, Listener>();
    jest.spyOn(window, "matchMedia").mockImplementation((query) => ({
      media: query,
      matches:
        query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
        query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
      onchange: noop,
      addListener: noop,
      removeListener: noop,
      removeEventListener: noop,
      dispatchEvent: () => false,
      addEventListener(_type: string, listener: EventListener) {
        handlers.set(query, listener);
      },
    }));

    const { rerender } = rmdRender(<Test scrollButtons />);

    const back = screen.getByRole("button", { name: "back" });
    const forward = screen.getByRole("button", { name: "forward" });
    expect(back).toBeInTheDocument();
    expect(forward).toBeInTheDocument();

    act(() => {
      [...handlers.entries()].forEach(([query, listener]) => {
        listener({
          ...new Event("change"),
          matches: query.includes(`${DEFAULT_PHONE_MAX_WIDTH}`),
          media: query,
        });
      });
    });

    expect(back).not.toBeInTheDocument();
    expect(forward).not.toBeInTheDocument();

    rerender(<Test scrollButtons="allow-phone" />);
    expect(screen.getByRole("button", { name: "back" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "forward" })).toBeInTheDocument();
  });

  it("should support scrolling correctly in RTL mode", async () => {
    let backObserver: Observer;
    let forwardObserver: Observer;
    jest
      .spyOn(window, "IntersectionObserver")
      .mockImplementation((callback, options) => {
        if (!backObserver) {
          backObserver = new MockedObserver(callback, options);
          return backObserver;
        }

        if (!forwardObserver) {
          forwardObserver = new MockedObserver(callback, options);
          return forwardObserver;
        }

        throw new Error();
      });

    const user = userEvent.setup();
    rmdRender(<Test scrollButtons />, {
      wrapper: ({ children }) => (
        <WritingDirectionProvider defaultDir="rtl">
          {children}
        </WritingDirectionProvider>
      ),
    });
    const tablist = screen.getByRole("tablist");
    await waitFor(() => {
      expect(backObserver).toBeDefined();
    });
    await waitFor(() => {
      expect(forwardObserver).toBeDefined();
    });

    if (!backObserver || !forwardObserver) {
      throw new Error();
    }

    const scrollLeft = jest
      .spyOn(tablist, "scrollLeft", "get")
      .mockReturnValue(0);
    jest.spyOn(tablist, "scrollWidth", "get").mockReturnValue(100);

    const back = screen.getByRole("button", { name: "back" });
    const forward = screen.getByRole("button", { name: "forward" });

    expect(back).toBeDisabled();
    expect(forward).not.toBeDisabled();

    tablist.scrollTo ??= jest.fn();
    const scrollTo = jest.spyOn(tablist, "scrollTo").mockImplementation(() => {
      act(() => {
        backObserver?.trigger();
        forwardObserver?.trigger();
      });
    });
    getIntersectionRatio.mockImplementation(() => 0);

    await user.click(forward);

    expect(scrollTo).toHaveBeenCalledWith({
      left: -10,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).not.toBeDisabled();

    scrollLeft.mockReturnValue(-10);
    await user.click(forward);
    expect(scrollTo).toHaveBeenCalledWith({
      left: -20,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).not.toBeDisabled();

    scrollLeft.mockReturnValue(-20);
    getIntersectionRatio.mockImplementation((target) =>
      target.nextElementSibling ? 0 : 1
    );
    await user.click(forward);
    expect(scrollTo).toHaveBeenCalledWith({
      left: -30,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).toBeDisabled();

    scrollLeft.mockReturnValue(-30);
    getIntersectionRatio.mockReturnValue(0);

    await user.click(back);
    expect(scrollTo).toHaveBeenCalledWith({
      left: -20,
      behavior: "smooth",
    });
    expect(back).not.toBeDisabled();
    expect(forward).not.toBeDisabled();
  });

  it("should support scrolling a custom distance with the getScrollToOptions prop", async () => {
    // just allow both buttons to always be enabled for this test
    getIntersectionRatio.mockReturnValue(0.5);
    const getScrollToOptions = jest.fn<GetTabListScrollToOptions>(() => ({
      top: 10,
      left: 200,
      behavior: "auto",
    }));
    const user = userEvent.setup();
    rmdRender(<Test scrollButtons getScrollToOptions={getScrollToOptions} />);
    const tablist = screen.getByRole("tablist");
    tablist.scrollTo ??= jest.fn();
    const scrollTo = jest.spyOn(tablist, "scrollTo");

    const back = screen.getByRole("button", { name: "back" });
    const forward = screen.getByRole("button", { name: "forward" });

    await user.click(forward);
    expect(getScrollToOptions).toHaveBeenCalledWith({
      isRTL: false,
      vertical: false,
      animate: true,
      container: tablist,
      increment: true,
    });
    expect(scrollTo).toHaveBeenCalledWith({
      top: 10,
      left: 200,
      behavior: "auto",
    });

    getScrollToOptions.mockReturnValue({
      top: 20,
      left: -110,
      behavior: "auto",
    });
    await user.click(back);
    expect(getScrollToOptions).toHaveBeenCalledWith({
      isRTL: false,
      vertical: false,
      animate: true,
      container: tablist,
      increment: false,
    });
    expect(scrollTo).toHaveBeenCalledWith({
      top: 20,
      left: -110,
      behavior: "auto",
    });
  });

  it("should support rendering scrollbars if the scrollbar prop is enabled", () => {
    const { rerender } = rmdRender(<Test />);
    const tablist = screen.getByRole("tablist");
    expect(tablist).toHaveClass("rmd-tablist--no-scrollbar");

    rerender(<Test scrollbar />);
    expect(tablist).not.toHaveClass("rmd-tablist--no-scrollbar");
  });

  it("should support adding tooltips to the scroll buttons", async () => {
    // allow both tto be enabled for this test
    getIntersectionRatio.mockReturnValue(0.5);
    function TooltipTest(): ReactElement {
      const forwardTooltip = useTooltip({
        hoverTimeout: 0,
      });
      const backwardTooltip = useTooltip({
        hoverTimeout: 0,
      });
      return (
        <>
          <Test
            scrollButtons
            forwardScrollButtonProps={{
              buttonProps: forwardTooltip.elementProps,
            }}
            backwardScrollButtonProps={{
              buttonProps: backwardTooltip.elementProps,
            }}
          />
          <Tooltip {...forwardTooltip.tooltipProps}>Scroll right</Tooltip>
          <Tooltip {...backwardTooltip.tooltipProps}>Scroll left</Tooltip>
        </>
      );
    }

    rmdRender(<TooltipTest />);
    const back = screen.getByRole("button", { name: "back" });
    const forward = screen.getByRole("button", { name: "forward" });

    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.mouseEnter(back);
    await waitFor(() => {
      expect(
        screen.getByRole("tooltip", { name: "Scroll left" })
      ).toBeInTheDocument();
    });

    fireEvent.mouseLeave(back);
    await waitFor(() => {
      expect(() => screen.getByRole("tooltip")).toThrow();
    });

    fireEvent.mouseEnter(forward);
    await waitFor(() => {
      expect(
        screen.getByRole("tooltip", { name: "Scroll right" })
      ).toBeInTheDocument();
    });

    fireEvent.mouseLeave(forward);
    await waitFor(() => {
      expect(() => screen.getByRole("tooltip")).toThrow();
    });
  });
});
