import { BaseTreeItem, TreeData } from "../types";
import { buildTree } from "../useNestedTreeList";

interface TestTreeItem extends BaseTreeItem {
  children: string;
}

const TREE: TreeData<TestTreeItem> = {
  "item-1": {
    itemId: "item-1",
    parentId: null,
    children: "Content 1",
  },
  "item-2": {
    itemId: "item-2",
    parentId: null,
    children: "Content 2",
  },
  "item-3": {
    itemId: "item-3",
    parentId: null,
    children: "Content 3",
  },
  "item-4": {
    itemId: "item-4",
    parentId: null,
    children: "Content 4",
  },
  "item-5": {
    itemId: "item-5",
    parentId: null,
    children: "Content 5",
  },
};

const NESTED_TREE: TreeData<TestTreeItem> = {
  "item-1": {
    itemId: "item-1",
    parentId: null,
    children: "Content 1",
  },
  "item-1-1": {
    itemId: "item-1-1",
    parentId: "item-1",
    children: "Content 1-1",
  },
  "item-1-1-1": {
    itemId: "item-1-1-1",
    parentId: "item-1-1",
    children: "Content 1-1-1",
  },
  "item-2": {
    itemId: "item-2",
    parentId: null,
    children: "Content 2",
  },
  "item-2-1": {
    itemId: "item-2-1",
    parentId: "item-2",
    children: "Content 2-1",
  },
  "item-2-2": {
    itemId: "item-2-2",
    parentId: "item-2",
    children: "Content 2-2",
  },
};

describe("buildTree", () => {
  it("should return undefined if the tree is empty", () => {
    const data: TreeData<TestTreeItem> = {};
    expect(buildTree(null, Object.values(data))).toBeUndefined();
  });

  it("should be able to create a tree with a single item", () => {
    const data: TreeData<TestTreeItem> = {
      "item-1": {
        itemId: "item-1",
        parentId: null,
        children: "Content",
      },
    };

    expect(buildTree(null, Object.values(data))).toEqual([
      { itemId: "item-1", children: "Content", parentId: null },
    ]);
  });

  it("should be able to create a tree with multiple items on the root level", () => {
    const expected = [
      { itemId: "item-1", children: "Content 1", parentId: null },
      { itemId: "item-2", children: "Content 2", parentId: null },
      { itemId: "item-3", children: "Content 3", parentId: null },
      { itemId: "item-4", children: "Content 4", parentId: null },
      { itemId: "item-5", children: "Content 5", parentId: null },
    ];
    expect(buildTree(null, Object.values(TREE))).toEqual(expected);
  });

  it("should be able to create a tree with multiple levels", () => {
    const expected = [
      {
        itemId: "item-1",
        parentId: null,
        children: "Content 1",
        childItems: [
          {
            itemId: "item-1-1",
            parentId: "item-1",
            children: "Content 1-1",
            childItems: [
              {
                itemId: "item-1-1-1",
                parentId: "item-1-1",
                children: "Content 1-1-1",
              },
            ],
          },
        ],
      },
      {
        itemId: "item-2",
        parentId: null,
        children: "Content 2",
        childItems: [
          {
            itemId: "item-2-1",
            parentId: "item-2",
            children: "Content 2-1",
          },
          {
            itemId: "item-2-2",
            parentId: "item-2",
            children: "Content 2-2",
          },
        ],
      },
    ];

    expect(buildTree(null, Object.values(NESTED_TREE))).toEqual(expected);
  });
});
