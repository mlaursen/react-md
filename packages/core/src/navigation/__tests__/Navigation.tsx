import { type ReactElement } from "react";
import { describe, expect, it } from "vitest";

import { FontIcon } from "../../icon/FontIcon.js";
import {
  render as baseRender,
  screen,
  userEvent,
  within,
} from "../../test-utils/index.js";
import { Navigation, type NavigationProps } from "../Navigation.js";
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
        children: "Route 1",
      },
      {
        type: "route",
        href: "/route-2",
        children: "Route 2",
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
        children: "Route 1",
      },
      {
        type: "divider",
        inset: true,
      },
      {
        type: "route",
        href: "/route-2",
        children: "Route 2",
      },
    ],
  },
];

function Test(props: Partial<NavigationProps>): ReactElement {
  const { data } = useNavigationExpansion({
    pathname: "/",
    linkComponent: "a",
  });

  return <Navigation data-testid="nav" data={data} items={items} {...props} />;
}

const render = (props?: Partial<NavigationProps>) =>
  baseRender(<Test {...props} />);

describe("Navigation", () => {
  it("should be able to render dividers, subheaders, groups, links, and nested items out of the box", () => {
    render();

    const nav = screen.getByTestId("nav");
    expect(nav).toMatchSnapshot();
    const path2 = screen.getByRole("button", { name: "Path 2" });
    const path2Parent = path2.parentElement;
    if (!path2Parent) {
      throw new Error();
    }

    expect(() => within(path2Parent).getByText("Route 1")).toThrow();
  });

  it("should allow route groups to be expanded", async () => {
    const user = userEvent.setup();
    render();
    const path2 = screen.getByRole("button", { name: "Path 2" });
    const path2Parent = path2.parentElement;
    if (!path2Parent) {
      throw new Error();
    }

    await user.click(path2);
    const route1 = within(path2Parent).getByText("Route 1");
    expect(path2Parent).toMatchSnapshot();

    await user.click(path2);
    expect(route1).not.toBeInTheDocument();
  });
});
