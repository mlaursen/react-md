import {
  type AnchorHTMLAttributes,
  type ReactElement,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { describe, expect, it } from "vitest";

import { Button } from "../../button/Button.js";
import { FontIcon } from "../../icon/FontIcon.js";
import { render, screen, userEvent } from "../../test-utils/index.js";
import { type UseStateInitializer } from "../../types.js";
import { Navigation } from "../Navigation.js";
import { type NavigationItem } from "../types.js";
import { useNavigationExpansion } from "../useNavigationExpansion.js";

const items: NavigationItem[] = [
  {
    type: "route",
    href: "/",
    children: "Home",
    beforeAddon: <FontIcon>home</FontIcon>,
  },
  { type: "divider" },
  {
    type: "subheader",
    children: "Subheader",
  },
  {
    type: "group",
    href: "/path-1",
    children: "Path 1",
    items: [
      {
        type: "route",
        href: "/route-1",
        children: "Path 1 Route 1",
      },
      {
        type: "route",
        href: "/route-2",
        children: "Path 1 Route 2",
      },
    ],
  },
  {
    type: "group",
    href: "/path-2",
    children: "Path 2",
    items: [
      { type: "subheader", children: "Routes" },
      {
        type: "route",
        href: "/route-1",
        children: "Path 2 Route 1",
      },
      {
        type: "divider",
        inset: true,
      },
      {
        type: "route",
        href: "/route-2",
        children: "Path 2 Route 2",
      },
    ],
  },
];

interface TestProps {
  defaultPathname?: string;
  defaultExpandedItems?: UseStateInitializer<
    readonly string[] | ReadonlySet<string>
  >;
  disableFollowingPathname?: boolean;
}

function Test(props: TestProps): ReactElement {
  const {
    defaultPathname = "/",
    defaultExpandedItems,
    disableFollowingPathname,
  } = props;
  const [pathname, setPathname] = useState(defaultPathname);
  const FakeLink = useMemo(
    () =>
      forwardRef<
        HTMLAnchorElement,
        AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
      >(function FakeLink(props, ref) {
        return (
          <a
            ref={ref}
            {...props}
            onClick={() => {
              setPathname(props.href);
            }}
          />
        );
      }),
    []
  );

  const { data } = useNavigationExpansion({
    pathname,
    linkComponent: FakeLink,
    defaultExpandedItems,
    disableFollowingPathname,
  });

  return (
    <>
      <Navigation data-testid="nav" data={data} items={items} />
      <Button
        onClick={() => {
          setPathname("/path-1/route-1");
        }}
      >
        Set Path 1 Route 1
      </Button>
      <Button
        onClick={() => {
          setPathname("/path-2/route-2");
        }}
      >
        Set Path 2 Route 2
      </Button>
    </>
  );
}

describe("useNavigationExpansion", () => {
  it("should default the expanded ids to be each part of the pathname", () => {
    const { unmount } = render(<Test />);
    let nav = screen.getByTestId("nav");
    expect(() =>
      screen.getByRole("link", { name: "Path 1 Route 1" })
    ).toThrow();
    expect(() =>
      screen.getByRole("link", { name: "Path 1 Route 2" })
    ).toThrow();
    expect(() =>
      screen.getByRole("link", { name: "Path 2 Route 1" })
    ).toThrow();
    expect(() =>
      screen.getByRole("link", { name: "Path 2 Route 2" })
    ).toThrow();
    expect(nav).toMatchSnapshot();

    unmount();
    render(<Test defaultPathname="/path-2/route-2" />);
    nav = screen.getByTestId("nav");
    expect(() =>
      screen.getByRole("link", { name: "Path 1 Route 1" })
    ).toThrow();
    expect(() =>
      screen.getByRole("link", { name: "Path 1 Route 2" })
    ).toThrow();
    expect(() =>
      screen.getByRole("link", { name: "Path 2 Route 1" })
    ).not.toThrow();
    expect(() =>
      screen.getByRole("link", { name: "Path 2 Route 2" })
    ).not.toThrow();
    expect(nav).toMatchSnapshot();
  });

  it("should allow for default expanded items", () => {
    const { unmount } = render(<Test defaultExpandedItems={["/path-1"]} />);
    expect(() =>
      screen.getByRole("link", { name: "Path 1 Route 1" })
    ).not.toThrow();
    expect(() =>
      screen.getByRole("link", { name: "Path 2 Route 1" })
    ).toThrow();
    unmount();

    render(<Test defaultExpandedItems={() => new Set(["/path-2"])} />);
    expect(() =>
      screen.getByRole("link", { name: "Path 1 Route 1" })
    ).toThrow();
    expect(() =>
      screen.getByRole("link", { name: "Path 2 Route 1" })
    ).not.toThrow();
  });

  it("should automatically expand the items if the pathname changes to support users navigating outside of the navigation tree", async () => {
    const user = userEvent.setup();
    render(<Test />);
    const home = screen.getByRole("link", { name: "Home" });
    const path1 = screen.getByRole("button", { name: "Path 1" });
    const path2 = screen.getByRole("button", { name: "Path 2" });
    const setPath1Route1 = screen.getByRole("button", {
      name: "Set Path 1 Route 1",
    });
    expect(path1).toHaveAttribute("aria-expanded", "false");
    expect(path2).toHaveAttribute("aria-expanded", "false");

    await user.click(setPath1Route1);
    expect(path1).toHaveAttribute("aria-expanded", "true");
    expect(path2).toHaveAttribute("aria-expanded", "false");

    await user.click(path1);
    expect(path1).toHaveAttribute("aria-expanded", "false");
    expect(path2).toHaveAttribute("aria-expanded", "false");

    await user.click(path1);
    expect(path1).toHaveAttribute("aria-expanded", "true");

    await user.click(home);
    expect(path1).toHaveAttribute("aria-expanded", "true");

    await user.click(setPath1Route1);
    expect(path1).toHaveAttribute("aria-expanded", "true");
  });

  it("should not expand the items when the pathname changes if the disableFollowingPathname is enabled", async () => {
    const user = userEvent.setup();
    render(<Test disableFollowingPathname />);
    const path1 = screen.getByRole("button", { name: "Path 1" });
    const path2 = screen.getByRole("button", { name: "Path 2" });
    const setPath1Route1 = screen.getByRole("button", {
      name: "Set Path 1 Route 1",
    });
    expect(path1).toHaveAttribute("aria-expanded", "false");
    expect(path2).toHaveAttribute("aria-expanded", "false");

    await user.click(setPath1Route1);
    expect(path1).toHaveAttribute("aria-expanded", "false");
    expect(path2).toHaveAttribute("aria-expanded", "false");

    await user.click(path1);
    expect(path1).toHaveAttribute("aria-expanded", "true");
    expect(path2).toHaveAttribute("aria-expanded", "false");
  });
});
