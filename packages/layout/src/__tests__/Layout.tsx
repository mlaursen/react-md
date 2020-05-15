import React, { ReactElement } from "react";
import { render as baseRender, RenderOptions } from "@testing-library/react";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { AppBarAction } from "@react-md/app-bar";
import {
  AppSizeListener,
  // DEFAULT_PHONE_MAX_WIDTH,
  // DEFAULT_TABLET_MIN_WIDTH,
  // DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
} from "@react-md/utils";

import Layout, { LayoutProps } from "../Layout";

const render = (ui: ReactElement, options?: RenderOptions) =>
  baseRender(ui, {
    ...options,
    wrapper: ({ children }) => <AppSizeListener>{children}</AppSizeListener>,
  });

const getById = (id: string) => {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Unable to find an element by id: \`${id}\``);
  }

  return el;
};

const matchMedia = jest.spyOn(window, "matchMedia");

// const mockMobile = () =>
//   matchMedia.mockImplementation((query) => ({
//     media: query,
//     matches: query.includes(`${DEFAULT_PHONE_MAX_WIDTH}`),
//     onchange: () => {},
//     addListener: () => {},
//     removeListener: () => {},
//     addEventListener: () => {},
//     removeEventListener: () => {},
//     dispatchEvent: () => false,
//   }));

// const mockTablet = () =>
//   matchMedia.mockImplementation((query) => ({
//     media: query,
//     matches:
//       query.includes(`${DEFAULT_TABLET_MIN_WIDTH}`) &&
//       query.includes(`${DEFAULT_TABLET_MAX_WIDTH}`),
//     onchange: () => {},
//     addListener: () => {},
//     removeListener: () => {},
//     addEventListener: () => {},
//     removeEventListener: () => {},
//     dispatchEvent: () => false,
//   }));

const mockDesktop = () =>
  matchMedia.mockImplementation((query) => ({
    media: query,
    matches:
      query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) &&
      query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));

// const mockLargeDesktop = () =>
//   matchMedia.mockImplementation((query) => ({
//     media: query,
//     matches: query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
//     onchange: () => {},
//     addListener: () => {},
//     removeListener: () => {},
//     addEventListener: () => {},
//     removeEventListener: () => {},
//     dispatchEvent: () => false,
//   }));

describe("Layout", () => {
  it("should render a typical layout with an AppBar, <main> element, and a skip to main content link with no additional props with ids", () => {
    render(<Layout />);

    expect(getById("layout-header")).toBeInTheDocument();
    expect(getById("layout-main")).toBeInTheDocument();
    expect(getById("skip-to-main-content")).toBeInTheDocument();
  });

  it("should render a default nav toggle button for non-persistent layouts", () => {
    const temporary: LayoutProps = { desktopLayout: "temporary" };
    const temporaryMini: LayoutProps = { desktopLayout: "temporary-mini" };
    const toggleable: LayoutProps = { desktopLayout: "toggleable" };
    const toggleableMini: LayoutProps = { desktopLayout: "toggleable-mini" };
    const floating: LayoutProps = { desktopLayout: "floating" };
    const clipped: LayoutProps = { desktopLayout: "clipped" };
    const fullHeight: LayoutProps = { desktopLayout: "full-height" };

    // just always use desktop config since it allows all options
    mockDesktop();
    const { rerender } = render(<Layout {...temporary} />);
    expect(getById("layout-nav-toggle")).toBeInTheDocument();

    rerender(<Layout {...temporaryMini} />);
    expect(getById("layout-nav-toggle")).toBeInTheDocument();

    rerender(<Layout {...toggleable} />);
    expect(getById("layout-nav-toggle")).toBeInTheDocument();

    rerender(<Layout {...toggleableMini} />);
    expect(getById("layout-nav-toggle")).toBeInTheDocument();

    rerender(<Layout {...floating} />);
    expect(() => getById("layout-nav-toggle")).toThrow();

    rerender(<Layout {...clipped} />);
    expect(() => getById("layout-nav-toggle")).toThrow();

    rerender(<Layout {...fullHeight} />);
    expect(() => getById("layout-nav-toggle")).toThrow();
  });

  describe("header behavior", () => {
    it("should not render the default app bar if the `appBar` prop has been provided", () => {
      const { rerender, queryByText } = render(<Layout appBar={null} />);

      expect(() => getById("layout-header")).toThrow();

      rerender(
        <Layout
          appBar={<span id="custom-app-bar">This can be anything</span>}
        />
      );
      expect(() => getById("layout-header")).toThrow();
      expect(getById("custom-app-bar")).toBeInTheDocument();

      rerender(<Layout appBar={null} appBarProps={{ children: "Hello" }} />);
      expect(() => getById("layout-header")).toThrow();
      expect(queryByText("Hello")).not.toBeInTheDocument();
    });

    it("should default to rendering the default app bar as a fixed app bar but can be overridden with the appBarProps", () => {
      const { rerender } = render(<Layout />);

      expect(getById("layout-header")).toHaveClass("rmd-app-bar--fixed");

      rerender(<Layout appBarProps={{ fixed: false }} />);
      expect(getById("layout-header")).not.toHaveClass("rmd-app-bar--fixed");
    });

    it("should render the `title` prop as the main title", () => {
      const { rerender, container, queryByText } = render(
        <Layout title="My Title" />
      );

      expect(queryByText("My Title")).toBeInTheDocument();
      expect(queryByText("My Title")).toBe(getById("layout-title"));
      expect(container).toMatchSnapshot();

      rerender(
        <Layout
          title={<span data-testid="custom">This is a custom title</span>}
        />
      );

      expect(queryByText("This is a custom title")).toBeInTheDocument();
      expect(getById("layout-title")).toContainElement(
        queryByText("This is a custom title")
      );
      expect(container).toMatchSnapshot();
    });

    it("should allow for any children to be rendered after the title with the appBarProps", () => {
      const props = {
        title: "My Title",
        appBarProps: { children: <span>Other Children</span> },
      };

      const {
        rerender,
        container,
        getByText,
        queryByText,
        queryByLabelText,
      } = render(<Layout {...props} />);

      expect(queryByText(props.title)).toBeInTheDocument();
      expect(queryByText("Other Children")).toBeInTheDocument();
      expect(getByText(props.title).nextElementSibling).toBe(
        queryByText("Other Children")
      );
      expect(container).toMatchSnapshot();

      rerender(
        <Layout
          title={<span>Updated Title</span>}
          appBarProps={{
            children: (
              <AppBarAction first last aria-label="Light Theme">
                <LightbulbOutlineSVGIcon />
              </AppBarAction>
            ),
          }}
        />
      );

      expect(queryByText("Updated Title")).toBeInTheDocument();
      expect(queryByLabelText("Light Theme")).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
