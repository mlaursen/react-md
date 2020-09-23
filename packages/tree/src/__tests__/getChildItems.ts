import { getChildItems } from "../getChildItems";

const item1 = {
  itemId: "item-id-1",
  name: "item",
  parentId: "root",
};

const item2 = {
  itemId: "item-id-2",
  name: "item",
  parentId: "item-id-3",
};

const item3 = {
  itemId: "item-id-3",
  name: "item",
  parentId: "root",
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
};

describe("getChildItems", () => {
  it("should return an empty list if there are not items with the provided parentId", () => {
    expect(getChildItems({}, null)).toEqual([]);
    expect(getChildItems({}, "")).toEqual([]);
    expect(getChildItems({}, "noop")).toEqual([]);
    expect(getChildItems(data, "noop")).toEqual([]);
    expect(getChildItems(data, "item-id")).toEqual([]);
  });

  it("should return a list of all the items that have the matching parentId", () => {
    expect(getChildItems(data, "root", false)).toEqual([item1, item3]);
    expect(getChildItems(data, "item-id-3", false)).toEqual([item2, item4]);
    expect(getChildItems(data, "item-id-4", false)).toEqual([item5]);
  });

  it("should return a list of all the items that have the matching parentId(s)", () => {
    expect(getChildItems(data, "item-id-3", true)).toEqual([
      item2,
      item4,
      item5,
    ]);
    expect(getChildItems(data, "item-id-4", true)).toEqual([item5]);

    // just to show the traversal order even though it doesn't really matter much
    expect(getChildItems(data, "root", true)).toEqual([
      item1,
      item3,
      item2,
      item4,
      item5,
    ]);
  });

  it("should default to not recursively matching items", () => {
    expect(getChildItems(data, "root")).toEqual([item1, item3]);
    expect(getChildItems(data, "item-id-3")).toEqual([item2, item4]);
    expect(getChildItems(data, "item-id-4")).toEqual([item5]);
  });
});
