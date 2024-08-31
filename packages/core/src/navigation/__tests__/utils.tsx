import { describe, expect, it } from "@jest/globals";
import { type NavigationItem } from "../types.js";
import { FontIcon } from "../../icon/FontIcon.js";
import { getHrefFromParents, getPartsFromPathname } from "../utils.js";

const items = [
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
] as const satisfies readonly NavigationItem[];

describe("getHrefFromParents", () => {
  it("should combine all items that have an href", () => {
    const [home, divider, subheader, group1, group2] = items;
    expect(getHrefFromParents([home])).toBe("/");
    expect(getHrefFromParents([divider])).toBe("");
    expect(getHrefFromParents([subheader])).toBe("");
    expect(getHrefFromParents([group1])).toBe("/path-1");
    expect(getHrefFromParents([group2])).toBe("/path-2");

    const [group1Item1, group1Item2] = group1.items;
    expect(getHrefFromParents([group1, group1Item1])).toBe("/path-1/route-1");
    expect(getHrefFromParents([group1, group1Item2])).toBe("/path-1/route-2");

    const [group2Subheader, group2Item1, group2Divider, group2Item2] =
      group2.items;
    expect(getHrefFromParents([group2, group2Subheader])).toBe("/path-2");
    expect(getHrefFromParents([group2, group2Item1])).toBe("/path-2/route-1");
    expect(getHrefFromParents([group2, group2Divider])).toBe("/path-2");
    expect(getHrefFromParents([group2, group2Item2])).toBe("/path-2/route-2");
  });
});

describe("getPartsFromPathname", () => {
  it("should return a ReadonlySet from the parts in the pathname", () => {
    expect(getPartsFromPathname("/")).toEqual(new Set(["/"]));
    expect(getPartsFromPathname("/hello")).toEqual(new Set(["/", "/hello"]));
    expect(getPartsFromPathname("/hello/world")).toEqual(
      new Set(["/", "/hello", "/hello/world"])
    );
  });

  it("should ignore multiple slashes to fix apps that are unable to rewrite", () => {
    expect(getPartsFromPathname("///////")).toEqual(new Set(["/"]));
    expect(getPartsFromPathname("/hello/////world")).toEqual(
      new Set(["/", "/hello", "/hello/world"])
    );
    expect(getPartsFromPathname("/hello/////world//////")).toEqual(
      new Set(["/", "/hello", "/hello/world"])
    );
  });
});
