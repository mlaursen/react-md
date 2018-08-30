import findAllParentIds from "../findAllParentIds";
import { TreeViewDataList } from "../../types";

const SIMPLE_NESTED_LIST: TreeViewDataList = [
  {
    itemId: "item-1",
    childItems: [
      {
        itemId: "item-1-1",
        childItems: [
          {
            itemId: "item-1-1-1",
          },
          {
            itemId: "item-1-1-2",
          },
        ],
      },
      {
        itemId: "item-1-2",
      },
      {
        itemId: "item-1-3",
        childItems: [{ itemId: "item-1-3-1" }],
      },
    ],
  },
  {
    itemId: "item-2",
  },
  {
    itemId: "item-3",
    childItems: [{ itemId: "item-3-1" }],
  },
];

describe("findAllParentIds", () => {
  it("should return an empty list when there are no ids to search for", () => {
    expect(findAllParentIds(SIMPLE_NESTED_LIST, [])).toEqual([]);
  });

  it("should return an empty list if the provided search ids are on the root level", () => {
    expect(findAllParentIds(SIMPLE_NESTED_LIST, ["item-1"])).toEqual([]);
    expect(findAllParentIds(SIMPLE_NESTED_LIST, ["item-2"])).toEqual([]);
    expect(findAllParentIds(SIMPLE_NESTED_LIST, ["item-3"])).toEqual([]);
  });

  it("should find all parent ids for a single id", () => {
    const expected1 = ["item-1"];
    const expected2 = ["item-1", "item-1-1"];
    const expected3 = ["item-1", "item-1-3"];

    expect(findAllParentIds(SIMPLE_NESTED_LIST, ["item-1-1"])).toEqual(expected1);
    expect(findAllParentIds(SIMPLE_NESTED_LIST, ["item-1-1-2"])).toEqual(expected2);
    expect(findAllParentIds(SIMPLE_NESTED_LIST, ["item-1-3-1"])).toEqual(expected3);
  });

  it("should fild all parent ids for multiple unique ids", () => {
    const expected1 = ["item-1", "item-3"];
    const expected2 = ["item-1", "item-1-1"];

    expect(findAllParentIds(SIMPLE_NESTED_LIST, ["item-1-1", "item-3-1"])).toEqual(expected1);
  });

  it("should fild all parent ids for multiple ids without including duplicates", () => {
    const expected1 = ["item-1"];
    const expected2 = ["item-1", "item-1-1"];

    expect(findAllParentIds(SIMPLE_NESTED_LIST, ["item-1-1", "item-1"])).toEqual(expected1);
    expect(findAllParentIds(SIMPLE_NESTED_LIST, ["item-1-1-2", "item-1"])).toEqual(expected2);
  });
});
