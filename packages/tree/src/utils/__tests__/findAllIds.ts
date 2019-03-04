import findAllIds from "../findAllIds";
import { TreeDataList } from "../../types";

const SIMPLE_FLAT_LIST: TreeDataList = [
  {
    itemId: "item-1",
  },
  {
    itemId: "item-2",
  },
  {
    itemId: "item-3",
  },
];

const SIMPLE_NESTED_LIST: TreeDataList = [
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

describe("findAllIds", () => {
  it("should be able to find all ids in a flat list", () => {
    expect(findAllIds(SIMPLE_FLAT_LIST)).toEqual([
      "item-1",
      "item-2",
      "item-3",
    ]);
  });

  it("should be able to find all ids with childItems", () => {
    const expected = [
      "item-1",
      "item-1-1",
      "item-1-1-1",
      "item-1-1-2",
      "item-1-2",
      "item-1-3",
      "item-1-3-1",
      "item-2",
      "item-3",
      "item-3-1",
    ];

    expect(findAllIds(SIMPLE_NESTED_LIST)).toEqual(expected);
  });
});
