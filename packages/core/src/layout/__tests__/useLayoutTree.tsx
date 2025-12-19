import {
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
  createContext,
  useContext,
  useState,
} from "react";
import { beforeEach, describe, expect, it } from "vitest";

import { FontIcon } from "../../icon/FontIcon.js";
import { rmdRender, screen, userEvent } from "../../test-utils/index.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { Tree } from "../../tree/Tree.js";
import { type TreeData } from "../../tree/types.js";
import { isElementVisible } from "../../utils/isElementVisible.js";
import { useLayoutTree } from "../useLayoutTree.js";

const navItems = {
  "/": {
    itemId: "/",
    parentId: null,
    children: "Home",
    leftAddon: <FontIcon>home</FontIcon>,
    to: "/",
  },
  "/route-1": {
    itemId: "/route-1",
    parentId: null,
    children: "Route 1",
    leftAddon: <FontIcon>tv</FontIcon>,
    to: "/route-1",
  },
  "/route-2": {
    itemId: "/route-2",
    parentId: null,
    children: "Route 2",
    leftAddon: <FontIcon>apps</FontIcon>,
    to: "/route-2",
  },
  "/route-3": {
    itemId: "/route-3",
    parentId: null,
    children: "Route 3",
    leftAddon: <FontIcon>book</FontIcon>,
    to: "/route-3",
  },
  "/route-3/1": {
    itemId: "/route-3/1",
    parentId: "/route-3",
    children: "Route 3-1",
    to: "/route-3/1",
  },
  "/route-3/1/1": {
    itemId: "/route-3/1/1",
    parentId: "/route-3/1",
    children: "Route 3-1/1",
    to: "/route-3/1/1",
  },
  "/route-3/1/1/1": {
    itemId: "/route-3/1/1/1",
    parentId: "/route-3/1/1",
    children: "Route 3-1/1/1",
    to: "/route-3/1/1/1",
  },
} satisfies TreeData;

const fakeRouter = createContext({
  pathname: "",
  setPathname(_pathname: string) {
    //
  },
});
const { Provider } = fakeRouter;
function useRouter() {
  return useContext(fakeRouter);
}

interface WrapperProps {
  defaultPathname?: string;
  children: ReactNode;
}

function Wrapper({
  children,
  defaultPathname = "/",
}: WrapperProps): ReactElement {
  const [pathname, setPathname] = useState(defaultPathname);
  return <Provider value={{ pathname, setPathname }}>{children}</Provider>;
}

function FakeRoutingLibraryLink({
  to,
  ref,
  ...props
}: {
  to: string;
  ref?: Ref<HTMLAnchorElement>;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { setPathname } = useRouter();
  return (
    <a
      {...props}
      ref={ref}
      href={to}
      onClick={(event) => {
        props.onClick?.(event);
        event.preventDefault();
        setPathname(to);
      }}
    />
  );
}

function Test() {
  const { pathname } = useRouter();
  const tree = useLayoutTree({
    navItems,
    pathname,
  });

  return (
    <Tree
      {...tree}
      aria-label="Navigation"
      expansionMode="manual"
      linkComponent={FakeRoutingLibraryLink}
    />
  );
}

describe("useLayoutTree", () => {
  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  it("should allow you to create a layout tree quickly", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />, { wrapper: Wrapper });

    const tree = screen.getByRole("tree", { name: "Navigation" });
    expect(tree).toBeInTheDocument();

    const home = screen.getByRole("treeitem", { name: "Home" });
    const route1 = screen.getByRole("treeitem", { name: "Route 1" });
    const route2 = screen.getByRole("treeitem", { name: "Route 2" });
    const route3 = screen.getByRole("treeitem", { name: "Route 3" });
    const subRoute = screen.getByRole("treeitem", { name: "Route 3-1" });
    expect(home).toHaveAttribute("aria-selected", "true");
    expect(route1).toHaveAttribute("aria-selected", "false");
    expect(route2).toHaveAttribute("aria-selected", "false");
    expect(route3).toHaveAttribute("aria-selected", "false");
    expect(isElementVisible(subRoute)).toBe(false);

    await user.click(route2);
    expect(home).toHaveAttribute("aria-selected", "false");
    expect(route1).toHaveAttribute("aria-selected", "false");
    expect(route2).toHaveAttribute("aria-selected", "true");
    expect(route3).toHaveAttribute("aria-selected", "false");

    await user.click(route3);
    expect(home).toHaveAttribute("aria-selected", "false");
    expect(route1).toHaveAttribute("aria-selected", "false");
    expect(route2).toHaveAttribute("aria-selected", "false");
    expect(route3).toHaveAttribute("aria-selected", "true");

    expect(isElementVisible(subRoute)).toBe(true);
  });

  it("should default to expanding all parent items from the starting pathname", () => {
    rmdRender(<Test />, {
      wrapper: ({ children }) => (
        <Wrapper defaultPathname={navItems["/route-3/1/1/1"].itemId}>
          {children}
        </Wrapper>
      ),
    });

    const tree = screen.getByRole("tree", { name: "Navigation" });
    const deeplyNestedRoute = screen.getByRole("treeitem", {
      name: navItems["/route-3/1/1/1"].children,
    });
    expect(deeplyNestedRoute).toHaveAttribute("aria-selected", "true");
    expect(tree).toMatchSnapshot();
  });

  it("should automatically expand parent items if the pathname changed outside of clicking one of the navigation items", async () => {
    const user = userEvent.setup();
    const route311 = navItems["/route-3/1/1"];
    function AnotherTest() {
      return (
        <>
          <Test />
          <FakeRoutingLibraryLink to={route311.itemId}>
            Link
          </FakeRoutingLibraryLink>
        </>
      );
    }

    rmdRender(<AnotherTest />, { wrapper: Wrapper });

    const tree = screen.getByRole("tree", { name: "Navigation" });
    const route311Item = screen.getByRole("treeitem", {
      name: route311.children,
    });
    expect(isElementVisible(route311Item)).toBe(false);
    expect(tree).toMatchSnapshot();

    await user.click(screen.getByRole("link", { name: "Link" }));

    expect(isElementVisible(route311Item)).toBe(true);
    expect(tree).toMatchSnapshot();
  });
});
