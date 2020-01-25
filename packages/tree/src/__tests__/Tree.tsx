import React from "react";
import { render } from "@testing-library/react";

import Tree from "../Tree";

const PROPS = {
  id: "tree",
  data: {},
  expandedIds: [],
  onItemExpansion: () => {},
  onMultiItemExpansion: () => {},
  selectedIds: [],
  onItemSelect: () => {},
  onMultiItemSelect: () => {},
};
describe("Tree", () => {
  it("should be able to render an empty tree", () => {
    const { container } = render(<Tree {...PROPS} />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to render a tree with muliple root level nodes", () => {
    const data = {
      "item-1": {
        parentId: null,
        itemId: "item-1",
        name: "Item 1",
      },
      "item-3": {
        parentId: null,
        itemId: "item-3",
        name: "Item 3",
      },
      "item-2": {
        parentId: null,
        itemId: "item-2",
        name: "Item 2",
      },
    };
    const { container } = render(<Tree {...PROPS} data={data} />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to use a rootId that is not null", () => {
    const data = {
      "item-1": {
        parentId: "root-id",
        itemId: "item-1",
        name: "Item 1",
      },
      "item-3": {
        parentId: "root-id",
        itemId: "item-3",
        name: "Item 3",
      },
      "item-2": {
        parentId: "root-id",
        itemId: "item-2",
        name: "Item 2",
      },
    };
    const { container, getByRole } = render(
      <Tree {...PROPS} data={data} rootId="root-id" />
    );
    expect(container).toMatchSnapshot();

    const tree = getByRole("tree");
    expect(tree.firstElementChild).not.toBeNull();
  });
});
