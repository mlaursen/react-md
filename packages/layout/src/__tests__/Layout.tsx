import React, { ReactElement } from "react";
import {
  Link,
  BrowserRouter,
  useLocation,
  Switch,
  Route,
} from "react-router-dom";
import {
  RenderOptions,
  fireEvent,
  getByRole as getByRoleGlobal,
  getByText as getByTextGlobal,
  render as baseRender,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  HomeSVGIcon,
  LightbulbOutlineSVGIcon,
  SettingsSVGIcon,
  StarSVGIcon,
  ShareSVGIcon,
  StorageSVGIcon,
  SecuritySVGIcon,
  SnoozeSVGIcon,
} from "@react-md/material-icons";
import { AppBarAction } from "@react-md/app-bar";
import {
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
} from "@react-md/utils";

import { Configuration } from "../Configuration";
import { Layout, LayoutProps } from "../Layout";
import { useLayoutConfig } from "../LayoutProvider";
import { useLayoutNavigation } from "../useLayoutNavigation";
import { LayoutNavigationTree } from "../types";

const render = (ui: ReactElement, options?: RenderOptions) =>
  baseRender(ui, {
    ...options,
    wrapper: ({ children }) => <Configuration>{children}</Configuration>,
  });

const getById = (id: string) => {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Unable to find an element by id: \`${id}\``);
  }

  return el;
};

const MULTIPLE_ROUTES_NAV_ITEMS: LayoutNavigationTree = {
  "/": {
    to: "/",
    itemId: "/",
    parentId: null,
    children: "Home",
    leftAddon: <HomeSVGIcon />,
  },
  "/route-1": {
    to: "/route-1",
    itemId: "/route-1",
    parentId: null,
    children: "Route 1",
    leftAddon: <StarSVGIcon />,
  },
  "/divider-1": {
    itemId: "/divider-1",
    parentId: null,
    divider: true,
    isCustom: true,
  },
  "/route-2": {
    to: "/route-2",
    itemId: "/route-2",
    parentId: null,
    children: "Route 2",
    leftAddon: <ShareSVGIcon />,
  },
  "/route-2/1": {
    to: "/route-2/1",
    itemId: "/route-2/1",
    parentId: "/route-2",
    children: "Route 2-1",
    leftAddon: <SettingsSVGIcon />,
  },
  "/route-2/2": {
    to: "/route-2/2",
    itemId: "/route-2/2",
    parentId: "/route-2",
    children: "Route 2-2",
    leftAddon: <StorageSVGIcon />,
  },
  "/route-2/3": {
    to: "/route-2/3",
    itemId: "/route-2/3",
    parentId: "/route-2",
    children: "Route 2-3",
    leftAddon: <SecuritySVGIcon />,
  },
  "/route-3": {
    to: "/route-3",
    itemId: "/route-3",
    parentId: null,
    children: "Route 3",
    leftAddon: <SnoozeSVGIcon />,
  },
  "/route-4": {
    to: "/route-4",
    itemId: "/route-4",
    parentId: null,
    children: "Route 4",
  },
};

const matchMedia = jest.spyOn(window, "matchMedia");

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

      const { rerender, container, getByText, queryByText, queryByLabelText } =
        render(<Layout {...props} />);

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

  describe("item render behavior", () => {
    interface TestProps {
      navItems: LayoutNavigationTree;
    }

    function Test({ navItems }: TestProps): ReactElement {
      return <Layout treeProps={useLayoutNavigation(navItems, "/")} />;
    }

    it("should be able to render links, subheaders, and dividers", () => {
      const navItems: LayoutNavigationTree = {
        "/": {
          href: "/",
          itemId: "/",
          parentId: null,
          children: "Home",
        },
        "/divider-1": {
          divider: true,
          isCustom: true,
          itemId: "/divider-1",
          parentId: null,
        },
        "/subheader-1": {
          subheader: true,
          isCustom: true,
          itemId: "/subheader-1",
          parentId: null,
          children: "Subheader",
        },
      };

      const { getByRole } = render(<Test navItems={navItems} />);
      const nav = getByRole("navigation");
      expect(nav).toMatchSnapshot();
      expect(() =>
        getByRoleGlobal(nav, "treeitem", { name: "Home" })
      ).not.toThrow();
      expect(() => getByTextGlobal(nav, "Subheader")).not.toThrow();
      expect(() => getByRoleGlobal(nav, "separator")).not.toThrow();
    });
  });

  describe("layout visibility", () => {
    const navItems: LayoutNavigationTree = {
      "/": {
        itemId: "/",
        parentId: null,
        to: "/",
        children: "Home",
      },
    };

    function Test(props: LayoutProps) {
      return (
        <Layout
          desktopLayout="toggleable"
          {...props}
          treeProps={useLayoutNavigation(navItems, "/")}
        />
      );
    }

    function Actions(): ReactElement {
      const { showNav, hideNav } = useLayoutConfig();

      return (
        <>
          <button type="button" onClick={showNav}>
            Show
          </button>
          <button type="button" onClick={hideNav}>
            Hide
          </button>
        </>
      );
    }

    beforeAll(() => {
      mockDesktop();
    });

    it("should default the toggleable layout visibility correctly", () => {
      let { getByRole, unmount } = render(<Test />);
      expect(() => getByRole("navigation")).toThrow();

      unmount();
      ({ getByRole, unmount } = render(<Test desktopLayout="full-height" />));
      expect(() => getByRole("navigation")).not.toThrow();

      unmount();
      ({ getByRole, unmount } = render(<Test defaultToggleableVisible />));
      expect(() => getByRole("navigation")).not.toThrow();

      unmount();
      ({ getByRole, unmount } = render(
        <Test defaultToggleableVisible="toggleable" />
      ));
      expect(() => getByRole("navigation")).not.toThrow();

      unmount();
      ({ getByRole, unmount } = render(
        <Test defaultToggleableVisible="toggleable-mini" />
      ));
      expect(() => getByRole("navigation")).toThrow();

      unmount();
      ({ getByRole, unmount } = render(
        <Test
          desktopLayout="toggleable-mini"
          defaultToggleableVisible="toggleable-mini"
        />
      ));
      expect(() => getByRole("navigation")).not.toThrow();

      unmount();
      ({ getByRole, unmount } = render(
        <Test
          desktopLayout="toggleable-mini"
          defaultToggleableVisible="toggleable"
        />
      ));
      // the mini variant will always render a navigation, but the dialog
      // version should not be visible
      expect(() => getByRole("navigation")).not.toThrow();
      expect(() => getByRole("dialog")).toThrow();
    });

    it("should allow the visibility to be controled with the showNav and hideNav functions", async () => {
      const { getByRole } = render(
        <Test>
          <Actions />
        </Test>
      );
      expect(() => getByRole("navigation")).toThrow();

      const show = getByRole("button", { name: "Show" });
      const hide = getByRole("button", { name: "Hide" });

      fireEvent.click(show);
      expect(() => getByRole("navigation")).not.toThrow();

      fireEvent.click(hide);
      await waitForElementToBeRemoved(getByRole("navigation"));
      expect(() => getByRole("navigation")).toThrow();
    });

    it("should not hide the visibility for persistent layouts", () => {
      let { getByRole, unmount } = render(
        <Test desktopLayout="clipped">
          <Actions />
        </Test>
      );

      expect(() => getByRole("navigation")).not.toThrow();

      fireEvent.click(getByRole("button", { name: "Hide" }));
      expect(() => getByRole("navigation")).not.toThrow();

      unmount();
      ({ getByRole, unmount } = render(
        <Test desktopLayout="floating">
          <Actions />
        </Test>
      ));
      expect(() => getByRole("navigation")).not.toThrow();

      fireEvent.click(getByRole("button", { name: "Hide" }));
      expect(() => getByRole("navigation")).not.toThrow();

      unmount();
      ({ getByRole, unmount } = render(
        <Test desktopLayout="full-height">
          <Actions />
        </Test>
      ));
      expect(() => getByRole("navigation")).not.toThrow();

      fireEvent.click(getByRole("button", { name: "Hide" }));
      expect(() => getByRole("navigation")).not.toThrow();
    });
  });

  describe("mini variant", () => {
    it("should display only valid nav items at the root in the mini variant", () => {
      function Test(): ReactElement {
        return (
          <Layout
            desktopLayout="temporary-mini"
            treeProps={useLayoutNavigation(MULTIPLE_ROUTES_NAV_ITEMS, "/")}
          />
        );
      }

      const getMiniNav = () => getById("layout-mini-nav-container");
      const getNav = () => getById("layout-nav-container");

      const { getByRole, queryAllByRole } = render(<Test />);
      expect(getNav).toThrow();
      expect(getMiniNav).not.toThrow();

      expect(() => getByRole("treeitem", { name: "Home" })).not.toThrow();
      expect(() => getByRole("treeitem", { name: "Route 1" })).not.toThrow();
      expect(() => getByRole("treeitem", { name: "Route 3" })).not.toThrow();

      expect(() => getByRole("treeitem", { name: "Route 1-1" })).toThrow();
      expect(() => getByRole("treeitem", { name: "Route 2" })).toThrow();
      expect(() => getByRole("treeitem", { name: "Route 2-1" })).toThrow();
      expect(() => getByRole("treeitem", { name: "Route 2-2" })).toThrow();
      expect(() => getByRole("treeitem", { name: "Route 2-3" })).toThrow();
      expect(() => getByRole("treeitem", { name: "Route 4" })).toThrow();
      expect(queryAllByRole("separator").length).toBe(1);

      expect(getMiniNav()).toMatchSnapshot();

      fireEvent.click(getByRole("button", { name: "Show Navigation" }));
      expect(getNav).not.toThrow();
      expect(getMiniNav).not.toThrow();
    });
  });

  describe("navigation behavior", () => {
    it("should work with react-router", () => {
      function Test(): ReactElement {
        const { pathname } = useLocation();
        return (
          <Layout
            treeProps={useLayoutNavigation(
              MULTIPLE_ROUTES_NAV_ITEMS,
              pathname,
              Link
            )}
          >
            <Switch>
              <Route path="/" exact>
                <h1>Home</h1>
              </Route>
              <Route path="/route-1">
                <h1>Route 1</h1>
              </Route>
              <Route path="/route-2">
                <h1>Route 2</h1>
                <Switch>
                  <Route path="/route-2/1">
                    <h2>Route 2-1</h2>
                  </Route>
                  <Route path="/route-2/2">
                    <h2>Route 2-2</h2>
                  </Route>
                  <Route path="/route-2/3">
                    <h2>Route 2-3</h2>
                  </Route>
                </Switch>
              </Route>
              <Route path="/route-3">
                <h1>Route 3</h1>
              </Route>
              <Route path="/route-4">
                <h1>Route 4</h1>
              </Route>
            </Switch>
          </Layout>
        );
      }

      const { getByRole } = baseRender(<Test />, {
        wrapper: ({ children }) => (
          <Configuration>
            <BrowserRouter>{children}</BrowserRouter>
          </Configuration>
        ),
      });

      expect(() => getByRole("heading", { name: "Home" })).not.toThrow();
      expect(() => getByRole("heading", { name: "Route 1" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 2" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 2-1" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 2-2" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 2-3" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 3" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 4" })).toThrow();

      const home = getByRole("treeitem", { name: "Home" });
      const route1 = getByRole("treeitem", { name: "Route 1" });
      const route2 = getByRole("treeitem", { name: "Route 2" });
      const route3 = getByRole("treeitem", { name: "Route 3" });
      const route4 = getByRole("treeitem", { name: "Route 4" });

      expect(home).toHaveClass("rmd-tree-item__content--selected");
      expect(route1).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route2).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route3).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route4).not.toHaveClass("rmd-tree-item__content--selected");

      fireEvent.click(route2);
      const route21 = getByRole("treeitem", { name: "Route 2-1" });
      const route22 = getByRole("treeitem", { name: "Route 2-2" });
      const route23 = getByRole("treeitem", { name: "Route 2-3" });

      expect(() => getByRole("heading", { name: "Home" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 1" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 2" })).not.toThrow();
      expect(() => getByRole("heading", { name: "Route 2-1" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 2-2" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 2-3" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 3" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 4" })).toThrow();

      expect(home).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route1).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route2).toHaveClass("rmd-tree-item__content--selected");
      expect(route3).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route4).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route21).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route22).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route23).not.toHaveClass("rmd-tree-item__content--selected");

      fireEvent.click(route22);
      expect(() => getByRole("heading", { name: "Home" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 1" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 2" })).not.toThrow();
      expect(() => getByRole("heading", { name: "Route 2-1" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 2-2" })).not.toThrow();
      expect(() => getByRole("heading", { name: "Route 2-3" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 3" })).toThrow();
      expect(() => getByRole("heading", { name: "Route 4" })).toThrow();
      expect(home).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route1).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route2).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route3).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route4).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route21).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route22).toHaveClass("rmd-tree-item__content--selected");
      expect(route23).not.toHaveClass("rmd-tree-item__content--selected");
    });

    it("should ignore query params in the path names", () => {
      function Test(): ReactElement {
        return (
          <Layout
            treeProps={useLayoutNavigation(
              MULTIPLE_ROUTES_NAV_ITEMS,
              "/route-3?some&query&params=3"
            )}
          />
        );
      }

      const { getByRole } = render(<Test />);

      const home = getByRole("treeitem", { name: "Home" });
      const route1 = getByRole("treeitem", { name: "Route 1" });
      const route2 = getByRole("treeitem", { name: "Route 2" });
      const route3 = getByRole("treeitem", { name: "Route 3" });
      const route4 = getByRole("treeitem", { name: "Route 4" });

      expect(home).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route1).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route2).not.toHaveClass("rmd-tree-item__content--selected");
      expect(route3).toHaveClass("rmd-tree-item__content--selected");
      expect(route4).not.toHaveClass("rmd-tree-item__content--selected");
    });
  });
});
