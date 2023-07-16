import type { TreeData } from "../types";
import { getChildTreeItems, getTreeItemsFrom } from "../utils";

const item1 = {
  itemId: "item-id-1",
  name: "item",
  parentId: null,
};

const item2 = {
  itemId: "item-id-2",
  name: "item",
  parentId: "item-id-3",
};

const item3 = {
  itemId: "item-id-3",
  name: "item",
  parentId: null,
};

const item4 = {
  itemId: "item-id-4",
  name: "item",
  parentId: "item-id-3",
};

const item5 = {
  itemId: "item-id-5",
  name: "item",
  parentId: "item-id-4",
};

const data = {
  "item-id-1": item1,
  "item-id-2": item2,
  "item-id-3": item3,
  "item-id-4": item4,
  "item-id-5": item5,
} satisfies TreeData;

describe("getTreeItemsFrom", () => {
  it("should return an empty list if the provided itemId does not exist or the data is empty", () => {
    expect(getTreeItemsFrom({}, "item-1")).toEqual([]);
    expect(getTreeItemsFrom(data, "item-fake")).toEqual([]);
    expect(getTreeItemsFrom(data, "")).toEqual([]);
    expect(getTreeItemsFrom(data, null)).toEqual([]);
  });

  it("should return the corrected ordered list of items", () => {
    expect(getTreeItemsFrom(data, "item-id-1")).toEqual([item1]);
    expect(getTreeItemsFrom(data, "item-id-3")).toEqual([item3]);
    expect(getTreeItemsFrom(data, "item-id-4")).toEqual([item4, item3]);
    expect(getTreeItemsFrom(data, "item-id-2")).toEqual([item2, item3]);
    expect(getTreeItemsFrom(data, "item-id-5")).toEqual([item5, item4, item3]);
  });
});

describe("getChildTreeItems", () => {
  it("should return an empty list if there are not items with the provided parentId", () => {
    expect(getChildTreeItems({}, "")).toEqual([]);
    expect(getChildTreeItems({}, "noop")).toEqual([]);
    expect(getChildTreeItems(data, "")).toEqual([]);
    expect(getChildTreeItems(data, "noop")).toEqual([]);
    expect(getChildTreeItems(data, "item-id")).toEqual([]);
  });

  it("should return a list of all the items that have the matching parentId", () => {
    expect(getChildTreeItems(data, null, false)).toEqual([item1, item3]);
    expect(getChildTreeItems(data, "item-id-3", false)).toEqual([item2, item4]);
    expect(getChildTreeItems(data, "item-id-4", false)).toEqual([item5]);
  });

  it("should return a list of all the items that have the matching parentId(s)", () => {
    expect(getChildTreeItems(data, "item-id-3", true)).toEqual([
      item2,
      item4,
      item5,
    ]);
    expect(getChildTreeItems(data, "item-id-4", true)).toEqual([item5]);

    // just to show the traversal order even though it doesn't really matter much
    expect(getChildTreeItems(data, null, true)).toEqual([
      item1,
      item3,
      item2,
      item4,
      item5,
    ]);
  });

  it("should default to not recursively matching items", () => {
    expect(getChildTreeItems(data, null)).toEqual([item1, item3]);
    expect(getChildTreeItems(data, "item-id-3")).toEqual([item2, item4]);
    expect(getChildTreeItems(data, "item-id-4")).toEqual([item5]);
  });
});
