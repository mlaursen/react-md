import { getItemsFrom } from "../getItemsFrom";

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
};

describe("getItemsFrom", () => {
  it("should return an empty list if the provided itemId does not exist in the data or is null", () => {
    expect(getItemsFrom(data, "item-100000")).toEqual([]);
    expect(getItemsFrom(data, null)).toEqual([]);
  });

  it("should return the corrected oredred list of items", () => {
    expect(getItemsFrom(data, "item-id-1")).toEqual([item1]);
    expect(getItemsFrom(data, "item-id-3")).toEqual([item3]);
    expect(getItemsFrom(data, "item-id-4")).toEqual([item4, item3]);
    expect(getItemsFrom(data, "item-id-2")).toEqual([item2, item3]);
    expect(getItemsFrom(data, "item-id-5")).toEqual([item5, item4, item3]);
  });
});
