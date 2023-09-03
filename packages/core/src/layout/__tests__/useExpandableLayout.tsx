import { describe, expect, it } from "@jest/globals";
import type { ReactNode } from "react";
import { useAppSize } from "../../AppSizeProvider.js";
import { AppBar } from "../../app-bar/AppBar.js";
import { AppBarTitle } from "../../app-bar/AppBarTitle.js";
import { Button } from "../../button/Button.js";
import { Form } from "../../form/Form.js";
import { Radio } from "../../form/Radio.js";
import { useRadioGroup } from "../../form/useRadioGroup.js";
import { Sheet } from "../../sheet/Sheet.js";
import {
  matchDesktop,
  matchPhone,
  rmdRender,
  screen,
  spyOnMatchMedia,
  userEvent,
  waitFor,
  within,
} from "../../test-utils/index.js";
import { isElementVisible } from "../../utils/isElementVisible.js";
import { LayoutNav } from "../LayoutNav.js";
import { Main } from "../Main.js";
import type { ExpandableLayoutOptions } from "../useExpandableLayout.js";
import { useExpandableLayout } from "../useExpandableLayout.js";
import { DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES } from "../useHorizontalLayoutTransition.js";

const OFFSCREEN_CLASS = "rmd-sheet--offscreen";
const EXIT_CLASS = "rmd-sheet--exit";
const {
  enter: ENTER_H_CLASS,
  enterDone: ENTER_H_DONE_CLASS,
  exit: EXIT_H_CLASS,
} = DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES;

interface LayoutProps extends Omit<ExpandableLayoutOptions, "pathname"> {
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
  } = useExpandableLayout({ pathname, ...options });
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

describe("useExpandableLayout", () => {
  it("should allow you to create an expandable layout quickly", async () => {
    const user = userEvent.setup();
    rmdRender(<Layout />);

    const layout = screen.getByTestId("layout");
    const appBar = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const navToggle = screen.getByRole("button", { name: "Navigation" });
    const nav = screen.getByRole("navigation", { name: "Navigation" });

    expect(layout).toHaveTextContent("desktop");
    expect(isElementVisible(nav)).toBe(false);
    expect(nav).toHaveClass(OFFSCREEN_CLASS);
    expect(appBar).toMatchSnapshot();
    expect(main).toMatchSnapshot();
    expect(() => screen.getByRole("dialog")).toThrow();

    await user.click(navToggle);
    expect(isElementVisible(nav)).toBe(true);
    expect(main).toHaveClass(ENTER_H_CLASS);
    await waitFor(() => {
      expect(nav).not.toHaveClass(OFFSCREEN_CLASS);
    });
    expect(main).toHaveClass(ENTER_H_DONE_CLASS);

    await user.click(screen.getByRole("radio", { name: "Route 2" }));
    expect(nav).not.toHaveClass(EXIT_CLASS);
    expect(nav).toMatchSnapshot();

    await user.click(screen.getByRole("radio", { name: "Route 1" }));
    expect(nav).not.toHaveClass(EXIT_CLASS);
  });

  it("should not transition while changing between temporary and expanded layouts", async () => {
    const matchMediaSpy = spyOnMatchMedia();
    const user = userEvent.setup();
    rmdRender(<Layout />);

    const layout = screen.getByTestId("layout");
    const navToggle = screen.getByRole("button", { name: "Navigation" });
    const expandableNav = screen.getByRole("navigation", {
      name: "Navigation",
    });

    expect(layout).toHaveTextContent("desktop");
    expect(isElementVisible(expandableNav)).toBe(false);
    await user.click(navToggle);
    await waitFor(() => {
      expect(isElementVisible(expandableNav)).toBe(true);
      expect(expandableNav).not.toHaveClass(OFFSCREEN_CLASS);
    });

    matchMediaSpy.changeViewport(matchPhone);
    expect(layout).toHaveTextContent("phone");
    // note: this is really hidden due to CSS.
    expect(expandableNav).toBeInTheDocument();

    await user.click(navToggle);
    let temporaryNav = screen.getByRole("dialog", { name: "Navigation" });
    await waitFor(() => {
      expect(temporaryNav).not.toHaveClass(OFFSCREEN_CLASS);
    });
    expect(expandableNav).toBeInTheDocument();

    matchMediaSpy.changeViewport(matchDesktop);
    expect(expandableNav).toBeInTheDocument();
    expect(temporaryNav).not.toBeInTheDocument();

    matchMediaSpy.changeViewport(matchPhone);
    temporaryNav = screen.getByRole("dialog", { name: "Navigation" });
    expect(expandableNav).toBeInTheDocument();
    expect(temporaryNav).toBeInTheDocument();
    expect(temporaryNav).not.toHaveClass(OFFSCREEN_CLASS);

    await user.click(
      within(temporaryNav).getByRole("radio", { name: "Route 2" })
    );
    await waitFor(() => {
      expect(temporaryNav).not.toBeInTheDocument();
    });

    // the temporary navigation SHOULD close if the user resizes to desktop and changes routes
    await user.click(navToggle);
    temporaryNav = screen.getByRole("dialog", { name: "Navigation" });
    expect(temporaryNav).toHaveClass(OFFSCREEN_CLASS);
    await waitFor(() => {
      expect(temporaryNav).not.toHaveClass(OFFSCREEN_CLASS);
    });

    matchMediaSpy.changeViewport(matchDesktop);
    expect(temporaryNav).not.toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Home" }));
    expect(isElementVisible(expandableNav)).toBe(true);

    matchMediaSpy.changeViewport(matchPhone);
    expect(() => screen.getByRole("dialog")).toThrow();
  });

  it("should allow for the navigation to be visible by default", () => {
    rmdRender(<Layout defaultExpanded />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should transition the app bar along with the main element for full height navigation layouts", async () => {
    const user = userEvent.setup();
    rmdRender(<Layout fullHeightNav />);

    const appBar = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const navToggle = screen.getByRole("button", { name: "Navigation" });

    expect(appBar).not.toHaveClass(
      DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES.enter
    );
    expect(main).not.toHaveClass(
      DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES.enter
    );

    await user.click(navToggle);
    expect(appBar).toHaveClass(ENTER_H_CLASS);
    expect(main).toHaveClass(ENTER_H_CLASS);
    await waitFor(() => {
      expect(appBar).not.toHaveClass(ENTER_H_CLASS);
      expect(main).not.toHaveClass(ENTER_H_CLASS);
    });
    expect(appBar).toHaveClass(ENTER_H_DONE_CLASS);
    expect(main).toHaveClass(ENTER_H_DONE_CLASS);

    await user.click(navToggle);
    expect(appBar).not.toHaveClass(ENTER_H_CLASS);
    expect(main).not.toHaveClass(ENTER_H_CLASS);
    expect(appBar).toHaveClass(EXIT_H_CLASS);
    expect(main).toHaveClass(EXIT_H_CLASS);
    await waitFor(() => {
      expect(appBar).not.toHaveClass(EXIT_H_CLASS);
      expect(main).not.toHaveClass(EXIT_H_CLASS);
    });
  });
});