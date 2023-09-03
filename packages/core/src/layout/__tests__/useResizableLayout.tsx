import { describe, expect, it, jest } from "@jest/globals";
import type { ReactNode } from "react";
import { useAppSize } from "../../AppSizeProvider.js";
import { AppBar } from "../../app-bar/AppBar.js";
import { AppBarTitle } from "../../app-bar/AppBarTitle.js";
import { Button } from "../../button/Button.js";
import { Form } from "../../form/Form.js";
import { Radio } from "../../form/Radio.js";
import { useRadioGroup } from "../../form/useRadioGroup.js";
import { Sheet } from "../../sheet/Sheet.js";
import { drag } from "../../test-utils/drag.js";
import {
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";
import { removeItemFromStorage } from "../../useLocalStorage.js";
import { isElementVisible } from "../../utils/isElementVisible.js";
import { LayoutNav } from "../LayoutNav.js";
import { LayoutWindowSplitter } from "../LayoutWindowSplitter.js";
import { Main } from "../Main.js";
import { DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES } from "../useHorizontalLayoutTransition.js";
import type { ResizableLayoutOptions } from "../useResizableLayout.js";
import { useResizableLayout } from "../useResizableLayout.js";

const OFFSCREEN_CLASS = "rmd-sheet--offscreen";
const { enter: ENTER_H_CLASS, enterDone: ENTER_H_DONE_CLASS } =
  DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES;

const getSizeVar = () =>
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--rmd-layout-size");

interface LayoutProps extends Omit<ResizableLayoutOptions, "pathname"> {
  children?: ReactNode;
}

function Layout(props: LayoutProps) {
  const { children = "Hello, world!", ...options } = props;

  const { getRadioProps, value: pathname } = useRadioGroup<string>({
    defaultValue: "/",
    name: "pathname",
  });
  const {
    appBarProps,
    mainProps,
    navToggleProps,
    temporaryNavProps,
    expandableNavProps,
    windowSplitterProps,
  } = useResizableLayout({ pathname, ...options });
  const { isPhone, isTablet, isLandscape, isDesktop } = useAppSize();
  let layout: "phone" | "tablet" | "landscapeTablet" | "desktop" = "phone";
  if (isTablet) {
    layout = isLandscape ? "landscapeTablet" : "tablet";
  } else if (isDesktop) {
    layout = "desktop";
  }

  return (
    <>
      <AppBar {...appBarProps}>
        <Button {...navToggleProps} />
        <AppBarTitle>Hello, world!</AppBarTitle>
      </AppBar>
      <LayoutNav {...expandableNavProps}>
        {/* pretend like these are navigation items */}
        <Form>
          <Radio {...getRadioProps("/")} label="Home" />
          <Radio {...getRadioProps("/1")} label="Route 1" />
          <Radio {...getRadioProps("/2")} label="Route 2" />
        </Form>
      </LayoutNav>
      <LayoutWindowSplitter {...windowSplitterProps} />
      {isPhone && (
        <Sheet {...temporaryNavProps}>
          {/* pretend like these are navigation items */}
          <Form>
            <Radio {...getRadioProps("/")} label="Home" />
            <Radio {...getRadioProps("/1")} label="Route 1" />
            <Radio {...getRadioProps("/2")} label="Route 2" />
          </Form>
        </Sheet>
      )}
      <Main {...mainProps}>
        {children}
        <div data-testid="layout">{layout}</div>
      </Main>
    </>
  );
}

describe("useResizableLayout", () => {
  afterEach(() => {
    removeItemFromStorage({ key: "navWidth" });
  });

  it("should allow you to create a resizable layout quickly", async () => {
    const user = userEvent.setup();
    rmdRender(<Layout />);

    const layout = screen.getByTestId("layout");
    const appBar = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const navToggle = screen.getByRole("button", { name: "Navigation" });
    const nav = screen.getByRole("navigation", { name: "Navigation" });
    const windowSplitter = screen.getByRole("separator", {
      name: "Resize Navigation",
    });

    expect(layout).toHaveTextContent("desktop");
    expect(isElementVisible(nav)).toBe(false);
    expect(nav).toHaveClass(OFFSCREEN_CLASS);
    expect(appBar).toMatchSnapshot();
    expect(main).toMatchSnapshot();
    expect(isElementVisible(windowSplitter)).toBe(false);
    expect(windowSplitter).toMatchSnapshot();
    expect(getSizeVar()).toBe("256px");
    expect(() => screen.getByRole("dialog")).toThrow();

    await user.click(navToggle);
    expect(isElementVisible(nav)).toBe(true);
    expect(main).toHaveClass(ENTER_H_CLASS);
    await waitFor(() => {
      expect(nav).not.toHaveClass(OFFSCREEN_CLASS);
    });
    expect(main).toHaveClass(ENTER_H_DONE_CLASS);

    expect(isElementVisible(windowSplitter)).toBe(true);
    expect(windowSplitter).toMatchSnapshot();

    jest.spyOn(windowSplitter, "getBoundingClientRect").mockReturnValue({
      ...document.body.getBoundingClientRect(),
      left: 256,
      width: 8,
      top: 0,
      height: window.innerHeight,
    });

    await drag(windowSplitter, {
      to: { x: 286, y: 32 },
    });

    expect(getSizeVar()).toBe("286px");
    expect(windowSplitter).toMatchSnapshot();

    await drag(windowSplitter, {
      to: { x: 0, y: 50 },
    });
    expect(getSizeVar()).toBe("96px");
    expect(windowSplitter).toMatchSnapshot();
  });
});
