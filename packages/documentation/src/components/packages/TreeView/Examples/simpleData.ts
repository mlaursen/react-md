import { TreeViewDataList } from "@react-md/tree-view";

const data: TreeViewDataList = [
  {
    itemId: "item-1",
    children: "Item 1",
    childItems: [
      {
        itemId: "item-1-1",
        children: "Item 1-1",
      },
      {
        itemId: "item-1-2",
        children: "Item 1-2",
      },
    ],
  },
  {
    itemId: "item-2",
    children: "Item 2",
  },
  {
    itemId: "item-3",
    children: "Item 3",
    childItems: [
      {
        itemId: "item-3-1",
        children: "Item 3-1",
        childItems: [
          {
            itemId: "item-3-1-1",
            children: "Item 3-1-1",
          },
          {
            itemId: "item-3-1-2",
            children: "Item 3-1-2",
          },
          {
            itemId: "item-3-1-3",
            children: "Item 3-1-3",
          },
          {
            itemId: "item-3-1-4",
            children: "Item 3-1-4",
          },
          {
            itemId: "item-3-1-5",
            children: "Item 3-1-5",
          },
        ]
      },
      {
        itemId: "item-3-2",
        children: "Item 3-2",
      },
      {
        itemId: "item-3-3",
        children: "Item 3-3",
      },
    ],
  },
];

export default data;
